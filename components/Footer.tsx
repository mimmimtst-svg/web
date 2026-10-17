import styles from "./Footer.module.css";
import SnsLinks from "./SnsLinks";

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
          <SnsLinks className={styles.sns} linkClassName={styles.snsLink} />
        </div>
        <p className={styles.copy}>© 2026 Byung-Hyun Yoo. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
