import type { NextConfig } from "next";

// GitHub Pages serves this repo at https://<user>.github.io/web/ (a
// subpath, not the domain root), so a Pages build needs a base path —
// unless the site has a custom domain (PAGES_CUSTOM_DOMAIN, set by the
// GitHub Actions workflow), which serves it from the domain root and
// redirects the github.io/web/ address there. Both are left unset for
// local dev/build and any other host (e.g. Vercel).
const isGithubPages = process.env.GITHUB_PAGES === "true";
const hasCustomDomain = Boolean(process.env.PAGES_CUSTOM_DOMAIN);
const repoName = "web";
const basePath = isGithubPages && !hasCustomDomain ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: { unoptimized: true },
  // Next.js only rewrites its own managed assets (CSS/JS chunks, next/image)
  // for the basePath above — plain <img src="/images/...">  tags need it
  // prepended manually (see lib/basePath.ts), so expose the same value to
  // client code here.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
