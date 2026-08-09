import type { Plugin } from 'vite';
import { defineConfig } from 'vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// @vanilla-extract/vite-plugin forcibly sets `ssr.external` for its runtime
// packages, but @cloudflare/vite-plugin refuses any externals in a Worker
// environment (Workers can't dynamically resolve at runtime). Strip the
// externals before Cloudflare's configResolved validator fires. The runtime
// isn't actually imported in the SSR bundle after vanilla-extract has
// transformed all .css.ts files to class-name objects, so clearing the list
// is safe.
const clearSsrExternal: Plugin = {
  name: 'clear-cloudflare-ssr-external',
  configResolved: {
    order: 'pre',
    handler(config) {
      const ssrEnv = config.environments?.ssr;
      if (ssrEnv?.resolve) {
        (ssrEnv.resolve as { external: string[] }).external = [];
      }
    },
  },
};

export default defineConfig({
  server: { port: 3000 },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    clearSsrExternal,
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tanstackStart(),
    viteReact(),
    vanillaExtractPlugin(),
  ],
});
