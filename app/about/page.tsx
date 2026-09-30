import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Prose } from "@/components/layout/Prose";
import { site } from "@/lib/site";
import { tools } from "@/lib/tools/registry";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a growing collection of fast, private, free browser tools. Here's the thinking behind it.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Container size="narrow" className="pb-10 pt-6 sm:pt-8">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <h1 className="mt-5 text-[28px] font-semibold tracking-[-0.02em] text-ink sm:text-[32px]">
        About {site.name}
      </h1>

      <Prose className="mt-8">
        <p>
          {site.name} is a growing collection of small, single-purpose tools for
          the everyday things you need to get done — working out a percentage,
          formatting some JSON, counting words, running a timer, generating an
          ID. Open one, finish the task, and get on with your day.
        </p>

        <h2>What we care about</h2>
        <p>
          <strong>Speed.</strong> Pages load fast and tools respond instantly.
          There’s no spinner for something a computer can do in a millisecond.
        </p>
        <p>
          <strong>Privacy.</strong> Wherever it’s technically possible, tools run
          entirely in your browser. Your text, numbers and files stay on your
          device.
        </p>
        <p>
          <strong>Clarity.</strong> Each tool does one thing, with sensible
          defaults and no tutorial required. No accounts, no upsells, no clutter.
        </p>

        <h2>How it’s paid for</h2>
        <p>
          The tools are free. Over time the site may show unobtrusive ads, but
          the tool always comes first — the interface stays useful with
          advertising turned off entirely.
        </p>

        <h2>What’s here today</h2>
        <p>
          {tools.length} tools across calculators, developer utilities, text
          tools and time &amp; random generators — with more on the way. Browse
          them all on the <Link href="/tools">tools page</Link>.
        </p>

        <h2>Say hello</h2>
        <p>
          Have a tool you’d like to see, or found a bug?{" "}
          <Link href="/contact">Let us know</Link>.
        </p>
      </Prose>
    </Container>
  );
}
