import type { ReactElement } from 'react';

/** Product wordmark. The product name uses the primary colour. "by Aduro" stays grey. */
export const ProductLockup = ({
  className = 'text-[10px] font-bold uppercase tracking-[0.12em] text-subtle/50',
  emphasizeProduct = true,
  productName,
}: {
  className?: string;
  emphasizeProduct?: boolean;
  productName: string;
}): ReactElement => (
  <span className={className}>
    {emphasizeProduct ? (
      <span className="inline-block bg-primary-main bg-clip-text text-transparent [-webkit-text-fill-color:transparent]">
        {productName}
      </span>
    ) : (
      productName
    )}
    {' by Aduro'}
  </span>
);
