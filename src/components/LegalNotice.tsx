import type { ReactElement, ReactNode } from 'react';

const links = [
  { href: 'https://aduro.io/privacy', label: 'Privacy Policy' },
  { href: 'https://aduro.io/terms', label: 'Terms and Conditions' },
];

const separator = (index: number, count: number): string => {
  if (index === 0) return '';

  if (index === count - 1) return ' and ';

  return ', ';
};

export const LegalNotice = ({ productName }: { productName: string }): ReactElement => {
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
