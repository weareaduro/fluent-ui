import type { ReactElement, ReactNode } from 'react';
import { useSignIn } from '../signet/useSignIn';
import { Button } from './Button';
import { LegalNotice } from './LegalNotice';
import { SignInScreen } from './SignInScreen';

export const LoginPage = ({
  allowRegistration = true,
  emphasizeProduct = true,
  error,
  productName,
}: {
  allowRegistration?: boolean | undefined;
  emphasizeProduct?: boolean | undefined;
  error?: string | undefined;
  productName: string;
}): ReactElement => {
  const signIn = useSignIn();
  const footer: ReactNode = (
    <>
      {allowRegistration ? (
        <Button
          button={{ size: 'large', text: 'No account? Register', type: 'basic' }}
          link={{ to: '/register' }}
        />
      ) : null}
      <LegalNotice productName={productName} />
    </>
  );

  return (
    <SignInScreen
      emphasizeProduct={emphasizeProduct}
      error={error || signIn.error || undefined}
      footer={footer}
      issuer={signIn.issuer}
      onSelect={(hint) => {
        void signIn.start(hint);
      }}
      onSubmitEmail={signIn.submitEmail}
      productName={productName}
      showLegalNotice={false}
    />
  );
};
