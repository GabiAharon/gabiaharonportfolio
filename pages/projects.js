import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Calendar, Globe, Play, Code, X, Edit3, Save, Trash2, Download, Upload, Copy, ArrowUp, ArrowDown } from "lucide-react";
import Link from 'next/link';
import { useLanguage } from './_app';

// נתוני הפרויקטים (עם מידע מפורט לצפייה מהירה)
const initialProjectsData = [
  {
    id: 1,
    title: { he: "בוט שפת גוף לזום", en: "Body Language Bot for Zoom" },
    description: { 
      he: "תוסף לזום שמנתח את שפת הגוף של המשתתפים במפגש ונותן משוב בזמן אמת על רמת האנגייג'מנט והנוכחות.", 
      en: "A Zoom plugin that analyzes participants' body language during meetings and provides real-time feedback on engagement and presence levels." 
    },
    detailedDescription: {
      he: "פרויקט חדשני שמשלב בינה מלאכותית וראייה ממוחשבת לניתוח שפת גוף בזמן אמת במהלך פגישות זום. הכלי מזהה תנועות, הבעות פנים ותנוחות גוף ומספק משוב מיידי למארח הפגישה על רמת המעורבות של המשתתפים. מתאים במיוחד לארגונים שרוצים לשפר את יעילות הפגישות הוירטואליות שלהם.",
      en: "An innovative project that combines AI and computer vision for real-time body language analysis during Zoom meetings. The tool identifies movements, facial expressions and body postures and provides immediate feedback to the meeting host about participants' engagement levels. Perfect for organizations looking to improve their virtual meeting effectiveness."
    },
    category: "plugin",
    date: "2024-12-01",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
    link: "#zoom-body-language-bot",
    isVideo: false,
    technologies: ["AI", "Computer Vision", "Zoom SDK", "Python", "TensorFlow"],
    status: "בפיתוח",
    features: {
      he: ["ניתוח בזמן אמת", "משוב על מעורבות", "דוחות מפורטים", "אינטגרציה עם זום"],
      en: ["Real-time analysis", "Engagement feedback", "Detailed reports", "Zoom integration"]
    }
  },
  {
    id: 2,
    title: { he: "מחולל נוכחות AI", en: "AI Presence Generator" },
    description: { 
      he: "כלי שעוזר לדוברים לשפר את הנוכחות שלהם על הבמה באמצעות ניתוח תנועות גוף ומתן המלצות מותאמות אישית.", 
      en: "A tool that helps speakers improve their stage presence through body movement analysis and personalized recommendations." 
    },
    detailedDescription: {
      he: "אפליקציה מתקדמת שמשתמשת בבינה מלאכותית כדי לנתח ולשפר את הנוכחות הבמתית של דוברים. הכלי מנתח תנועות גוף, קול, קצב דיבור ויישור עם הקהל, ומספק המלצות מותאמות אישית לשיפור. כולל אימונים אינטראקטיביים וסימולציות של מצבי דיבור שונים.",
      en: "An advanced application that uses AI to analyze and improve speakers' stage presence. The tool analyzes body movements, voice, speech pace and audience alignment, providing personalized recommendations for improvement. Includes interactive training and simulations of various speaking scenarios."
    },
    category: "tool",
    date: "2024-11-15",
    image: "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=600&h=400&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    link: "#ai-presence-generator",
    isVideo: false,
    technologies: ["Machine Learning", "Motion Detection", "React", "Voice Analysis", "WebRTC"],
    status: "הושלם",
    features: {
      he: ["ניתוח תנועות גוף", "ניתוח קול", "המלצות אישיות", "אימונים אינטראקטיביים"],
      en: ["Body movement analysis", "Voice analysis", "Personal recommendations", "Interactive training"]
    }
  },
  {
    id: 3,
    title: { he: "Legends", en: "Legends" },
    description: { 
      he: "סרטון אישי על עולם הדימיונות, אגדות המוזיקה שמלוות אותי, והקשר בין חלומות למציאות.", 
      en: "A personal video about the world of imagination, music legends that accompany me, and the connection between dreams and reality." 
    },
    detailedDescription: {
      he: "מכירים את הרגע ההוא? הרגע שבו אתם נוסעים אל תוך עולם של דמיונות, אל אשליות, אל האדם שתמיד חלמתם להיות? את הטקסט הזה כתבתי לפני לא מעט זמן, והוא מספר על 'ספר הדימיונות' שכל אחד מאיתנו כותב במהלך החיים. בדמיון שלנו אנחנו יכולים להיות הכול, גם דברים שברור לנו שלעולם לא נהיה. התרופה עבורי (כמו בטח לא מעט מכם) לעולם האמיתי תמיד הייתה מוזיקה. בסרטון הזה ניסיתי לחבר בין המוזיקה, אגדות המוזיקה שאני מרגיש שמלוות אותי כל החיים, לבין מי ומה שאני ואולי כולנו מנסים להיות בעולם, כל אחד בדרך שלו.",
      en: "Do you know that moment? The moment when you travel into a world of fantasies, into illusions, into the person you always dreamed of being? I wrote this text quite some time ago, and it tells about the 'book of imagination' that each of us writes throughout life. In our imagination we can be everything, even things we know we will never be. The remedy for me (like probably many of you) to the real world has always been music. In this video I tried to connect between music, the music legends that I feel have accompanied me all my life, and who and what I and perhaps all of us are trying to be in the world, each in their own way."
    },
    category: "video",
    date: "2024-10-20",
    image: "https://images.unsplash.com/photo-1478720568477-b0ac8e6b9899?w=600&h=400&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    link: "https://vimeo.com/1086929819",
    isVideo: true,
    technologies: ["Video Production", "Storytelling", "Music", "Personal Expression"],
    status: "פורסם",
    features: {
      he: ["סיפור אישי", "חיבור בין מוזיקה לחלומות", "הרהורים על דמיון ומציאות", "ביטוי אומנותי"],
      en: ["Personal story", "Connection between music and dreams", "Reflections on imagination and reality", "Artistic expression"]
    }
  },
  {
    id: 4,
    title: { he: "שפת גוף דיגיטלית", en: "Digital Body Language" },
    description: { 
      he: "ניתוח מבוסס בינה מלאכותית של רמזים לא מילוליים בפגישות וירטואליות - כלי שעוזר למנהלים להבין טוב יותר את עובדיהם בעבודה מרחוק.", 
      en: "AI-powered analysis of non-verbal cues in virtual meetings - a tool that helps managers better understand their employees in remote work." 
    },
    detailedDescription: {
      he: "פלטפורמה מתקדמת לניתוח שפת הגוף הדיגיטלית במקום העבודה המודרני. הכלי מנתח דפוסי התנהגות בפגישות וירטואליות, כולל קשר עין, תנוחה, הבעות פנים ומעורבות. מספק לארגונים תובנות עמוקות על דינמיקות הצוות ומסייע בשיפור התקשורת והמוטיבציה בעבודה מרחוק.",
      en: "An advanced platform for analyzing digital body language in the modern workplace. The tool analyzes behavioral patterns in virtual meetings, including eye contact, posture, facial expressions and engagement. Provides organizations with deep insights into team dynamics and helps improve communication and motivation in remote work."
    },
    category: "tool",
    date: "2024-09-10",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
    link: "#digital-body-language",
    isVideo: false,
    technologies: ["OpenCV", "TensorFlow", "WebRTC", "React", "Node.js"],
    status: "בפיתוח",
    features: {
      he: ["ניתוח דפוסי התנהגות", "תובנות על דינמיקות צוות", "דוחות ממוחשבים", "אינטגרציה עם מערכות HR"],
      en: ["Behavioral pattern analysis", "Team dynamics insights", "Automated reports", "HR systems integration"]
    }
  },
  {
    id: 5,
    title: { he: "אפליקציית אימון נוכחות", en: "Presence Training App" },
    description: { 
      he: "אפליקציה מובילית שעוזרת למשתמשים להתרגל על דיבור מול קהל עם ניתוח מתקדם של שפת גוף ומתן משוב מיידי.", 
      en: "A mobile app that helps users practice public speaking with advanced body language analysis and instant feedback." 
    },
    detailedDescription: {
      he: "אפליקציה מובילית מהפכנית שהופכת את האימון על דיבור מול קהל לנגיש וחכם. האפליקציה מנתחת את תנועות הגוף, הבעות הפנים והקול בזמן אמת ומספקת משוב מיידי ומותאם אישית. כוללת תרגילים מדורגים, הקלטות לביקורת עצמית ומעקב אחר התקדמות לאורך זמן.",
      en: "A revolutionary mobile application that makes public speaking training accessible and smart. The app analyzes body movements, facial expressions and voice in real-time, providing immediate and personalized feedback. Includes graduated exercises, recordings for self-review and progress tracking over time."
    },
    category: "app",
    date: "2024-08-05",
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=600&h=400&fit=crop",
    detailImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    link: "#presence-training-app",
    isVideo: false,
    technologies: ["React Native", "AI Analysis", "Real-time Feedback", "Voice Recognition", "ML Kit"],
    status: "פורסם",
    features: {
      he: ["ניתוח בזמן אמת", "תרגילים מדורגים", "מעקב התקדמות", "הקלטות לביקורת"],
      en: ["Real-time analysis", "Graduated exercises", "Progress tracking", "Review recordings"]
    }
  }
];

