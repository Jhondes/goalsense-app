interface ArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
}

export default function ArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
}: ArticleSchemaProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",

    headline,

    description,

    url,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },

    author: {
      "@type": "Organization",
      name: "GoalSense",
    },

    publisher: {
      "@type": "Organization",
      name: "GoalSense",
      logo: {
        "@type": "ImageObject",
        url: "https://goalsense.live/icon.png",
      },
    },

    image: "https://goalsense.live/og-image.jpg",

    datePublished,

dateModified,

    inLanguage: "en",
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