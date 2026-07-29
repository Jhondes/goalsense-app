export default function WebsiteSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",

    name: "GoalSense",

    url: "https://goalsense.live",

    description:
      "GoalSense is a smart football prediction generator that helps users create football prediction slips using intelligent filtering and advanced match selection.",

    inLanguage: "en",

    publisher: {
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