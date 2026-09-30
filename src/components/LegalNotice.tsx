import { Link } from '@tanstack/react-router';
import type { ReactElement, ReactNode } from 'react';

const separator = (index: number, count: number): string => {
  if (index === 0) return '';

  if (index === count - 1) return ' and ';

  return ', ';
};

const links = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms and Conditions', to: '/terms' },
] as const;

/** Sign-in acknowledgement. The pages live on this product at `/privacy` and `/terms`. */
export const LegalNotice = ({ productName }: { productName: string }): ReactElement => {
  const names: ReactNode[] = links.map((link, index) => (
    <span key={link.to}>
      {separator(index, links.length)}
      <Link to={link.to} className="text-orange-100 underline hover:brightness-125">
        {link.label}
      </Link>
    </span>
  ));

  return (
    <p className="text-center font-open text-sm text-low-priority">
      By continuing, you acknowledge {productName}&apos;s {names}.
    </p>
  );
};
