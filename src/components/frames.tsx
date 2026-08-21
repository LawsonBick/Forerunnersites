import Image from "next/image";
import { cx } from "@/lib/cx";

interface FrameImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
}

/**
 * A desktop screenshot presented in minimal, honest browser chrome
 * with the project's real URL in the address bar.
 */
export function BrowserFrame({
  url,
  className,
  ...img
}: FrameImageProps & { url?: string; className?: string }) {
  return (
    <figure
      className={cx(
        "overflow-hidden rounded-[var(--radius-frame)] border border-ink/10 bg-white shadow-[var(--shadow-frame)]",
        className
      )}
    >
      <div className="relative flex h-8 items-center border-b border-ink/10 bg-[#f3f1ea] px-3.5">
        <span aria-hidden="true" className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
        </span>
        {url ? (
          <span className="absolute inset-x-12 truncate text-center text-[11px] font-medium tracking-wide text-ink-soft">
            {url}
          </span>
        ) : null}
      </div>
      <Image
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        sizes={img.sizes}
        priority={img.priority}
        fetchPriority={img.priority ? "high" : undefined}
        className="w-full"
      />
    </figure>
  );
}

/** A mobile screenshot in a simple device surround. */
export function PhoneFrame({
  className,
  ...img
}: FrameImageProps & { className?: string }) {
  return (
    <figure
      className={cx(
        "overflow-hidden rounded-[30px] border border-ink/10 bg-white p-2 shadow-[var(--shadow-frame-sm)]",
        className
      )}
    >
      <div className="overflow-hidden rounded-[22px]">
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          sizes={img.sizes}
          priority={img.priority}
          className="w-full"
        />
      </div>
    </figure>
  );
}
