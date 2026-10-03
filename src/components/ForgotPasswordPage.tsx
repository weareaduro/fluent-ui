import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useForm } from '@tanstack/react-form';
import { useState, type ReactElement } from 'react';
import { signetClientId, signetIssuer } from '../signet/session';
import { AuthFrame, AuthTitle } from './AuthFrame';
import { Button } from './Button';
import { Input } from './Input';
import { LegalNotice } from './LegalNotice';

export const ForgotPasswordPage = ({ productName }: { productName: string }): ReactElement => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const form = useForm({
    defaultValues: { code: '', password: '' },
    onSubmit: async ({ value }) => {
      setSubmitting(true);
      setError('');

      try {
        const response = await fetch(`${signetIssuer()}/oauth/forgot-password/confirm`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            client_id: signetClientId(),
            code: value.code,
            email,
            password: value.password,
          }),
        });

        if (!response.ok) {
          setError('That code is invalid or has expired');

          return;
        }

        window.location.assign('/login');
      } catch {
        setError('Could not reset the password');
      } finally {
        setSubmitting(false);
      }
    },
  });
  const footer = (
    <>
      <Button button={{ size: 'large', text: 'Back to log in', type: 'basic' }} link={{ to: '/login' }} />
      <LegalNotice productName={productName} />
    </>
  );

  const send = async (nextEmail: string) => {
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${signetIssuer()}/oauth/forgot-password`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ client_id: signetClientId(), email: nextEmail }),
      });

      if (!response.ok) {
        setError('Could not send a reset code');

        return;
      }

      setEmail(nextEmail);
      setSent(true);
    } catch {
      setError('Could not send a reset code');
    } finally {
      setSubmitting(false);
    }
  };

  if (!sent) {
    return (
      <AuthFrame footer={footer} productName={productName}>
        <AuthTitle title="Reset your password" subtitle="We will email you a code" />
        <form
          className="w-full space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            const next = new FormData(event.currentTarget).get('email');

            if (typeof next === 'string') void send(next);
          }}
        >
          <Input name="email" label="Email" type="email" placeholder="you@example.com" required autoComplete="email" Icon={EnvelopeIcon} />
          <Button
            button={{
              disabled: submitting,
              isSubmit: true,
              loading: submitting,
              size: 'large',
              text: 'Send code',
              type: 'primary',
            }}
          />
          {error === '' ? null : <p className="text-center text-sm text-red-400">{error}</p>}
        </form>
      </AuthFrame>
    );
  }

  return (
    <AuthFrame footer={footer} onBack={() => setSent(false)} productName={productName}>
      <AuthTitle title="Choose a new password" subtitle={`Enter the code sent to ${email}`} />
      <form
        className="w-full space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.Field
          name="code"
          children={(field) => (
            <Input
              name="code"
              value={field.state.value}
              label="Code"
              required
              autoComplete="one-time-code"
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
              label="New password"
              type="password"
              required
              autoComplete="new-password"
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
            text: 'Update password',
            type: 'primary',
          }}
        />
        {error === '' ? null : <p className="text-center text-sm text-red-400">{error}</p>}
      </form>
    </AuthFrame>
  );
};
