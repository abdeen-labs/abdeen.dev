import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import NotFoundTracker from "@/components/NotFoundTracker";

export const metadata: Metadata = {
  title: "Not found",
  description: "The page could not be found.",
};

export default function NotFound() {
  return (
    <div className="site-frame site-frame--reading not-found">
      <section className="not-found__content motion-block">
        <span className="page-kicker">HTTP 404</span>
        <h1>Nothing here.</h1>
        <p className="not-found__address">abdeen.dev/<span aria-hidden="true" className="redaction-bar" /></p>
        <p>That page either moved or never existed in the first place.</p>
        <div className="not-found__links">
          <Link href="/" className="text-link">Back home <Icon name="arrow-right" size={16} /></Link>
          <Link href="/tools" className="text-link">Tools <Icon name="arrow-right" size={16} /></Link>
          <a href="https://github.com/abdeen-labs" target="_blank" rel="noopener noreferrer" className="text-link" data-umami-event="github" data-umami-event-location="404">Source <Icon name="arrow-up-right" size={16} /></a>
        </div>
      </section>
      <NotFoundTracker />
    </div>
  );
}
