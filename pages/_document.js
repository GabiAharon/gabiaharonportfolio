import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="he" dir="rtl">
      <Head>
        <meta name="description" content="גבי אהרון - מרצה לשפת גוף ועמידה מול קהל, מנהל ומהנדס מכונות" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="גבי אהרון - מרצה לשפת גוף" />
        <meta property="og:description" content="מרצה מקצועי לשפת גוף ועמידה מול קהל. הרצאות, סדנאות וכלים דיגיטליים לשיפור התקשורת הלא מילולית." />
        <meta property="og:image" content="https://gabiaharon.com/images/og-image.jpg" />
        <meta property="og:url" content="https://gabiaharon.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="גבי אהרון - מרצה לשפת גוף" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="גבי אהרון - מרצה לשפת גוף" />
        <meta name="twitter:description" content="מרצה מקצועי לשפת גוף ועמידה מול קהל" />
        <meta name="twitter:image" content="https://gabiaharon.com/images/og-image.jpg" />
        <meta name="twitter:url" content="https://gabiaharon.com/" />
        
        {/* Additional SEO Tags */}
        <meta name="keywords" content="שפת גוף, עמידה מול קהל, הרצאות, גבי אהרון, תקשורת לא מילולית" />
        <meta name="author" content="גבי אהרון" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://gabiaharon.com/" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "גבי אהרון",
              "jobTitle": "מרצה לשפת גוף ועמידה מול קהל",
              "description": "מרצה מקצועי לשפת גוף ועמידה מול קהל, מנהל ומהנדס מכונות",
              "url": "https://gabiaharon.com/",
              "sameAs": [
                "https://linkedin.com/in/gabi-aharon",
                "https://instagram.com/gabi.aharon"
              ],
              "knowsAbout": [
                "שפת גוף",
                "עמידה מול קהל",
                "תקשורת לא מילולית",
                "הרצאות עסקיות"
              ]
            })
          }}
        />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        
        {/* Google Fonts */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@100;200;300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </Head>
      <body className="bg-gray-900 text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 