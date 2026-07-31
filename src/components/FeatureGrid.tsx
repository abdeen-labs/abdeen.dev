/**
 * Numbered capability grid used by the product pages: one hairline-divided
 * machined panel. Each cell separates into a mono label and a Geist
 * sentence (BRAND.md → Type).
 */
interface FeatureGridProps {
  items: { label: string; detail: string }[];
}

export default function FeatureGrid({ items }: FeatureGridProps) {
  return (
    <div className="feature-grid sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f, i) => (
        <div key={f.label} className="feature-cell">
          <span aria-hidden="true" className="index-num">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-mono text-control font-medium uppercase tracking-micro text-ink-primary">
              {f.label}
            </h3>
            <p className="mt-2 text-body text-ink-secondary">{f.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
