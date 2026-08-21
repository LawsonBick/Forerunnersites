import { cx } from "@/lib/cx";

/**
 * Standard page container: one max width, one gutter scale, everywhere.
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cx("mx-auto w-full max-w-[76rem] px-5 sm:px-8 lg:px-10", className)}>
      {children}
    </div>
  );
}
