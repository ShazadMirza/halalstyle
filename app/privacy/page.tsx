import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How HalalStyles collects, uses, and protects personal information in line with PIPEDA and Canadian privacy expectations.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy — HalalStyles",
    description: "PIPEDA-aligned privacy practices for HalalStyles visitors and subscribers.",
    url: absoluteUrl("/privacy"),
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-dvh pt-20">
      <section className="border-b border-halal-border/30 bg-gradient-to-b from-halal-forest via-halal-surface to-halal-forest px-6 py-16 pattern-bg">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow mb-4 text-halal-gold/90">Legal · PIPEDA</p>
          <h1 className="section-title mb-6 text-halal-cream">Privacy Policy</h1>
          <p className="text-[0.95rem] leading-relaxed text-halal-muted">
            Last updated: May 15, 2026. HalalStyles (&quot;we&quot;, &quot;us&quot;) operates{" "}
            <span className="text-halal-gold/90">halalstyles55.com</span> for Canadian visitors and subscribers. This policy
            describes how we handle personal information under Canada&apos;s{" "}
            <strong className="text-halal-cream/90">Personal Information Protection and Electronic Documents Act (PIPEDA)</strong>{" "}
            and related provincial expectations where they apply.
          </p>
        </div>
      </section>

      <section className="border-t border-halal-gold/10 bg-halal-obsidian px-6 py-16">
        <div className="mx-auto max-w-2xl space-y-10 text-[0.95rem] leading-relaxed text-halal-muted">
          <div className="rounded-2xl border border-halal-gold/20 bg-halal-forest-2/40 p-6">
            <h2 className="font-brand mb-3 text-lg tracking-[0.06em] text-halal-gold">Who we are</h2>
            <p>
              HalalStyles is a modest fashion discovery and editorial site. The operator is identified on our{" "}
              <Link href="/about" className="text-halal-gold underline-offset-2 hover:underline">
                About
              </Link>{" "}
              page. For privacy questions, contact us at the email address listed in the &quot;Contact&quot; section below.
            </p>
          </div>

          <div>
            <h2 className="font-brand mb-3 text-xl tracking-[0.06em] text-halal-cream">Information we collect</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-halal-cream/90">Contact &amp; account data:</strong> email address and name when you
                subscribe to our newsletter, join the partner waitlist, or use forms on the site.
              </li>
              <li>
                <strong className="text-halal-cream/90">Technical &amp; usage data:</strong> IP address, browser type, device
                type, pages viewed, and approximate region — typically through hosting, analytics, or security tools we enable.
              </li>
              <li>
                <strong className="text-halal-cream/90">Quiz &amp; preferences:</strong> answers you provide in our style quiz
                to generate recommendations (processed to deliver the service, not sold as a standalone product).
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-brand mb-3 text-xl tracking-[0.06em] text-halal-cream">How we use information</h2>
            <p>We use personal information to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Send newsletters, lead magnets, and transactional messages you request;</li>
              <li>Review partner applications and respond to inquiries;</li>
              <li>Operate, secure, and improve the website and user experience;</li>
              <li>Meet legal, accounting, and regulatory obligations.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-halal-gold/25 bg-halal-gold/5 p-6">
            <h2 className="font-brand mb-3 text-lg tracking-[0.06em] text-halal-gold">Consent &amp; withdrawal</h2>
            <p>
              Where PIPEDA requires consent, we rely on express consent for email marketing (e.g. newsletter sign-up) and
              implied consent only where permitted. You may withdraw consent for marketing at any time using the unsubscribe
              link in our emails or by contacting us. Withdrawal does not affect the lawfulness of processing before withdrawal.
            </p>
          </div>

          <div>
            <h2 className="font-brand mb-3 text-xl tracking-[0.06em] text-halal-cream">Disclosure &amp; service providers</h2>
            <p>
              We may share information with trusted processors (e.g. email service providers, hosting, analytics) who assist us
              and are bound to appropriate confidentiality and security obligations. We do not sell your personal information. We
              may disclose information if required by law or to protect rights, safety, and integrity of our users and the
              public.
            </p>
          </div>

          <div>
            <h2 className="font-brand mb-3 text-xl tracking-[0.06em] text-halal-cream">International transfers</h2>
            <p>
              Some service providers may process data in the United States or other jurisdictions. Where data leaves Canada, we
              take steps that are reasonable in the circumstances — including contractual safeguards where available — to
              protect your information.
            </p>
          </div>

          <div>
            <h2 className="font-brand mb-3 text-xl tracking-[0.06em] text-halal-cream">Retention</h2>
            <p>
              We retain personal information only as long as needed for the purposes above, including legal, dispute, and
              accounting requirements, then securely delete or anonymise it.
            </p>
          </div>

          <div>
            <h2 className="font-brand mb-3 text-xl tracking-[0.06em] text-halal-cream">Your rights (Canada)</h2>
            <p>
              Subject to exceptions under PIPEDA, you may request access to the personal information we hold about you and ask
              for correction of inaccuracies. We will respond within a reasonable time. If you are not satisfied with our
              response, you may contact the{" "}
              <a
                href="https://www.priv.gc.ca/en/"
                className="text-halal-gold underline-offset-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Office of the Privacy Commissioner of Canada
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-brand mb-3 text-xl tracking-[0.06em] text-halal-cream">Security</h2>
            <p>
              We use reasonable administrative, technical, and physical safeguards appropriate to the sensitivity of the
              information we hold. No method of transmission over the Internet is completely secure.
            </p>
          </div>

          <div>
            <h2 className="font-brand mb-3 text-xl tracking-[0.06em] text-halal-cream">Children</h2>
            <p>
              Our services are directed to adults and teens shopping with a parent or guardian. We do not knowingly collect
              personal information from children under 13 without verifiable parental consent. If you believe we have collected
              such information, please contact us so we can delete it.
            </p>
          </div>

          <div>
            <h2 className="font-brand mb-3 text-xl tracking-[0.06em] text-halal-cream">Cookies &amp; similar technologies</h2>
            <p>
              We may use cookies or local storage for essential site function, preferences, and aggregated analytics. You can
              control cookies through your browser settings; disabling cookies may affect some features.
            </p>
          </div>

          <div>
            <h2 className="font-brand mb-3 text-xl tracking-[0.06em] text-halal-cream">Changes</h2>
            <p>
              We may update this policy from time to time. The &quot;Last updated&quot; date will change when we do. Material
              changes may be communicated through the site or by email where appropriate.
            </p>
          </div>

          <div className="rounded-2xl border border-halal-border/50 bg-card-gradient p-6">
            <h2 className="font-brand mb-3 text-xl tracking-[0.06em] text-halal-gold">Contact</h2>
            <p>
              For privacy requests or questions:{" "}
              <a
                href="mailto:privacy@halalstyles55.com?subject=HalalStyles%20Privacy%20Request"
                className="text-halal-gold underline-offset-2 hover:underline"
              >
                privacy@halalstyles55.com
              </a>
              . For affiliate transparency, see{" "}
              <Link href="/how-we-earn" className="text-halal-gold underline-offset-2 hover:underline">
                How we vet &amp; earn
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/" className="btn-outline px-6 py-2 text-[0.8rem]">
              Home
            </Link>
            <Link href="/vault" className="btn-gold btn-shop-glow px-6 py-2 text-[0.8rem]">
              The Vault
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
