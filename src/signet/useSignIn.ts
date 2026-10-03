import { useState } from 'react';
import { signetIssuer, signInWithSignetPassword, startSignetLogin } from './session';

export const useSignIn = (): {
  error: string;
  issuer: string;
  start: (hint: string) => Promise<void>;
  submitEmail: (value: { email: string; password: string }) => Promise<void>;
} => {
  const [error, setError] = useState('');
  const fail = (reason: unknown) => {
    setError(reason instanceof Error ? reason.message : 'Sign-in failed');
  };

  return {
    error,
    issuer: signetIssuer(),
    start: async (hint) => {
      try {
        await startSignetLogin(hint);
      } catch (reason) {
        fail(reason);
      }
    },
    submitEmail: async (value) => {
      try {
        await signInWithSignetPassword(value.email, value.password);
      } catch (reason) {
        fail(reason);
      }
    },
  };
};
