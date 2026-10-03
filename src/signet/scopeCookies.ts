const YEAR = 60 * 60 * 24 * 365;

const parentDomain = (): string | undefined => {
  const host = window.location.hostname;

  if (host === 'localhost' || host.endsWith('.localhost') || /^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    return undefined;
  }

  const parts = host.split('.').filter((part) => part !== '');

  if (parts.length < 3) return undefined;

  return `.${parts.slice(-2).join('.')}`;
};

/** Cookie name for one product, so Blaze, Ensemble, Ascend, and Signet do not share a selection. */
export const scopeCookieName = (clientId: string, scope: 'organisation' | 'project'): string =>
  `${clientId}-${scope}`;

export const readScopeCookie = (name: string): string => {
  const prefix = `${name}=`;
  const match = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));

  if (!match) return '';

  try {
    return decodeURIComponent(match.slice(prefix.length));
  } catch {
    return '';
  }
};

export const writeScopeCookie = (name: string, value: string): void => {
  const domain = parentDomain();
  const domainAttribute = domain ? `; Domain=${domain}` : '';
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  const stored = value ? encodeURIComponent(value) : '';
  const maxAge = value ? YEAR : 0;

  document.cookie = `${name}=${stored}; Path=/; Max-Age=${maxAge}; SameSite=Lax${domainAttribute}${secure}`;
};
