type IconProps = {
  className?: string;
};

/** Contact Us button arrow (diagonal, external-link style) */
export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 15 9.7807"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6.13995 9.7807L13.6834 2.23729L13.6933 7.45432H15L14.9901 2.47613e-07L7.54568 0L7.53578 1.29683L12.7528 1.30673L5.2094 8.85015L6.13995 9.7807Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** "자세히 보기" link arrow */
export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0.518 6.496H11.186L7.504 2.8L8.428 1.876L13.692 7.154L8.428 12.418L7.504 11.508L11.186 7.812H0.518V6.496Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 26.3633 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0.5 0.5H25.8633M0.5 12H25.8633M0.5 23.5H25.8633"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Double chevron used by the "SCROLL DOWN" indicator */
export function ScrollChevronIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 49.5004 24.5634"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0.750195 13.6877L24.7507 23.7502L48.7502 13.6877"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M0.750195 0.750195L24.7507 10.8127L48.7502 0.750195"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Carousel prev/next chevron */
export function ChevronIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M24.45 13.95H5.4L11.975 20.55L10.325 22.175L0.925 12.775L10.325 3.35L11.975 5L5.4 11.6H24.45V13.95Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M17 1C17 0.447715 16.5523 0 16 0C15.4477 0 15 0.447715 15 1V31C15 31.5523 15.4477 32 16 32C16.5523 32 17 31.5523 17 31V1Z"
        fill="currentColor"
      />
      <path
        d="M31 18C31.5523 18 32 17.5523 32 17C32 16.4477 31.5523 16 31 16L1 16C0.447716 16 0 16.4477 0 17C0 17.5523 0.447716 18 1 18H31Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 8.66717"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1 4.3336L4.33357 7.66717L11 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Figma "Menu / Close_LG" (697:6321): 24px X, 1px round-capped stroke. */
export function CloseIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M21 21L12 12M12 12L3 3M12 12L21 3M12 12L3 21"
        stroke="currentColor"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Policy card head link (Figma Component 2 in 660:5027): a line arrow
 * drawn with the same 1px stroke as the menu and close icons.
 * `non-scaling-stroke` keeps it exactly 1px at any rendered size — the
 * old filled 14px arrow scaled up to 30px came out ~2.8px thick.
 */
export function LineArrowRightIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.5 15H28.5M18.5 5L28.5 15L18.5 25"
        stroke="currentColor"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Back-to-top button arrow: the policy-card line arrow turned upward. */
export function LineArrowUpIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M15 28.5V1.5M5 11.5L15 1.5L25 11.5"
        stroke="currentColor"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Naver (blog) mark: the Naver "N", for the footer's SNS links. */
export function NaverIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M6.5 5.5h3.9l3.3 5.1V5.5h3.8v13h-3.9l-3.3-5.1v5.1H6.5z" fill="currentColor" />
    </svg>
  );
}

/** Facebook "f", for the footer's SNS links. */
export function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M13.3 19.5v-6.4h2.2l.33-2.6H13.3V8.9c0-.74.21-1.25 1.27-1.25h1.36V5.36A18 18 0 0 0 13.95 5.25c-1.96 0-3.3 1.2-3.3 3.4v1.85H8.45v2.6h2.2v6.4z"
        fill="currentColor"
        /* Drawn a touch smaller than the Naver mark; 12% up to match. */
        transform="translate(12 12) scale(1.12) translate(-12 -12)"
      />
    </svg>
  );
}

/** 발전계획서 download: a 1px line arrow down onto a tray. */
export function LineDownloadIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M15 3.5V19.5M8 12.5L15 19.5L22 12.5M3.5 20.5V26.5H26.5V20.5"
        stroke="currentColor"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A 24px line icon in the download icon's manner. */
function LineIcon({ className, d }: IconProps & { d: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d={d}
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A small down chevron (dropdown). */
export function ChevronDownIcon({ className }: IconProps) {
  return <LineIcon className={className} d="M6.5 9.5L12 15L17.5 9.5" />;
}

/** "후보자에게 묻는다" (2026-10-29): a handheld microphone on a desk stand,
    filled in currentColor — a round head and tapering handle tilted 40°,
    a straight stem and a flat base (a line drawing read too faint at
    button size). */
export function MicIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill="currentColor">
        <g transform="rotate(40 12 12)">
          <rect x="8.4" y="1" width="7.2" height="8.2" rx="3.6" />
          <path d="M9.3 9.9H14.7L13.1 19.4C13 19.8 12.6 20 12 20C11.4 20 11 19.8 10.9 19.4Z" />
        </g>
        <rect x="10.1" y="13.6" width="1.5" height="7.4" />
        <rect x="6.6" y="20.4" width="8.5" height="1.6" rx="0.8" />
      </g>
    </svg>
  );
}
