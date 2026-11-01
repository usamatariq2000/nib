import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Prose } from "@/components/layout/Prose";
import { site } from "@/lib/site";
import { tools } from "@/lib/tools/registry";
import { categories } from "@/lib/tools/categories";

const email = `hello@${new URL(site.url).hostname.replace(/^www\./, "")}`;

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a growing collection of fast, private, free browser tools, built and maintained independently. Here's the thinking behind it and how to reach us.`,
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
          the everyday things you need to get done — working out a percentage or a
          mortgage payment, formatting some JSON, counting words, running a timer,
          generating an ID. Open one, finish the task, and get on with your day.
        </p>

        <h2>Who’s behind it</h2>
        <p>
          {site.name} is an independent project, built and maintained by a small
          team of developers who were tired of slow, cluttered, login-walled
          “free tool” sites and decided to build the opposite. We’re not venture-
          backed and we don’t sell your data — the goal is simply to make the
          fastest, cleanest version of each tool and keep it free. If you’d like
          to know more or work with us, <a href={`mailto:${email}`}>email us</a>.
        </p>

        <h2>What we care about</h2>
        <p>
          <strong>Speed.</strong> Pages load fast and tools respond instantly.
          There’s no spinner for something a computer can do in a millisecond.
        </p>
        <p>
          <strong>Privacy.</strong> Wherever it’s technically possible, tools run
          entirely in your browser. Your text, numbers and files stay on your
          device and are never uploaded. Tools that work this way are labelled
          “Runs in your browser”.
        </p>
        <p>
          <strong>Clarity.</strong> Each tool does one thing, with sensible
          defaults and no tutorial required. No accounts, no upsells, no clutter.
        </p>

        <h2>How we keep them accurate</h2>
        <p>
          Every calculator shows the formula it uses in a “How it’s calculated”
          section, so you can check the method, not just the number. The
          finance tools use the standard, textbook formulas — for example,
          loan and mortgage payments use the amortization formula{" "}
          <em>M = P · r(1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)</em>. Results are meant for
          planning and learning; for major financial decisions, always confirm
          with your bank, lender or a qualified professional.
        </p>

        <h2>How it’s paid for</h2>
        <p>
          The tools are free. Over time the site may show unobtrusive ads, but
          the tool always comes first — the interface stays useful with
          advertising turned off entirely, and we’ll never use deceptive or
          intrusive ad placements.
        </p>

        <h2>What’s here today</h2>
        <p>
          {tools.length} tools across{" "}
          {categories.map((c, i) => (
            <span key={c.id}>
              <Link href={`/tools/${c.slug}`}>{c.title.toLowerCase()}</Link>
              {i < categories.length - 2
                ? ", "
                : i === categories.length - 2
                  ? " and "
                  : ""}
            </span>
          ))}
          — with more on the way. Browse them all on the{" "}
          <Link href="/tools">tools page</Link>.
        </p>

        <h2>Say hello</h2>
        <p>
          Have a tool you’d like to see, found a bug, or want to get in touch?
          Email <a href={`mailto:${email}`}>{email}</a> or use the{" "}
          <Link href="/contact">contact page</Link>. We read every message.
        </p>
      </Prose>
    </Container>
  );
}
