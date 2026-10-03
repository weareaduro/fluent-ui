import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe, type Stripe } from '@stripe/stripe-js';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState, type ComponentType, type ReactElement } from 'react';
import { useDirectory, useFluentConfig, useSignetMutation, useSignetQuery } from '../signet/provider';
import { PageHeader } from './AppFrame';
import { FullLoader } from './Loader';
import { Modal, ModalFooter } from './Modal';
import { PaymentMethodsList, type PaymentMethodCard } from './PaymentMethodsList';
import { TransactionsList } from './TransactionsList';
import { XeroInvoicesList, type XeroInvoice } from './XeroInvoicesList';

type Section = 'balance' | 'invoices' | 'payment-methods' | 'transactions';

type InvoiceResponse = {
  clients?: string[];
  items: XeroInvoice[];
};

type PaymentMethodsResponse = {
  configured: boolean;
  defaultPaymentMethodId?: string | null;
  hasCustomer?: boolean;
  items: PaymentMethodCard[];
  unavailable?: boolean;
};

type StripeConfig = { configured: boolean; publishableKey: string };

const stripeElementStyle = {
  base: {
    color: '#ffffff',
    fontSize: '16px',
    fontFamily: 'inherit',
    '::placeholder': { color: '#70808E' },
  },
  invalid: { color: '#ef4444' },
};

const sideNavItemClassName = (active: boolean): string =>
  ['w-full rounded-[2px] px-3 py-2 text-left text-sm font-semibold outline-none transition', active ? 'bg-orange-100/10 text-orange-100' : 'text-low hover:bg-white/5 hover:text-white'].join(' ');

const readSection = (hasBalance: boolean): Section => {
  if (hasBalance && (window.location.hash === '#balance' || window.location.pathname.endsWith('/balance'))) {
    return 'balance';
  }

  if (window.location.hash === '#payment-methods' || window.location.pathname.endsWith('/payment-methods')) {
    return 'payment-methods';
  }

  if (window.location.hash === '#transactions' || window.location.pathname.endsWith('/transactions')) {
    return 'transactions';
  }

  return 'invoices';
};

const sectionUrl = (next: Section): string => {
  const path = window.location.pathname;
  const nested =
    path === '/billing/balance' ||
    path === '/billing/invoices' ||
    path === '/billing/payment-methods' ||
    path === '/billing/transactions';

  if (next === 'balance') return nested ? '/billing/balance' : '/billing#balance';

  if (next === 'payment-methods') return nested ? '/billing/payment-methods' : '/billing#payment-methods';

  if (next === 'transactions') return nested ? '/billing/transactions' : '/billing#transactions';

  return nested ? '/billing/invoices' : '/billing';
};

const note = (message: string): ReactElement => <p className="p-5 text-sm text-subtle">{message}</p>;

