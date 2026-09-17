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
      <path d="M0.5 0.5H25.8633" stroke="currentColor" strokeLinecap="round" />
      <path d="M0.5 12H25.8633" stroke="currentColor" strokeLinecap="round" />
      <path d="M0.5 23.5H25.8633" stroke="currentColor" strokeLinecap="round" />
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
