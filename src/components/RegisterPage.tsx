import { ArrowRightIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useForm } from '@tanstack/react-form';
import { useState, type ReactElement } from 'react';
import { completeSignetInvitation, signetClientId, signetIssuer, signInWithSignetPassword, startSignetLogin } from '../signet/session';
import { AuthFrame, AuthTitle } from './AuthFrame';
import { Button } from './Button';
import { Input } from './Input';
import { LegalNotice } from './LegalNotice';
import { Loader } from './Loader';
import { CREDENTIALS_PROVIDER, SignInMethods } from './SignInMethods';

export const RegisterPage = ({
  productName,
  token,
}: {
  productName: string;
  token?: string | undefined;
}): ReactElement => {
  const [emailStep, setEmailStep] = useState(Boolean(token));
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const form = useForm({
    defaultValues: { confirmPassword: '', email: '', password: '' },
    onSubmit: async ({ value }) => {
      if (value.password !== value.confirmPassword) {
        setError('Passwords do not match');

        return;
      }

      if (value.password.length < 8) {
        setError('Password must be at least 8 characters');

        return;
      }

      setSubmitting(true);
      setError('');

      try {
        if (token) {
          const email = await completeSignetInvitation(token, value.password);

          await signInWithSignetPassword(email, value.password);

          return;
        }

        const response = await fetch(`${signetIssuer()}/oauth/register`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ client_id: signetClientId(), email: value.email, password: value.password }),
        });
        const payload = (await response.json()) as { access_token?: string; error?: string };

        if (!response.ok || !payload.access_token) {
          setError(
            payload.error === 'already_exists' ? 'An account with this email already exists' : 'Could not create your account',
          );

          return;
        }

        sessionStorage.setItem('signet.access_token', payload.access_token);
        window.location.assign('/');
      } catch (reason) {
        setError(reason instanceof Error ? reason.message : 'Could not create your account');
      } finally {
        setSubmitting(false);
      }
    },
  });
  const footer = (
    <>
      <Button button={{ size: 'large', text: 'Already have an account? Log in', type: 'basic' }} link={{ to: '/login' }} />
      <LegalNotice productName={productName} />
    </>
  );

  if (emailStep) {
    return (
      <AuthFrame footer={footer} {...(token ? {} : { onBack: () => setEmailStep(false) })} productName={productName}>
        <AuthTitle title="Create your account" />
        <form
          className="w-full space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          {token ? null : (
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
          )}
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
                autoComplete="new-password"
                Icon={LockClosedIcon}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            )}
          />
          <form.Field
            name="confirmPassword"
            children={(field) => (
              <Input
                name="confirmPassword"
                value={field.state.value}
                label="Confirm password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="new-password"
                Icon={LockClosedIcon}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            )}
          />
          {submitting ? (
            <Loader />
          ) : (
            <Button
              button={{
                IconEnd: ArrowRightIcon,
                isSubmit: true,
                size: 'large',
                text: 'Create account',
                type: 'primary',
              }}
            />
          )}
          {error === '' ? null : <p className="text-center text-sm text-red-400">{error}</p>}
        </form>
      </AuthFrame>
    );
  }

  return (
    <AuthFrame footer={footer} productName={productName}>
      <AuthTitle title="Create your account" subtitle="Select one of the options below" />
      <div className="flex w-full flex-col gap-3">
        <SignInMethods
          issuer={signetIssuer()}
          onSelect={(hint) => {
            if (hint === CREDENTIALS_PROVIDER) {
              setEmailStep(true);

              return;
            }

            void startSignetLogin(hint);
          }}
        />
        <Button
          button={{
            IconEnd: EnvelopeIcon,
            onClick: () => setEmailStep(true),
            size: 'large',
            text: 'Continue with email',
            type: 'primary',
          }}
        />
      </div>
    </AuthFrame>
  );
};
