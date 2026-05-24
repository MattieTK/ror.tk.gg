import { createReadStream, existsSync } from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// Item images are stored under their wiki filenames, which percent-encode
// special characters (e.g. Hiker%27s_Boots.png, Saut%C3%A9ed_Worms.png). Vite's
// dev static handler decodes the request path before matching, so it looks for
// the decoded name and 404s. This dev-only middleware serves the file from the
// raw (still-encoded) request path, which matches the on-disk name. Production
// (Cloudflare assets) serves the literal names directly and doesn't need this.
const MIME: Record<string, string> = {
	'.png': 'image/png',
	'.webp': 'image/webp',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
};

const serveEncodedImages: Plugin = {
	name: 'serve-encoded-images-dev',
	apply: 'serve',
	configureServer(server) {
		const imagesDir = path.resolve('public/images');
		server.middlewares.use('/images', (req, res, next) => {
			const rel = (req.url ?? '').split('?')[0].replace(/^\//, '');
			// Only handle encoded names; plain ones work through Vite already.
			if (!rel.includes('%')) return next();
			const filePath = path.join(imagesDir, rel);
			if (!filePath.startsWith(imagesDir) || !existsSync(filePath)) {
				return next();
			}
			const type = MIME[path.extname(rel).toLowerCase()];
			if (type) res.setHeader('Content-Type', type);
			createReadStream(filePath).pipe(res);
		});
	},
};

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
		serveEncodedImages,
		clearSsrExternal,
		cloudflare({ viteEnvironment: { name: 'ssr' } }),
		tanstackStart(),
		viteReact(),
		vanillaExtractPlugin(),
	],
});
