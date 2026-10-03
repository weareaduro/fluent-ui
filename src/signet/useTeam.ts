import { useQueryClient } from '@tanstack/react-query';
import { roleLabel } from './claims';
import { signet } from './client';
import { useDirectory, useFluentConfig, useSignetMutation, useSignetQuery } from './provider';

export type TeamMember = {
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  status: string;
  userUuid: string;
};

type RoleItem = { name: string };

export const useTeam = () => {
  const { clientId, teamClaim } = useFluentConfig();
  const { organisationUuid, user } = useDirectory();
  const membership = user.organisations.find((organisation) => organisation.uuid === organisationUuid);
  const canManage = membership?.claims.includes(teamClaim) ?? false;
  const membersQuery = useSignetQuery<{ items: TeamMember[] }>(
    ['members', clientId, organisationUuid],
    signet.listMembers({ client: clientId, organisationId: organisationUuid }),
    organisationUuid !== '' && canManage,
  );
  const rolesQuery = useSignetQuery<{ items: RoleItem[] }>(
    ['roles', clientId, organisationUuid],
    signet.listRoles({ client: clientId, organisationId: organisationUuid }),
    organisationUuid !== '' && canManage,
  );
  const mutate = useSignetMutation();
  const queryClient = useQueryClient();
  const refresh = () => queryClient.invalidateQueries({ queryKey: ['signet', 'members', clientId, organisationUuid] });

  return {
    canManage,
    invite: (email: string, role: string) =>
      mutate(signet.addMember({ client: clientId, email: email.trim(), organisationId: organisationUuid, role })).then(refresh),
    members: membersQuery.data?.items ?? [],
    pending: membersQuery.isPending,
    remove: (userUuid: string) =>
      mutate(signet.removeMember({ client: clientId, organisationId: organisationUuid, userUuid })).then(refresh),
    roleOptions: (rolesQuery.data?.items ?? []).map((item) => ({ label: roleLabel(item.name), value: item.name })),
    updateRole: (userUuid: string, role: string) =>
      mutate(signet.updateMember({ client: clientId, organisationId: organisationUuid, role, userUuid })).then(refresh),
  };
};
