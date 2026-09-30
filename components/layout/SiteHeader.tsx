import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { HeaderSearchButton } from "@/components/search/SearchTrigger";
import { ThemeToggle } from "./ThemeToggle";
import { CategoryNav } from "./CategoryNav";
import { Container } from "./Container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[color-mix(in_srgb,var(--paper)_85%,transparent)] backdrop-blur-md">
      <Container>
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="rounded-[var(--radius-xs)] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
              aria-label="Nib — home"
            >
              <Logo />
            </Link>
            <CategoryNav variant="bar" />
          </div>
          <div className="flex items-center gap-1.5">
            <HeaderSearchButton />
            <ThemeToggle />
          </div>
        </div>
      </Container>
      <CategoryNav variant="strip" />
    </header>
  );
}
