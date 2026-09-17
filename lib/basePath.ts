/**
 * Prepends the deployment's base path (e.g. "/web" on GitHub Pages, "" on
 * a root domain) to a root-absolute asset path. Only needed for plain
 * <img src="..."> references — Next.js already rewrites CSS/JS/next/image
 * URLs on its own via next.config.ts's basePath/assetPrefix.
 */
export function withBasePath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
