import { buildGlobalJsonLdGraph } from "@/lib/schema-json-ld";

/** Site-wide Organization, WebSite, and Vault Product review markup */
export function JsonLd() {
  const payload = buildGlobalJsonLdGraph();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
