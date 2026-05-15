import { SITE_URL } from "@/lib/site";

const org = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HalalStyle",
  url: SITE_URL,
  description: "The Excellence Filter — AI-assisted curation of halal-verified modest fashion for Muslim families in Canada.",
  foundingLocation: { "@type": "Place", name: "Shelburne, Ontario, Canada" },
  sameAs: [] as string[],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "HalalStyle",
  url: SITE_URL,
  description: "Modest fashion quiz, curated vault, and editorial picks with Amazon.ca affiliate transparency.",
  publisher: { "@type": "Organization", name: "HalalStyle" },
};

export function JsonLd() {
  const payload = [org, website];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
