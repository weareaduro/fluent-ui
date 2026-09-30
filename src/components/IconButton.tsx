import { MouseEvent, ReactElement, ReactNode } from 'react';
import { Tooltip } from 'react-tooltip';

const sizeMap = {
  xs: 8,
  small: 9,
  medium: 11,
  large: 14,
};

const typeMap = {
  primary: 'bg-primary-400 hover:bg-primary-300 active:enabled:shadow-focused',
  secondary: 'bg-grey-200 hover:bg-grey-100 active:enabled:shadow-focused-dark',
  subtle: 'hover:bg-primary-t-1000 active:enabled:shadow-focused-dark',
  delete: 'hover:bg-red-t-1000 active:enabled:shadow-focused-dark',
  tertiary:
    'border border-grey-t-600 border-inset hover:bg-grey-t-800 active:enabled:shadow-focused-dark',
  basic:
    'hover:bg-grey-t-900 active:enabled:shadow-focused-dark [&[data-active]:not([data-active="false"])]:bg-grey-t-900',
  light: 'bg-grey-t-900 hover:bg-grey-t-800 active:enabled:shadow-focused-dark',
};

const typeMapDisabled = {
  primary: 'disabled:bg-background-disabled',
  secondary: 'disabled:bg-background-disabled',
  subtle: '',
  delete: '',
  tertiary: '',
  basic: '',
  light: 'disabled:bg-background-disabled',
};

const strokeTypeMap = {
  primary: 'stroke-text-filled-component',
  secondary: 'stroke-text-filled-component',
  subtle: 'stroke-primary-400',
  delete: 'stroke-red-400',
  tertiary: 'stroke-white',
  basic: 'stroke-white',
  light: 'stroke-white',
};

const iconSizeMap = {
  large: 'size-5',
  medium: 'size-[18px]',
  small: 'size-4',
  xs: 'size-4',
};

export type IconButtonSizeMap = keyof typeof sizeMap;

export type IconButtonTypeMap = keyof typeof typeMap;

interface Props {
  children?: ReactNode | undefined;
  Icon: HeroIconType;
  onClick?: ((e: MouseEvent<HTMLButtonElement>) => void) | undefined;
  size?: IconButtonSizeMap | undefined;
  type?: IconButtonTypeMap | undefined;
  disabled?: boolean | undefined;
  tooltip?: string | undefined;
  tooltipId?: string | undefined;
  active?: boolean | undefined;
  iconClassName?: string | undefined;
  className?: string | undefined;
  isSubmit?: boolean | undefined;
  id?: string | undefined;
  'aria-label'?: string | undefined;
}

export const getIconButtonStyles = ({
  type,
  size,
  disabled,
  additionalClassnames,
}: {
  disabled: NonNullable<Props['disabled']>;
  size: NonNullable<Props['size']>;
  type: NonNullable<Props['type']>; 
  additionalClassnames?: string | undefined;
}) => ({
  className: `disabled:border-none disabled:text-disabled-text relative rounded-xs group outline-none focus-visible:shadow-focused cursor-pointer disabled:cursor-not-allowed ${
    !disabled ? typeMap[type] : typeMapDisabled[type]
  } ${additionalClassnames}`,
  style: {
    padding: `${sizeMap[size] - (type === 'tertiary' ? 1 : 0)}px`,
  },
});

export const IconButtonIcon = ({
  Icon,
  size,
  type,
  iconClassName,
}: {
  Icon: NonNullable<Props['Icon']>;
  size: NonNullable<Props['size']>;
  type: NonNullable<Props['type']>; 
  iconClassName?: string | undefined;
}) => (
  <Icon
    className={`${iconSizeMap[size]} ${strokeTypeMap[type]} group-disabled:stroke-text-disabled ${iconClassName}`}
  />
);

export const IconButton = ({
  Icon,
  children,
  onClick,
  size = 'medium',
  type = 'basic',
  disabled,
  tooltip,
  tooltipId,
  active,
  iconClassName,
  className,
  isSubmit,
  id,
  'aria-label': ariaLabel,
}: Props): ReactElement => {
  const ttId = tooltipId ?? tooltip?.replace(/ /g, '-').toLowerCase();
  // Use explicit aria-label, fallback to tooltip text for icon-only buttons
  const resolvedAriaLabel = ariaLabel ?? tooltip;

  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      data-active={active}
      data-tooltip-place="bottom"
      {...(ttId ? { 'data-tooltip-id': ttId } : {})}
      {...(tooltip ? { 'data-tooltip-content': tooltip } : {})}
      data-tooltip-delay-show={350}
      onClick={onClick}
      disabled={disabled}
      id={id}
      aria-label={resolvedAriaLabel}
      {...getIconButtonStyles({
        type,
        size,
        disabled: !!disabled,
        additionalClassnames: className,
      })}
    >
      <IconButtonIcon
        Icon={Icon}
        iconClassName={iconClassName ?? ''}
        type={type}
        size={size}
      />
      {children}
      {ttId && (
        <Tooltip
          openEvents={{ mouseover: true }}
          closeEvents={{ click: true, mouseleave: true, blur: true }}
          className="z-20"
          id={ttId}
        />
      )}
    </button>
  );
};
