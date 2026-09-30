/**
 * Frontend login config shared by products that sign in through Signet.
 * Providers, including email, come from `GET {PUBLIC_SIGNET_ENDPOINT}/oauth/providers`.
 */
export type AuthMetaEnv = {
  readonly PUBLIC_SIGNET_CLIENT_ID?: string;
  readonly PUBLIC_SIGNET_ENDPOINT?: string;
};
