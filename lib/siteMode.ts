/**
 * While the site is unfinished, the public address (byunghyun.kr) shows
 * a "coming soon" page instead of the site. The real site stays reachable
 * at an unlisted preview address for checking on phones; that address
 * comes from the PREVIEW_SLUG repository secret at build time (see
 * preview-template/page.tsx) and is deliberately not written anywhere in
 * this public repository.
 *
 * Set by the GitHub Pages workflow (NEXT_PUBLIC_SITE_PRIVATE). To go
 * public, delete that line in .github/workflows/deploy-pages.yml and push
 * — no GitHub Pages, domain or DNS settings change.
 */
export const SITE_PRIVATE = process.env.NEXT_PUBLIC_SITE_PRIVATE === "true";
