import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Prose } from "@/components/layout/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.name} handles your data. Most tools run entirely in your browser, so what you enter never leaves your device.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Container size="narrow" className="pb-10 pt-6 sm:pt-8">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ]}
      />
      <h1 className="mt-5 text-[28px] font-semibold tracking-[-0.02em] text-ink sm:text-[32px]">
        Privacy
      </h1>
      <p className="mt-2 text-[13px] text-faint">Last updated: September 2026</p>

      <Prose className="mt-8">
        <p>
          {site.name} is built around a simple idea: the fastest, most private
          way to run a tool is to run it on your own device. This page explains
          what that means in practice.
        </p>

        <h2>Tools run in your browser</h2>
        <p>
          The great majority of our tools — every calculator, the JSON
          formatter, the text tools, the encoders, the UUID generator, the
          timers and the random generators — do all of their work locally in
          your browser. The text, numbers, JSON or files you enter are{" "}
          <strong>not uploaded, stored or logged</strong> on any server. When a
          tool works this way, its page says “Runs in your browser”.
        </p>

        <h2>What we do collect</h2>
        <p>
          We may use privacy-respecting analytics to understand which tools are
          useful — for example, how often a tool is opened or a result is
          copied. This data is aggregated and does not identify you. We do not
          sell personal data, and we do not require an account.
        </p>

        <h2>Cookies and local storage</h2>
        <p>
          We use a small amount of browser storage to remember preferences such
          as your light or dark theme. These stay on your device.
        </p>

        <h2>Advertising</h2>
        <p>
          If advertising is enabled, we may work with Google AdSense to show
          ads. Ad partners may use cookies to serve relevant ads. Where required
          by law, we will ask for your consent first. Ads are always kept
          secondary to the tools themselves.
        </p>

        <h2>Third-party services</h2>
        <p>
          Fonts and static assets are served to render the site. Any third-party
          service we use is chosen to minimise the data it receives.
        </p>

        <h2>Changes</h2>
        <p>
          We may update this policy as the product evolves. Material changes will
          be reflected by the “last updated” date above.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about privacy? <a href="/contact">Get in touch</a>.
        </p>
      </Prose>
    </Container>
  );
}
