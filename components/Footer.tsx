import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.inner}>
        <div className={styles.detail}>
          <span className={styles.label}>E-Mail</span>
          <a className={styles.email} href="mailto:bhyoo@korea.ac.kr">
            bhyoo@korea.ac.kr
          </a>
        </div>
        <p className={styles.copy}>Byung-Hyun Yoo©2026</p>
      </div>
    </footer>
  );
}
