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
  const [isLoaded, setIsLoaded] = useState(false);
  
  // טעינת שפה מ-localStorage רק אחרי שהקומפוננטה נטענת
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLanguage = localStorage.getItem('gabiPortfolioLanguage');
        console.log('🔍 Checking saved language:', savedLanguage);
        
        if (savedLanguage === 'en' || savedLanguage === 'he') {
          console.log('✅ Setting language to:', savedLanguage);
          setLanguage(savedLanguage);
          document.documentElement.dir = savedLanguage === 'he' ? 'rtl' : 'ltr';
          document.documentElement.lang = savedLanguage;
        } else {
          console.log('🔧 No valid saved language, setting Hebrew as default');
          setLanguage('he');
          localStorage.setItem('gabiPortfolioLanguage', 'he');
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'he';
        }
      } catch (error) {
        console.error('Error loading language:', error);
        setLanguage('he');
      } finally {
        setIsLoaded(true);
      }
    }
  }, []);
  
  // פונקציה לשינוי השפה
  const handleSetLanguage = (newLang) => {
    console.log('🔄 Changing language to:', newLang);
    setLanguage(newLang);
    
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('gabiPortfolioLanguage', newLang);
        document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLang;
        console.log('✅ Language saved successfully:', newLang);
      } catch (error) {
        console.error('Error saving language:', error);
      }
    }
  };
  
  // הצגת מסך טעינה עד שהשפה נטענת
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>טוען...</p>
        </div>
      </div>
    );
  }
  
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