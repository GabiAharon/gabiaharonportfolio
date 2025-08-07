import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Globe, Code, X, Edit3, Save, Trash2, Download, Upload, Copy, Plus, Star, Quote } from "lucide-react";
import Link from 'next/link';
import { useLanguage } from './_app';

// נתוני המלצות ראשוניים (פיקטיביים לתחילה)
const initialTestimonialsData = [
  {
    id: 1,
    name: { he: "דר' שרה כהן", en: "Dr. Sarah Cohen" },
    title: { 
      he: "מנהלת משאבי אנוש, חברת טכנולוגיה מובילה", 
      en: "HR Director, Leading Tech Company" 
    },
    content: {
      he: "גבי הוא מרצה יוצא דופן. ההרצה שלו על שפת גוף בפגישות וירטואליות שינתה לחלוטין את האופן שבו הצוות שלנו מתנהל במפגשים מרחוק. הכלים הפרקטיים שהוא נתן מיושמים אצלנו עד היום.",
      en: "Gabi is an exceptional speaker. His lecture on body language in virtual meetings completely changed how our team conducts remote meetings. The practical tools he provided are still being used by us today."
    },
    company: { he: "טק-איל בע\"מ", en: "Tech-Il Ltd." },
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    date: "2024-11-01"
  },
  {
    id: 2,
    name: { he: "מר אורי לוי", en: "Mr. Uri Levy" },
    title: { 
      he: "מנכ\"ל, חברת יעוץ עסקי", 
      en: "CEO, Business Consulting Firm" 
    },
    content: {
      he: "הזמנתי את גבי להרצות בכנס השנתי שלנו. התגובות היו מדהימות! המשתתפים עדיין מדברים על ההרצה ומיישמים את הטכניקות שלמד איתו. מרצה שיודע להעביר תוכן מורכב בצורה פשוטה ומרתקת.",
      en: "I invited Gabi to speak at our annual conference. The response was amazing! Participants are still talking about the lecture and implementing the techniques they learned with him. A speaker who knows how to convey complex content in a simple and fascinating way."
    },
    company: { he: "לוי ושות' ייעוץ עסקי", en: "Levy & Partners Business Consulting" },
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    date: "2024-10-15"
  },
  {
    id: 3,
    name: { he: "גב' דנה אביב", en: "Ms. Dana Aviv" },
    title: { 
      he: "מנהלת הדרכות, רשת גדולה", 
      en: "Training Manager, Large Chain" 
    },
    content: {
      he: "גבי הגיע אלינו להדריך את מנהלי המכירות על שפת גוף ונוכחות במכירות. התוצאות היו מיידיות - עלייה של 25% בשביעות רצון הלקוחות ושיפור משמעותי בתוצאות המכירות. בהחלט נזמין שוב!",
      en: "Gabi came to train our sales managers on body language and sales presence. The results were immediate - a 25% increase in customer satisfaction and significant improvement in sales results. We will definitely invite him again!"
    },
    company: { he: "רשת חנויות מובילה", en: "Leading Retail Chain" },
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    date: "2024-09-20"
  },
  {
    id: 4,
    name: { he: "פרופ' מיכאל רוזן", en: "Prof. Michael Rosen" },
    title: { 
      he: "ראש החוג לתקשורת, אוניברסיטה מובילה", 
      en: "Head of Communications Department, Leading University" 
    },
    content: {
      he: "גבי מציג גישה מחקרית ומבוססת מדעית לשפת הגוף, תוך שמירה על הנגישות והרלוונטיות למטרות יומיומיות. ההרצאות שלו משלבות תיאוריה ופרקטיקה בצורה מושלמת. תוסף חשוב לכל ארגון שרוצה לשפר את התקשורת שלו.",
      en: "Gabi presents a research-based and scientifically grounded approach to body language, while maintaining accessibility and relevance for everyday purposes. His lectures perfectly combine theory and practice. An important addition for any organization that wants to improve its communication."
    },
    company: { he: "האוניברסיטה העברית", en: "Hebrew University" },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    date: "2024-08-30"
  }
];

