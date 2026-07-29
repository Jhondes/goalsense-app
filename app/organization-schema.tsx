export default function OrganizationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",

    name: "GoalSense",

    url: "https://goalsense.live",

    logo: "https://goalsense.live/logo.png",

    description:
      "GoalSense is an AI-powered football prediction platform that generates football predictions, accumulator slips, BTTS tips, Over 2.5 predictions and match winner selections.",

    brand: {
      "@type": "Brand",
      name: "GoalSense",
    },

    sameAs: [
      // Add your official social profiles later
    ],
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