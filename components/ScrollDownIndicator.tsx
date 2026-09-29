import styles from "./ScrollDownIndicator.module.css";
import { ScrollChevronIcon } from "./icons";

type ScrollDownIndicatorProps = {
  /** Section is fully settled in the viewport. */
  active: boolean;
  className?: string;
};

/**
 * "SCROLL DOWN" label + double-chevron, pinned to a section's bottom edge;
 * label and chevron bob together as one unit. The bob animation carries
 * its own `animation-delay` (see .module.css) so it only starts a moment
 * after the section settles into view (the `.bobbing` class is
 * applied/removed as `active` changes) —
 * arriving mid-bob reads as noisy, a still label that settles first and
 * then starts moving reads as an invitation.
 */
export default function ScrollDownIndicator({ active, className = "" }: ScrollDownIndicatorProps) {
  return (
    <div
      className={`${styles.indicator} ${active ? styles.bobbing : ""} ${className}`}
      aria-hidden="true"
    >
      <span className={styles.label}>SCROLL DOWN</span>
      <ScrollChevronIcon className={styles.icon} />
    </div>
  );
}
