import { FacebookIcon, InstagramIcon, NaverIcon } from "./icons";

const SNS_LINKS = [
  { label: "네이버 블로그", href: "https://m.blog.naver.com/pfyoo", Icon: NaverIcon },
  { label: "페이스북", href: "https://www.facebook.com/pfyoo", Icon: FacebookIcon },
  { label: "인스타그램", href: "https://www.instagram.com/your_byunghyun", Icon: InstagramIcon },
];

type SnsLinksProps = {
  className?: string;
  linkClassName?: string;
};

/** The candidate's Naver Blog, Facebook and Instagram (2026-10-30), as
    icon links in a new tab.
    Used by the Footer and the site menu, each with its own styles. */
export default function SnsLinks({ className, linkClassName }: SnsLinksProps) {
  return (
    <ul className={className}>
      {SNS_LINKS.map(({ label, href, Icon }) => (
        <li key={href}>
          <a
            className={linkClassName}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (새 창)`}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}
