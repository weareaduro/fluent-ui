import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import {
  ChevronDownIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { type ReactElement } from 'react';
import { useFieldVariant } from './FieldVariantContext';

export type SelectOption<T = string> = { value: T; label: string };

interface SelectProps<T extends string> {
  options: Array<SelectOption<T>>;
  value: T | '';
  onChange: (value: T) => void;
  label?: string | undefined;
  helperText?: string | undefined;
  placeholder?: string | undefined;
  disabled?: boolean | undefined;
  error?: string | undefined;
  name?: string | undefined;
  className?: string | undefined;
  /** Optional width constraint e.g. w-44, w-56 */
  widthClass?: string | undefined;
  /** default h-11, small for inline/pagination h-9 */
  size?: 'default' | 'small' | undefined;
  /** Leading icon inside the trigger (filter-bar style). */
  Icon?: HeroIconType | undefined;
  /** `outlined` is the modal field: visible 1px border. */
  variant?: 'outlined' | 'plain' | undefined;
}

/** Figma dropdown: 2px radius, `bg-input` surface, `low-priority` text. */
export const dropdownTriggerStyles =
  'w-full bg-secondary border rounded-xs focus-within:outline-none transition-colors';

export const dropdownPanelStyles =
  'z-50 mt-1 max-h-72 w-[var(--button-width)] origin-top overflow-y-auto rounded-xs border border-transparent bg-secondary p-1 outline-none transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0';

export const dropdownOptionStyles =
  'w-full cursor-pointer rounded-xs px-3 py-2.5 text-left text-sm text-white hover:bg-grey/20 data-[focus]:bg-grey/20';

export function Select<T extends string>({
  options,
  value,
  onChange,
  label,
  helperText,
  placeholder = '-- Select --',
  disabled,
  error,
  name,
  className = '',
  widthClass,
  size = 'default',
  Icon,
  variant,
}: SelectProps<T>): ReactElement {
  const resolvedVariant = useFieldVariant(
    variant ?? (label ? 'outlined' : undefined),
  );

  const outlined = resolvedVariant === 'outlined';
  const selectedOption = options.find((o) => o.value === value);
  const display = selectedOption ? selectedOption.label : placeholder;
  const heightClass =
    size === 'small' ? 'h-9 py-2' : outlined ? 'h-10 py-2.5' : 'h-11 py-3';

  const errorId = error ? `${name ?? 'select'}-error` : undefined;
  const helperTextId = helperText ? `${name ?? 'select'}-helper` : undefined;
  const ariaLabel = label ?? placeholder;

  return (
    <div className={classNames('flex flex-col', widthClass, className)}>
      {!!label && (
        <label
          htmlFor={name}
          className={classNames(
            outlined
              ? 'text-left text-[15px] font-semibold leading-6 text-low-priority'
              : 'text-left text-sm font-semibold text-white',
            helperText ? '' : 'mb-2',
          )}
        >
          {label}
        </label>
      )}
      {!!helperText && (
        <span id={helperTextId} className="mb-2 mt-1 text-low text-sm">
          {helperText}
        </span>
      )}
      <Listbox
        as="div"
        value={value}
        onChange={(v) => onChange(v as T)}
        disabled={!!disabled}
        className="group"
      >
        <div
          className={classNames(dropdownTriggerStyles, {
            'border-transparent': !outlined && !error,
            'border-grey-700t': outlined && !error,
            'border-red-300': !!error,
            'text-low-priority': !outlined && !disabled,
            'text-white': outlined && !!selectedOption && !disabled,
            'text-low-priority/70':
              (outlined && !selectedOption && !disabled) ||
              (!outlined && !selectedOption && !disabled),
            'text-text-disabled': disabled,
          })}
        >
          <ListboxButton
            id={name}
            name={name}
            aria-label={ariaLabel}
            aria-invalid={!!error}
            aria-describedby={
              [helperTextId, errorId].filter(Boolean).join(' ') || undefined
            }
            className={classNames(
              'flex w-full items-center justify-between rounded-xs px-3 text-left leading-none outline-none disabled:text-text-disabled',
              heightClass,
            )}
          >
            <span className="flex min-w-0 items-center gap-2">
              {Icon ? (
                <Icon
                  aria-hidden="true"
                  className={classNames('size-5 shrink-0', {
                    'stroke-text-disabled': disabled,
                  })}
                />
              ) : null}
              <span className="truncate">{display}</span>
            </span>
            <ChevronDownIcon
              aria-hidden="true"
              strokeWidth={2.5}
              className={classNames(
                'size-3 shrink-0 transition-transform group-data-[open]:rotate-180',
                { 'stroke-text-disabled': disabled },
              )}
            />
          </ListboxButton>
        </div>
        <ListboxOptions anchor="bottom start" className={dropdownPanelStyles}>
          {options.map((opt) => (
            <ListboxOption
              key={opt.value}
              value={opt.value}
              className={dropdownOptionStyles}
            >
              {opt.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
      {error && (
        <div
          id={errorId}
          role="alert"
          className="flex space-x-1.5 items-start mt-2"
        >
          <InformationCircleIcon
            aria-hidden="true"
            className="shrink-0 size-4 text-red-300 mt-[3px]"
          />
          <span className="text-body-smallest text-red-300">{error}</span>
        </div>
      )}
    </div>
  );
}
