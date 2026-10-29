"use client";

import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

/**
 * An <img> that fades in once it has loaded, instead of popping in when
 * the file arrives (the main page's photos, 2026-10-29). An image that
 * finished loading before the page came alive (cached) is shown at once.
 */
export default function FadeImage({ className = "", alt = "", ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...rest}
      ref={ref}
      alt={alt}
      className={`fadeImage ${loaded ? "fadeImageLoaded" : ""} ${className}`}
      onLoad={() => setLoaded(true)}
    />
  );
}
