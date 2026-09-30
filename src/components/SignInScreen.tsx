import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useForm } from '@tanstack/react-form';
import { useState, type ReactElement, type ReactNode } from 'react';
import { AuthFrame, AuthTitle } from './AuthFrame';
import { Button } from './Button';
import { Input } from './Input';
import { SignInMethods } from './SignInMethods';

export const SignInScreen = ({
  emphasizeProduct = true,
  error,
  footer,
  issuer,
  onSelect,
  onSubmitEmail,
  productName,
  submitting = false,
}: {
  emphasizeProduct?: boolean | undefined;
  error?: string | undefined;
  footer?: ReactNode | undefined;
  issuer: string;
  onSelect: (hint: string) => void;
  onSubmitEmail: (value: { email: string; password: string }) => Promise<void> | void;
  productName: string;
  submitting?: boolean | undefined;
}): ReactElement => {
  const [emailStep, setEmailStep] = useState(false);
  const form = useForm({
    defaultValues: { email: '', password: '' },
    onSubmit: async ({ value }) => {
      await onSubmitEmail(value);
    },
  });

  if (emailStep) {
    return (
      <AuthFrame
        emphasizeProduct={emphasizeProduct}
        footer={footer}
        onBack={() => setEmailStep(false)}
        productName={productName}
      >
        <AuthTitle title="Log in" />
        <form
          className="w-full space-y-5"
          onSubmit={(event) => {
            event.preventDefault();

            event.stopPropagation();

            void form.handleSubmit();
          }}
        >
          <form.Field
            name="email"
            children={(field) => (
              <Input
                name="email"
                value={field.state.value}
                label="Email"
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
                Icon={EnvelopeIcon}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            )}
          />
          <form.Field
            name="password"
            children={(field) => (
              <Input
                name="password"
                value={field.state.value}
                label="Password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                Icon={LockClosedIcon}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            )}
          />
          <Button
            button={{
              disabled: submitting,
              isSubmit: true,
              loading: submitting,
              size: 'large',
              text: 'Log in',
              type: 'primary',
            }}
          />
          {error ? <p className="text-center text-sm text-red-400">{error}</p> : null}
        </form>
      </AuthFrame>
    );
  }

  return (
    <AuthFrame emphasizeProduct={emphasizeProduct} footer={footer} productName={productName}>
      <AuthTitle title="Welcome back!" subtitle="Select one of the options below" />
      <div className="flex w-full flex-col gap-3">
        <SignInMethods issuer={issuer} onSelect={onSelect} />
        <Button
          button={{
            IconEnd: EnvelopeIcon,
            onClick: () => setEmailStep(true),
            size: 'large',
            text: 'Continue with email',
            type: 'primary',
          }}
        />
        {error ? <p className="text-center text-sm text-red-400">{error}</p> : null}
      </div>
    </AuthFrame>
  );
};
