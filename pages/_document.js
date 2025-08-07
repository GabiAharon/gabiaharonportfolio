import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html dir="rtl" lang="he">
      <Head>
        {/* הגדרות קידוד נוספות */}
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="Content-Language" content="he-IL" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* גופנים */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;500;600;700;800&family=Heebo:wght@100;200;300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        
        {/* SEO בסיסי */}
        <meta name="description" content="גבי אהרון - מרצה לשפת גוף ומפתח כלי AI. אתר portfolio אישי המכיל פרויקטים, כלים וסרטונים בתחום התקשורת הלא מילולית." />
        <meta name="keywords" content="שפת גוף, תקשורת לא מילולית, גבי אהרון, הרצאות, כלי AI, portfolio" />
        <meta name="author" content="גבי אהרון" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="גבי אהרון - Portfolio אישי" />
        <meta property="og:description" content="מרצה לשפת גוף ומפתח כלי AI" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gabiaharon.com" />
        <meta property="og:image" content="https://i.postimg.cc/j5MJ3Rmz/image.png" />
        <meta property="og:locale" content="he_IL" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="גבי אהרון - Portfolio אישי" />
        <meta name="twitter:description" content="מרצה לשפת גוף ומפתח כלי AI" />
        <meta name="twitter:image" content="https://i.postimg.cc/j5MJ3Rmz/image.png" />
        
        {/* Viewport - חשוב לתגובתיות */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* הגדרות נוספות לטיפול בקידוד */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* CSS variables לעברית */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --font-family-primary: 'Assistant', 'Heebo', system-ui, -apple-system, sans-serif;
              --direction: rtl;
              --text-align: right;
            }
            
            * {
              box-sizing: border-box;
            }
            
            html {
              font-family: var(--font-family-primary);
              direction: var(--direction);
              scroll-behavior: smooth;
            }
            
            body {
              margin: 0;
              padding: 0;
              font-family: var(--font-family-primary);
              direction: var(--direction);
              text-align: var(--text-align);
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            /* Fix for Hebrew text rendering */
            .hebrew-text {
              font-feature-settings: 'kern' 1;
              text-rendering: optimizeLegibility;
            }
            
            /* RTL specific styles */
            .rtl {
              direction: rtl;
              text-align: right;
            }
            
            .ltr {
              direction: ltr;
              text-align: left;
            }
          `
        }} />
      </Head>
      <body className="hebrew-text">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 