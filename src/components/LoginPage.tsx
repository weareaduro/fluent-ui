import type { ReactElement, ReactNode } from 'react';
import { useSignIn } from '../signet/useSignIn';
import { SignInScreen } from './SignInScreen';

export const LoginPage = ({
  emphasizeProduct = true,
  error,
  footer,
  productName,
}: {
  emphasizeProduct?: boolean | undefined;
  error?: string | undefined;
  footer?: ReactNode | undefined;
  productName: string;
}): ReactElement => {
  const signIn = useSignIn();

  return (
    <SignInScreen
      emphasizeProduct={emphasizeProduct}
      error={error || signIn.error || undefined}
      {...(footer ? { footer } : {})}
      issuer={signIn.issuer}
      onSelect={(hint) => {
        void signIn.start(hint);
      }}
      onSubmitEmail={signIn.submitEmail}
      productName={productName}
    />
  );
};
