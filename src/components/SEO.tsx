/* eslint-disable @typescript-eslint/no-explicit-any */
import { Helmet } from "react-helmet-async";
import ErrorBoundary from "../ui/ErrorBoundary";

interface SEOProps {
  pageTitle?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: any;
  noIndex?: boolean;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({
  pageTitle = "Travel & Car Rental Booking",
  description = "Book your perfect travel packages and car rentals with Tourex. Discover amazing destinations, luxury accommodations, and reliable car rental services at competitive prices.",
  keywords = "travel booking, car rental, vacation packages, hotel booking, travel agency, tourism, holiday packages, car hire, travel deals",
  image = "/assets/img/og-image.jpg",
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = "website",
  author = "Tourex Travel Agency",
  publishedTime,
  modifiedTime,
  structuredData,
  noIndex = false,
  canonical
}) => {
  const fullTitle = `${pageTitle} | Tourex - Premium Travel & Car Rental Services`;
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const canonicalUrl = canonical || url;

  // Default structured data for the website
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Tourex",
    "description": description,
    "url": siteUrl,
    "logo": `${siteUrl}/assets/img/logo.png`,
    "image": fullImageUrl,
    "telephone": "+1-234-567-8900",
    "email": "info@tourex.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Travel Street",
      "addressLocality": "New York",
      "addressRegion": "NY",
      "postalCode": "10001",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://facebook.com/tourex",
      "https://twitter.com/tourex",
      "https://instagram.com/tourex"
    ],
    "priceRange": "$$",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Travel Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Travel Packages",
            "description": "Customized travel packages for all destinations"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Car Rental",
            "description": "Reliable car rental services worldwide"
          }
        }
      ]
    }
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <ErrorBoundary>
      <Helmet>
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* Robots */}
        <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
        
        {/* Canonical URL */}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={fullImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Tourex" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={fullTitle} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={fullImageUrl} />
        <meta property="twitter:creator" content="@tourex" />
        <meta property="twitter:site" content="@tourex" />
        
        {/* Article specific meta tags */}
        {publishedTime && <meta property="article:published_time" content={publishedTime} />}
        {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
        {author && <meta property="article:author" content={author} />}
        
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="application-name" content="Tourex" />
        <meta name="apple-mobile-web-app-title" content="Tourex" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(finalStructuredData)}
        </script>
        
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
      </Helmet>
    </ErrorBoundary>
  );
};

export default SEO;