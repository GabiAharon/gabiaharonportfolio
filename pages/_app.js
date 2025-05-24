import '../styles/globals.css'
import Layout from '../components/Layout'
import { useState, createContext, useContext, useEffect } from 'react'

// יצירת קונטקסט שפה
export const LanguageContext = createContext({
  language: 'he',
  setLanguage: () => {},
  t: (key) => key,
});

// הוק לשימוש נוח בקונטקסט השפה
export const useLanguage = () => useContext(LanguageContext);

function MyApp({ Component, pageProps }) {
  // ברירת מחדל עברית
  const [language, setLanguage] = useState('he');
  
  // טעינת ההעדפה מהדפדפן אם זמינה - בוטל כדי שהעברית תהיה תמיד ברירת המחדל
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // איפוס כל העדפת שפה קודמת
      localStorage.removeItem('language');
      
      // הגדרת כיוון RTL כברירת מחדל
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'he';
      
      // בוטל על מנת לשים עברית כברירת מחדל תמיד
      /* 
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
      */
    }
  }, []);
  
  // עדכון ההעדפה בדפדפן בכל שינוי שפה
  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
      // עדכון כיוון המסמך
      document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  };
  
  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage: handleSetLanguage,
      }}
    >
      <Layout language={language}>
        <Component {...pageProps} />
      </Layout>
    </LanguageContext.Provider>
  )
}

export default MyApp 