import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="he" dir="rtl">
      <Head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://qtrypzzcjebvfcihiynt.supabase.co" />
        <link rel="preconnect" href="https://i.postimg.cc" />
        
        {/* Fonts with display=swap for better loading */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Heebo:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Meta tags for SEO */}
        <meta name="description" content="גבי אהרון - מרצה, מהנדס מכונות, מומחה בשפת גוף ודיבור מול קהל" />
        <meta name="keywords" content="גבי אהרון, שפת גוף, דיבור מול קהל, הרצאות, ייעוץ, קורסים" />
        <meta name="author" content="Gabi Aharon" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gabiaharon.github.io/gabiaharonportfolio/" />
        <meta property="og:title" content="גבי אהרון - מומחה שפת גוף ודיבור מול קהל" />
        <meta property="og:description" content="מרצה, מהנדס מכונות ומומחה בשפת גוף ודיבור מול קהל. הרצאות וקורסים מקצועיים." />
        <meta property="og:image" content="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/9d57c5_Untitleddesign1.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://gabiaharon.github.io/gabiaharonportfolio/" />
        <meta property="twitter:title" content="גבי אהרון - מומחה שפת גוף ודיבור מול קהל" />
        <meta property="twitter:description" content="מרצה, מהנדס מכונות ומומחה בשפת גוף ודיבור מול קהל. הרצאות וקורסים מקצועיים." />
        <meta property="twitter:image" content="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/9d57c5_Untitleddesign1.png" />
        
        {/* Favicon and icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#1f2937" />
        <meta name="msapplication-TileColor" content="#1f2937" />
        
        {/* Performance hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Structured data for search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "גבי אהרון",
              "alternateName": "Gabi Aharon",
              "description": "מרצה, מהנדס מכונות ומומחה בשפת גוף ודיבור מול קהל",
              "url": "https://gabiaharon.github.io/gabiaharonportfolio/",
              "image": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/9d57c5_Untitleddesign1.png",
              "jobTitle": "מרצה ומומחה שפת גוף",
              "worksFor": {
                "@type": "Organization",
                "name": "עצמאי"
              },
              "sameAs": [
                "https://instagram.com/gabi.aharon",
                "https://linkedin.com/in/gabi-aharon"
              ]
            })
          }}
        />
      </Head>
      <body className="bg-gray-900 text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 