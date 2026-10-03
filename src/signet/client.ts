export class SignetError extends Error {
  constructor(readonly status: number) {
    super('request_failed');
  }
}

export const signetJson = async <T>(
  endpoint: string,
  token: string,
  path: string,
  init?: RequestInit,
): Promise<T> => {
  const headers = new Headers(init?.headers);

  headers.set('accept', 'application/json');
  headers.set('authorization', `Bearer ${token}`);

  if (init?.body != null && !headers.has('content-type')) {
    headers.set('content-type', 'application/json');
  }

  const response = await fetch(`${endpoint.replace(/\/$/, '')}${path}`, { ...init, credentials: 'include', headers });

  if (!response.ok) throw new SignetError(response.status);

  if (response.status === 204) return undefined as T;

  return (await response.json()) as T;
};
