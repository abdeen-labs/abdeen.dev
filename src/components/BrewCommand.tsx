"use client";

import { useCallback, useState } from "react";

/** A Homebrew install command in the console style, with a copy button.
 *  Shared by the macOS app pages' closing download sections. */
export default function BrewCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard?.writeText(command).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    });
  }, [command]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="micro-label">Homebrew</p>
        <button
          type="button"
          onClick={copy}
          aria-live="polite"
          className="btn btn--quiet"
        >
          {copied ? "Copied" : "Copy command"}
        </button>
      </div>
      <div className="console">
        <pre className="overflow-x-auto">
          <code>
            <span className="prompt" aria-hidden="true">
              ›
            </span>
            {command}
          </code>
        </pre>
      </div>
    </div>
  );
}
