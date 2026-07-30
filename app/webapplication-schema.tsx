export default function WebApplicationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",

    name: "GoalSense",

    applicationCategory: "SportsApplication",

    operatingSystem: "Any",

    url: "https://goalsense.live",

    description:
      "GoalSense is an AI-powered football prediction platform that generates smart football predictions, accumulator slips, BTTS tips, Over 2.5 predictions and match winner selections using advanced filtering.",

    image: "https://goalsense.live/og-image.jpg",

    browserRequirements: "Requires JavaScript",

    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },

    creator: {
      "@type": "Organization",
      name: "GoalSense",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}