import type { ReactElement } from 'react';

/** Sidebar "Administration" and "Product by Aduro": 14px / 20px, capitalized. */
export const sidebarLabelClassName =
  'font-grotesque text-sm font-semibold leading-5 text-grey-500 capitalize';

/** Product wordmark. The product name uses the primary colour. "by Aduro" stays grey. */
export const ProductLockup = ({
  className = sidebarLabelClassName,
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
