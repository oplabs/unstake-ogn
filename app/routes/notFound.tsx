import { Link } from 'react-router';

import { Meta } from '~/components/Meta';

import type { Route } from './+types/notFound';

export async function loader({ request }: Route.LoaderArgs) {
  const origin = new URL(request.url).origin;

  return { origin };
}

export default function NotFound({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <Meta
        origin={loaderData.origin}
        productMeta={{
          title: 'Origin Protocol',
          subtitle: `Earn amplified yield on Ethereum and stablecoins with Origin Protocol's OETH and OUSD.`,
          image: '/assets/images/meta.webp',
        }}
      />

      <div className="mt-[10svh]">
        <div className="flex flex-col items-center gap-4">
          <h1>Oops, page not found 😓</h1>
          <h4>The page you have requested does not exist!</h4>
        </div>
        <div className="mt-4 flex justify-center">
          <Link to="/" className="btn">
            Go back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
