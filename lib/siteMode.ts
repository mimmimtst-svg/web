/**
 * While the site is unfinished, the public address (byunghyun.kr) shows
 * a "coming soon" page instead of the site; the real site stays reachable
 * at the unlisted PREVIEW_PATH for checking on phones.
 *
 * Set by the GitHub Pages workflow (NEXT_PUBLIC_SITE_PRIVATE). To go
 * public, delete that line in .github/workflows/deploy-pages.yml and push
 * — no GitHub Pages, domain or DNS settings change.
 */
export const SITE_PRIVATE = process.env.NEXT_PUBLIC_SITE_PRIVATE === "true";

/** Must match the app/<name> route folder. */
export const PREVIEW_PATH = "/preview-q0xgevgw";
