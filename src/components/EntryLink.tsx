import Link from "next/link";
import type { CatalogEntry } from "@/lib/catalog";

/** Catalog-entry link; external entries open in a new tab. */
export default function EntryLink({
  item,
  children,
  className,
  style,
}: {
  item: CatalogEntry;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className} style={style}>
      {children}
    </Link>
  );
}
