import Image from "next/image";

/** Exact Apple logo SVG published in the global navigation at apple.com. */
export default function AppleLogo() {
  return (
    <Image
      src="/brand/apple-logo.svg"
      width={14}
      height={44}
      alt=""
      aria-hidden="true"
      unoptimized
    />
  );
}
