import type { ReactElement } from 'react';

/** Product wordmark. The product name uses the primary colour. "by Aduro" stays grey. */
export const ProductLockup = ({
  className = 'font-grotesque text-sm font-semibold leading-6 text-grey-500',
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
