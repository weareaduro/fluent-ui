# fluent-ui

Shared sign-in screen and application shell for Aduro products. Fonts live in this package. Each app owns its colours.

Install it from Git. `npm install` puts the built package in `node_modules`. There is no symlink to create.

```bash
npm install github:weareaduro/fluent-ui
```

The package exports `@weareaduro/fluent-ui` and `@weareaduro/fluent-ui/fonts.css`. Apps import the components and point Tailwind `@source` at `node_modules/@weareaduro/fluent-ui/src`, because the class names are scanned from the source. The JavaScript entry is the built file in `dist/`.

## Theme

Set these in the app stylesheet. `--background-image-primary-main` is the brand button and the product word in “Product by Aduro”. `--color-orange-100` is the accent on links, including Privacy Policy and Terms and Conditions.

```css
@import '../../../node_modules/@weareaduro/fluent-ui/src/fonts.css';
@source '../../../node_modules/@weareaduro/fluent-ui/src';

@theme {
  --font-open: 'Open Sans', sans-serif;
  --font-grotesque: 'Darker Grotesque', sans-serif;
  --color-orange-100: #ee5b16;
  --background-image-primary-main: linear-gradient(310deg, #f47215 14.51%, #f44e15 85.49%);
}
```

Body text uses `font-open`. Headings on the sign-in screen use `font-grotesque`. Load the same Google font stylesheets Blaze uses, and set `-webkit-font-smoothing: antialiased` on `body`.

`SignInScreen` always shows Privacy Policy and Terms and Conditions (`https://aduro.io/privacy` and `https://aduro.io/terms`). Pass `showLegalNotice={false}` only when the app supplies its own notice, as Blaze does for its in-app pages. The optional `footer` is for extra actions such as a register button. Continue with email uses the brand colour. Slack, Google, and GitHub use the dark grey button.

## Change the components

Node 22. From this directory:

```bash
npm install
npm run build
```

Commit `dist/` with the source change. Consumers pick it up on the next install of this Git repository. They do not run the build.

## Billing

`BillingPage` lists invoices, transactions, payment methods, and an optional balance section from Signet. Invoice and transaction export builds a PDF in the browser. That compile step needs a page content security policy that allows `script-src 'wasm-unsafe-eval'` and `connect-src data:`. Signet's console policy is that exception. Column widths are derived from the header list, and a missing column is omitted rather than passed as an empty width.
