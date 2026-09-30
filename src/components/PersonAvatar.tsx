import { useEffect, useState, type ReactElement } from 'react';

const sizeClassName = {
  small: 'size-7 text-[11px]',
  medium: 'size-8 text-xs',
};

const initials = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || 'A';

const gravatarUrl = async (email: string): Promise<string | null> => {
  const trimmed = email.trim().toLowerCase();

  if (trimmed === '') return null;

  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(trimmed));
  const hash = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');

  return `https://www.gravatar.com/avatar/${hash}?s=128&d=404`;
};

/** Brand-coloured initials, replaced by the Gravatar for `email` when one exists. */
export const PersonAvatar = ({
  email,
  name,
  size = 'medium',
}: {
  email?: string | undefined;
  name: string;
  size?: keyof typeof sizeClassName;
}): ReactElement => {
  const [src, setSrc] = useState<string | null>(null);
  const [shown, setShown] = useState(false);
  const box = sizeClassName[size];

  useEffect(() => {
    let cancelled = false;

    setShown(false);

    void gravatarUrl(email ?? '').then((next) => {
      if (!cancelled) setSrc(next);
    });

    return () => {
      cancelled = true;
    };
  }, [email]);

  return (
    <span className={`relative inline-flex shrink-0 ${box}`}>
      <span className="flex size-full items-center justify-center rounded-full border border-orange-100/40 bg-orange-100 font-bold text-white">
        {initials(name)}
      </span>
      {src ? (
        <img
          src={src}
          alt=""
          className={`absolute inset-0 size-full rounded-full border border-orange-100/40 object-cover ${shown ? '' : 'invisible'}`}
          onLoad={() => setShown(true)}
          onError={() => setSrc(null)}
        />
      ) : null}
    </span>
  );
};
