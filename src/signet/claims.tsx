import { BuildingOffice2Icon, CreditCardIcon, KeyIcon, PuzzlePieceIcon, ShieldCheckIcon, TicketIcon, UsersIcon } from '@heroicons/react/24/outline';
import type { ReactNode } from 'react';

export const MANAGE_CLAIM = 'signet.tenant';
export const MANAGE_ORGANISATIONS_CLAIM = 'signet.tenant.organisations';

export const managesOrganisations = (clientId: string, claims: readonly string[]): boolean =>
  clientId === 'signet' ? claims.includes('signet.tenant') : claims.includes(`${clientId}.manage-organisations`);
export const MANAGE_ORGANISATION_CLAIM = 'signet.organisation.manage';
export const MANAGE_TEAM_CLAIM = 'signet.organisation.team';
export const MANAGE_ORGANISATION_USERS_CLAIM = 'signet.organisation.users';

const signetOrganisationAction = {
  'manage-organisation': 'manage',
  'manage-team': 'team',
  'manage-users': 'users',
} as const;

/** `{client}.organisation.manage-team`, or the shorter Signet names. */
export const organisationClaimName = (
  clientId: string,
  action: 'manage-organisation' | 'manage-team' | 'manage-users',
): string =>
  `${clientId}.organisation.${clientId === 'signet' ? signetOrganisationAction[action] : action}`;

export type NavItem = {
  icon: ReactNode;
  label: string;
  to: string;
};

/** Team and Organisation links for the current membership. */
export const signetAdministrationItems = ({
  clientId = 'signet',
  membershipClaims,
}: {
  clientId?: string;
  membershipClaims: readonly string[];
}): NavItem[] => {
  return [
    ...(membershipClaims.includes(`${clientId}.organisation.billing`)
      ? [{ icon: <CreditCardIcon className="size-5 shrink-0" />, label: 'Billing', to: '/billing' }]
      : []),
    ...(membershipClaims.includes(organisationClaimName(clientId, 'manage-team'))
      ? [{ icon: <UsersIcon className="size-5 shrink-0" />, label: 'Team', to: '/team' }]
      : []),
    ...(membershipClaims.includes(organisationClaimName(clientId, 'manage-organisation'))
      ? [
          {
            icon: <BuildingOffice2Icon className="size-5 shrink-0" />,
            label: 'Organisation',
            to: '/organisation',
          },
        ]
      : []),
  ];
};

/** Billing and Tenant, shown under Administration when no organisation is selected. */
export const signetTenantAdministrationItems = ({
  claims,
  clientId = 'signet',
  organisationSelected,
}: {
  claims: readonly string[];
  clientId?: string;
  organisationSelected: boolean;
}): NavItem[] => {
  if (clientId !== 'signet' || organisationSelected) return [];

  return [
    ...(claims.includes('signet.tenant.users')
      ? [{ icon: <UsersIcon className="size-5 shrink-0" />, label: 'Team', to: '/team' }]
      : []),
    ...(claims.includes('signet.tenant.billing')
      ? [
          { icon: <CreditCardIcon className="size-5 shrink-0" />, label: 'Billing', to: '/billing' },
          { icon: <BuildingOffice2Icon className="size-5 shrink-0" />, label: 'Tenant', to: '/tenant' },
        ]
      : []),
  ];
};

/** Platform catalogue. Shown in the Signet sidenav when no organisation is selected. */
export const signetPlatformItems = ({
  claims,
  clientId = 'signet',
  organisationSelected,
}: {
  claims: readonly string[];
  clientId?: string;
  organisationSelected: boolean;
}): NavItem[] => {
  if (clientId !== 'signet' || organisationSelected) return [];

  return (
    [
      { claim: 'signet.tenant.users', icon: <UsersIcon className="size-5 shrink-0" />, label: 'Users', to: '/users' },
      { claim: 'signet.tenant.roles', icon: <ShieldCheckIcon className="size-5 shrink-0" />, label: 'Roles', to: '/roles' },
      {
        claim: 'signet.tenant.organisations',
        icon: <BuildingOffice2Icon className="size-5 shrink-0" />,
        label: 'Organisations',
        to: '/organisations',
      },
      { claim: 'signet.tenant.claims', icon: <TicketIcon className="size-5 shrink-0" />, label: 'Claims', to: '/claims' },
      { claim: 'signet.tenant.clients', icon: <KeyIcon className="size-5 shrink-0" />, label: 'Clients', to: '/clients' },
      { claim: 'signet.tenant.integrations', icon: <PuzzlePieceIcon className="size-5 shrink-0" />, label: 'Integrations', to: '/integrations' },
    ] as const
  )
    .filter((item) => claims.includes(item.claim))
    .map(({ icon, label, to }) => ({ icon, label, to }));
};

export const roleLabel = (role: string | undefined): string => {
  const value = role?.trim() ?? '';

  if (value === '') return '';

  if (value === 'tenant-manager' || value === 'super-admin') return 'Tenant Manager';

  return value.charAt(0).toUpperCase() + value.slice(1);
};

/** Membership role for the selected organisation. The platform role is only used when none is selected. */
export const displayRole = (membershipRole: string | undefined, userRole: string | undefined): string =>
  roleLabel(membershipRole || userRole);
