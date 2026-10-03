import { useQuery, useSuspenseQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { FullLoader } from '../components/Loader';
import { NotificationsProvider, type NotificationGroup } from '../components/Notifications';
import { managesOrganisations, organisationClaimName } from './claims';
import { signet, signetJson, type SignetOperation } from './client';
import { readScopeCookie, scopeCookieName, writeScopeCookie } from './scopeCookies';

const SHARED_ORGANISATION_COOKIE = 'signet-current-organisation';

const readOrganisationCookie = (clientId: string, legacyKey: string): string => {
  const name = scopeCookieName(clientId, 'organisation');
  const current = readScopeCookie(name);

  if (current) return current;

  const legacy = legacyKey !== name && legacyKey !== SHARED_ORGANISATION_COOKIE ? legacyKey : '';
  const migrated =
    localStorage.getItem(name) ||
    (legacy ? readScopeCookie(legacy) || localStorage.getItem(legacy) : '') ||
    readScopeCookie(SHARED_ORGANISATION_COOKIE) ||
    localStorage.getItem(SHARED_ORGANISATION_COOKIE) ||
    '';

  if (migrated) writeScopeCookie(name, migrated);

  return migrated;
};

export type DirectoryConnection = {
  identifier: string;
  method: string;
};

export type DirectoryOrganisation = {
  claims: string[];
  name: string;
  role: string;
  uuid: string;
  website: string | null;
};

export type DirectoryUser = {
  claims: string[];
  connections: DirectoryConnection[];
  email: string;
  family_name?: string;
  given_name?: string;
  name?: string;
  organisations: DirectoryOrganisation[];
  role: string;
};

type UserinfoBody = {
  claims?: string[];
  connections?: DirectoryConnection[];
  email?: string;
  family_name?: string;
  given_name?: string;
  name?: string;
  organisations?: Array<{
    claims?: string[];
    name?: string;
    role?: string;
    uuid?: string;
    website?: string | null;
  }>;
  role?: string;
};

export type DirectoryState = {
  currentOrganisation: DirectoryOrganisation | undefined;
  organisationUuid: string;
  organisations: DirectoryOrganisation[];
  setOrganisationUuid: (uuid: string) => void;
  user: DirectoryUser;
};

type FluentConfig = {
  clientId: string;
  endpoint: string;
  onLogout: () => void;
  organisationClaim: string;
  teamClaim: string;
  token: () => string | null;
  usersClaim: string;
};

const FluentConfigContext = createContext<FluentConfig | null>(null);
const DirectoryContext = createContext<DirectoryState | null>(null);

const organisationFrom = (row: {
  claims?: string[];
  name?: string;
  role?: string;
  uuid?: string;
  website?: string | null;
}): DirectoryOrganisation | undefined => {
  if (!row.uuid || !row.name) return undefined;

  return {
    claims: row.claims ?? [],
    name: row.name,
    role: row.role ?? '',
    uuid: row.uuid,
    website: row.website ?? null,
  };
};

const loadDirectory = async (config: FluentConfig): Promise<{ organisations: DirectoryOrganisation[]; user: DirectoryUser }> => {
  const token = config.token();

  if (!token) throw new Error('request_failed');

  const body = await signetJson<UserinfoBody>(config.endpoint, token, signet.userinfo());
  const memberships = (body.organisations ?? [])
    .map((row) => organisationFrom(row))
    .filter((row): row is DirectoryOrganisation => row != null);
  const user: DirectoryUser = {
    claims: body.claims ?? [],
    connections: body.connections ?? [],
    email: body.email ?? '',
    ...(body.family_name ? { family_name: body.family_name } : {}),
    ...(body.given_name ? { given_name: body.given_name } : {}),
    ...(body.name ? { name: body.name } : {}),
    organisations: memberships,
    role: body.role ?? '',
  };

  return { organisations: memberships, user };
};

const DirectoryGate = ({
  children,
  config,
  legacyKey,
}: {
  children: ReactNode;
  config: FluentConfig;
  legacyKey: string;
}): ReactElement => {
  const directory = useSuspenseQuery({
    queryKey: ['signet', 'directory'],
    queryFn: () => loadDirectory(config),
  });
  const organisationCookie = scopeCookieName(config.clientId, 'organisation');
  const [organisationUuid, setStoredUuid] = useState(() => readOrganisationCookie(config.clientId, legacyKey));
  const organisations = directory.data.organisations;
  const canClearOrganisation = managesOrganisations(config.clientId, [
    ...directory.data.user.claims,
    ...directory.data.user.organisations.flatMap((organisation) => organisation.claims),
  ]);
  const selected = organisations.some((organisation) => organisation.uuid === organisationUuid)
    ? organisationUuid
    : canClearOrganisation && organisationUuid === ''
      ? ''
      : (organisations[0]?.uuid ?? '');
  const setOrganisationUuid = useCallback(
    (uuid: string) => {
      writeScopeCookie(organisationCookie, uuid);
      setStoredUuid(uuid);
    },
    [organisationCookie],
  );

  useEffect(() => {
    if (selected !== organisationUuid) setOrganisationUuid(selected);
  }, [organisationUuid, selected, setOrganisationUuid]);

  const currentOrganisation = organisations.find((organisation) => organisation.uuid === selected);
  const value = useMemo<DirectoryState>(
    () => ({
      currentOrganisation,
      organisationUuid: selected,
      organisations,
      setOrganisationUuid,
      user: directory.data.user,
    }),
    [currentOrganisation, directory.data.user, organisations, selected, setOrganisationUuid],
  );

  return <DirectoryContext.Provider value={value}>{children}</DirectoryContext.Provider>;
};

const noNotificationGroups: NotificationGroup[] = [];

export const FluentProvider = ({
  children,
  clientId = 'signet',
  getAccessToken,
  notificationGroups = noNotificationGroups,
  onLogout,
  organisationClaim,
  organisationStorageKey = 'signet-current-organisation',
  signetEndpoint,
  teamClaim,
}: {
  children: ReactNode;
  clientId?: string;
  getAccessToken: () => string | null;
  notificationGroups?: NotificationGroup[];
  onLogout: () => void;
  organisationClaim?: string;
  organisationStorageKey?: string;
  signetEndpoint: string;
  teamClaim?: string;
}): ReactElement => {
  const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 30_000 } } }));
  const tokenRef = useRef(getAccessToken);

  tokenRef.current = getAccessToken;

  const resolvedOrganisationClaim = organisationClaim ?? organisationClaimName(clientId, 'manage-organisation');
  const resolvedTeamClaim = teamClaim ?? organisationClaimName(clientId, 'manage-team');
  const config = useMemo<FluentConfig>(
    () => ({
      clientId,
      endpoint: signetEndpoint,
      onLogout,
      organisationClaim: resolvedOrganisationClaim,
      teamClaim: resolvedTeamClaim,
      token: () => tokenRef.current(),
      usersClaim: organisationClaimName(clientId, 'manage-users'),
    }),
    [clientId, onLogout, resolvedOrganisationClaim, resolvedTeamClaim, signetEndpoint],
  );

  return (
    <QueryClientProvider client={client}>
      <FluentConfigContext.Provider value={config}>
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center bg-primary">
              <FullLoader />
            </div>
          }
        >
          <DirectoryGate config={config} legacyKey={organisationStorageKey}>
            <NotificationsProvider groups={notificationGroups}>{children}</NotificationsProvider>
          </DirectoryGate>
        </Suspense>
      </FluentConfigContext.Provider>
    </QueryClientProvider>
  );
};

export const useFluentConfig = (): FluentConfig => {
  const config = useContext(FluentConfigContext);

  if (!config) throw new Error('FluentProvider is required');

  return config;
};

export const useDirectory = (): DirectoryState => {
  const directory = useContext(DirectoryContext);

  if (!directory) throw new Error('FluentProvider is required');

  return directory;
};

export const useSignetQuery = <T,>(key: readonly unknown[], request: SignetOperation, enabled = true) => {
  const config = useFluentConfig();

  return useQuery({
    enabled,
    queryKey: ['signet', ...key],
    queryFn: () => {
      const token = config.token();

      if (!token) throw new Error('request_failed');

      return signetJson<T>(config.endpoint, token, request);
    },
  });
};

export const useSignetMutation = () => {
  const config = useFluentConfig();

  return async <T,>(request: SignetOperation): Promise<T> => {
    const token = config.token();

    if (!token) throw new Error('request_failed');

    return signetJson<T>(config.endpoint, token, request);
  };
};
