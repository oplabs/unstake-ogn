import './polyfills';
import '@rainbow-me/rainbowkit/styles.css';

import { useState } from 'react';

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClientProvider } from '@tanstack/react-query';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { isRouteErrorResponse } from 'react-router';
import { WagmiProvider } from 'wagmi';

import { reactQueryClient } from './clients/reactQuery';
import { wagmiConfig } from './clients/wagmi';
import tailwindStyles from './tailwind.css?url';

import type { Route } from './+types/root';

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindStyles, as: 'style' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const loader = ({ context }: Route.LoaderArgs) => {
  return context.cloudflare;
};

export default function App({ loaderData }: Route.ComponentProps) {
  const [queryClient] = useState(() => reactQueryClient);

  return (
    <WagmiProvider config={wagmiConfig(loaderData)}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Outlet />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