const CardForm = ({
  clientSecret,
  onBusyChange,
  onSuccess,
  submitRef,
}: {
  clientSecret: string;
  onBusyChange: (busy: boolean) => void;
  onSuccess: (paymentMethodId: string) => void;
  submitRef: { current: (() => void) | null };
}): ReactElement => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');

  const save = async () => {
    if (!stripe || !elements) return;

    const card = elements.getElement(CardNumberElement);

    if (!card) return;

    onBusyChange(true);
    setError('');
    const result = await stripe.confirmCardSetup(clientSecret, { payment_method: { card } });

    if (result.error) {
      setError(result.error.message ?? 'Something went wrong.');
      onBusyChange(false);

      return;
    }

    const paymentMethodId = result.setupIntent.payment_method;

    if (typeof paymentMethodId !== 'string') {
      setError('Failed to retrieve payment method.');
      onBusyChange(false);

      return;
    }

    onSuccess(paymentMethodId);
  };

  const saveRef = useRef(save);

  saveRef.current = save;

  useEffect(() => {
    submitRef.current = () => {
      void saveRef.current();
    };

    return () => {
      submitRef.current = null;
    };
  }, [submitRef]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="mb-1.5 block text-sm text-low">Card number</label>
        <div className="rounded-[2px] border border-grey-700t bg-input p-3">
          <CardNumberElement options={{ style: stripeElementStyle, showIcon: true }} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm text-low">Expiry</label>
          <div className="rounded-[2px] border border-grey-700t bg-input p-3">
            <CardExpiryElement options={{ style: stripeElementStyle }} />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-low">CVC</label>
          <div className="rounded-[2px] border border-grey-700t bg-input p-3">
            <CardCvcElement options={{ style: stripeElementStyle }} />
          </div>
        </div>
      </div>
      {error === '' ? null : <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
};

const AddCardModal = ({
  hasCards,
  onClose,
  onSaved,
  open,
  organisationUuid,
}: {
  hasCards: boolean;
  onClose: () => void;
  onSaved: () => void;
  open: boolean;
  organisationUuid: string;
}): ReactElement => {
  const mutate = useSignetMutation();
  const mutateRef = useRef(mutate);
  const onCloseRef = useRef(onClose);
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);
  const saveRef = useRef<(() => void) | null>(null);

  mutateRef.current = mutate;
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open || clientSecret) return;

    let cancelled = false;

    mutateRef.current<StripeConfig>('/api/resources/billing/stripe')
      .then((stripe) => {
        if (cancelled || stripe.publishableKey === '') {
          onCloseRef.current();

          return undefined;
        }

        setStripePromise(loadStripe(stripe.publishableKey));

        return mutateRef.current<{ clientSecret: string }>(`/api/resources/organisations/${organisationUuid}/payment-methods/setup-intent`, {
          method: 'POST',
        });
      })
      .then((result) => {
        if (cancelled || !result) return;

        setClientSecret(result.clientSecret);
      })
      .catch(() => {
        if (!cancelled) onCloseRef.current();
      });

    return () => {
      cancelled = true;
    };
  }, [clientSecret, open, organisationUuid]);

  const close = () => {
    if (saving) return;

    setClientSecret(undefined);
    onClose();
  };

  return (
    <Modal
      open={open && clientSecret != null && stripePromise != null}
      onClose={close}
      title={hasCards ? 'Update Payment Method' : 'Add Payment Method'}
      footer={
        <ModalFooter
          onCancel={close}
          primaryLabel={saving ? 'Saving...' : 'Save card'}
          primaryLoading={saving}
          primaryDisabled={saving}
          onPrimary={() => saveRef.current?.()}
        />
      }
    >
      {clientSecret && stripePromise ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CardForm
            clientSecret={clientSecret}
            onBusyChange={setSaving}
            submitRef={saveRef}
            onSuccess={(paymentMethodId) => {
              mutate(`/api/resources/organisations/${organisationUuid}/payment-methods/${paymentMethodId}/default`, {
                method: 'POST',
              })
                .then(() => {
                  setClientSecret(undefined);
                  onClose();
                  onSaved();
                })
                .catch(() => undefined)
                .finally(() => setSaving(false));
            }}
          />
        </Elements>
      ) : (
        <FullLoader />
      )}
    </Modal>
  );
};

