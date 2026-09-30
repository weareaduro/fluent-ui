/** Google favicon service. The image request is the URL Blaze already loads for organisation websites. */
export const organisationFaviconUrl = (
  website: string | null | undefined,
  size = 128,
): string | null => {
  const trimmed = website?.trim();

  if (!trimmed) return null;

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `http://${trimmed}`;

  try {
    const url = new URL(withProtocol);

    if (url.hostname === '') return null;

    const params = new URLSearchParams({
      client: 'SOCIAL',
      type: 'FAVICON',
      fallback_opts: 'TYPE,SIZE,URL',
      url: `${url.protocol}//${url.hostname}`,
      size: String(size),
    });

    return `https://t1.gstatic.com/faviconV2?${params.toString()}`;
  } catch {
    return null;
  }
};
