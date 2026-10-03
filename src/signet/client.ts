export class SignetError extends Error {
  constructor(readonly status: number) {
    super('request_failed');
  }
}

const tenantHeader = (): string | undefined => {
  if (typeof document === 'undefined') return undefined;

  const prefix = 'signet-current-tenant=';
  const match = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));

  return match ? decodeURIComponent(match.slice(prefix.length)) : undefined;
};

export const signetJson = async <T>(
  endpoint: string,
  token: string,
  path: string,
  init?: RequestInit,
): Promise<T> => {
  const headers = new Headers(init?.headers);

  headers.set('accept', 'application/json');
  headers.set('authorization', `Bearer ${token}`);

  const tenantId = tenantHeader();

  if (tenantId && !headers.has('x-signet-tenant')) headers.set('x-signet-tenant', tenantId);

  if (init?.body != null && !headers.has('content-type')) {
    headers.set('content-type', 'application/json');
  }

  const response = await fetch(`${endpoint.replace(/\/$/, '')}${path}`, { ...init, headers });

  if (!response.ok) throw new SignetError(response.status);

  if (response.status === 204) return undefined as T;

  return (await response.json()) as T;
};
