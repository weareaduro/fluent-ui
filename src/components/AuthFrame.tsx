import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import type { ReactElement, ReactNode } from 'react';
import { AduroEmblem } from './AduroEmblem';
import { ProductLockup, sidebarLabelClassName } from './ProductLockup';

export const AuthFrame = ({
  children,
  emphasizeProduct = true,
  footer,
  onBack,
  productName,
}: {
  children: ReactNode;
  emphasizeProduct?: boolean | undefined;
  footer?: ReactNode | undefined;
  /** Accepted so existing apps can keep passing a wordmark. The emblem is the mark. */
  logoSrc?: string | undefined;
  onBack?: (() => void) | undefined;
  productName: string;
}): ReactElement => (
  <div className="flex min-h-dvh w-full flex-col">
    <div className="mx-auto flex min-h-dvh w-full max-w-[26.25rem] flex-col justify-between gap-10 px-5 py-10">
      <div className="flex flex-col gap-10">
        <div className="flex min-h-12 items-center">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Back"
              className="cursor-pointer rounded-xs p-2 text-white hover:bg-grey-800t"
            >
              <ArrowLeftIcon className="size-6" />
            </button>
          ) : null}
        </div>
        <span className="inline-flex flex-col items-center">
          <AduroEmblem className="h-12 w-auto" />
          <ProductLockup
            className={`mt-3 ${sidebarLabelClassName}`}
            emphasizeProduct={emphasizeProduct}
            productName={productName}
          />
        </span>
        {children}
      </div>
      {footer ? <div className="flex flex-col gap-5">{footer}</div> : null}
    </div>
  </div>
);

export const AuthTitle = ({
  subtitle,
  title,
}: {
  subtitle?: string;
  title: string;
}): ReactElement => (
  <div className="w-full text-center">
    <h1 className="font-grotesque text-[2.25rem] font-semibold leading-[1.22] text-white">
      {title}
    </h1>
    {subtitle ? <p className="mt-4 text-base leading-6 text-low">{subtitle}</p> : null}
  </div>
);
