import { site } from "@/lib/site";

// Served at /ads.txt. Emits a valid AdSense line only when a publisher id is
// configured; otherwise a clear placeholder so the file exists but makes no
// false authorization claims.
export const dynamic = "force-static";

export function GET() {
  const client = site.adsensePublisherId; // e.g. "ca-pub-1234567890123456"
  const pub = client.replace(/^ca-/, "");

  const body = client
    ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`
    : "# ads.txt — add your AdSense line when advertising is enabled, e.g.:\n# google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0\n";

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
