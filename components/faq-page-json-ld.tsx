/** FAQPage — single site-wide instance (rendered from root layout with Organization + WebSite). */
const FAQ_PAGE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is halal fashion?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Halal fashion refers to clothing that meets Islamic modesty standards — loose-fitting, non-transparent, and covering the required areas of the body. HalalStyle curates halal-verified picks for Muslim families in Canada.",
      },
    },
    {
      "@type": "Question",
      name: "Does HalalStyle ship to Canada?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All products in the HalalStyle vault are available on Amazon.ca and ship across Canada, including Ontario, Quebec, British Columbia and Alberta.",
      },
    },
    {
      "@type": "Question",
      name: "How does HalalStyle vet products?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every item is reviewed for modesty standards, fabric opacity, silhouette, and Islamic values before being added to the vault. We only recommend products we would wear ourselves.",
      },
    },
    {
      "@type": "Question",
      name: "Is HalalStyle free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. HalalStyle is completely free. We earn a small affiliate commission from Amazon.ca when you purchase — at no extra cost to you.",
      },
    },
  ],
};

export function FaqPageJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_PAGE_JSON_LD) }}
    />
  );
}
