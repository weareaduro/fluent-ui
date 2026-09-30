import { Link, type LinkProps } from '@tanstack/react-router';
import classNames from 'classnames';
import {
  CSSProperties,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from 'react';
import { Loader } from './Loader';

const sizeMap = {
  xl: 16,
  large: 10,
  medium: 8,
  small: 8,
  /** 44px, matching the filter dropdowns it sits beside. */
  control: 0,
};

export const typeMap = {
  /** Brand call-to-action. Each product sets this colour in its theme. */
  primary: 'hover:brightness-110 bg-primary-main text-black/85 font-open',
  /** Filled grey. Not the brand gradient. */
  accent: 'hover:brightness-125 bg-grey-200 text-black/85 font-open',
  /** Figma modal Cancel — orange text, no fill. */
  ghost: 'hover:brightness-125 text-orange-100 font-open',
  secondary: 'hover:brightness-125 border border-grey-700t font-open',
  tertiary: 'hover:brightness-200 bg-grey-900t text-white font-open',

  icon: 'active:bg-grey-200 active:text-black/85 rounded-full transition-all flex items-center justify-center p-3.5 [disabled]:opacity-50 [disabled]:cursor-not-allowed outline-none',
  menu: 'inline-flex justify-center after:transition-all after:w-0 hover:after:w-4/5 after:h-px after:absolute after:-bottom-1.5 after:bg-orange-100 relative outline-none',

  basic: 'active:shadow-focused-dark bg-grey-900t hover:bg-grey-800t',
  simple: 'active:shadow-focused-dark hover:bg-grey-800t text-low',

  'low-priority':
    'active:shadow-focused-dark hover:bg-grey-900t border-solid! border border-grey-700t',

  delete: 'active:shadow-focused-dark border border-grey-700t text-red-400',
};

interface Props {
  button: ButtonProps;
  link?: LinkProps | undefined;
}

export type ButtonComponentPropsType = Props;

interface ButtonProps {
  onClick?:
    | MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
    | undefined;
  text: ReactNode;
  disabled?: boolean | undefined;
  IconStart?: HeroIconType | undefined;
  IconEnd?: HeroIconType | undefined;
  loading?: boolean | undefined;
  type?: keyof typeof typeMap | undefined;
  size?: keyof typeof sizeMap | undefined;
  isSubmit?: boolean | undefined;
  showActiveButton?: boolean | undefined;
  shrink?: boolean | undefined;
}

export const getButtonClassnames = ({
  type,
}: {
  type: NonNullable<ButtonProps['type']>;
}) =>
  `justify-center rounded-xs ${typeMap[type]} group-disabled:text-text-disabled group-disabled:bg-background-disabled flex outline-none group-focus-visible:shadow-focused group-active:shadow-focused-dark cursor-pointer transition items-center space-x-3 group-disabled:active:shadow-none group-disabled:border-background-disabled group-disabled:hover:bg-background-disabled`;

const getButtonTextSize = ({
  size,
}: {
  size: NonNullable<ButtonProps['size']>;
}) =>
  ({
    large: 'text-[0.9375rem] leading-6',
    xl: 'text-[17px] leading-6',
    small: 'text-sm',
    medium: 'text-base',
    control: 'text-[0.9375rem] leading-6',
  })[size];

const getButtonStyle = ({
  size,
  type,
}: {
  size: NonNullable<ButtonProps['size']>;
  type: NonNullable<ButtonProps['type']>;
}): CSSProperties => {
  if (type === 'ghost') {
    return {
      padding: '8px 0',
    };
  }

  if (size === 'control') {
    return { boxSizing: 'border-box', height: '44px', padding: '0 16px' };
  }

  if (size === 'large' && type !== 'low-priority' && type !== 'delete') {
    return { padding: '12px 20px' };
  }

  const paddingY =
    sizeMap[size] - (type === 'low-priority' || type === 'delete' ? 1 : 0);

  const paddingX = paddingY * 2;

  return {
    padding: `${paddingY}px ${paddingX}px`,
  };
};

export const getButtonStyles = ({
  size,
  type,
  additionalClassnames = '',
}: {
  size: NonNullable<ButtonProps['size']>;
  type: NonNullable<ButtonProps['type']>;
  additionalClassnames?: string;
}) => ({
  style: getButtonStyle({
    size,
    type,
  }),
  className: `${getButtonClassnames({
    type,
  })} font-bold whitespace-nowrap ${getButtonTextSize({
    size,
  })} ${additionalClassnames}`,
});

const ButtonInner = ({
  text,
  type = 'primary',
  size = 'medium',
  IconStart,
  IconEnd,
  showActiveButton,
  loading,
}: Omit<ButtonProps, 'disabled' | 'isSubmit' | 'onClick'>) => {
  const { style, className: cs } = getButtonStyles({ type, size });

  return (
    <div
      className={classNames(cs, {
        'group-data-[status=active]:bg-grey-t-800 group-data-[status=active]:text-black':
          showActiveButton,
      })}
      style={style}
    >
      {IconStart && <IconStart aria-hidden="true" className="size-5" />}
      <div className="flex items-center relative">
        {text}{' '}
        {loading && (
          <Loader
            fill="#ffffff4d"
            className="size-4 absolute -right-8"
            label="Loading"
          />
        )}
      </div>
      {IconEnd && <IconEnd aria-hidden="true" className="size-5" />}
    </div>
  );
};

const ButtonButton = ({
  disabled,
  onClick,
  isSubmit,
  shrink,
  loading,
  ...rest
}: ButtonProps) => (
  <button
    disabled={disabled}
    type={isSubmit ? 'submit' : 'button'}
    onClick={onClick}
    aria-busy={loading}
    className={classNames('group', {
      'w-full': !shrink,
      'w-fit': shrink,
    })}
  >
    <ButtonInner loading={loading} {...rest} />
  </button>
);

const DynamicLink = ({
  children,
  link,
  onClick,
  shrink,
}: {
  children: ReactNode;
  link: LinkProps;
  onClick?: Props['button']['onClick'] | undefined;
  shrink?: boolean | undefined;
}) =>
  link.href ? (
    <a
      onClick={onClick}
      href={link.href}
      rel="noreferrer noopener"
      target={link.target}
    >
      {children}
    </a>
  ) : (
    <Link
      className={classNames('group', shrink ? 'inline-block' : 'block')}
      onClick={onClick}
      {...link}
    >
      {children}
    </Link>
  );

export const Button = ({ button, link }: Props): ReactElement =>
  link && !button.disabled ? (
    <DynamicLink onClick={button.onClick} link={link} shrink={button.shrink}>
      <ButtonInner {...button} />
    </DynamicLink>
  ) : (
    <ButtonButton {...button} />
  );