// רשימת כלי AI זמינים
const availableAITools = [
  "Cursor AI",
  "Chat GPT", 
  "Claude AI",
  "Windsurf",
  "Gemini",
  "Imagenfx",
  "Sora",
  "Ideogram",
  "Midjourney",
  "Reve AI",
  "Kling AI",
  "Google Veo 2",
  "Google Veo 3",
  "Dreamina",
  "Pika Labs",
  "Higgsfiled",
  "Suno AI",
  "Eleven Labs",
  "Filmora"
];

// תרגומים מקומיים לעמוד
const projectTranslations = {
  he: {
    projectsPageTitle: "הפרויקטים שלי",
    projectsPageSubtitle: "אוסף של כלים, תוספים ויצירות שפיתחתי בתחום שפת הגוף והתקשורת",
    backHome: "חזרה לדף הבית",
    filterAll: "הכל",
    filterPlugin: "תוספים",
    filterTool: "כלים",
    filterVideo: "סרטונים",
    filterInterface: "ממשקים",
    filterApp: "אפליקציות",
    viewProject: "צפה בפרויקט",
    watchVideo: "צפה בסרטון",
    switchLanguage: "English",
    technologies: "כלי AI לפרויקט",
    status: "סטטוס",
    noProjects: "אין פרויקטים בקטגוריה זו כרגע",
    quickView: "צפייה מהירה",
    detailedDescription: "תיאור מפורט",
    keyFeatures: "תכונות עיקריות",
    goToProject: "עבור לפרויקט",
    editMode: "מצב עריכה",
    exitEditMode: "יציאה ממצב עריכה",
    saveChanges: "שמור שינויים",
    editProject: "ערוך פרויקט",
    projectTitle: "כותרת הפרויקט",
    projectDescription: "תיאור קצר",
    projectDetailedDescription: "תיאור מפורט",
    projectStatus: "סטטוס הפרויקט",
    projectFeatures: "תכונות הפרויקט (מופרדות בפסיק)",
    projectImage: "כתובת תמונת כרטיס",
    projectDetailImage: "כתובת תמונה מפורטת",
    changesMade: "השינויים נשמרו בהצלחה!",
    editingInstructions: "במצב עריכה: לחץ על כפתורי העריכה (🧡) כדי לערוך פרויקטים",
    imagePreview: "תצוגה מקדימה",
    enterImageUrl: "הכנס כתובת תמונה חדשה",
    aiTools: "כלי AI לפרויקט",
    selectAITools: "בחר כלי AI",
    addCustomTool: "הוסף כלי חדש",
    customToolPlaceholder: "שם כלי AI חדש"
  },
  en: {
    projectsPageTitle: "My Projects",
    projectsPageSubtitle: "A collection of tools, plugins, and creations I've developed in the field of body language and communication",
    backHome: "Back to Home",
    filterAll: "All",
    filterPlugin: "Plugins",
    filterTool: "Tools", 
    filterVideo: "Videos",
    filterInterface: "Interfaces",
    filterApp: "Apps",
    viewProject: "View Project",
    watchVideo: "Watch Video",
    switchLanguage: "עברית",
    technologies: "AI Tools for Project",
    status: "Status",
    noProjects: "No projects in this category yet",
    quickView: "Quick View",
    detailedDescription: "Detailed Description",
    keyFeatures: "Key Features",
    goToProject: "Go to Project",
    editMode: "Edit Mode",
    exitEditMode: "Exit Edit Mode",
    saveChanges: "Save Changes",
    editProject: "Edit Project",
    projectTitle: "Project Title",
    projectDescription: "Short Description",
    projectDetailedDescription: "Detailed Description",
    projectStatus: "Project Status",
    projectFeatures: "Project Features (comma separated)",
    projectImage: "Card Image URL",
    projectDetailImage: "Detail Image URL",
    changesMade: "Changes saved successfully!",
    editingInstructions: "Edit Mode: Click the edit buttons (🧡) to edit projects",
    imagePreview: "Preview",
    enterImageUrl: "Enter new image URL",
    aiTools: "AI Tools for Project",
    selectAITools: "Select AI Tools",
    addCustomTool: "Add Custom Tool",
    customToolPlaceholder: "New AI Tool Name"
  }
};