// תרגומים לעמוד המלצות
const testimonialsTranslations = {
  he: {
    pageTitle: "המלצות ומשובים",
    pageSubtitle: "מה אומרים על ההרצאות וההדרכות שלי",
    backHome: "חזרה לדף הבית",
    switchLanguage: "English",
    editMode: "מצב עריכה",
    exitEditMode: "יציאה ממצב עריכה",
    addTestimonial: "הוסף המלצה",
    editTestimonial: "ערוך המלצה",
    saveChanges: "שמור שינויים",
    deleteTestimonial: "מחק המלצה",
    duplicateTestimonial: "שכפל המלצה",
    name: "שם",
    title: "תואר ותפקיד",
    company: "חברה/ארגון",
    content: "תוכן ההמלצה",
    rating: "דירוג (1-5 כוכבים)",
    imageUrl: "כתובת תמונה",
    noTestimonials: "אין המלצות כרגע",
    editingInstructions: "במצב עריכה: לחץ על כפתורי העריכה (🧡) כדי לערוך המלצות",
    confirmDelete: "האם אתה בטוח שברצונך למחוק המלצה זו?",
    savedSuccessfully: "ההמלצה נשמרה בהצלחה!",
    deletedSuccessfully: "ההמלצה נמחקה בהצלחה!",
    addedSuccessfully: "ההמלצה נוספה בהצלחה!",
    certificateSection: "תעודות והסמכות",
    certificateSubtitle: "הסמכות רשמיות בתחום שפת הגוף ותקשורת",
    masterBodyLanguage: "מאסטר בשפת גוף",
    expertBodyLanguage: "מאסטר מומחה בשפת גוף",
    viewCertificate: "הצג תעודה",
    certificateInfo: "לחץ על התעודה להגדלה"
  },
  en: {
    pageTitle: "Testimonials & Reviews",
    pageSubtitle: "What they say about my lectures and training sessions",
    backHome: "Back to Home",
    switchLanguage: "עברית",
    editMode: "Edit Mode",
    exitEditMode: "Exit Edit Mode",
    addTestimonial: "Add Testimonial",
    editTestimonial: "Edit Testimonial",
    saveChanges: "Save Changes",
    deleteTestimonial: "Delete Testimonial",
    duplicateTestimonial: "Duplicate Testimonial",
    name: "Name",
    title: "Title & Position",
    company: "Company/Organization",
    content: "Testimonial Content",
    rating: "Rating (1-5 stars)",
    imageUrl: "Image URL",
    noTestimonials: "No testimonials yet",
    editingInstructions: "Edit Mode: Click the edit buttons (🧡) to edit testimonials",
    confirmDelete: "Are you sure you want to delete this testimonial?",
    savedSuccessfully: "Testimonial saved successfully!",
    deletedSuccessfully: "Testimonial deleted successfully!",
    addedSuccessfully: "Testimonial added successfully!",
    certificateSection: "Certificates & Credentials",
    certificateSubtitle: "Official certifications in body language and communication",
    masterBodyLanguage: "Master in Body Language",
    expertBodyLanguage: "Expert Master in Body Language",
    viewCertificate: "View Certificate",
    certificateInfo: "Click on certificate to enlarge"
  }
};

