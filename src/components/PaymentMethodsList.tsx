import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useState, type ReactElement } from 'react';
import { ConfirmDialog } from './ConfirmDialog';
import { Pill } from './Pill';
import { TableColumns, TableContainer, TableRows } from './Table';

export type PaymentMethodCard = {
  brand: string;
  expMonth: number | null;
  expYear: number | null;
  expired: boolean;
  id: string;
  last4: string;
};

const menuItemClassName = 'w-full rounded-[2px] px-2.5 py-2 text-left text-sm hover:bg-white/5';

export const PaymentMethodsList = ({
  defaultPaymentMethodId = '',
  methods,
  onRemove,
  onSetDefault,
}: {
  defaultPaymentMethodId?: string | null | undefined;
  methods: PaymentMethodCard[];
  onRemove: (id: string) => void | Promise<void>;
  onSetDefault: (id: string) => void | Promise<void>;
}): ReactElement => {
  const [removing, setRemoving] = useState<PaymentMethodCard | undefined>();
  const defaultId = defaultPaymentMethodId ?? '';

  return (
    <>
      <TableContainer className="min-h-0 flex-1" flush title="Payment methods">
        <TableColumns
          widthType="pc"
          columns={[
            { width: 20, heading: 'Brand' },
            { width: 16, heading: 'Last 4' },
            { width: 20, heading: 'Purpose' },
            { width: 16, heading: 'Expiry' },
            { width: 16, heading: 'Status' },
            { width: 12 },
          ]}
        />
        {methods.length === 0 ? (
          <p className="p-4 text-subtle">No payment methods yet.</p>
        ) : (
          <TableRows
            widthType="pc"
            rows={methods.map((card) => {
              const expiry =
                card.expMonth && card.expYear ? `${String(card.expMonth).padStart(2, '0')}/${String(card.expYear).slice(-2)}` : '—';

              return {
                uuid: card.id,
                cells: [
                  { width: 20, content: <span className="text-sm capitalize text-white">{card.brand}</span> },
                  { width: 16, content: <span className="font-mono text-sm text-white">•••• {card.last4 || '••••'}</span> },
                  { width: 20, content: <span className="text-sm text-white">{card.id === defaultId ? 'Default' : 'Card'}</span> },
                  { width: 16, content: <span className="text-sm text-white">{expiry}</span> },
                  {
                    width: 16,
                    content: (
                      <Pill size="small" colour={card.expired ? '#EF4444' : '#3EB077'} text={card.expired ? 'Expired' : 'Active'} outline />
                    ),
                  },
                  {
                    width: 12,
                    wrapperClassname: 'justify-end',
                    content: (
                      <Menu>
                        <MenuButton aria-label={`Actions for ${card.brand} ${card.last4}`} className="rounded-[2px] p-1 text-subtle outline-none hover:bg-white/5 hover:text-white">
                          <EllipsisVerticalIcon className="size-5" />
                        </MenuButton>
                        <MenuItems portal anchor={{ to: 'bottom end', gap: 6 }} className="z-50 flex min-w-44 flex-col rounded-[2px] border border-line bg-secondary p-1.5 text-white shadow-xl outline-none">
                          {card.id === defaultId ? null : (
                            <MenuItem>
                              <button type="button" className={menuItemClassName} onClick={() => void onSetDefault(card.id)}>
                                Set as default
                              </button>
                            </MenuItem>
                          )}
                          <MenuItem>
                            <button type="button" className={menuItemClassName} onClick={() => setRemoving(card)}>
                              Remove
                            </button>
                          </MenuItem>
                        </MenuItems>
                      </Menu>
                    ),
                  },
                ],
              };
            })}
          />
        )}
      </TableContainer>
      <ConfirmDialog
        open={removing != null}
        onClose={() => setRemoving(undefined)}
        onConfirm={() => {
          if (!removing) return;

          void Promise.resolve(onRemove(removing.id)).finally(() => setRemoving(undefined));
        }}
        title="Remove Payment Method"
        message="Are you sure you want to remove your payment method?"
        confirmLabel="Remove"
      />
    </>
  );
};
