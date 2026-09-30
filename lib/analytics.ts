/**
 * Minimal analytics shim. Emits product events to Google Analytics / GTM if
 * they're present, and otherwise no-ops. Nothing is loaded or sent until a
 * measurement id is configured, so there's no tracking without consent.
 *
 * Useful events (see spec §35): tool_open, tool_complete, copy_result,
 * download_result, search_tool, related_tool_click.
 */
type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, props: Props = {}): void {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", event, props);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...props });
    }
  } catch {
    /* analytics must never break a tool */
  }
}
