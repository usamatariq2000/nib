import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Prose } from "@/components/layout/Prose";
import { site } from "@/lib/site";

const email = `hello@${new URL(site.url).hostname.replace(/^www\./, "")}`;

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${site.name} team — feedback, tool requests and bug reports welcome.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Container size="narrow" className="pb-10 pt-6 sm:pt-8">
      <Breadcrumbs
        trail={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <h1 className="mt-5 text-[28px] font-semibold tracking-[-0.02em] text-ink sm:text-[32px]">
        Contact
      </h1>

      <Prose className="mt-8">
        <p>
          We’d genuinely like to hear from you — whether it’s a tool you wish
          existed, a rough edge on one that does, or a bug to squash.
        </p>
        <p>
          Email us at{" "}
          <a href={`mailto:${email}`}>{email}</a> and we’ll read every message.
        </p>

        <h2>Requesting a tool</h2>
        <p>
          When suggesting a new tool, a one-line description of what it should do
          and an example of the input and output you’d expect is perfect. It
          helps us build the right thing.
        </p>

        <h2>Reporting a problem</h2>
        <p>
          For bugs, let us know which tool, what you did, and what happened
          versus what you expected. Your browser and device are helpful too.
        </p>
      </Prose>
    </Container>
  );
}
