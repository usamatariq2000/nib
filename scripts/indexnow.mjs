#!/usr/bin/env node
/**
 * Submit all live URLs to IndexNow (Bing, Yandex, and partners).
 *
 * Reads the live sitemap, extracts every URL, and pings the IndexNow API so
 * new/changed pages are discovered within minutes instead of waiting for a
 * routine crawl. The key is public (hosted at /<key>.txt), so no secrets.
 *
 * Usage: node scripts/indexnow.mjs
 */

const HOST = process.env.INDEXNOW_HOST || "nibtools.com";
const KEY = process.env.INDEXNOW_KEY || "01d5e737a79b343f3562ba4d8da7a8a5";
const ORIGIN = `https://${HOST}`;
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;

async function main() {
  // 1. Pull the live sitemap.
  const res = await fetch(`${ORIGIN}/sitemap.xml`, {
    headers: { "user-agent": "nib-indexnow/1.0" },
  });
  if (!res.ok) {
    console.error(`Could not fetch sitemap (${res.status}). Aborting.`);
    process.exit(1);
  }
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

  if (urls.length === 0) {
    console.error("No URLs found in sitemap. Aborting.");
    process.exit(1);
  }

  // 2. Submit in batches (spec allows up to 10,000 per request; stay well under).
  const BATCH = 1000;
  let submitted = 0;
  for (let i = 0; i < urls.length; i += BATCH) {
    const urlList = urls.slice(i, i + BATCH);
    const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };
    const r = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    // 200 and 202 both mean accepted. 403 = key not verified yet.
    if (r.ok || r.status === 202) {
      submitted += urlList.length;
      console.log(`Submitted ${urlList.length} URLs (status ${r.status}).`);
    } else {
      console.error(
        `IndexNow returned ${r.status} for batch starting at ${i}. ` +
          `Check the key file is live at ${KEY_LOCATION}.`,
      );
    }
  }

  console.log(`Done. ${submitted}/${urls.length} URLs submitted to IndexNow.`);
}

main().catch((e) => {
  console.error("IndexNow submission failed:", e.message);
  process.exit(1);
});