export const BillingPage = ({ BalanceComponent }: { BalanceComponent?: ComponentType }): ReactElement => {
  const { clientId } = useFluentConfig();
  const { currentOrganisation, organisationUuid, user } = useDirectory();
  const mutate = useSignetMutation();
  const queryClient = useQueryClient();
  const hasBalance = BalanceComponent !== undefined;
  const [section, setSection] = useState<Section>(() => readSection(hasBalance));
  const [addingCard, setAddingCard] = useState(false);
  const tenantBilling = organisationUuid === '' && clientId === 'signet' && user.claims.includes('signet.system.billing');
  const canBill = tenantBilling || (currentOrganisation?.claims.includes(`${clientId}.organisation.billing`) ?? false);
  const canFilterClients =
    clientId === 'signet' && (currentOrganisation?.claims.includes('signet.organisation.billing.clients') ?? false);
  const [invoiceClient, setInvoiceClient] = useState('');
  const ready = canBill && (tenantBilling || organisationUuid !== '');
  const invoicePath = tenantBilling
    ? '/api/resources/tenants/current/invoices'
    : `/api/resources/organisations/${organisationUuid}/invoices${
    canFilterClients
      ? invoiceClient === ''
        ? ''
        : `?client=${encodeURIComponent(invoiceClient)}`
      : `?client=${encodeURIComponent(clientId)}`
  }`;
  const invoices = useSignetQuery<InvoiceResponse>(
    ['billing-invoices', organisationUuid, canFilterClients ? invoiceClient : clientId],
    invoicePath,
    ready && (canFilterClients || clientId !== ''),
  );
  const methods = useSignetQuery<PaymentMethodsResponse>(
    ['billing-payment-methods', organisationUuid],
    tenantBilling ? '/api/resources/tenants/current/payment-methods' : `/api/resources/organisations/${organisationUuid}/payment-methods`,
    ready,
  );

  useEffect(() => {
    const sync = () => setSection(readSection(hasBalance));

    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);

    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, [hasBalance]);

  const choose = (next: Section) => {
    setSection(next);
    const url = sectionUrl(next);

    if (`${window.location.pathname}${window.location.hash}` === url) return;

    window.history.pushState(null, '', url);
  };

  const reloadMethods = () => queryClient.invalidateQueries({ queryKey: ['signet', 'billing-payment-methods', organisationUuid] });

  const payments = section === 'payment-methods';
  const transactions = section === 'transactions';
  const methodBody = methods.data;

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <PageHeader
        title="Billing"
        {...(payments && ready && !tenantBilling ? { button: { icon: PlusIcon, label: 'Add card', onClick: () => setAddingCard(true) } } : {})}
      />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside aria-label="Billing sections" className="flex w-52 shrink-0 flex-col gap-0.5 self-stretch border-r border-grey-700t px-3 py-4">
          <button type="button" className={sideNavItemClassName(section === 'invoices')} onClick={() => choose('invoices')}>
            Invoices
          </button>
          {tenantBilling ? null : (
            <button type="button" className={sideNavItemClassName(transactions)} onClick={() => choose('transactions')}>
              Transactions
            </button>
          )}
          {BalanceComponent ? (
            <button type="button" className={sideNavItemClassName(section === 'balance')} onClick={() => choose('balance')}>
              Balance
            </button>
          ) : null}
          <button type="button" className={sideNavItemClassName(payments)} onClick={() => choose('payment-methods')}>
            Payment Methods
          </button>
        </aside>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {organisationUuid === '' && !tenantBilling ? note('Select an organisation to view billing.') : null}
          {organisationUuid !== '' && !canBill ? note('You do not have access to billing.') : null}
          {ready && section === 'invoices' ? (
            <InvoicesPanel
              client={invoiceClient}
              clients={canFilterClients ? invoices.data?.clients : undefined}
              onClientChange={(value) => setInvoiceClient(value)}
              query={invoices}
            />
          ) : null}
          {ready && section === 'balance' && BalanceComponent ? <BalanceComponent /> : null}
          {ready && transactions ? (
            <TransactionsList
              appClientId={clientId}
              canFilterClients={canFilterClients}
              organisationUuid={organisationUuid}
            />
          ) : null}
          {ready && payments ? (
            <PaymentsPanel
              onRemove={(id) =>
                mutate(`/api/resources/organisations/${organisationUuid}/payment-methods/${id}`, { method: 'DELETE' }).then(reloadMethods)
              }
              onSetDefault={(id) =>
                mutate(`/api/resources/organisations/${organisationUuid}/payment-methods/${id}/default`, { method: 'POST' }).then(reloadMethods)
              }
              query={methods}
            />
          ) : null}
        </div>
      </div>
      {ready ? (
        <AddCardModal
          hasCards={(methodBody?.items.length ?? 0) > 0}
          open={addingCard}
          organisationUuid={organisationUuid}
          onClose={() => setAddingCard(false)}
          onSaved={reloadMethods}
        />
      ) : null}
    </section>
  );
};

const InvoicesPanel = ({
  client,
  clients,
  onClientChange,
  query,
}: {
  client: string;
  clients: string[] | undefined;
  onClientChange: (client: string) => void;
  query: ReturnType<typeof useSignetQuery<InvoiceResponse>>;
}): ReactElement => {
  if (query.isPending) return <FullLoader />;

  if (query.isError || !query.data) return note('Invoices could not be loaded.');

  return (
    <XeroInvoicesList
      client={client}
      {...(clients ? { clients, onClientChange } : {})}
      invoices={query.data.items}
    />
  );
};

const PaymentsPanel = ({
  onRemove,
  onSetDefault,
  query,
}: {
  onRemove: (id: string) => Promise<void>;
  onSetDefault: (id: string) => Promise<void>;
  query: ReturnType<typeof useSignetQuery<PaymentMethodsResponse>>;
}): ReactElement => {
  if (query.isPending) return <FullLoader />;

  if (query.isError || !query.data) return note('Payment methods could not be loaded.');

  if (!query.data.configured) return note('Stripe is not configured on this server.');

  if (query.data.hasCustomer === false) return note('This organisation has no Stripe customer.');

  if (query.data.unavailable) return note('Stripe could not load payment methods for this customer.');

  return (
    <PaymentMethodsList
      defaultPaymentMethodId={query.data.defaultPaymentMethodId}
      methods={query.data.items}
      onRemove={onRemove}
      onSetDefault={onSetDefault}
    />
  );
};
