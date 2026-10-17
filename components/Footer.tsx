import styles from "./Footer.module.css";
import { FacebookIcon, NaverIcon } from "./icons";

const SNS_LINKS = [
  { label: "네이버 블로그", href: "https://m.blog.naver.com/pfyoo", Icon: NaverIcon },
  { label: "페이스북", href: "https://www.facebook.com/pfyoo", Icon: FacebookIcon },
];

type FooterProps = {
  className?: string;
};

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`${styles.footer} ${className}`} id="contact">
      <div className={styles.inner}>
        <div className={styles.contact}>
          <div className={styles.detail}>
            <span className={styles.label}>E-Mail</span>
            <a className={styles.email} href="mailto:bhyoo@korea.ac.kr">
              bhyoo@korea.ac.kr
            </a>
          </div>
          <ul className={styles.sns}>
            {SNS_LINKS.map(({ label, href, Icon }) => (
              <li key={href}>
                <a
                  className={styles.snsLink}
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
        </div>
        <p className={styles.copy}>Byung-Hyun Yoo©2026</p>
      </div>
    </footer>
  );
}
