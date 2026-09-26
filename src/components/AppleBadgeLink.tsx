import AppleLogo from "@/components/AppleLogo";

/** Primary Apple-platform acquisition action. */

export default function AppleBadgeLink({
  href,
  label,
  app,
  location,
}: {
  href: string;
  label: string;
  app: string;
  location: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn--primary"
      data-umami-event="app-store"
      data-umami-event-app={app}
      data-umami-event-location={location}
    >
      <AppleLogo />
      {label}
    </a>
  );
}
