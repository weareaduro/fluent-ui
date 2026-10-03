import type { AuthMeta } from '../authMetaEnv';

const TOKEN_KEY = 'signet.access_token';
const VERIFIER_KEY = 'signet.pkce_verifier';
const STATE_KEY = 'signet.oauth_state';

let current: AuthMeta | undefined;

export const bindSignetAuth = (meta: AuthMeta): void => {
  current = meta;
};

const auth = (): AuthMeta => {
  if (!current) throw new Error('Signet auth is not configured');

  return current;
};

const readCookie = (name: string): string | null => {
  const prefix = `${name}=`;
  const match = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));

  if (!match) return null;

  return decodeURIComponent(match.slice(prefix.length));
};

const base64Url = (bytes: Uint8Array): string => {
  let binary = '';

  for (const value of bytes) binary += String.fromCharCode(value);

  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
};

const randomToken = (): string => base64Url(crypto.getRandomValues(new Uint8Array(32)));

const challengeFor = async (verifier: string): Promise<string> => {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));

  return base64Url(new Uint8Array(digest));
};

export const signetIssuer = (): string => (auth().signetEndpoint || window.location.origin).replace(/\/$/, '');

const signetClientId = (): string => auth().signetClientId ?? '';

export const signetAccessToken = (): string | null =>
  readCookie(auth().signetAccessCookie) ?? sessionStorage.getItem(TOKEN_KEY);

export const clearSignetSession = (): void => {
  const cookie = auth().signetAccessCookie;

  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(VERIFIER_KEY);
  sessionStorage.removeItem(STATE_KEY);
  document.cookie = `${cookie}=; Path=/; Max-Age=0; Secure; SameSite=Lax`;
  document.cookie = `${cookie}=; Path=/; Max-Age=0; Domain=.aduro.io; Secure; SameSite=Lax`;
};

const redirectUri = (): string => `${window.location.origin}/login`;

export const signInWithSignetPassword = async (email: string, password: string): Promise<void> => {
  const response = await fetch(`${signetIssuer()}/oauth/token`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: signetClientId(),
      grant_type: 'password',
      password,
      username: email,
    }),
  });
  const payload = (await response.json()) as { access_token?: string; error?: string };

  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error ?? 'Sign-in failed');
  }

  sessionStorage.setItem(TOKEN_KEY, payload.access_token);
  window.location.assign('/');
};

export const startSignetLogin = async (hint: string): Promise<void> => {
  const verifier = randomToken();
  const state = randomToken();
  const nonce = randomToken();

  sessionStorage.setItem(VERIFIER_KEY, verifier);
  sessionStorage.setItem(STATE_KEY, state);

  const url = new URL(`${signetIssuer()}/authorize`);

  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', signetClientId());
  url.searchParams.set('redirect_uri', redirectUri());
  url.searchParams.set('scope', 'openid email profile');
  url.searchParams.set('state', state);
  url.searchParams.set('nonce', nonce);
  url.searchParams.set('code_challenge', await challengeFor(verifier));
  url.searchParams.set('code_challenge_method', 'S256');
  url.searchParams.set('idp_hint', hint);
  window.location.assign(url.toString());
};

export const completeSignetLogin = async (): Promise<boolean> => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const state = params.get('state');

  if (!code || !state) return false;

  const expected = sessionStorage.getItem(STATE_KEY);
  const verifier = sessionStorage.getItem(VERIFIER_KEY);

  if (!verifier || state !== expected) {
    clearSignetSession();

    throw new Error('Sign-in state did not match.');
  }

  const response = await fetch(`${signetIssuer()}/oauth/token`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: signetClientId(),
      code,
      code_verifier: verifier,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri(),
    }),
  });
  const payload = (await response.json()) as { access_token?: string; error?: string };

  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error ?? 'Sign-in failed');
  }

  sessionStorage.setItem(TOKEN_KEY, payload.access_token);
  sessionStorage.removeItem(VERIFIER_KEY);
  sessionStorage.removeItem(STATE_KEY);
  window.history.replaceState({}, '', '/');

  return true;
};
