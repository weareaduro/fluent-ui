import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
  ReactElement,
  useState,
} from 'react';
import {
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { Loader } from './Loader';
import classNames from 'classnames';
import { Button, ButtonComponentPropsType } from './Button';
import { useFieldVariant } from './FieldVariantContext';

interface Props {
  label?: string | undefined;
  helperText?: string | undefined;
  value?: number | string | undefined;
  className?: string | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  type?: HTMLInputTypeAttribute | 'textarea' | undefined;
  required?: boolean | undefined;
  Icon?: HeroIconType | undefined;
  IconEnd?: HeroIconType | undefined;
  error?: boolean | string | undefined;
  max?: number | undefined;
  min?: number | undefined;
  inputClassname?: string | undefined;
  pattern?: string | undefined;
  loading?: boolean | undefined;
  disabled?: boolean | undefined;
  placeholder?: string | undefined;
  inlineButton?: ButtonComponentPropsType | undefined;
  name: string;
  autoComplete?: string | undefined;
  /** `outlined` is the modal field: visible 1px border on the input surface. */
  variant?: 'outlined' | 'plain' | undefined;
}

export const NumberInput = ({
  onChange,
  ...rest
}: Exclude<Props, 'pattern'>) => (
  <Input
    onChange={
      onChange
        ? (e) => {
            const matches = e.target.value.match(
              /^[0-9]*[\\.]{0,1}[0-9]{0,2}$/,
            );

            if (!!matches || e.target.value.length === 0) {
              onChange(e);
            }
          }
        : undefined
    }
    pattern="^[0-9]*[\.]{0,1}[0-9]{0,2}$"
    {...rest}
  />
);

export const styles = {
  /** Figma "Inputs/Input text": 2px radius, `bg-input` surface, 16px/24px Open Sans. */
  input:
    'w-full bg-input border rounded-xs text-white text-base leading-6 font-open focus-within:outline-none transition-colors',
  placeholder: 'placeholder:italic placeholder:text-grey-600',
  inputError: 'border-red-500',
  label: 'text-white text-sm font-semibold text-left',
};

export const Input = ({
  value,
  label,
  helperText,
  onChange,
  className = '',
  type = 'text',
  required = false,
  Icon,
  error,
  pattern,
  max,
  min,
  onBlur,
  inputClassname = '',
  placeholder,
  loading,
  disabled,
  IconEnd,
  inlineButton,
  name,
  autoComplete,
  variant,
}: Props): ReactElement => {
  const resolvedVariant = useFieldVariant(
    variant ?? (label ? 'outlined' : undefined),
  );

  const [inputType, setInputType] = useState(type);
  const errorId = error && typeof error === 'string' ? `${name}-error` : undefined;
  const helperTextId = helperText ? `${name}-helper` : undefined;
  const describedByIds = [helperTextId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`flex flex-col ${className}`}>
      {!!label && (
        <label
          htmlFor={name}
          className={`${helperText ? '' : 'mb-2'} ${
            resolvedVariant === 'outlined'
              ? 'text-left text-[15px] font-semibold leading-6 text-low-priority'
              : styles.label
          }`}
        >
          {label}
        </label>
      )}
      {!!helperText && (
        <span id={helperTextId} className="mb-2 mt-1 text-low text-sm">{helperText}</span>
      )}
      <div
        className={classNames(styles.input, {
          'border-transparent': resolvedVariant === 'plain' && !error,
          'border-grey-700t': resolvedVariant === 'outlined' && !error,
          'border-red-300': !!error,
          'text-text-disabled': disabled,
        })}
      >
        <div className="relative flex">
          {Icon ? (
            <div className="absolute top-1/2 transform -translate-y-1/2 ml-3">
              <Icon
                aria-hidden="true"
                className={classNames('size-5', {
                  'stroke-text-disabled': disabled,
                })}
              />
            </div>
          ) : (
            <></>
          )}
          {type !== 'textarea' ? (
            <input
              className={classNames(
                `w-full rounded-xs outline-none disabled:text-text-disabled py-2.5 leading-6 px-3 ${resolvedVariant === 'outlined' ? 'h-10' : 'h-11'} ${inputClassname}`,
                styles.placeholder,
                {
                  'pl-12': !!Icon,
                  'pr-12': !!IconEnd,
                },
              )}
              value={value}
              disabled={disabled}
              onChange={onChange}
              onBlur={onBlur}
              type={inputType}
              required={required}
              max={max}
              min={min}
              id={name}
              name={name}
              placeholder={placeholder}
              pattern={pattern}
              autoComplete={autoComplete}
              aria-invalid={!!error}
              aria-describedby={describedByIds}
            />
          ) : (
            <textarea
              className={`w-full rounded-xs outline-none disabled:text-text-disabled p-3 ${styles.placeholder} ${inputClassname}`}
              value={value}
              disabled={disabled}
              onChange={onChange}
              rows={4}
              required={required}
              onBlur={onBlur}
              id={name}
              maxLength={max}
              name={name}
              aria-invalid={!!error}
              aria-describedby={describedByIds}
            />
          )}
          {type === 'password' && (
            <button
              type="button"
              aria-label={inputType === 'password' ? 'Show password' : 'Hide password'}
              aria-controls={name}
              onPointerDown={(e) => e.preventDefault()}
              onClick={() =>
                inputType === 'password'
                  ? setInputType('text')
                  : setInputType('password')
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {inputType === 'password' ? (
                <EyeIcon aria-hidden="true" className="size-5" />
              ) : (
                <EyeSlashIcon aria-hidden="true" className="size-5" />
              )}
            </button>
          )}

          {inlineButton && <Button {...inlineButton} />}

          {loading && (
            <Loader className="size-5 absolute top-1/2 right-4 -translate-y-1/2" />
          )}
          {IconEnd ? (
            <div className="absolute top-1/2 transform right-0 -translate-y-1/2 mr-3">
              <IconEnd
                className={classNames('size-5', {
                  'stroke-text-disabled': disabled,
                })}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {error && typeof error === 'string' && (
        <div id={errorId} role="alert" className="flex space-x-1.5 items-start mt-2">
          <InformationCircleIcon aria-hidden="true" className="shrink-0 size-4 text-red-300 mt-[3px]" />
          <span className="text-body-smallest text-red-300">{error}</span>
        </div>
      )}
      {type === 'textarea' && max && (
        <div className="flex mt-2 items-center justify-end">
          <span className="text-low-priority">
            {(value ? String(value) : '').length}/{max} characters
          </span>
        </div>
      )}
    </div>
  );
};
