import Link from "next/link";
import { SealRoundel } from "@/components/Seal";
import { apps, tools } from "@/lib/catalog";
import { identity, marketing } from "@/lib/brand";

/** Footer: the Roundel, positioning, navigation, and a compact colophon. */
export default function SiteFooter() {
  return (
    <footer
      className="w-full px-4 pb-8 pt-10 md:px-8 md:pb-12 md:pt-16"
      role="contentinfo"
    >
      <div className="mx-auto w-full max-w-6xl border-t border-hairline pt-8 md:pt-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-8">
          <div className="flex flex-col gap-5">
            <span className="text-ink-dim">
              <SealRoundel size={88} />
            </span>
            <p className="max-w-xs text-body text-ink-secondary">
              {identity.positioning}
            </p>
            <p className="micro-label">No account. Open source.</p>
          </div>

          <nav aria-label="Apps" className="flex flex-col gap-4">
            <h2 className="micro-label">
              <span aria-hidden="true" className="text-signal-identity">
                /
              </span>
              Apps
            </h2>
            <ul className="flex flex-col gap-2.5 font-mono text-control">
              {apps.map((app) => (
                <li key={app.href}>
                  {app.external ? (
                    <a
                      href={app.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chrome-link"
                    >
                      {app.title} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <Link href={app.href} className="chrome-link">
                      {app.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Tools" className="flex flex-col gap-4">
            <h2 className="micro-label">
              <span aria-hidden="true" className="text-signal-identity">
                /
              </span>
              Tools
            </h2>
            <ul className="flex flex-col gap-2.5 font-mono text-control">
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="chrome-link">
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Elsewhere" className="flex flex-col gap-4">
            <h2 className="micro-label">
              <span aria-hidden="true" className="text-signal-identity">
                /
              </span>
              Elsewhere
            </h2>
            <ul className="flex flex-col gap-2.5 font-mono text-control">
              <li>
                <a
                  href="https://github.com/abdeen-labs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chrome-link"
                >
                  GitHub <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://jaafar.cv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chrome-link"
                >
                  jaafar.cv <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-5 md:mt-12">
          <div className="abd-barcode" aria-hidden="true" />
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-5">
            <span className="micro-label">
              © {new Date().getFullYear()} Jaafar Abdeen
            </span>
            <span className="micro-label">{marketing.footer}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
