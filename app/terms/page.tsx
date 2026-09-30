import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Prose } from "@/components/layout/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: `The terms of use for ${site.name} — free browser tools provided as-is.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Container size="narrow" className="pb-10 pt-6 sm:pt-8">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ]}
      />
      <h1 className="mt-5 text-[28px] font-semibold tracking-[-0.02em] text-ink sm:text-[32px]">
        Terms of use
      </h1>
      <p className="mt-2 text-[13px] text-faint">Last updated: September 2026</p>

      <Prose className="mt-8">
        <p>
          By using {site.name} you agree to these terms. They’re intentionally
          short and plain.
        </p>

        <h2>The service</h2>
        <p>
          {site.name} provides free online utilities. The tools are offered for
          your personal and commercial use at no cost and without an account.
        </p>

        <h2>No warranty</h2>
        <p>
          The tools are provided “as is”, without warranties of any kind. While
          we work hard to make them accurate and reliable, we can’t guarantee
          they are error-free. Always double-check results before relying on
          them for important decisions.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {site.name} is not liable for
          any loss or damage arising from your use of the tools, including
          inaccurate results or unavailability of the service.
        </p>

        <h2>Acceptable use</h2>
        <p>
          Don’t use the site to break the law, to disrupt the service, or to
          attempt to access it in ways it isn’t intended to be used.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms over time. Continued use of the site means
          you accept the current version.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? <a href="/contact">Contact us</a>.
        </p>
      </Prose>
    </Container>
  );
}
