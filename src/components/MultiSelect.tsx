import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { type ReactElement } from 'react';
import { useFieldVariant } from './FieldVariantContext';
import {
  dropdownOptionStyles,
  dropdownPanelStyles,
  dropdownTriggerStyles,
  type SelectOption,
} from './Select';

interface MultiSelectProps<T extends string> {
  options: Array<SelectOption<T>>;
  value: T[];
  onChange: (value: T[]) => void;
  /**
   * Text shown in the trigger for the current selection, e.g. "4 stages".
   * Defaults to "N selected" / placeholder when nothing is selected.
   */
  summary?: ((selected: Array<SelectOption<T>>) => string) | undefined;
  placeholder?: string | undefined;
  label?: string | undefined;
  disabled?: boolean | undefined;
  name?: string | undefined;
  className?: string | undefined;
  widthClass?: string | undefined;
  size?: 'default' | 'small' | undefined;
  Icon?: HeroIconType | undefined;
  variant?: 'outlined' | 'plain' | undefined;
}

/** Headless UI Listbox in `multiple` mode; the trigger shows a summary instead of every value. */
export function MultiSelect<T extends string>({
  options,
  value,
  onChange,
  summary,
  placeholder = '-- Select --',
  label,
  disabled,
  name,
  className = '',
  widthClass,
  size = 'default',
  Icon,
  variant,
}: MultiSelectProps<T>): ReactElement {
  const outlined =
    useFieldVariant(variant ?? (label ? 'outlined' : undefined)) === 'outlined';

  const selected = options.filter((option) => value.includes(option.value));
  const display =
    selected.length === 0
      ? placeholder
      : summary
        ? summary(selected)
        : `${selected.length} selected`;

  const heightClass =
    size === 'small' ? 'h-9 py-2' : outlined ? 'h-10 py-2.5' : 'h-11 py-3';

  return (
    <div className={classNames('flex flex-col', widthClass, className)}>
      {!!label && (
        <label
          htmlFor={name}
          className={
            outlined
              ? 'mb-2 text-left text-[15px] font-semibold leading-6 text-low-priority'
              : 'mb-2 text-left text-sm font-semibold text-white'
          }
        >
          {label}
        </label>
      )}
      <Listbox
        as="div"
        multiple
        value={value}
        onChange={(next) => onChange(next)}
        disabled={!!disabled}
        className="group"
      >
        <div
          className={classNames(dropdownTriggerStyles, {
            'border-transparent': !outlined,
            'border-grey-700t': outlined,
            'text-low-priority': !outlined && !disabled,
            'text-white': outlined && selected.length > 0 && !disabled,
            'text-low-priority/70': selected.length === 0 && !disabled,
            'text-text-disabled': disabled,
          })}
        >
          <ListboxButton
            id={name}
            name={name}
            aria-label={label ?? display}
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
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option.value}
              className={classNames(
                dropdownOptionStyles,
                'group/option flex items-center justify-between gap-2',
              )}
            >
              <span className="truncate">{option.label}</span>
              <CheckIcon
                aria-hidden="true"
                className="invisible size-4 shrink-0 text-orange-100 group-data-[selected]/option:visible"
              />
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
