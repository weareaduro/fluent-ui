/**
 * Frontend config shared by every product that signs in through Signet.
 * Providers, including email, come from `GET {PUBLIC_SIGNET_ENDPOINT}/oauth/providers`.
 */
export type AuthMetaEnv = {
  readonly PUBLIC_ALLOW_REGISTRATION?: string;
  readonly PUBLIC_SIGNET_ACCESS_COOKIE?: string;
  readonly PUBLIC_SIGNET_CLIENT_ID?: string;
  readonly PUBLIC_SIGNET_ENDPOINT?: string;
};

export type AuthMeta = {
  allowRegistration: boolean;
  signetAccessCookie: string;
  signetClientId: string | undefined;
  signetEndpoint: string | undefined;
};

const present = (value: string | undefined): string | undefined => {
  const trimmed = value?.trim() ?? '';

  return trimmed === '' ? undefined : trimmed;
};

export const readAuthMeta = (env: AuthMetaEnv): AuthMeta => {
  const registration = present(env.PUBLIC_ALLOW_REGISTRATION);

  return {
    allowRegistration: registration !== 'false' && registration !== '0',
    signetAccessCookie: present(env.PUBLIC_SIGNET_ACCESS_COOKIE) ?? 'signet-access',
    signetClientId: present(env.PUBLIC_SIGNET_CLIENT_ID),
    signetEndpoint: present(env.PUBLIC_SIGNET_ENDPOINT),
  };
};
