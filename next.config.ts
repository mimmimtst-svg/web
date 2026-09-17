import type { NextConfig } from "next";

// GitHub Pages serves this repo at https://<user>.github.io/web/ (a
// subpath, not the domain root), so the build needs its base path set
// only for that deployment target — set by the GitHub Actions workflow,
// left unset for local dev/build and any other host (e.g. Vercel).
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "web";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPages ? `/${repoName}` : undefined,
  assetPrefix: isGithubPages ? `/${repoName}/` : undefined,
  images: { unoptimized: true },
};

export default nextConfig;
