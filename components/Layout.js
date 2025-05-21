import React from "react";

export default function Layout({ children }) {
  return (
    <div className="font-sans">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        :root {
          --background: #050505;
          --foreground: #ffffff;
          --accent: #6d28d9;
          --accent-light: #a78bfa;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background-color: var(--background);
          color: var(--foreground);
          scrollbar-width: thin;
          scrollbar-color: var(--accent) var(--background);
        }
        
        /* CSS for marquee animation */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
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