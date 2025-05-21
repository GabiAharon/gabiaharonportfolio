import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="he" dir="rtl">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="description" content="Gabi Aharon - Lecturer, Mechanical Engineer, Expert in Body Language & Public Speaking" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 