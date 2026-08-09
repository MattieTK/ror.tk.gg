import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router';
import globalsCss from '~/styles/globals.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#161d1d' },
      { title: 'Risk of Rain 2 Items - ror.tk.gg' },
      {
        name: 'description',
        content:
          'A complete list of all Risk of Rain 2 items. Find items by rarity and view their stats and effects.',
      },
      { property: 'og:title', content: 'Risk of Rain 2 Items - ror.tk.gg' },
      {
        property: 'og:description',
        content:
          'A complete list of all Risk of Rain 2 items. Find items by rarity and view their stats and effects.',
      },
      { property: 'og:image', content: '/images/57_Leaf_Clover.webp' },
      { property: 'og:url', content: 'https://ror.tk.gg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Risk of Rain 2 Items - ror.tk.gg' },
      {
        name: 'twitter:description',
        content:
          'A complete list of all Risk of Rain 2 items. Find items by rarity and view their stats and effects.',
      },
      { name: 'twitter:image', content: '/images/57_Leaf_Clover.webp' },
    ],
    links: [
      { rel: 'icon', href: '/images/57_Leaf_Clover.webp' },
      { rel: 'stylesheet', href: globalsCss },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
