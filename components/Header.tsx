import styles from "./Header.module.css";
import { ArrowUpRightIcon, MenuIcon } from "./icons";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <p className={styles.brand}>
          <span className={styles.brandLabel}>고려대학교 제22대 총장 후보</span>
          <span className={styles.brandName}>유병현</span>
        </p>
        <div className={styles.actions}>
          <a className={styles.contactButton} href="#contact">
            <span>Contact Us</span>
            <ArrowUpRightIcon />
          </a>
          <button className={styles.menuToggle} type="button" aria-label="메뉴 열기">
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