export default function Testimonials() {
  const { language, setLanguage } = useLanguage();
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [editForm, setEditForm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showAdminButton, setShowAdminButton] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  
  // וידוא שהשפה היא עברית בטעינה ראשונית
  useEffect(() => {
    if (language !== 'he') {
      setLanguage('he');
    }
  }, []);
  
  // טעינת נתונים
  useEffect(() => {
    loadTestimonialsData();
    
    // הוספת מאזין לקיצור מקלדת סודי (Ctrl+Shift+A)
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        setShowAdminButton(true);
        setTimeout(() => setShowAdminButton(false), 10000);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const loadTestimonialsData = async () => {
    try {
      const savedData = localStorage.getItem('testimonialsData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setTestimonialsData(parsedData);
        setIsLoading(false);
        return;
      }

      const response = await fetch('/data/testimonials-data.json');
      if (response.ok) {
        const data = await response.json();
        setTestimonialsData(data);
      } else {
        setTestimonialsData(initialTestimonialsData);
      }
    } catch (error) {
      console.error('Error loading testimonials data:', error);
      setTestimonialsData(initialTestimonialsData);
    } finally {
      setIsLoading(false);
    }
  };
  
  const saveToLocalStorage = (data) => {
    try {
      localStorage.setItem('testimonialsData', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  };

  const downloadUpdatedData = (data) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'testimonials-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const uploadDataFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            if (Array.isArray(data) && data.length > 0) {
              setTestimonialsData(data);
              saveToLocalStorage(data);
              alert('✅ הנתונים הועלו בהצלחה!');
            } else {
              alert('❌ קובץ לא תקין. וודא שזה קובץ JSON עם נתוני המלצות.');
            }
          } catch (error) {
            alert('❌ שגיאה בקריאת הקובץ. וודא שזה קובץ JSON תקין.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const resetToOriginalData = async () => {
    if (confirm('האם אתה בטוח שברצונך לאפס את כל השינויים ולחזור לנתונים המקוריים?')) {
      try {
        setTestimonialsData(initialTestimonialsData);
        saveToLocalStorage(initialTestimonialsData);
        setEditingTestimonial(null);
        setEditForm({});
        alert('הנתונים אופסו למצב המקורי!');
      } catch (error) {
        alert('שגיאה באיפוס הנתונים');
      }
    }
  };
  
  const t = (key) => {
    if (!language) return key;
    return testimonialsTranslations[language]?.[key] || key;
  };

  const toggleLanguage = () => {
    const newLang = language === 'he' ? 'en' : 'he';
    setLanguage(newLang);
  };

  const checkAdminAccess = () => {
    const password = prompt('הכנס סיסמת אדמין:');
    const adminPassword = 'gabi2024';
    
    if (password && password === adminPassword) {
      setIsEditMode(true);
      alert('מצב עריכה מופעל! כעת תוכל לערוך המלצות.');
    } else if (password !== null && password !== '') {
      alert('סיסמה שגויה');
    }
  };

  const startEditingTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial.id);
    setEditForm({
      name: { ...testimonial.name },
      title: { ...testimonial.title },
      company: { ...testimonial.company },
      content: { ...testimonial.content },
      rating: testimonial.rating,
      image: testimonial.image
    });
  };

  const saveTestimonialChanges = async () => {
    const updatedTestimonials = testimonialsData.map(testimonial => {
      if (testimonial.id === editingTestimonial) {
        return {
          ...testimonial,
          name: editForm.name,
          title: editForm.title,
          company: editForm.company,
          content: editForm.content,
          rating: editForm.rating,
          image: editForm.image
        };
      }
      return testimonial;
    });
    
    setTestimonialsData(updatedTestimonials);
    setEditingTestimonial(null);
    setEditForm({});
    
    saveToLocalStorage(updatedTestimonials);
    
    const githubSaved = await saveToGitHub(updatedTestimonials);
    
    if (githubSaved) {
      alert('🎉 ההמלצה נשמרה בהצלחה!\n✅ נשמר לגיטהאב אוטומטית');
    } else {
      alert('⚠️ ההמלצה נשמרה מקומית\n❌ שגיאה בשמירה לגיטהאב');
    }
  };

  const cancelEditing = () => {
    setEditingTestimonial(null);
    setEditForm({});
  };

  // תרגום ידני של כל השדות
  const translateAllFields = async () => {
    if (!editingTestimonial) return;
    
    const otherLang = language === 'he' ? 'en' : 'he';
    const confirmTranslation = confirm(`לתרגם את כל השדות ל${otherLang === 'he' ? 'עברית' : 'אנגלית'}?`);
    
    if (confirmTranslation) {
      setIsTranslating(true);
      
      // תרגום שם
      if (editForm.name?.[language]) {
        const translatedName = await translateText(editForm.name[language], otherLang);
        setEditForm(prev => ({
          ...prev,
          name: { ...prev.name, [otherLang]: translatedName }
        }));
      }
      
      // תרגום תפקיד
      if (editForm.title?.[language]) {
        const translatedTitle = await translateText(editForm.title[language], otherLang);
        setEditForm(prev => ({
          ...prev,
          title: { ...prev.title, [otherLang]: translatedTitle }
        }));
      }
      
      // תרגום חברה
      if (editForm.company?.[language]) {
        const translatedCompany = await translateText(editForm.company[language], otherLang);
        setEditForm(prev => ({
          ...prev,
          company: { ...prev.company, [otherLang]: translatedCompany }
        }));
      }
      
      // תרגום תוכן
      if (editForm.content?.[language]) {
        const translatedContent = await translateText(editForm.content[language], otherLang);
        setEditForm(prev => ({
          ...prev,
          content: { ...prev.content, [otherLang]: translatedContent }
        }));
      }
      
      setIsTranslating(false);
      alert(`✅ כל השדות תורגמו ל${otherLang === 'he' ? 'עברית' : 'אנגלית'} בהצלחה!`);
    }
  };

  const duplicateTestimonial = (testimonial) => {
    const newId = Math.max(...testimonialsData.map(t => t.id)) + 1;
    const duplicatedTestimonial = {
      ...testimonial,
      id: newId,
      name: { 
        he: testimonial.name.he + " (עותק)", 
        en: testimonial.name.en + " (Copy)" 
      },
      date: new Date().toISOString().split('T')[0]
    };
    
    const updatedTestimonials = [...testimonialsData, duplicatedTestimonial];
    setTestimonialsData(updatedTestimonials);
    saveToLocalStorage(updatedTestimonials);
    
    alert(`✅ ההמלצה שוכפלה בהצלחה!`);
  };

  const deleteTestimonial = async (testimonial) => {
    if (confirm(`האם אתה בטוח שברצונך למחוק את ההמלצה?\n"${testimonial.name[language]}"\n\n⚠️ פעולה זו אינה ניתנת לביטול!`)) {
      const updatedTestimonials = testimonialsData.filter(t => t.id !== testimonial.id);
      setTestimonialsData(updatedTestimonials);
      saveToLocalStorage(updatedTestimonials);
      
      const githubSaved = await saveToGitHub(updatedTestimonials);
      
      if (githubSaved) {
        alert('🗑️ ההמלצה נמחקה בהצלחה!\n✅ נשמר לגיטהאב אוטומטית');
      } else {
        alert('🗑️ ההמלצה נמחקה מקומית\n❌ שגיאה בשמירה לגיטהאב');
      }
    }
  };

  const createNewTestimonial = () => {
    const newId = Math.max(...testimonialsData.map(t => t.id), 0) + 1;
    const currentDate = new Date().toISOString().split('T')[0];
    
    const newTestimonial = {
      id: newId,
      name: { 
        he: "שם חדש", 
        en: "New Name" 
      },
      title: { 
        he: "תפקיד חדש", 
        en: "New Position" 
      },
      company: { 
        he: "חברה חדשה", 
        en: "New Company" 
      },
      content: {
        he: "תוכן ההמלצה החדשה...",
        en: "New testimonial content..."
      },
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      date: currentDate
    };
    
    const updatedTestimonials = [newTestimonial, ...testimonialsData];
    setTestimonialsData(updatedTestimonials);
    saveToLocalStorage(updatedTestimonials);
    
    startEditingTestimonial(newTestimonial);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    alert(`✅ נוצרה המלצה חדשה!\nכעת ערוך את הפרטים לפי הצורך.`);
  };

  const saveToGitHub = async (data) => {
    try {
      let githubToken = localStorage.getItem('githubToken');
      let repoOwner = localStorage.getItem('githubUsername');
      let repoName = localStorage.getItem('githubRepo');
      
      if (!githubToken || !repoOwner || !repoName) {
        const defaultOwner = 'GabiAharon';
        const defaultRepo = 'gabiaharonportfolio';
        
        const userChoice = confirm(`🚀 הגדרת GitHub אוטומטית

האם ברצונך להשתמש בהגדרות הריפו שלך?
${defaultOwner}/${defaultRepo}

✅ כן - להמשיך עם הריפו שלי
❌ לא - אני רוצה להגדיר פרטים אחרים`);
        
        if (userChoice) {
          repoOwner = defaultOwner;
          repoName = defaultRepo;
          githubToken = prompt(`🔑 הכנס את הטוקן שלך:`);
        } else {
          const userDetails = prompt(`🔧 הגדרת GitHub ידנית:

הכנס בפורמט הבא:
שם_משתמש/שם_ריפו/טוקן`);
          
          if (!userDetails) {
            throw new Error('נדרשים פרטי GitHub');
          }
          
          const parts = userDetails.split('/');
          if (parts.length !== 3) {
            throw new Error('פורמט לא נכון');
          }
          
          repoOwner = parts[0].trim();
          repoName = parts[1].trim();
          githubToken = parts[2].trim();
        }
        
        if (!githubToken) {
          throw new Error('נדרש טוקן GitHub');
        }
        
        localStorage.setItem('githubUsername', repoOwner);
        localStorage.setItem('githubRepo', repoName);
        localStorage.setItem('githubToken', githubToken);
      }
      
      const fileContent = JSON.stringify(data, null, 2);
      const base64Content = btoa(unescape(encodeURIComponent(fileContent)));
      
      const currentFileResponse = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/data/testimonials-data.json`,
        {
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
          }
        }
      );
      
      let sha = null;
      if (currentFileResponse.ok) {
        const currentFile = await currentFileResponse.json();
        sha = currentFile.sha;
      }

      const commitResponse = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/data/testimonials-data.json`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `🔄 עדכון אוטומטי של נתוני המלצות - ${new Date().toLocaleString('he-IL')}`,
            content: base64Content,
            sha: sha
          })
        }
      );

      if (!commitResponse.ok) {
        const errorData = await commitResponse.json();
        throw new Error(`שגיאה בשמירה לגיטהאב: ${errorData.message || 'שגיאה לא ידועה'}`);
      }

      try {
        const publicFileResponse = await fetch(
          `https://api.github.com/repos/${repoOwner}/${repoName}/contents/public/data/testimonials-data.json`,
          {
            headers: {
              'Authorization': `token ${githubToken}`,
              'Accept': 'application/vnd.github.v3+json',
            }
          }
        );
        
        let publicSha = null;
        if (publicFileResponse.ok) {
          const publicFile = await publicFileResponse.json();
          publicSha = publicFile.sha;
          
          await fetch(
            `https://api.github.com/repos/${repoOwner}/${repoName}/contents/public/data/testimonials-data.json`,
            {
              method: 'PUT',
              headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                message: `🔄 עדכון אוטומטי של נתוני המלצות (public) - ${new Date().toLocaleString('he-IL')}`,
                content: base64Content,
                sha: publicSha
              })
            }
          );
        } else {
          await fetch(
            `https://api.github.com/repos/${repoOwner}/${repoName}/contents/public/data/testimonials-data.json`,
            {
              method: 'PUT',
              headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                message: `🔄 יצירת קובץ נתוני המלצות (public) - ${new Date().toLocaleString('he-IL')}`,
                content: base64Content
              })
            }
          );
        }
      } catch (publicError) {
        console.error('שגיאה בעדכון תיקיית public:', publicError);
      }

      return true;
    } catch (error) {
      console.error('Error saving to GitHub:', error);
      
      if (error.message && (error.message.includes('401') || error.message.includes('token'))) {
        localStorage.removeItem('githubToken');
        localStorage.removeItem('githubUsername');
        localStorage.removeItem('githubRepo');
      }
      
      return false;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
      />
    ));
  };

  // פונקציה לתרגום טקסט מעברית לאנגלית ולהיפך
  const translateText = async (text, targetLang) => {
    try {
      setIsTranslating(true);
      
      // אפשר להשתמש ב-Google Translate API או שירות אחר
      // לצורך הדוגמה נשתמש ב-API חינמי פשוט
      const sourceLang = targetLang === 'en' ? 'he' : 'en';
      
      // כאן תוכל להחליף לשירות תרגום אמיתי
      // לדוגמה מתרגמים שורת טקסט פשוטה באופן בסיסי
      let translatedText = "";
      
      // תרגום בסיסי ללא API (דוגמה פשוטה בלבד)
      // בפרויקט אמיתי מומלץ להשתמש ב-API תרגום
      if (sourceLang === 'he' && targetLang === 'en') {
        // תרגום בסיסי עברית -> אנגלית
        translatedText = await simulateTranslation(text, 'he-to-en');
      } else {
        // תרגום בסיסי אנגלית -> עברית
        translatedText = await simulateTranslation(text, 'en-to-he');
      }
      
      setIsTranslating(false);
      return translatedText;
    } catch (error) {
      console.error('שגיאה בתרגום:', error);
      setIsTranslating(false);
      return text; // במקרה של שגיאה מחזירים את הטקסט המקורי
    }
  };
  
  // פונקציית סימולציה לתרגום (בשימוש ללא API אמיתי)
  const simulateTranslation = (text, direction) => {
    // מחזירים הבטחה שמתרגמת לאחר עיכוב של חצי שנייה
    return new Promise((resolve) => {
      setTimeout(() => {
        // תרגום בסיסי לדוגמה - במציאות תשתמש ב-API אמיתי
        if (direction === 'he-to-en') {
          // כאן תוכל לשים מילון בסיסי של מילים נפוצות בהמלצות
          const translationMap = {
            'מנהל': 'Manager',
            'המלצה': 'Recommendation',
            'הרצאה': 'Lecture',
            'סדנה': 'Workshop',
            'מרצה': 'Lecturer',
            'מצוין': 'Excellent',
            'מעולה': 'Great',
            'חברה': 'Company',
            'ארגון': 'Organization',
            'עסק': 'Business',
            'מנכ"ל': 'CEO',
          };
          
          // תרגום בסיסי ביותר - רק להדגמה
          let result = text;
          Object.keys(translationMap).forEach(heWord => {
            result = result.replace(new RegExp(heWord, 'g'), translationMap[heWord]);
          });
          resolve(result);
        } else {
          // תרגום אנגלית לעברית
          const translationMap = {
            'Manager': 'מנהל',
            'Recommendation': 'המלצה',
            'Lecture': 'הרצאה',
            'Workshop': 'סדנה',
            'Lecturer': 'מרצה',
            'Excellent': 'מצוין',
            'Great': 'מעולה',
            'Company': 'חברה',
            'Organization': 'ארגון',
            'Business': 'עסק',
            'CEO': 'מנכ"ל',
          };
          
          let result = text;
          Object.keys(translationMap).forEach(enWord => {
            result = result.replace(new RegExp(enWord, 'g'), translationMap[enWord]);
          });
          resolve(result);
        }
      }, 500);
    });
  };

  // עדכון טופס עריכה עם תרגום אוטומטי
  const handleInputChange = async (e, field, lang) => {
    const { value } = e.target;
    
    // עדכון השפה הנוכחית בטופס
    setEditForm(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: value
      }
    }));
    
    // מתרגמים אוטומטית לשפה השנייה אם לא ריק
    if (value.trim() !== '') {
      const otherLang = lang === 'he' ? 'en' : 'he';
      
      // אם ערך השפה השנייה ריק או שהמשתמש סימן שהוא רוצה תרגום אוטומטי
      const shouldTranslate = !editForm[field]?.[otherLang] || 
                              editForm[field]?.[otherLang].trim() === '' ||
                              confirm(`לתרגם אוטומטית ל${otherLang === 'he' ? 'עברית' : 'אנגלית'}? 
(לחץ אישור כדי לתרגם, ביטול כדי להשאיר ללא שינוי)`);
      
      if (shouldTranslate) {
        const translatedText = await translateText(value, otherLang);
        
        setEditForm(prev => ({
          ...prev,
          [field]: {
            ...prev[field],
            [otherLang]: translatedText
          }
        }));
      }
    }
  };

  // נתוני תעודות ההסמכה
  const certificatesData = [
    {
      id: 'master-body-language',
      image: 'https://i.postimg.cc/8CyG7Xfk/image.jpg',
      title: { he: 'מאסטר בשפת גוף', en: 'Master in Body Language' },
      description: { 
        he: 'תעודת הסמכה רשמית המעידה על התמחות בניתוח והבנת שפת גוף', 
        en: 'Official certification demonstrating expertise in analyzing and understanding body language' 
      },
      date: '2021-05-15'
    },
    {
      id: 'expert-master-body-language',
      image: 'https://i.postimg.cc/PxPjYb1W/image.jpg',
      title: { he: 'מאסטר מומחה בשפת גוף', en: 'Expert Master in Body Language' },
      description: { 
        he: 'תעודת הסמכה מתקדמת המעידה על רמת מומחיות גבוהה בשפת גוף והבנת תקשורת בלתי מילולית', 
        en: 'Advanced certification demonstrating high level of expertise in body language and non-verbal communication' 
      },
      date: '2022-07-20'
    }
  ];

  return (
    <div className={`min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white ${language === 'he' ? 'rtl' : 'ltr'}`}>
      {/* לוגו */}
      <div className="absolute top-4 left-4 z-50">
        <Link href="/" className="flex items-center group">
          <img 
            src="https://i.postimg.cc/j5MJ3Rmz/image.png" 
            alt="Gabi Aharon Logo" 
            className="h-12 w-auto transition-transform duration-300 group-hover:scale-110"
          />
        </Link>
      </div>

      {/* כפתורי ניהול */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <button 
          onClick={toggleLanguage}
          className="bg-gray-800 p-2 rounded-full flex items-center gap-2 transition-all hover:bg-gray-700"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm">{t('switchLanguage')}</span>
        </button>
        
        {showAdminButton && (
          <button 
            onClick={checkAdminAccess}
            className="bg-gray-800 p-2 rounded-full flex items-center gap-2 transition-all hover:bg-gray-700"
            title={t('editMode')}
          >
            <Code className="w-4 h-4" />
          </button>
        )}
        
        {isEditMode && (
          <>
            <button 
              onClick={() => {
                setIsEditMode(false);
                setEditingTestimonial(null);
                setEditForm({});
              }}
              className="bg-red-600 p-2 rounded-full flex items-center gap-2 transition-all hover:bg-red-700"
              title={t('exitEditMode')}
            >
              <X className="w-4 h-4" />
            </button>

            <button 
              onClick={resetToOriginalData}
              className="bg-yellow-600 p-2 rounded-full flex items-center gap-2 transition-all hover:bg-yellow-700"
              title="איפוס לנתונים מקוריים"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button 
              onClick={() => downloadUpdatedData(testimonialsData)}
              className="bg-green-600 p-2 rounded-full flex items-center gap-2 transition-all hover:bg-green-700"
              title="הורד נתונים נוכחיים"
            >
              <Download className="w-4 h-4" />
            </button>

            <button 
              onClick={uploadDataFile}
              className="bg-blue-600 p-2 rounded-full flex items-center gap-2 transition-all hover:bg-blue-700"
              title="העלה קובץ נתונים"
            >
              <Upload className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* מחוון טעינה */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-gray-300">טוען נתוני המלצות...</p>
          </div>
        </div>
      ) : (
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
          {/* כותרת וניווט */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              <span>{t('backHome')}</span>
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                {t('pageTitle')}
              </h1>
              {isEditMode && (
                <div className="bg-red-600 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  <span>מצב עריכה פעיל</span>
                </div>
              )}
            </div>
            
            <p className="text-xl text-gray-300 max-w-3xl mb-4">
              {t('pageSubtitle')}
            </p>

            {/* הוראות עריכה */}
            {isEditMode && (
              <div className="bg-orange-900 bg-opacity-50 border border-orange-600 rounded-lg p-4 mb-6">
                <div className="flex flex-wrap items-center justify-between">
                  <p className="text-orange-200 text-sm mb-2 md:mb-0">
                    📝 {t('editingInstructions')}
                  </p>
                  
                  {isTranslating && (
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs animate-pulse">
                      &#x1F30E; מתרגם אוטומטית...
                    </span>
                  )}
                  
                  <button
                    onClick={createNewTestimonial}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t('addTestimonial')}</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* רשת ההמלצות */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <AnimatePresence>
              {testimonialsData.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className={`${editingTestimonial === testimonial.id ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'} p-0.5 rounded-xl h-full`}>
                    <div className="bg-gray-900 rounded-xl p-6 h-full">
                      {/* כפתורי עריכה */}
                      {isEditMode && (
                        <div className="flex justify-end mb-4">
                          {editingTestimonial === testimonial.id ? (
                            <div className="flex gap-1">
                              <button 
                                onClick={saveTestimonialChanges}
                                className="bg-green-600 hover:bg-green-700 text-white p-1 rounded-full transition-colors"
                                title="שמור שינויים"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={cancelEditing}
                                className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-full transition-colors"
                                title="בטל עריכה"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={translateAllFields}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-full transition-colors"
                                title={`תרגם ל${language === 'he' ? 'אנגלית' : 'עברית'}`}
                              >
                                <Globe className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-1">
                              <button 
                                onClick={() => startEditingTestimonial(testimonial)}
                                className="bg-orange-600 hover:bg-orange-700 text-white p-1 rounded-full transition-colors"
                                title="ערוך המלצה"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => duplicateTestimonial(testimonial)}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-full transition-colors"
                                title="שכפל המלצה"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => deleteTestimonial(testimonial)}
                                className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-full transition-colors"
                                title="מחק המלצה"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {editingTestimonial === testimonial.id ? (
                        /* מצב עריכה */
                        <div className="space-y-4">
                          <input
                            type="text"
                            placeholder={t('name')}
                            value={editForm.name?.[language] || ''}
                            onChange={(e) => handleInputChange(e, 'name', language)}
                            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm"
                          />
                          <input
                            type="text"
                            placeholder={t('title')}
                            value={editForm.title?.[language] || ''}
                            onChange={(e) => handleInputChange(e, 'title', language)}
                            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm"
                          />
                          <input
                            type="text"
                            placeholder={t('company')}
                            value={editForm.company?.[language] || ''}
                            onChange={(e) => handleInputChange(e, 'company', language)}
                            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm"
                          />
                          <textarea
                            placeholder={t('content')}
                            value={editForm.content?.[language] || ''}
                            onChange={(e) => handleInputChange(e, 'content', language)}
                            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm resize-none"
                            rows="4"
                          />
                          <input
                            type="number"
                            min="1"
                            max="5"
                            placeholder={t('rating')}
                            value={editForm.rating || ''}
                            onChange={(e) => setEditForm({ ...editForm, rating: parseInt(e.target.value) })}
                            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm"
                          />
                          <input
                            type="url"
                            placeholder={t('imageUrl')}
                            value={editForm.image || ''}
                            onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                            className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm"
                          />
                        </div>
                      ) : (
                        /* מצב תצוגה */
                        <>
                          {/* ציטוט */}
                          <div className="mb-4">
                            <Quote className="w-8 h-8 text-blue-400 mb-3" />
                            <p className="text-gray-100 italic leading-relaxed">
                              "{testimonial.content[language]}"
                            </p>
                          </div>

                          {/* דירוג */}
                          <div className="flex items-center gap-1 mb-4">
                            {renderStars(testimonial.rating)}
                          </div>

                          {/* פרטי הממליץ */}
                          <div className="flex items-center gap-4">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name[language]}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-semibold text-white">
                                {testimonial.name[language]}
                              </h3>
                              <p className="text-sm text-blue-300">
                                {testimonial.title[language]}
                              </p>
                              <p className="text-xs text-gray-400">
                                {testimonial.company[language]}
                              </p>
                            </div>
                          </div>

                          {/* תאריך */}
                          <div className="mt-4 text-xs text-gray-500">
                            {formatDate(testimonial.date)}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* אם אין המלצות */}
          {testimonialsData.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-gray-400">
                <Quote className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>{t('noTestimonials')}</p>
              </div>
            </motion.div>
          )}

          {/* תצוגת תעודות והסמכות */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-24"
          >
            <div className="border-b border-gray-700 pb-2 mb-12">
              <h2 className="text-3xl font-bold text-white mb-2">{t('certificateSection')}</h2>
              <p className="text-blue-300">{t('certificateSubtitle')}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {certificatesData.map((certificate, index) => (
                <motion.div
                  key={certificate.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                  className="group"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-0.5 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300">
                    <div className="bg-gray-900 rounded-lg p-6">
                      <div 
                        className="cursor-pointer overflow-hidden rounded-md transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/20"
                        onClick={() => setSelectedCertificate(certificate)}
                      >
                        <div className="relative">
                          <img 
                            src={certificate.image} 
                            alt={certificate.title[language]} 
                            className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                        </div>

                        <div className="mt-4">
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                            {certificate.title[language]}
                          </h3>
                          <p className="text-gray-400 mt-2 text-sm">
                            {certificate.description[language]}
                          </p>
                        </div>
                        
                        <div className="mt-4 flex items-center text-blue-400 text-sm">
                          <span className="mr-2">{t('certificateInfo')}</span>
                          <ArrowLeft className={`w-4 h-4 transition-transform duration-300 ${language === 'he' ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal להצגת תעודה מוגדלת */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute -top-12 right-0 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedCertificate.image}
                alt={selectedCertificate.title[language]}
                className="w-full h-auto object-contain rounded-lg shadow-2xl shadow-blue-500/30 max-h-[80vh]"
              />
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-white">
                  {selectedCertificate.title[language]}
                </h3>
                <p className="text-blue-300 mt-2">
                  {selectedCertificate.description[language]}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 