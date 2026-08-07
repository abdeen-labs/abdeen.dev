import AppleLogo from "@/components/AppleLogo";

/** Primary Apple-platform acquisition action. */

export default function AppleBadgeLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn--primary"
    >
      <AppleLogo />
      {label}
    </a>
  );
}
