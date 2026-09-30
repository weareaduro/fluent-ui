import { useEffect, useState, type ReactElement } from 'react';
import { organisationFaviconUrl } from '../organisationFavicon';

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

/** Brand initials, replaced by the organisation website favicon when it loads. */
export const OrganisationAvatar = ({
  name,
  size = 'small',
  website,
}: {
  name: string;
  size?: keyof typeof sizeClassName;
  website?: string | null | undefined;
}): ReactElement => {
  const src = organisationFaviconUrl(website);
  const [failed, setFailed] = useState(false);
  const [shown, setShown] = useState(false);
  const box = sizeClassName[size];

  useEffect(() => {
    setFailed(false);
    setShown(false);
  }, [src]);

  return (
    <span className={`relative inline-flex shrink-0 overflow-hidden rounded-full ${box}`}>
      {shown ? null : (
        <span className="flex size-full items-center justify-center rounded-full border border-orange-100/40 bg-orange-100 font-bold text-white">
          {initials(name)}
        </span>
      )}
      {src && !failed ? (
        <img
          src={src}
          alt=""
          className={`absolute inset-0 size-full object-cover ${shown ? '' : 'invisible'}`}
          onLoad={() => setShown(true)}
          onError={() => setFailed(true)}
        />
      ) : null}
    </span>
  );
};
