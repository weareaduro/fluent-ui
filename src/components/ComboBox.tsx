import {
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Combobox as HComboBox,
} from '@headlessui/react';
import {
  ChevronDownIcon,
  InformationCircleIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { IconButton } from './IconButton';
import { useFieldVariant } from './FieldVariantContext';
import { useState } from 'react';

type HeroIconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type Option<T> = { label: string; value: T; group?: string };

interface Props<T extends string> {
  options: Array<Option<T>>;
  selected: Array<Option<T>>;
  onSelect: (value: Option<T>) => string | void;
  label?: string;
  disabled?: boolean;
  error?: string;
  OptionIconStart?: HeroIconType;
  isFreeInput?: boolean;
  helperText?: string;
  placeholder?: string;
  onQueryChange?: (query: string) => void;
}

export function ComboBox<T extends string>({
  options,
  selected,
  onSelect,
  label,
  disabled,
  error,
  OptionIconStart,
  isFreeInput,
  helperText,
  placeholder,
  onQueryChange,
}: Props<T>) {
  const outlined = useFieldVariant() === 'outlined';
  const [value, setValue] = useState('');

  const grouped = options.reduce<Record<string, Array<Option<T>>>>(
    (acc, opt) => {
      const key = opt.group ?? '';

      (acc[key] ??= []).push(opt);
      return acc;
    },
    {},
  );

  const hasGroups = Object.keys(grouped).some((k) => k !== '');

  return (
    <div>
      {!!label && (
        <label
          htmlFor={label}
          className={`${helperText ? '' : 'mb-2'} ${
            outlined
              ? 'block text-left text-[15px] font-semibold leading-6 text-low-priority'
              : 'block text-sm font-semibold text-white'
          }`}
        >
          {label}
        </label>
      )}
      {!!helperText && (
        <span className="mb-2 mt-1 text-low text-sm block">{helperText}</span>
      )}
      <HComboBox>
        <div
          className={classNames(
            'group relative flex flex-col overflow-hidden rounded-xs border bg-secondary transition-all duration-100 -outline-offset-1 focus-within:outline-2 focus-within:outline-white',
            {
              'border-transparent': !outlined && !error?.length,
              'border-grey-700t': outlined && !error?.length,
              'border-red-400': !!error?.length,
              'text-subtle': disabled,
            },
          )}
        >
          <div className="relative flex">
            {isFreeInput ? (
              <button
                onClick={() => {
                  onSelect({ label: value, value } as Option<T>);

                  setValue('');
                }}
                disabled={value.length === 0}
                className="absolute top-1/2 transform right-0 -translate-y-1/2 p-3 cursor-pointer"
              >
                <PlusIcon className="size-5" />
              </button>
            ) : (
              <ComboboxButton className="cursor-pointer group absolute top-1/2 transform right-0 -translate-y-1/2 p-3">
                <ChevronDownIcon
                  className={classNames(
                    'size-5 group-data-open:rotate-180 transition-all',
                    { 'stroke-subtle': disabled },
                  )}
                />
              </ComboboxButton>
            )}
            <ComboboxInput
              onKeyDown={(e) => {
                if (e.key === 'Enter' && value) {
                  const err = onSelect({ label: value, value } as Option<T>);
                  if (err) e.preventDefault();
                }
              }}
              className="w-full rounded-xs outline-none disabled:text-subtle placeholder:italic placeholder:text-grey-600 py-3 leading-none px-3 h-11 pr-12 bg-transparent text-white"
              disabled={!!disabled}
              placeholder={
                placeholder ??
                (isFreeInput
                  ? 'Type a value and press enter'
                  : 'Start typing...')
              }
              onChange={(e) => {
                setValue(e.target.value);

                onQueryChange?.(e.target.value);
              }}
            />
          </div>
        </div>
        <ComboboxOptions
          transition
          anchor="bottom start"
          className="bg-secondary mt-1 space-y-1 p-1 w-(--input-width) border border-transparent rounded-xs origin-top transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 z-50 max-h-60 overflow-y-auto"
          hidden={options.length === 0}
        >
          {hasGroups
            ? Object.entries(grouped).map(([group, items]) => (
                <div key={group}>
                  {group && (
                    <div className="px-3 py-1.5 text-xs font-semibold text-low uppercase tracking-wider">
                      {group}
                    </div>
                  )}
                  {items.map((opt) => (
                    <ComboboxOption
                      key={opt.value}
                      value={opt}
                      onClick={() => onSelect(opt)}
                      className="px-3 py-2.5 text-left hover:bg-grey/20 rounded text-sm w-full cursor-pointer text-white flex items-center gap-2"
                    >
                      {OptionIconStart && (
                        <OptionIconStart className="size-4 shrink-0" />
                      )}
                      {opt.label}
                    </ComboboxOption>
                  ))}
                </div>
              ))
            : options.map((opt) => (
                <ComboboxOption
                  key={opt.value}
                  value={opt}
                  onClick={() => onSelect(opt)}
                  className="px-3 py-2.5 text-left hover:bg-grey/20 rounded text-sm w-full cursor-pointer text-white flex items-center gap-2"
                >
                  {OptionIconStart && (
                    <OptionIconStart className="size-4 shrink-0" />
                  )}
                  {opt.label}
                </ComboboxOption>
              ))}
        </ComboboxOptions>
      </HComboBox>
      {error && (
        <div className="flex space-x-1.5 items-start mt-2">
          <InformationCircleIcon className="shrink-0 size-4 text-red-400 mt-[3px]" />
          <span className="text-sm text-red-400">{error}</span>
        </div>
      )}
      <div
        className="space-y-2 mt-2 data-visible:block hidden"
        data-visible={selected.length ? true : undefined}
      >
        {!!selected.length &&
          selected.map((s) => (
            <div
              key={s.value}
              className="flex items-center space-x-1 bg-primary w-fit border border-grey/30 rounded"
            >
              <div className="pl-2.5 py-2 space-x-2 flex items-center">
                {OptionIconStart && <OptionIconStart className="size-4" />}
                <span className="text-sm text-white">{s.label}</span>
              </div>
              <IconButton onClick={() => onSelect(s)} Icon={XMarkIcon} />
            </div>
          ))}
      </div>
    </div>
  );
}
