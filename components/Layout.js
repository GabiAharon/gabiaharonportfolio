import React from "react";
import Head from "next/head";

export default function Layout({ children, language = 'he' }) {
  return (
    <div className={`font-sans ${language === 'he' ? 'font-heebo' : 'font-inter'}`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </Head>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Heebo:wght@300;400;500;600;700;800&display=swap');
        
        :root {
          --background: #050505;
          --foreground: #ffffff;
          --accent: #6d28d9;
          --accent-light: #a78bfa;
        }
        
        body {
          font-family: 'Heebo', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background-color: var(--background);
          color: var(--foreground);
          scrollbar-width: thin;
          scrollbar-color: var(--accent) var(--background);
        }
        
        /* Direction-specific styles */
        .rtl {
          direction: rtl;
          text-align: right;
        }
        
        .ltr {
          direction: ltr;
          text-align: left;
        }
        
        /* Font family specific */
        .font-heebo {
          font-family: 'Heebo', sans-serif;
        }
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        
        /* CSS for marquee animation */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        /* RTL marquee */
        .rtl .animate-marquee {
          animation-direction: reverse;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: var(--accent);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: var(--accent-light);
        }
      `}</style>
      {children}
    </div>
  );
} 