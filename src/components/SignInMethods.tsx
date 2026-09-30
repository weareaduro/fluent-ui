import { Suspense, use, type ReactElement } from 'react';
import { Button } from './Button';
import { Loader } from './Loader';
import { GitHubIcon, GoogleIcon, MicrosoftIcon, SlackIcon } from './providerIcons';

const labels: Record<string, string> = {
  github: 'Continue with GitHub',
  google: 'Continue with Google',
  microsoft: 'Continue with Microsoft',
  slack: 'Continue with Slack',
};

const cache = new Map<string, Promise<string[]>>();

export const signInProviderLabel = (hint: string): string => {
  const known = labels[hint];

  if (known) return known;

  return `Continue with ${hint.charAt(0).toUpperCase()}${hint.slice(1)}`;
};

export const loadSignetProviders = async (issuer: string): Promise<string[]> => {
  const endpoint = issuer.replace(/\/$/, '');

  if (endpoint === '') return [];

  try {
    const response = await fetch(`${endpoint}/oauth/providers`);

    if (!response.ok) return [];

    const body = (await response.json()) as { providers?: unknown };

    if (!Array.isArray(body.providers)) return [];

    return body.providers.filter((provider): provider is string => typeof provider === 'string');
  } catch {
    return [];
  }
};

/** One request per issuer for the life of the page, so the login screen can suspend on it. */
// The promise has to stay the same object across renders. An async function would wrap it.
// eslint-disable-next-line @typescript-eslint/promise-function-async
export const signetProviders = (issuer: string): Promise<string[]> => {
  const endpoint = issuer.replace(/\/$/, '');
  const existing = cache.get(endpoint);

  if (existing) return existing;

  const pending = loadSignetProviders(endpoint);

  cache.set(endpoint, pending);

  return pending;
};

const providerIcons: Record<string, HeroIconType> = {
  github: GitHubIcon,
  google: GoogleIcon,
  microsoft: MicrosoftIcon,
  slack: SlackIcon,
};

const ProviderButtons = ({
  onSelect,
  providers,
}: {
  onSelect: (hint: string) => void;
  providers: Promise<string[]>;
}): ReactElement => {
  const list = use(providers);

  return (
    <>
      {list.map((hint) => (
        <Button
          key={hint}
          button={{
            IconEnd: providerIcons[hint],
            onClick: () => onSelect(hint),
            size: 'large',
            text: signInProviderLabel(hint),
            type: 'tertiary',
          }}
        />
      ))}
    </>
  );
};

export const SignInMethods = ({
  issuer,
  onSelect,
}: {
  issuer: string;
  onSelect: (hint: string) => void;
}): ReactElement => (
  <Suspense
    fallback={
      <div className="flex w-full justify-center py-4">
        <Loader />
      </div>
    }
  >
    <ProviderButtons onSelect={onSelect} providers={signetProviders(issuer)} />
  </Suspense>
);