export default function Projects() {
  const { language, setLanguage } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingInModal, setEditingInModal] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [editForm, setEditForm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showAdminButton, setShowAdminButton] = useState(false);
  const [customAITools, setCustomAITools] = useState([]);
  const [selectedAITools, setSelectedAITools] = useState([]);
  const [newCustomTool, setNewCustomTool] = useState('');
  
  // וידוא שהשפה היא עברית בטעינה ראשונית
  useEffect(() => {
    if (language !== 'he') {
      setLanguage('he');
    }
  }, []);
  
  // טעינת נתונים מהקובץ JSON ו-localStorage
  useEffect(() => {
    loadProjectsData();
    
    // טעינת כלי AI מותאמים אישית מ-localStorage
    const savedCustomTools = localStorage.getItem('customAITools');
    if (savedCustomTools) {
      setCustomAITools(JSON.parse(savedCustomTools));
    }
    
    // הוספת מאזין לקיצור מקלדת סודי (Ctrl+Shift+A)
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        setShowAdminButton(true);
        setTimeout(() => setShowAdminButton(false), 10000); // מסתיר אחרי 10 שניות
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // פונקציה לקבלת כל כלי ה-AI הזמינים (מובנים + מותאמים אישית)
  const getAllAITools = () => {
    return [...availableAITools, ...customAITools];
  };

  // פונקציה להוספת כלי AI מותאם אישית
  const addCustomAITool = () => {
    if (newCustomTool.trim() && !getAllAITools().includes(newCustomTool.trim())) {
      const updatedCustomTools = [...customAITools, newCustomTool.trim()];
      setCustomAITools(updatedCustomTools);
      localStorage.setItem('customAITools', JSON.stringify(updatedCustomTools));
      setNewCustomTool('');
      
      // הוסף את הכלי החדש לרשימת הכלים הנבחרים
      setSelectedAITools([...selectedAITools, newCustomTool.trim()]);
    }
  };

  // פונקציה לטיפול בבחירת כלי AI
  const handleAIToolToggle = (tool) => {
    setSelectedAITools(prev => 
      prev.includes(tool) 
        ? prev.filter(t => t !== tool)
        : [...prev, tool]
    );
  };

  const loadProjectsData = async () => {
    try {
      // נסה לטעון נתונים מ-localStorage קודם
      const savedData = localStorage.getItem('projectsData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setProjectData(parsedData);
        setIsLoading(false);
        return;
      }

      // אם אין נתונים ב-localStorage, טען מהקובץ JSON
      const response = await fetch('/data/projects-data.json');
      if (response.ok) {
        const data = await response.json();
        setProjectData(data);
      } else {
        // במקרה של שגיאה, השתמש בנתונים הראשוניים
        setProjectData(initialProjectsData);
      }
    } catch (error) {
      console.error('Error loading projects data:', error);
      // במקרה של שגיאה, השתמש בנתונים הראשוניים
      setProjectData(initialProjectsData);
    } finally {
      setIsLoading(false);
    }
  };
  
  // פונקציה לשמירה ב-localStorage והורדת קובץ מעודכן
  const saveToLocalStorage = (data) => {
    try {
      localStorage.setItem('projectsData', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  };

  // פונקציה להורדת קובץ JSON מעודכן
  const downloadUpdatedData = (data) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'projects-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // פונקציה להעלאת קובץ נתונים
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
            // ולידציה בסיסית
            if (Array.isArray(data) && data.length > 0) {
              setProjectData(data);
              saveToLocalStorage(data);
              alert('✅ הנתונים הועלו בהצלחה!\nהפרויקטים עודכנו למצב החדש.');
            } else {
              alert('❌ קובץ לא תקין. וודא שזה קובץ JSON עם נתוני פרויקטים.');
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

  // פונקציה לאיפוס נתונים למקורי
  const resetToOriginalData = async () => {
    if (confirm('האם אתה בטוח שברצונך לאפס את כל השינויים ולחזור לנתונים המקוריים?')) {
      try {
        setProjectData(initialProjectsData);
        saveToLocalStorage(initialProjectsData);
        setEditingProject(null);
        setEditingInModal(false);
        setEditForm({});
        alert('הנתונים אופסו למצב המקורי!');
      } catch (error) {
        alert('שגיאה באיפוס הנתונים');
      }
    }
  };
  
  // פונקציה לתרגום
  const t = (key) => {
    if (!language) return key;
    return projectTranslations[language]?.[key] || key;
  };

  // פונקציה להחלפת השפה
  const toggleLanguage = () => {
    const newLang = language === 'he' ? 'en' : 'he';
    setLanguage(newLang);
  };

  // פונקציה להחלפת השפה
  const checkAdminAccess = () => {
    const password = prompt('הכנס סיסמת אדמין:');
    // השתמש בסיסמה הקבועה 'gabi2024'
    const adminPassword = 'gabi2024';
    
    if (password && password === adminPassword) {
      setIsEditMode(true);
      alert('מצב עריכה מופעל! כעת תוכל לערוך פרויקטים.');
    } else if (password !== null && password !== '') {
      alert('סיסמה שגויה');
    }
  };

  // פונקציה להתחלת עריכה של פרויקט
  const startEditingProject = (project, inModal = false) => {
    setEditingProject(project.id);
    setEditingInModal(inModal);
    setSelectedAITools(project.technologies || []);
    setEditForm({
      title: { ...project.title },
      description: { ...project.description },
      detailedDescription: { ...project.detailedDescription },
      category: project.category,
      status: project.status,
      technologies: project.technologies.join(', '),
      features: {
        he: project.features.he.join(', '),
        en: project.features.en.join(', ')
      },
      image: project.image,
      detailImage: project.detailImage,
      link: project.link || ''
    });
  };

  // פונקציה לשמירת שינויים
  const saveProjectChanges = async () => {
    const updatedProjects = projectData.map(project => {
      if (project.id === editingProject) {
        return {
          ...project,
          title: editForm.title,
          description: editForm.description,
          detailedDescription: editForm.detailedDescription,
          category: editForm.category,
          status: editForm.status,
          technologies: selectedAITools.length > 0 ? selectedAITools : (editForm.technologies ? editForm.technologies.split(',').map(t => t.trim()) : project.technologies),
          features: {
            he: editForm.features.he.split(',').map(f => f.trim()),
            en: editForm.features.en.split(',').map(f => f.trim())
          },
          image: editForm.image,
          detailImage: editForm.detailImage,
          link: editForm.link || project.link,
          isVideo: editForm.category === 'video' ? true : (editForm.category && editForm.category !== 'video' ? false : project.isVideo)
        };
      }
      return project;
    });
    
    setProjectData(updatedProjects);
    
    // עדכון הפרויקט הנבחר אם אנחנו עורכים במודל
    if (editingInModal && selectedProject) {
      const updatedProject = updatedProjects.find(p => p.id === selectedProject.id);
      setSelectedProject(updatedProject);
    }
    
    setEditingProject(null);
    setEditingInModal(false);
    setEditForm({});
    setSelectedAITools([]);
    
    // עדכון נתונים ב-localStorage
    saveToLocalStorage(updatedProjects);
    
    // שמירה אוטומטית לגיטהאב
    const githubSaved = await saveToGitHub(updatedProjects);
    
    if (githubSaved) {
      alert('🎉 השינויים נשמרו בהצלחה!\n✅ נשמר לגיטהאב אוטומטית\n🔄 האתר יתעדכן תוך דקה-שתיים');
    } else {
      alert('⚠️ השינויים נשמרו מקומית\n❌ שגיאה בשמירה לגיטהאב\n\n💡 בדוק את הטוקן או נסה שוב');
    }
  };

  // פונקציה לביטול עריכה
  const cancelEditing = () => {
    setEditingProject(null);
    setEditingInModal(false);
    setEditForm({});
    setSelectedAITools([]);
  };

  // פונקציה לשכפול פרויקט
  const duplicateProject = (project) => {
    const newId = Math.max(...projectData.map(p => p.id)) + 1;
    const duplicatedProject = {
      ...project,
      id: newId,
      title: { 
        he: project.title.he + " (עותק)", 
        en: project.title.en + " (Copy)" 
      },
      date: new Date().toISOString().split('T')[0] // תאריך היום
    };
    
    const updatedProjects = [...projectData, duplicatedProject];
    setProjectData(updatedProjects);
    saveToLocalStorage(updatedProjects);
    
    alert(`✅ הפרויקט שוכפל בהצלחה!\nID חדש: ${newId}`);
  };

  // פונקציה למחיקת פרויקט
  const deleteProject = async (project) => {
    if (confirm(`האם אתה בטוח שברצונך למחוק את הפרויקט?\n"${project.title[language]}"\n\n⚠️ פעולה זו אינה ניתנת לביטול!`)) {
      const updatedProjects = projectData.filter(p => p.id !== project.id);
      setProjectData(updatedProjects);
      saveToLocalStorage(updatedProjects);
      
      // אם אנחנו במודל והפרויקט הנמחק הוא הפתוח - סגור את המודל
      if (selectedProject && selectedProject.id === project.id) {
        setSelectedProject(null);
        setEditingInModal(false);
        setEditingProject(null);
      }
      
      // שמירה אוטומטית לגיטהאב
      const githubSaved = await saveToGitHub(updatedProjects);
      
      if (githubSaved) {
        alert('🗑️ הפרויקט נמחק בהצלחה!\n✅ נשמר לגיטהאב אוטומטית');
      } else {
        alert('🗑️ הפרויקט נמחק מקומית\n❌ שגיאה בשמירה לגיטהאב');
      }
    }
  };

  // פונקציה להזזת פרויקט מעלה
  const moveProjectUp = async (project) => {
    const currentIndex = projectData.findIndex(p => p.id === project.id);
    if (currentIndex <= 0) return; // כבר במיקום הראשון או לא נמצא
    
    const updatedProjects = [...projectData];
    // החלפת מקומות עם הפרויקט שלמעלה
    [updatedProjects[currentIndex - 1], updatedProjects[currentIndex]] = 
    [updatedProjects[currentIndex], updatedProjects[currentIndex - 1]];
    
    setProjectData(updatedProjects);
    saveToLocalStorage(updatedProjects);
    
    // שמירה אוטומטית לגיטהאב
    await saveToGitHub(updatedProjects);
  };

  // פונקציה להזזת פרויקט מטה
  const moveProjectDown = async (project) => {
    const currentIndex = projectData.findIndex(p => p.id === project.id);
    if (currentIndex >= projectData.length - 1 || currentIndex === -1) return; // כבר במיקום האחרון או לא נמצא
    
    const updatedProjects = [...projectData];
    // החלפת מקומות עם הפרויקט שלמטה
    [updatedProjects[currentIndex], updatedProjects[currentIndex + 1]] = 
    [updatedProjects[currentIndex + 1], updatedProjects[currentIndex]];
    
    setProjectData(updatedProjects);
    saveToLocalStorage(updatedProjects);
    
    // שמירה אוטומטית לגיטהאב
    await saveToGitHub(updatedProjects);
  };

  // סינון פרויקטים לפי קטגוריה
  const filteredProjects = selectedCategory === 'all' 
    ? projectData 
    : projectData.filter(project => project.category === selectedCategory);

  // קטגוריות זמינות
  const categories = [
    { id: 'all', label: t('filterAll'), icon: '🔖' },
    { id: 'plugin', label: t('filterPlugin'), icon: '🔧' },
    { id: 'tool', label: t('filterTool'), icon: '⚙️' },
    { id: 'video', label: t('filterVideo'), icon: '🎥' },
    { id: 'interface', label: t('filterInterface'), icon: '🎨' },
    { id: 'app', label: t('filterApp'), icon: '📱' }
  ];

  // פונקציה לעיצוב תאריך
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // פונקציה לקבלת צבע סטטוס
  const getStatusColor = (status) => {
    switch (status) {
      case 'הושלם':
      case 'פורסם':
        return 'bg-green-600';
      case 'בפיתוח':
        return 'bg-yellow-600';
      default:
        return 'bg-gray-600';
    }
  };

  // פונקציה לשמירה אוטומטית לגיטהאב
  const saveToGitHub = async (data) => {
    try {
      // קבלת הטוקן מהמשתמש (יופיע רק פעם אחת)
      let githubToken = localStorage.getItem('githubToken');
      let repoOwner = localStorage.getItem('githubUsername');
      let repoName = localStorage.getItem('githubRepo');
      
      // אם זה הפעם הראשונה, הגדר את הפרטים שלך
      if (!githubToken || !repoOwner || !repoName) {
        // הגדרות ברירת מחדל עבור הריפו שלך
        const defaultOwner = 'GabiAharon';
        const defaultRepo = 'gabiaharonportfolio';
        
        const userChoice = confirm(`🚀 הגדרת GitHub אוטומטית

האם ברצונך להשתמש בהגדרות הריפו שלך?
${defaultOwner}/${defaultRepo}

✅ כן - להמשיך עם הריפו שלי
❌ לא - אני רוצה להגדיר פרטים אחרים`);
        
        if (userChoice) {
          // השתמש בהגדרות ברירת המחדל
          repoOwner = defaultOwner;
          repoName = defaultRepo;
          githubToken = prompt(`🔑 הכנס את הטוקן שלך:

הטוקן שלך מתחיל ב: ghp_...
(העתק והדבק את הטוקן המלא)

💡 טיפ: הוסף לטוקן הרשאות:
- repo
- workflow`);
        } else {
          // בקש מהמשתמש להכניס פרטים ידנית
          const userDetails = prompt(`🔧 הגדרת GitHub ידנית:

הכנס בפורמט הבא:
שם_משתמש/שם_ריפו/טוקן

דוגמה:
myusername/myrepo/ghp_abc123xyz...

💡 איך ליצור טוקן:
1. GitHub.com → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token
4. סמן: repo, workflow (חשוב!)
5. העתק את הטוקן`);
          
          if (!userDetails) {
            throw new Error('נדרשים פרטי GitHub');
          }
          
          const parts = userDetails.split('/');
          if (parts.length !== 3) {
            throw new Error('פורמט לא נכון. השתמש ב: שם_משתמש/שם_ריפו/טוקן');
          }
          
          repoOwner = parts[0].trim();
          repoName = parts[1].trim();
          githubToken = parts[2].trim();
        }
        
        if (!githubToken) {
          throw new Error('נדרש טוקן GitHub');
        }
        
        // שמירה ב-localStorage
        localStorage.setItem('githubUsername', repoOwner);
        localStorage.setItem('githubRepo', repoName);
        localStorage.setItem('githubToken', githubToken);
        
        console.log(`✅ הוגדר: ${repoOwner}/${repoName}`);
      }
      
      const fileContent = JSON.stringify(data, null, 2);
      const base64Content = btoa(unescape(encodeURIComponent(fileContent)));
      
      // קבלת ה-SHA הנוכחי של הקובץ
      const currentFileResponse = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/data/projects-data.json`,
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
      } else {
        console.log('קובץ לא קיים או שגיאה בגישה, מנסה ליצור קובץ חדש');
      }

      // יצירת commit חדש
      const commitResponse = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/data/projects-data.json`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `🔄 עדכון אוטומטי של נתוני פרויקטים - ${new Date().toLocaleString('he-IL')}`,
            content: base64Content,
            sha: sha
          })
        }
      );

      if (!commitResponse.ok) {
        const errorData = await commitResponse.json();
        console.error('GitHub API Error:', errorData);
        throw new Error(`שגיאה בשמירה לגיטהאב: ${errorData.message || 'שגיאה לא ידועה'}`);
      }

      // שמירה גם ב-public/data (אם הקובץ קיים)
      try {
        const publicFileResponse = await fetch(
          `https://api.github.com/repos/${repoOwner}/${repoName}/contents/public/data/projects-data.json`,
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
            `https://api.github.com/repos/${repoOwner}/${repoName}/contents/public/data/projects-data.json`,
            {
              method: 'PUT',
              headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                message: `🔄 עדכון אוטומטי של נתוני פרויקטים (public) - ${new Date().toLocaleString('he-IL')}`,
                content: base64Content,
                sha: publicSha
              })
            }
          );
        } else {
          console.log('קובץ public לא קיים, יוצר קובץ חדש');
          await fetch(
            `https://api.github.com/repos/${repoOwner}/${repoName}/contents/public/data/projects-data.json`,
            {
              method: 'PUT',
              headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                message: `🔄 יצירת קובץ נתוני פרויקטים (public) - ${new Date().toLocaleString('he-IL')}`,
                content: base64Content
              })
            }
          );
        }
      } catch (publicError) {
        console.error('שגיאה בעדכון תיקיית public:', publicError);
        console.log('Public folder update failed, but main file updated successfully');
      }

      console.log('✅ נשמר בהצלחה לגיטהאב!');
      return true;
    } catch (error) {
      console.error('Error saving to GitHub:', error);
      
      // אם השגיאה קשורה לטוקן, נקה את הנתונים השמורים
      if (error.message && (error.message.includes('401') || error.message.includes('token'))) {
        localStorage.removeItem('githubToken');
        localStorage.removeItem('githubUsername');
        localStorage.removeItem('githubRepo');
        alert(`❌ שגיאת אימות בגיטהאב: ${error.message}\n\nהגדרות הטוקן נמחקו. בפעם הבאה תצטרך להזין מחדש.`);
      }
      
      return false;
    }
  };

  // פונקציה לסנכרון נתונים מ-GitHub
  const syncFromGitHub = async () => {
    try {
      const githubToken = localStorage.getItem('githubToken');
      const repoOwner = localStorage.getItem('githubUsername') || 'GabiAharon';
      const repoName = localStorage.getItem('githubRepo') || 'gabiaharonportfolio';
      
      if (!githubToken) {
        alert('❌ לא נמצא טוקן GitHub. השתמש בכפתור הגיבוי כדי להגדיר טוקן.');
        return false;
      }

      const response = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/data/projects-data.json`,
        {
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
          }
        }
      );

      if (!response.ok) {
        throw new Error(`שגיאה בקריאת נתונים מ-GitHub: ${response.status}`);
      }

      const fileData = await response.json();
      const content = atob(fileData.content);
      const githubData = JSON.parse(content);

      // השווה עם הנתונים המקומיים
      const localDataString = JSON.stringify(projectData);
      const githubDataString = JSON.stringify(githubData);

      if (localDataString === githubDataString) {
        alert('✅ הנתונים כבר מסונכרנים!');
        return true;
      }

      const userChoice = confirm(`🔄 נמצאו שינויים ב-GitHub!

האם ברצונך לעדכן את הנתונים המקומיים עם הנתונים מ-GitHub?

⚠️ זה יחליף את כל השינויים המקומיים שלא נשמרו!`);

      if (userChoice) {
        setProjectData(githubData);
        saveToLocalStorage(githubData);
        alert('✅ הנתונים עודכנו מ-GitHub בהצלחה!');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error syncing from GitHub:', error);
      alert(`❌ שגיאה בסנכרון מ-GitHub: ${error.message}`);
      return false;
    }
  };

  // פונקציה ליצירת פרויקט חדש
  const createNewProject = () => {
    const newId = Math.max(...projectData.map(p => p.id), 0) + 1;
    const currentDate = new Date().toISOString().split('T')[0];
    
    const newProject = {
      id: newId,
      title: { 
        he: "פרויקט חדש", 
        en: "New Project" 
      },
      description: { 
        he: "תיאור קצר של הפרויקט החדש", 
        en: "Short description of the new project" 
      },
      detailedDescription: {
        he: "כאן יופיע תיאור מפורט של הפרויקט. זהו המקום להרחיב על המטרות, השיטות והתוצאות.",
        en: "Here is a detailed description of the project. This is the place to expand on the goals, methods and results."
      },
      category: "tool",
      date: currentDate,
      image: "https://images.unsplash.com/photo-1585974738771-84483dd9f89f?w=600&h=400&fit=crop",
      detailImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
      link: "#new-project",
      isVideo: false,
      technologies: ["Technology 1", "Technology 2", "Technology 3"],
      status: "בפיתוח",
      features: {
        he: ["תכונה 1", "תכונה 2", "תכונה 3", "תכונה 4"],
        en: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"]
      }
    };
    
    const updatedProjects = [newProject, ...projectData];
    setProjectData(updatedProjects);
    saveToLocalStorage(updatedProjects);
    
    // מיד פתח את הפרויקט החדש לעריכה
    startEditingProject(newProject, false);
    
    // גלול למעלה
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    alert(`✅ נוצר פרויקט חדש (ID: ${newId})!\nכעת ערוך את הפרטים לפי הצורך.`);
  };

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
          <button 
            onClick={() => {
              setIsEditMode(false);
              setEditingProject(null);
              setEditingInModal(false);
              setEditForm({});
            }}
            className="bg-red-600 p-2 rounded-full flex items-center gap-2 transition-all hover:bg-red-700"
            title={t('exitEditMode')}
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {isEditMode && (
          <button 
            onClick={resetToOriginalData}
            className="bg-yellow-600 p-2 rounded-full flex items-center gap-2 transition-all hover:bg-yellow-700"
            title="איפוס לנתונים מקוריים"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}

        {isEditMode && (
          <button 
            onClick={() => downloadUpdatedData(projectData)}
            className="bg-green-600 p-2 rounded-full flex items-center gap-2 transition-all hover:bg-green-700"
            title="הורד נתונים נוכחיים"
          >
            <Download className="w-4 h-4" />
          </button>
        )}

        {/* כפתור גיבוי ידני ל-GitHub */}
        {isEditMode && (
          <button 
            onClick={async () => {
              try {
                const success = await saveToGitHub(projectData);
                if (success) {
                  alert('הנתונים נשמרו בהצלחה ל-GitHub! 🎉');
                } else {
                  alert('שגיאה בשמירה ל-GitHub. נסה שוב או בדוק את הטוקן.');
                }
              } catch (error) {
                console.error('Error in manual backup:', error);
                alert('שגיאה בשמירה ל-GitHub: ' + error.message);
              }
            }}
            className="bg-yellow-600 p-2 rounded-full flex items-center gap-2 transition-all hover:bg-yellow-700"
            title="גיבוי ידני ל-GitHub"
          >
            <Upload className="w-4 h-4" />
            <span className="text-xs hidden sm:inline">GitHub</span>
          </button>
        )}

        {isEditMode && (
          <button 
            onClick={uploadDataFile}
            className="bg-blue-600 p-2 rounded-full flex items-center gap-2 transition-all hover:bg-blue-700"
            title="העלה קובץ נתונים"
          >
            <Upload className="w-4 h-4" />
          </button>
        )}

        {isEditMode && (
          <button 
            onClick={() => {
              if (confirm('האם אתה בטוח שברצונך לאפס את הגדרות GitHub?\nתצטרך להכניס את הפרטים שוב בשמירה הבאה.')) {
                localStorage.removeItem('githubToken');
                localStorage.removeItem('githubUsername');
                localStorage.removeItem('githubRepo');
                alert('הגדרות GitHub אופסו! תוכל להגדיר פרטים חדשים בשמירה הבאה.');
              }
            }}
            className="bg-purple-600 p-2 rounded-full flex items-center gap-2 transition-all hover:bg-purple-700"
            title="איפוס הגדרות GitHub"
          >
            <Code className="w-4 h-4" />
          </button>
        )}

        {/* כפתור סנכרון מ-GitHub */}
        {isEditMode && (
          <button 
            onClick={syncFromGitHub}
            className="bg-cyan-600 p-2 rounded-full flex items-center gap-2 transition-all hover:bg-cyan-700"
            title="סנכרון נתונים מ-GitHub"
          >
            <Download className="w-4 h-4" />
            <span className="text-xs hidden sm:inline">Sync</span>
          </button>
        )}
      </div>

      {/* מחוון טעינה */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-gray-300">טוען נתוני פרויקטים...</p>
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
                {t('projectsPageTitle')}
              </h1>
              {isEditMode && (
                <div className="bg-red-600 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  <span>מצב עריכה פעיל</span>
                </div>
              )}
            </div>
            
            <p className="text-xl text-gray-300 max-w-3xl mb-4">
              {t('projectsPageSubtitle')}
            </p>

            {/* הוראות עריכה */}
            {isEditMode && (
              <div className="bg-orange-900 bg-opacity-50 border border-orange-600 rounded-lg p-4 mb-6">
                <div className="flex flex-wrap items-center justify-between">
                  <p className="text-orange-200 text-sm mb-2 md:mb-0">
                    📝 {t('editingInstructions')}
                  </p>
                  
                  <button
                    onClick={createNewProject}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <span>+ פרויקט חדש</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* מסנני קטגוריות */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* רשת הפרויקטים */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  whileHover={{ scale: editingProject === project.id ? 1 : 1.02 }}
                  whileTap={{ scale: editingProject === project.id ? 1 : 0.98 }}
                >
                  <div className={`${editingProject === project.id && !editingInModal ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'} p-0.5 rounded-xl`}>
                    <div className="bg-gray-900 rounded-xl overflow-hidden h-full flex flex-col min-h-[500px]">
                      {/* תמונת הפרויקט */}
                      <div className="relative h-48 overflow-hidden flex-shrink-0">
                        <img 
                          src={project.image} 
                          alt={project.title[language]} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {project.isVideo && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                            <Play className="w-12 h-12 text-white opacity-80" />
                          </div>
                        )}
                        
                        {/* תג סטטוס */}
                        <div className="absolute top-3 left-3">
                          <span className={`${getStatusColor(project.status)} text-white px-2 py-1 rounded-full text-xs`}>
                            {project.status}
                          </span>
                        </div>

                        {/* כפתור עריכה במצב אדמין */}
                        {isEditMode && (
                          <div className="absolute top-3 right-3">
                            {editingProject === project.id && !editingInModal ? (
                              <div className="flex flex-col gap-1">
                                <div className="flex gap-1">
                                  <button 
                                    onClick={saveProjectChanges}
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
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col gap-1">
                                <div className="flex gap-1">
                                  <button 
                                    onClick={() => startEditingProject(project, false)}
                                    className="bg-orange-600 hover:bg-orange-700 text-white p-1 rounded-full transition-colors"
                                    title="ערוך פרויקט"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => duplicateProject(project)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-full transition-colors"
                                    title="שכפל פרויקט"
                                  >
                                    <Copy className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => deleteProject(project)}
                                    className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-full transition-colors"
                                    title="מחק פרויקט"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                                <div className="flex gap-1 justify-center">
                                  <button 
                                    onClick={() => moveProjectUp(project)}
                                    className="bg-purple-600 hover:bg-purple-700 text-white p-1 rounded-full transition-colors"
                                    title="הזז מעלה"
                                    disabled={index === 0}
                                  >
                                    <ArrowUp className="w-3 h-3" />
                                  </button>
                                  <button 
                                    onClick={() => moveProjectDown(project)}
                                    className="bg-purple-600 hover:bg-purple-700 text-white p-1 rounded-full transition-colors"
                                    title="הזז מטה"
                                    disabled={index === filteredProjects.length - 1}
                                  >
                                    <ArrowDown className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* תוכן הפרויקט */}
                      <div className="p-5 flex flex-col flex-1">
                        {editingProject === project.id && !editingInModal ? (
                          // מצב עריכה בכרטיס
                          <div className="space-y-3 flex-1">
                            <input
                              type="text"
                              placeholder={t('projectTitle')}
                              value={editForm.title?.[language] || ''}
                              onChange={(e) => setEditForm({
                                ...editForm,
                                title: { ...editForm.title, [language]: e.target.value }
                              })}
                              className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm"
                            />
                            <textarea
                              placeholder={t('projectDescription')}
                              value={editForm.description?.[language] || ''}
                              onChange={(e) => setEditForm({
                                ...editForm,
                                description: { ...editForm.description, [language]: e.target.value }
                              })}
                              className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm resize-none"
                              rows="3"
                            />
                            <select
                              value={editForm.status || ''}
                              onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                              className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm"
                            >
                              <option value="בפיתוח">בפיתוח</option>
                              <option value="הושלם">הושלם</option>
                              <option value="פורסם">פורסם</option>
                            </select>
                            
                            {/* בחירת קטגוריה */}
                            <select
                              value={editForm.category || ''}
                              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                              className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm"
                            >
                              <option value="">בחר קטגוריה</option>
                              <option value="plugin">🔧 תוספים</option>
                              <option value="tool">⚙️ כלים</option>
                              <option value="video">🎥 סרטונים</option>
                              <option value="interface">🎨 ממשקים</option>
                              <option value="app">📱 אפליקציות</option>
                            </select>
                            
                            {/* עריכת תמונה */}
                            <div className="border-t border-gray-700 pt-3">
                              <input
                                type="url"
                                placeholder={t('projectImage')}
                                value={editForm.image || ''}
                                onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                                className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm mb-2"
                              />
                              {editForm.image && (
                                <div className="mb-2">
                                  <p className="text-xs text-gray-400 mb-1">{t('imagePreview')}:</p>
                                  <img 
                                    src={editForm.image} 
                                    alt="Preview" 
                                    className="w-full h-24 object-cover rounded border-2 border-blue-500"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                            
                            {/* עריכת טכנולוגיות */}
                            <div className="border-t border-gray-700 pt-3">
                              <label className="block text-sm text-gray-400 mb-2">{t('aiTools')}</label>
                              
                              {/* רשימת כלי AI זמינים */}
                              <div className="mb-3 max-h-60 overflow-y-auto border border-gray-600 rounded p-4 bg-gray-800">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                  {getAllAITools().map((tool, index) => (
                                    <label key={index} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-700 p-2 rounded">
                                      <input
                                        type="checkbox"
                                        checked={selectedAITools.includes(tool)}
                                        onChange={() => handleAIToolToggle(tool)}
                                        className="w-4 h-4"
                                      />
                                      <span className="text-gray-300">{tool}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                              
                              {/* הוספת כלי חדש */}
                              <div className="flex gap-2 mb-3">
                                <input
                                  type="text"
                                  placeholder={t('customToolPlaceholder')}
                                  value={newCustomTool}
                                  onChange={(e) => setNewCustomTool(e.target.value)}
                                  className="flex-1 bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-sm"
                                  onKeyPress={(e) => e.key === 'Enter' && addCustomAITool()}
                                />
                                <button
                                  onClick={addCustomAITool}
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
                                >
                                  {t('addCustomTool')}
                                </button>
                              </div>
                              
                              {/* תצוגת כלים נבחרים */}
                              {selectedAITools.length > 0 && (
                                <div>
                                  <p className="text-sm text-gray-400 mb-2">כלים נבחרים:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedAITools.map((tool, index) => (
                                      <span key={index} className="bg-blue-600 text-sm px-3 py-1 rounded flex items-center gap-2">
                                        {tool}
                                        <button
                                          onClick={() => handleAIToolToggle(tool)}
                                          className="text-blue-200 hover:text-white font-bold"
                                        >
                                          ×
                                        </button>
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {/* שדה קישור לסרטון - מופיע רק כאשר הקטגוריה היא סרטון */}
                            {editForm.category === 'video' && (
                              <div className="mt-3">
                                <label className="block text-sm text-gray-400 mb-1">קישור לסרטון:</label>
                                <input
                                  type="url"
                                  placeholder="הכנס קישור ל-YouTube, Vimeo וכו'"
                                  value={editForm.link || ''}
                                  onChange={(e) => setEditForm({ ...editForm, link: e.target.value, isVideo: true })}
                                  className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm mb-1"
                                />
                                <p className="text-xs text-gray-400">קישור זה יפתח ישירות את הסרטון</p>
                              </div>
                            )}
                          </div>
                        ) : (
                          // מצב תצוגה רגיל
                          <>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
                              {project.title[language]}
                            </h3>
                            <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                              {project.description[language]}
                            </p>
                            
                            {/* טכנולוגיות */}
                            <div className="mb-4">
                              <p className="text-xs text-gray-400 mb-2">{t('technologies')}:</p>
                              <div className="flex flex-wrap gap-1">
                                {project.technologies.slice(0, 3).map((tech, index) => (
                                  <span key={index} className="bg-gray-700 text-xs px-2 py-1 rounded">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            {/* מידע נוסף */}
                            <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{formatDate(project.date)}</span>
                              </div>
                            </div>
                            
                            {/* ספייסר שדוחף את הכפתור לתחתית */}
                            <div className="flex-1 min-h-0"></div>
                            
                            {/* כפתור צפייה מהירה */}
                            <div className="mt-auto pt-4">
                              {project.isVideo && project.link ? (
                                // שני כפתורים לפרויקטי סרטון
                                <div className="flex flex-col gap-2">
                                  <button
                                    onClick={() => setSelectedProject(project)}
                                    className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                    <span>מידע נוסף על הפרויקט</span>
                                  </button>
                                  <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Play className="w-4 h-4" />
                                    <span>{t('watchVideo')}</span>
                                  </a>
                                </div>
                              ) : (
                                // כפתור לצפייה מהירה
                                <button
                                  onClick={() => setSelectedProject(project)}
                                  className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  <span>{t('quickView')}</span>
                                </button>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* אם אין פרויקטים בקטגוריה */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-gray-400">
                <div className="w-16 h-16 mx-auto mb-4 opacity-50 flex items-center justify-center text-4xl">📂</div>
                <p>{t('noProjects')}</p>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* חלונית צפייה מהירה */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={() => {
              setSelectedProject(null);
              if (editingInModal) {
                cancelEditing();
              }
            }}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className={`bg-gray-900 w-full max-w-2xl h-full max-h-[90vh] overflow-y-auto rounded-xl ${
                editingProject === selectedProject?.id && editingInModal ? 'border-2 border-orange-500' : ''
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-4 flex justify-between items-center">
                <h3 className="text-xl font-bold">{selectedProject.title[language]}</h3>
                <div className="flex items-center gap-2">
                  {/* כפתור עריכה במודל */}
                  {isEditMode && (
                    <>
                      {editingProject === selectedProject.id && editingInModal ? (
                        <div className="flex flex-col gap-1">
                          <div className="flex gap-1">
                            <button 
                              onClick={saveProjectChanges}
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
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <div className="flex gap-1">
                            <button 
                              onClick={() => startEditingProject(selectedProject, true)}
                              className="bg-orange-600 hover:bg-orange-700 text-white p-1 rounded-full transition-colors"
                              title="ערוך פרויקט"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => duplicateProject(selectedProject)}
                              className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-full transition-colors"
                              title="שכפל פרויקט"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteProject(selectedProject)}
                              className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-full transition-colors"
                              title="מחק פרויקט"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex gap-1 justify-center">
                            <button 
                              onClick={() => moveProjectUp(selectedProject)}
                              className="bg-purple-600 hover:bg-purple-700 text-white p-1 rounded-full transition-colors"
                              title="הזז מעלה"
                              disabled={filteredProjects.indexOf(selectedProject) === 0}
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button 
                              onClick={() => moveProjectDown(selectedProject)}
                              className="bg-purple-600 hover:bg-purple-700 text-white p-1 rounded-full transition-colors"
                              title="הזז מטה"
                              disabled={filteredProjects.indexOf(selectedProject) === filteredProjects.length - 1}
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      if (editingInModal) {
                        cancelEditing();
                      }
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {editingProject === selectedProject?.id && editingInModal ? (
                  // מצב עריכה במודל
                  <div className="space-y-6">
                    {/* עריכת כותרת */}
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('projectTitle')}</label>
                      <input
                        type="text"
                        value={editForm.title?.[language] || ''}
                        onChange={(e) => setEditForm({
                          ...editForm,
                          title: { ...editForm.title, [language]: e.target.value }
                        })}
                        className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
                      />
                    </div>

                    {/* עריכת תיאור קצר */}
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('projectDescription')}</label>
                      <textarea
                        value={editForm.description?.[language] || ''}
                        onChange={(e) => setEditForm({
                          ...editForm,
                          description: { ...editForm.description, [language]: e.target.value }
                        })}
                        className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 resize-none"
                        rows="3"
                      />
                    </div>

                    {/* עריכת תיאור מפורט */}
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('projectDetailedDescription')}</label>
                      <textarea
                        value={editForm.detailedDescription?.[language] || ''}
                        onChange={(e) => setEditForm({
                          ...editForm,
                          detailedDescription: { ...editForm.detailedDescription, [language]: e.target.value }
                        })}
                        className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 resize-none"
                        rows="5"
                      />
                    </div>

                    {/* עריכת תכונות */}
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('projectFeatures')}</label>
                      <textarea
                        value={editForm.features?.[language] || ''}
                        onChange={(e) => setEditForm({
                          ...editForm,
                          features: { ...editForm.features, [language]: e.target.value }
                        })}
                        className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 resize-none"
                        rows="3"
                      />
                    </div>

                    {/* עריכת סטטוס */}
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('projectStatus')}</label>
                      <select
                        value={editForm.status || ''}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                        className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
                      >
                        <option value="בפיתוח">בפיתוח</option>
                        <option value="הושלם">הושלם</option>
                        <option value="פורסם">פורסם</option>
                      </select>
                    </div>

                    {/* עריכת קטגוריה */}
                    <div>
                      <label className="block text-sm font-medium mb-2">קטגוריית הפרויקט</label>
                      <select
                        value={editForm.category || ''}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
                      >
                        <option value="">בחר קטגוריה</option>
                        <option value="plugin">🔧 תוספים</option>
                        <option value="tool">⚙️ כלים</option>
                        <option value="video">🎥 סרטונים</option>
                        <option value="interface">🎨 ממשקים</option>
                        <option value="app">📱 אפליקציות</option>
                      </select>
                    </div>

                    {/* עריכת תמונות */}
                    <div className="space-y-4">
                      {/* תמונת כרטיס */}
                      <div>
                        <label className="block text-sm font-medium mb-2">{t('projectImage')}</label>
                        <input
                          type="url"
                          value={editForm.image || ''}
                          onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                          className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 mb-2"
                        />
                        {editForm.image && (
                          <div>
                            <p className="text-xs text-gray-400 mb-1">{t('imagePreview')}:</p>
                            <img 
                              src={editForm.image} 
                              alt="Card Preview" 
                              className="w-full h-32 object-cover rounded border-2 border-blue-500"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* תמונה מפורטת */}
                      <div>
                        <label className="block text-sm font-medium mb-2">{t('projectDetailImage')}</label>
                        <input
                          type="url"
                          value={editForm.detailImage || ''}
                          onChange={(e) => setEditForm({ ...editForm, detailImage: e.target.value })}
                          className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 mb-2"
                        />
                        {editForm.detailImage && (
                          <div>
                            <p className="text-xs text-gray-400 mb-1">{t('imagePreview')}:</p>
                            <img 
                              src={editForm.detailImage} 
                              alt="Detail Preview" 
                              className="w-full h-48 object-cover rounded border-2 border-purple-500"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* עריכת כלי AI */}
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('aiTools')}</label>
                      
                      {/* רשימת כלי AI זמינים */}
                      <div className="mb-3 max-h-60 overflow-y-auto border border-gray-600 rounded p-4 bg-gray-800">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {getAllAITools().map((tool, index) => (
                            <label key={index} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-700 p-2 rounded">
                              <input
                                type="checkbox"
                                checked={selectedAITools.includes(tool)}
                                onChange={() => handleAIToolToggle(tool)}
                                className="w-4 h-4"
                              />
                              <span className="text-gray-300">{tool}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      {/* הוספת כלי חדש */}
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          placeholder={t('customToolPlaceholder')}
                          value={newCustomTool}
                          onChange={(e) => setNewCustomTool(e.target.value)}
                          className="flex-1 bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-sm"
                          onKeyPress={(e) => e.key === 'Enter' && addCustomAITool()}
                        />
                        <button
                          onClick={addCustomAITool}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
                        >
                          {t('addCustomTool')}
                        </button>
                      </div>
                      
                      {/* תצוגת כלים נבחרים */}
                      {selectedAITools.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-400 mb-2">כלים נבחרים:</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedAITools.map((tool, index) => (
                              <span key={index} className="bg-blue-600 text-sm px-3 py-1 rounded flex items-center gap-2">
                                {tool}
                                <button
                                  onClick={() => handleAIToolToggle(tool)}
                                  className="text-blue-200 hover:text-white font-bold"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* שדה קישור לסרטון במודל - מופיע רק אם הקטגוריה היא סרטון */}
                    {editForm.category === 'video' && (
                      <div>
                        <label className="block text-sm font-medium mb-2">קישור לסרטון</label>
                        <input
                          type="url"
                          placeholder="הכנס קישור ל-YouTube, Vimeo או שירות וידאו אחר"
                          value={editForm.link || ''}
                          onChange={(e) => setEditForm({ ...editForm, link: e.target.value, isVideo: true })}
                          className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 mb-1"
                        />
                        <p className="text-xs text-gray-400">קישור זה יפתח ישירות את הסרטון כאשר המשתמש ילחץ על כפתור "צפה בסרטון"</p>
                      </div>
                    )}
                  </div>
                ) : (
                  // מצב תצוגה רגיל במודל
                  <>
                    {/* תמונה מפורטת */}
                    <div className="mb-6">
                      <img 
                        src={selectedProject.detailImage || selectedProject.image} 
                        alt={selectedProject.title[language]}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    
                    {/* תיאור מפורט */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3">{t('detailedDescription')}</h4>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedProject.detailedDescription[language]}
                      </p>
                    </div>
                    
                    {/* תכונות */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3">{t('keyFeatures')}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedProject.features[language].map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-gray-300">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* טכנולוגיות */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3">{t('technologies')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <span key={index} className="bg-gray-700 text-xs px-3 py-1 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* פרטים נוספים */}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div>
                        <span className="text-gray-400">תאריך: </span>
                        <span>{formatDate(selectedProject.date)}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">{t('status')}: </span>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedProject.status)} text-white`}>
                          {selectedProject.status}
                        </span>
                      </div>
                    </div>
                    
                    {/* כפתור פעולה - רק לסרטונים */}
                    {selectedProject.isVideo && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors"
                      >
                        <Play className="w-5 h-5" />
                        <span>{t('watchVideo')}</span>
                      </a>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 
