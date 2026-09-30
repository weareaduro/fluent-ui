import { build } from 'esbuild';

await build({
  entryPoints: ['src/index.tsx'],
  outfile: 'dist/index.js',
  bundle: true,
  format: 'esm',
  platform: 'browser',
  jsx: 'automatic',
  loader: { '.svg': 'dataurl' },
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'react/jsx-dev-runtime',
    '@tanstack/react-form',
    '@tanstack/react-router',
    '@headlessui/react',
    '@heroicons/react',
    '@heroicons/react/24/outline',
    'react-tooltip',
    'classnames',
  ],
});
