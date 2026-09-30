import type { ReactElement, ReactNode } from 'react';

const defaultLinks = {
  privacyUrl: 'https://aduro.io/privacy',
  termsUrl: 'https://aduro.io/terms',
};

const separator = (index: number, count: number): string => {
  if (index === 0) return '';

  if (index === count - 1) return ' and ';

  return ', ';
};

export const LegalNotice = ({
  productName,
  privacyUrl = defaultLinks.privacyUrl,
  termsUrl = defaultLinks.termsUrl,
}: {
  productName: string;
  privacyUrl?: string | undefined;
  termsUrl?: string | undefined;
}): ReactElement => {
  const links = [
    { href: privacyUrl, label: 'Privacy Policy' },
    { href: termsUrl, label: 'Terms and Conditions' },
  ];
  const names: ReactNode[] = links.map((link, index) => (
    <span key={link.href}>
      {separator(index, links.length)}
      <a
        href={link.href}
        target="_blank"
        rel="noreferrer noopener"
        className="text-orange-100 underline hover:brightness-125"
      >
        {link.label}
      </a>
    </span>
  ));

  return (
    <p className="text-center font-open text-sm text-low-priority">
      By continuing, you acknowledge {productName}&apos;s {names}.
    </p>
  );
};
