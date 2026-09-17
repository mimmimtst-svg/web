import type { NextConfig } from "next";

// GitHub Pages serves this repo at https://<user>.github.io/web/ (a
// subpath, not the domain root), so the build needs its base path set
// only for that deployment target — set by the GitHub Actions workflow,
// left unset for local dev/build and any other host (e.g. Vercel).
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "web";
const basePath = isGithubPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: isGithubPages ? `/${repoName}/` : undefined,
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
