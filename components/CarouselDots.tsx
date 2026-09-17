import styles from "./CarouselDots.module.css";

type CarouselDotsProps = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
};

export default function CarouselDots({
  count,
  activeIndex,
  onSelect,
  className = "",
}: CarouselDotsProps) {
  return (
    <div className={`${styles.dots} ${className}`} role="tablist" aria-label="카드 이동">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === activeIndex}
          aria-label={`${index + 1}번째 카드로 이동`}
          className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  );
}
