import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "./Container";
import { categories } from "@/lib/tools/categories";
import { getToolsByCategory } from "@/lib/tools/registry";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <Container>
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 md:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <Logo />
            <p className="mt-3 max-w-[24ch] text-[13px] leading-relaxed text-ink-soft">
              Small, fast tools for everyday tasks. Most run entirely in your
              browser.
            </p>
          </div>

          {categories.map((c) => (
            <nav key={c.id} aria-label={c.title}>
              <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-faint">
                {c.nav}
              </h2>
              <ul className="space-y-2">
                {getToolsByCategory(c.id).map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/${t.slug}`}
                      className="text-[13px] text-ink-soft transition-colors hover:text-ink"
                    >
                      {t.name.replace(/ (Calculator|Generator|Converter|Encoder \/ Decoder)$/, "")}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-[12.5px] text-faint sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Free tools, no sign-up.
          </p>
          <nav aria-label="Legal" className="flex items-center gap-5">
            <Link href="/about" className="transition-colors hover:text-ink">
              About
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ink">
              Terms
            </Link>
            <Link href="/contact" className="transition-colors hover:text-ink">
              Contact
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
