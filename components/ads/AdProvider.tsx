import Script from "next/script";
import { site } from "@/lib/site";

/**
 * Loads the AdSense library — and only then. With no publisher id configured
 * (the default), nothing is injected, so the site ships zero ad code until
 * it's deliberately turned on and consent handling is wired up.
 *
 * Placed once, high in the tree. All ad rendering goes through <AdSlot />.
 */
export function AdProvider() {
  const client = site.adsensePublisherId;
  if (!client) return null;
  return (
    <Script
      id="adsense-loader"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
    />
  );
}
