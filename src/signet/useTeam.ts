import { useQueryClient } from '@tanstack/react-query';
import { roleLabel } from './claims';
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

const withClient = (path: string, clientId: string, organisationUuid?: string): string => {
  const url = new URL(path, 'https://signet.local');

  url.searchParams.set('client', clientId);

  if (organisationUuid) url.searchParams.set('organisation', organisationUuid);

  return `${url.pathname}${url.search}`;
};

export const useTeam = () => {
  const { clientId, teamClaim } = useFluentConfig();
  const { organisationUuid, user } = useDirectory();
  const membership = user.organisations.find((organisation) => organisation.uuid === organisationUuid);
  const canManage = membership?.claims.includes(teamClaim) ?? false;
  const membersPath = withClient(`/api/resources/organisations/${organisationUuid}/members`, clientId);
  const membersQuery = useSignetQuery<{ items: TeamMember[] }>(
    ['members', clientId, organisationUuid],
    membersPath,
    organisationUuid !== '' && canManage,
  );
  const rolesQuery = useSignetQuery<{ items: RoleItem[] }>(
    ['roles', clientId, organisationUuid],
    withClient('/api/resources/roles', clientId, organisationUuid),
    organisationUuid !== '' && canManage,
  );
  const mutate = useSignetMutation();
  const queryClient = useQueryClient();
  const refresh = () => queryClient.invalidateQueries({ queryKey: ['signet', 'members', clientId, organisationUuid] });

  return {
    canManage,
    invite: (email: string, role: string) =>
      mutate(membersPath, {
        body: JSON.stringify({ client: clientId, email: email.trim(), role }),
        method: 'POST',
      }).then(refresh),
    members: membersQuery.data?.items ?? [],
    pending: membersQuery.isPending,
    remove: (userUuid: string) =>
      mutate(withClient(`/api/resources/organisations/${organisationUuid}/members/${userUuid}`, clientId), {
        method: 'DELETE',
      }).then(refresh),
    roleOptions: (rolesQuery.data?.items ?? []).map((item) => ({ label: roleLabel(item.name), value: item.name })),
    updateRole: (userUuid: string, role: string) =>
      mutate(withClient(`/api/resources/organisations/${organisationUuid}/members/${userUuid}`, clientId), {
        body: JSON.stringify({ client: clientId, role }),
        method: 'PATCH',
      }).then(refresh),
  };
};
