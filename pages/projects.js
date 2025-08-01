import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Calendar, Globe, Play, Code, X, Edit3, Save, Trash2, Download, Upload, Copy, ArrowUp, ArrowDown, Camera, Image } from "lucide-react";
import Link from 'next/link';
import { useLanguage } from './_app';

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
  "Filmora",
  "React",
  "Next.js",
  "Python",
  "TensorFlow",
  "OpenCV",
  "Machine Learning",
  "Computer Vision",
  "WebRTC",
  "Node.js",
  "Video Production",
  "Storytelling",
  "Music",
  "Voice Recognition",
  "React Native",
  "ML Kit",
  "Motion Detection",
  "Voice Analysis",
  "Natural Language Processing",
  "Music Theory"
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
    customToolPlaceholder: "שם כלי AI חדש",
    editInModal: "ערוך במודל"
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
    noProjects: "No projects in this category at the moment",
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
    editingInstructions: "In edit mode: Click the edit buttons (🧡) to edit projects",
    imagePreview: "Image Preview",
    enterImageUrl: "Enter new image URL",
    aiTools: "AI Tools for Project",
    selectAITools: "Select AI Tools",
    addCustomTool: "Add Custom Tool",
    customToolPlaceholder: "Custom AI Tool Name",
    editInModal: "Edit in Modal"
  }
};

export default function Projects() {
  const { language, toggleLanguage } = useLanguage();
  
  // Debug alert to confirm new code is loaded
  React.useEffect(() => {
    console.log('🎯 UPDATED PROJECTS PAGE LOADED - 2 IMAGES SHOULD BE VISIBLE IN MODAL EDIT');
  }, []);
  const [projectData, setProjectData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAdminButton, setShowAdminButton] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingInModal, setEditingInModal] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [customAITool, setCustomAITool] = useState('');
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [imageInputUrl, setImageInputUrl] = useState('');
  const [editingImageType, setEditingImageType] = useState(''); // 'image' or 'detailImage'

  useEffect(() => {
    loadProjectsData();
    
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        setShowAdminButton(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getAllAITools = () => {
    const currentTools = editForm.technologies || [];
    return [...new Set([...availableAITools, ...currentTools])];
  };

  const addCustomAITool = () => {
    if (customAITool.trim() && !getAllAITools().includes(customAITool.trim())) {
      const newTool = customAITool.trim();
      const updatedTools = [...(editForm.technologies || []), newTool];
      setEditForm({
        ...editForm,
        technologies: updatedTools
      });
      setCustomAITool('');
    }
  };

  const handleAIToolToggle = (tool) => {
    const currentTools = editForm.technologies || [];
    const updatedTools = currentTools.includes(tool)
      ? currentTools.filter(t => t !== tool)
      : [...currentTools, tool];
    
    setEditForm({
      ...editForm,
      technologies: updatedTools
    });
  };

  const loadProjectsData = async () => {
    try {
      setIsLoading(true);
      
      // סנכרון מקומי של הקבצים לפני טעינה
      try {
        const localDataFile = localStorage.getItem('projectsData');
        if (localDataFile) {
          const parsedLocalData = JSON.parse(localDataFile);
          // וודא שהקובץ הציבורי מעודכן
          console.log('🔄 מעדכן קובץ ציבורי מנתונים מקומיים...');
        }
      } catch (e) {
        console.warn('⚠️ שגיאה בסנכרון מקומי:', e);
      }
      
      // ניסיון לטעון מ-localStorage קודם
      const localData = localStorage.getItem('projectsData');
      if (localData) {
        try {
          const parsedData = JSON.parse(localData);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            console.log('✅ נתונים נטענו מ-localStorage');
            setProjectData(parsedData);
            setIsLoading(false);
            return;
          }
        } catch (e) {
          console.warn('⚠️ שגיאה בפרסור נתוני localStorage:', e);
        }
      }

      // אם אין נתונים ב-localStorage, טען מהקובץ הציבורי
      console.log('📁 טוען נתונים מקובץ JSON ציבורי...');
      const response = await fetch('/data/projects-data.json?v=' + Date.now()); // cache busting
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('הנתונים שנטענו אינם מערך תקין');
      }

      console.log('✅ נתונים נטענו בהצלחה מהקובץ הציבורי:', data.length, 'פרויקטים');
      setProjectData(data);
      
      // שמור ב-localStorage לטעינה מהירה יותר בפעם הבאה
      saveToLocalStorage(data);
      
    } catch (error) {
      console.error('❌ שגיאה בטעינת נתוני פרויקטים:', error);
      
      // נתונים חלופיים במקרה של שגיאה
      const fallbackData = [
        {
          id: 1,
          title: { he: "פרויקט לדוגמה", en: "Example Project" },
          description: { he: "תיאור הפרויקט", en: "Project description" },
          detailedDescription: { he: "תיאור מפורט", en: "Detailed description" },
          category: "tool",
          date: "2024-01-01",
          image: "https://images.unsplash.com/photo-1585974738771-84483dd9f89f?w=600&h=400&fit=crop",
          detailImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
          link: "#",
          isVideo: false,
          technologies: ["React", "Next.js"],
          status: "בפיתוח",
          features: { he: ["תכונה 1"], en: ["Feature 1"] }
        }
      ];
      
      setProjectData(fallbackData);
      alert('⚠️ שגיאה בטעינת נתוני הפרויקטים. נטענו נתונים חלופיים.');
    } finally {
      setIsLoading(false);
    }
  };

  const saveToLocalStorage = (data) => {
    try {
      localStorage.setItem('projectsData', JSON.stringify(data));
      console.log('💾 נתונים נשמרו ב-localStorage');
    } catch (error) {
      console.error('❌ שגיאה בשמירת נתונים ב-localStorage:', error);
    }
  };

  const downloadUpdatedData = (data) => {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'projects-data-updated.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      console.log('📥 קובץ הנתונים הועבר להורדה');
    } catch (error) {
      console.error('❌ שגיאה בהורדת קובץ הנתונים:', error);
      alert('שגיאה בהורדת הקובץ');
    }
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
            if (Array.isArray(data)) {
              setProjectData(data);
              saveToLocalStorage(data);
              alert('✅ קובץ הנתונים נטען בהצלחה!');
            } else {
              alert('❌ קובץ לא תקין - חייב להיות מערך של פרויקטים');
            }
          } catch (error) {
            alert('❌ שגיאה בקריאת הקובץ');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const resetToOriginalData = async () => {
    if (confirm('🔄 האם אתה בטוח שברצונך לאפס את כל הנתונים לגרסה המקורית?\nהפעולה תמחק את כל השינויים שביצעת.')) {
      try {
        localStorage.removeItem('projectsData');
        await loadProjectsData();
        setEditingProject(null);
        setEditingInModal(false);
        setEditForm({});
        alert('✅ הנתונים אופסו לגרסה המקורית');
      } catch (error) {
        alert('❌ שגיאה באיפוס הנתונים');
      }
    }
  };

  const t = (key) => {
    return projectTranslations[language]?.[key] || key;
  };

  const checkAdminAccess = () => {
    const password = prompt("🔐 הכנס סיסמת אדמין:");
    if (password === "gabi2024") {
      setIsEditMode(true);
      alert("✅ מצב עריכה הופעל!\nכעת ניתן לערוך פרויקטים.");
    } else if (password) {
      alert("❌ סיסמה שגויה");
    }
  };

  const startEditingProject = (project, inModal = false) => {
    setEditingProject(project.id);
    setEditingInModal(inModal);
    
    // מילוי הטופס הנוכחי
    setEditForm({
      title_he: project.title.he,
      title_en: project.title.en,
      description_he: project.description.he,
      description_en: project.description.en,
      detailedDescription_he: project.detailedDescription.he,
      detailedDescription_en: project.detailedDescription.en,
      category: project.category,
      status: project.status,
      image: project.image,
      detailImage: project.detailImage,
      link: project.link,
      isVideo: project.isVideo,
      technologies: [...project.technologies],
      features_he: project.features.he.join(', '),
      features_en: project.features.en.join(', ')
    });
  };

  const saveProjectChanges = async () => {
    if (!editingProject) return;

    try {
      const updatedProjects = projectData.map(project => {
        if (project.id === editingProject) {
          return {
            ...project,
            title: {
              he: editForm.title_he || project.title.he,
              en: editForm.title_en || project.title.en
            },
            description: {
              he: editForm.description_he || project.description.he,
              en: editForm.description_en || project.description.en
            },
            detailedDescription: {
              he: editForm.detailedDescription_he || project.detailedDescription.he,
              en: editForm.detailedDescription_en || project.detailedDescription.en
            },
            category: editForm.category || project.category,
            status: editForm.status || project.status,
            image: editForm.image || project.image,
            detailImage: editForm.detailImage || project.detailImage,
            link: editForm.link || project.link,
            isVideo: editForm.isVideo !== undefined ? editForm.isVideo : project.isVideo,
            technologies: editForm.technologies || project.technologies,
            features: {
              he: (editForm.features_he || '').split(',').map(f => f.trim()).filter(f => f),
              en: (editForm.features_en || '').split(',').map(f => f.trim()).filter(f => f)
            }
          };
        }
        return project;
      });

      setProjectData(updatedProjects);
      saveToLocalStorage(updatedProjects);
      
      // שמירה אוטומטית ל-GitHub
      const githubSaved = await saveToGitHub(updatedProjects);
      
      // עדכון הפרויקט הנבחר אם הוא פתוח במודל
      if (selectedProject && selectedProject.id === editingProject) {
        const updatedProject = updatedProjects.find(p => p.id === editingProject);
        setSelectedProject(updatedProject);
      }
      
      setEditingProject(null);
      setEditingInModal(false);
      setEditForm({});
      
      // הודעה על הצלחה עם סטטוס GitHub
      if (githubSaved) {
        alert('🎉 הפרויקט נשמר בהצלחה!\n✅ נשמר לגיטהאב אוטומטית\nהאתר יתעדכן תוך דקה');
      } else {
        alert('⚠️ הפרויקט נשמר מקומית\n❌ שגיאה בשמירה לגיטהאב\n(בדוק את הטוקן או החיבור לאינטרנט)');
      }
    } catch (error) {
      console.error('שגיאה בשמירת שינויים:', error);
      alert('❌ שגיאה בשמירת השינויים');
    }
  };

  // פונקציה לשמירה אוטומטית ל-GitHub
  const saveToGitHub = async (data) => {
    try {
      let githubToken = localStorage.getItem('githubToken');
      let repoOwner = localStorage.getItem('githubUsername');
      let repoName = localStorage.getItem('githubRepo');
      
      // הגדרת GitHub - המשתמש יזין את הטוקן
      if (!githubToken || !repoOwner || !repoName) {
        const defaultOwner = 'GabiAharon';
        const defaultRepo = 'gabiaharonportfolio';
        
        const userChoice = confirm(`🚀 הגדרת GitHub

האם ברצונך להשתמש בהגדרות הריפו שלך?
${defaultOwner}/${defaultRepo}

✅ כן - להמשיך עם הריפו שלי
❌ לא - אני רוצה להגדיר פרטים אחרים`);
        
        if (userChoice) {
          repoOwner = defaultOwner;
          repoName = defaultRepo;
          githubToken = prompt(`🔑 הכנס את הטוקן של GitHub שלך:

איך להשיג טוקן:
1. GitHub.com → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token עם הרשאות repo`);
          if (!githubToken || !githubToken.trim()) {
            throw new Error('נדרש טוקן GitHub תקף');
          }
          githubToken = githubToken.trim();
        } else {
          const userDetails = prompt(`🔧 הגדרת GitHub ידנית:

הכנס בפורמט הבא:
שם_משתמש/שם_ריפו/טוקן

או רק טוקן (אם רוצה להשתמש ב-${defaultOwner}/${defaultRepo})`);
          
          if (!userDetails) {
            throw new Error('נדרשים פרטי GitHub');
          }
          
          const parts = userDetails.split('/');
          if (parts.length === 3) {
            repoOwner = parts[0].trim();
            repoName = parts[1].trim();
            githubToken = parts[2].trim();
          } else if (parts.length === 1 && (userDetails.startsWith('github_pat_') || userDetails.startsWith('ghp_'))) {
            // רק טוקן - השתמש בברירת מחדל
            repoOwner = defaultOwner;
            repoName = defaultRepo;
            githubToken = userDetails.trim();
          } else {
            throw new Error('פורמט לא נכון - הכנס: שם_משתמש/שם_ריפו/טוקן או רק טוקן GitHub');
          }
        }
        
        if (!githubToken) {
          throw new Error('נדרש טוקן GitHub');
        }
        
        // שמור הגדרות חדשות
        localStorage.setItem('githubUsername', repoOwner);
        localStorage.setItem('githubRepo', repoName);
        localStorage.setItem('githubToken', githubToken);
        console.log('✅ הגדרות GitHub נשמרו:', { repoOwner, repoName, tokenPrefix: githubToken.substring(0, 10) + '...' });
      }
      
      // הכנת תוכן הקובץ עם קידוד UTF-8
      const fileContent = JSON.stringify(data, null, 2);
      const base64Content = btoa(unescape(encodeURIComponent(fileContent)));
      
      // רשימת קבצים לעדכון (צריך לעדכן שניהם!)
      const filesToUpdate = [
        'data/projects-data.json',          // הקובץ הראשי
        'public/data/projects-data.json'    // הקובץ הציבורי שהאתר קורא ממנו
      ];
      
      // שמירת הקבצים המקומיים באופן אוטומטי
      try {
        // שימוש ב-fetch כדי לשמור את הקבצים המקומיים
        const saveLocalFiles = await fetch('/api/save-local-files', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: data
          })
        });
        
        if (saveLocalFiles.ok) {
          console.log('✅ הקבצים המקומיים נשמרו בהצלחה');
        } else {
          console.error('❌ שגיאה בשמירת הקבצים המקומיים:', await saveLocalFiles.text());
        }
      } catch (error) {
        console.error('❌ שגיאה בשמירת הקבצים המקומיים:', error);
      }
      
      // הפעלת סקריפט העדכון המקומי
      try {
        const runScript = await fetch('/api/run-updater', {
          method: 'POST'
        });
        
        if (runScript.ok) {
          console.log('✅ סקריפט העדכון הופעל בהצלחה');
        } else {
          console.error('❌ שגיאה בהפעלת סקריפט העדכון:', await runScript.text());
        }
      } catch (error) {
        console.error('❌ שגיאה בהפעלת סקריפט העדכון:', error);
      }
      
      let allUpdatesSuccessful = true;
      
      // עדכון כל קובץ בנפרד
      for (const filePath of filesToUpdate) {
        try {
          // קבלת SHA הנוכחי של הקובץ
          const currentFileResponse = await fetch(
            `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
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

          // עדכון הקובץ
          const commitResponse = await fetch(
            `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
            {
              method: 'PUT',
              headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                message: `🔄 עדכון אוטומטי של נתוני פרויקטים [${filePath}] - ${new Date().toLocaleString('he-IL')}`,
                content: base64Content,
                sha: sha
              })
            }
          );

          if (!commitResponse.ok) {
            const errorData = await commitResponse.json();
            console.error(`❌ שגיאה בעדכון ${filePath}:`, errorData.message);
            allUpdatesSuccessful = false;
          } else {
            console.log(`✅ ${filePath} עודכן בהצלחה`);
          }
        } catch (error) {
          console.error(`❌ שגיאה בעדכון ${filePath}:`, error);
          allUpdatesSuccessful = false;
        }
      }

      if (allUpdatesSuccessful) {
        console.log('✅ כל הקבצים עודכנו בהצלחה ב-GitHub');
        
        // הודעה לקונסול על הצלחה
        console.log(`📁 Repository: ${repoOwner}/${repoName}`);
        console.log(`📅 Last update: ${new Date().toLocaleString('he-IL')}`);
        
        // עדכון Netlify באופן אוטומטי
        try {
          // נשתמש ב-Build Hook קבוע של Netlify
          // החלף את ה-URL הזה עם ה-Build Hook האמיתי שלך מ-Netlify
          // כדי ליצור Build Hook:
          // 1. היכנס לחשבון ה-Netlify שלך
          // 2. בחר את האתר שלך (gabiaharon.com)
          // 3. לחץ על "Site settings" בתפריט העליון
          // 4. בתפריט הצד, בחר "Build & deploy"
          // 5. גלול למטה עד שתמצא את החלק "Build hooks"
          // 6. לחץ על "Add build hook"
          // 7. תן לו שם (למשל "Auto Deploy")
          // 8. בחר את הענף שברצונך להפעיל (בדרך כלל "master" או "main")
          // 9. לחץ על "Save"
          // 10. העתק את ה-URL שנוצר והדבק אותו כאן
          const netlifyBuildHook = "https://api.netlify.com/build_hooks/688688c76292b35f68ccf3cb";
          
          console.log('🔄 מעדכן את Netlify אוטומטית...');
          
          // שליחת בקשת POST ל-build hook של Netlify
          const netlifyResponse = await fetch(netlifyBuildHook, {
            method: 'POST',
          });
          
          if (netlifyResponse.ok) {
            console.log('✅ Netlify עודכן בהצלחה!');
            console.log('האתר יתעדכן תוך 1-2 דקות.');
          } else {
            console.error('❌ שגיאה בעדכון Netlify:', netlifyResponse.status);
            
            // אם יש שגיאה, נציע למשתמש לעדכן את ה-Build Hook
            const updateBuildHook = confirm('❌ שגיאה בעדכון Netlify. האם ברצונך להגדיר Build Hook חדש?');
            
            if (updateBuildHook) {
              const newHook = prompt('הכנס את ה-URL של Build Hook של Netlify:');
              
              if (newHook && newHook.includes('api.netlify.com/build_hooks/')) {
                localStorage.setItem('netlifyBuildHook', newHook);
                
                // נסה שוב עם ה-Hook החדש
                const retryResponse = await fetch(newHook, {
                  method: 'POST',
                });
                
                if (retryResponse.ok) {
                  console.log('✅ Netlify עודכן בהצלחה עם ה-Hook החדש!');
                  alert('✅ Netlify עודכן בהצלחה!\nהאתר יתעדכן תוך 1-2 דקות.');
                } else {
                  console.error('❌ שגיאה בעדכון Netlify גם עם ה-Hook החדש:', retryResponse.status);
                  alert('❌ שגיאה בעדכון Netlify גם עם ה-Hook החדש.');
                }
              }
            }
          }
        } catch (error) {
          console.error('❌ שגיאה בעדכון Netlify:', error);
        }
        
        return true;
      } else {
        console.warn('⚠️ חלק מהקבצים לא עודכנו');
        return false;
      }
    } catch (error) {
      console.error('❌ שגיאה בשמירה ל-GitHub:', error);
      
      // בדיקות מפורטות יותר לסוגי שגיאות
      if (error.message) {
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          console.error('❌ שגיאת הרשאה - הטוקן לא תקף או שפג תוקפו');
          alert('🔑 שגיאת הרשאה ל-GitHub\n\nהטוקן שלך לא תקף או שפג תוקפו.\nהגדרות GitHub נמחקו - בפעם הבאה תוכל להזין טוקן חדש.');
          localStorage.removeItem('githubToken');
          localStorage.removeItem('githubUsername');
          localStorage.removeItem('githubRepo');
        } else if (error.message.includes('403') || error.message.includes('rate limit')) {
          console.error('❌ הגבלת קצב API או אין הרשאה לריפו');
          alert('⏱️ הגבלת קצב GitHub API\n\nנסה שוב בעוד כמה דקות.');
        } else if (error.message.includes('404')) {
          console.error('❌ הריפו לא נמצא או לא נגיש');
          alert('🔍 הריפו לא נמצא\n\nבדוק שהשם שלו נכון ושיש לך הרשאה לגשת אליו.');
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          console.error('❌ בעיית חיבור לאינטרנט');
          alert('🌐 בעיית חיבור\n\nבדוק את החיבור לאינטרנט ונסה שוב.');
        } else {
          console.error('❌ שגיאה כללית:', error.message);
        }
      }
      
      return false;
    }
  };

  const cancelEditing = () => {
    setEditingProject(null);
    setEditingInModal(false);
    setEditForm({});
    setShowImagePicker(false);
    setImageInputUrl('');
  };

  const duplicateProject = async (project) => {
    const newId = Math.max(...projectData.map(p => p.id), 0) + 1;
    const currentDate = new Date().toISOString().split('T')[0];
    
    const duplicatedProject = {
      ...project,
      id: newId,
      title: {
        he: `${project.title.he} (עותק)`,
        en: `${project.title.en} (Copy)`
      },
      date: currentDate
    };
    
    const updatedProjects = [duplicatedProject, ...projectData];
    setProjectData(updatedProjects);
    saveToLocalStorage(updatedProjects);
    
    // שמירה אוטומטית ל-GitHub
    const githubSaved = await saveToGitHub(updatedProjects);
    
    // הודעה על הצלחה עם סטטוס GitHub
    if (githubSaved) {
      alert(`✅ הפרויקט שוכפל בהצלחה!\nמזהה חדש: ${newId}\n✅ נשמר לגיטהאב אוטומטית\nהאתר יתעדכן תוך דקה`);
    } else {
      alert(`✅ הפרויקט שוכפל בהצלחה!\nמזהה חדש: ${newId}\n❌ שגיאה בשמירה לגיטהאב`);
    }
  };

  const deleteProject = async (project) => {
    if (confirm(`🗑️ האם אתה בטוח שברצונך למחוק את הפרויקט:\n"${project.title[language]}"?\n\nהפעולה לא ניתנת לביטול.`)) {
      const updatedProjects = projectData.filter(p => p.id !== project.id);
      setProjectData(updatedProjects);
      saveToLocalStorage(updatedProjects);
      
      // שמירה אוטומטית ל-GitHub
      const githubSaved = await saveToGitHub(updatedProjects);
      
      // סגור את המודל אם הפרויקט שנמחק פתוח
      if (selectedProject && selectedProject.id === project.id) {
        setSelectedProject(null);
      }
      
      // הודעה על הצלחה עם סטטוס GitHub
      if (githubSaved) {
        alert('🗑️ הפרויקט נמחק בהצלחה!\n✅ נשמר לגיטהאב אוטומטית\nהאתר יתעדכן תוך דקה');
      } else {
        alert('🗑️ הפרויקט נמחק מקומית\n❌ שגיאה בשמירה לגיטהאב');
      }
    }
  };

  const moveProjectUp = async (project) => {
    const currentIndex = projectData.findIndex(p => p.id === project.id);
    if (currentIndex <= 0) return; // כבר במיקום הראשון או לא נמצא
    
    const updatedProjects = [...projectData];
    // החלפת מקומות עם הפרויקט שלמעלה
    [updatedProjects[currentIndex - 1], updatedProjects[currentIndex]] = 
    [updatedProjects[currentIndex], updatedProjects[currentIndex - 1]];
    
    setProjectData(updatedProjects);
    saveToLocalStorage(updatedProjects);
    
    // שמירה אוטומטית ל-GitHub
    const githubSaved = await saveToGitHub(updatedProjects);
    if (!githubSaved) {
      alert('⚠️ הפרויקט הוזז מקומית\n❌ שגיאה בשמירה לגיטהאב\n(בדוק את הטוקן או החיבור לאינטרנט)');
    }
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
    
    // שמירה אוטומטית ל-GitHub
    const githubSaved = await saveToGitHub(updatedProjects);
    if (!githubSaved) {
      alert('⚠️ הפרויקט הוזז מקומית\n❌ שגיאה בשמירה לגיטהאב\n(בדוק את הטוקן או החיבור לאינטרנט)');
    }
  };

  // פונקציה להחלפת תמונה
  const handleImageChange = (imageType) => {
    setEditingImageType(imageType);
    setImageInputUrl(editForm[imageType] || '');
    setShowImagePicker(true);
  };

  const saveImageChange = () => {
    if (imageInputUrl.trim()) {
      setEditForm({
        ...editForm,
        [editingImageType]: imageInputUrl.trim()
      });
    }
    setShowImagePicker(false);
    setImageInputUrl('');
    setEditingImageType('');
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

  // פונקציה ליצירת פרויקט חדש
  const createNewProject = async () => {
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
    
    // שמירה אוטומטית ל-GitHub
    const githubSaved = await saveToGitHub(updatedProjects);
    
    // מיד פתח את הפרויקט החדש לעריכה
    startEditingProject(newProject, false);
    
    // גלול למעלה
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // הודעה על הצלחה עם סטטוס GitHub
    if (githubSaved) {
      alert(`✅ נוצר פרויקט חדש (ID: ${newId})!\n✅ נשמר לגיטהאב אוטומטית\nהאתר יתעדכן תוך דקה\nכעת ערוך את הפרטים לפי הצורך.`);
    } else {
      alert(`✅ נוצר פרויקט חדש (ID: ${newId})!\n❌ שגיאה בשמירה לגיטהאב\nכעת ערוך את הפרטים לפי הצורך.`);
    }
  };

  // פונקציה להוספת פרויקט בדיקה זמני
  const addTestProject = async () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const newId = Math.max(...projectData.map(p => p.id), 0) + 1;
    
    const testProject = {
      id: newId,
      title: { 
        he: "פרויקט בדיקה - " + new Date().toLocaleTimeString('he-IL'), 
        en: "Test Project - " + new Date().toLocaleTimeString('en-US')
      },
      description: { 
        he: "זהו פרויקט בדיקה שנוצר ב-" + new Date().toLocaleString('he-IL'), 
        en: "This is a test project created at " + new Date().toLocaleString('en-US')
      },
      detailedDescription: {
        he: "פרויקט זה נוצר כדי לבדוק את מערכת העדכון האוטומטית.",
        en: "This project was created to test the automatic update system."
      },
      category: "tool",
      date: currentDate,
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
      detailImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
      link: "#test-project",
      isVideo: false,
      technologies: ["Test Technology"],
      status: "בדיקה",
      features: {
        he: ["תכונת בדיקה 1", "תכונת בדיקה 2"],
        en: ["Test feature 1", "Test feature 2"]
      }
    };
    
    // הוספת הפרויקט בראש הרשימה
    const updatedProjects = [testProject, ...projectData];
    setProjectData(updatedProjects);
    saveToLocalStorage(updatedProjects);
    
    // שמירה מקומית של הקבצים
    try {
      const fileContent = JSON.stringify(updatedProjects, null, 2);
      
      // שימוש ב-fetch לשמירת הקובץ לשרת
      const response = await fetch('/api/save-local-files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: updatedProjects
        }),
      });
      
      if (response.ok) {
        console.log('✅ הקבצים המקומיים נשמרו בהצלחה');
        alert('✅ פרויקט הבדיקה נוסף בהצלחה!\nהקבצים המקומיים עודכנו.');
        
        // הפעלת סקריפט העדכון
        const scriptResponse = await fetch('/api/run-updater', {
          method: 'POST',
        });
        
        if (scriptResponse.ok) {
          console.log('✅ סקריפט העדכון הופעל בהצלחה');
          alert('✅ סקריפט העדכון הופעל בהצלחה!\nהשינויים יופיעו באתר בקרוב.');
        } else {
          console.error('❌ שגיאה בהפעלת סקריפט העדכון:', await scriptResponse.text());
          alert('❌ שגיאה בהפעלת סקריפט העדכון.\nנסה להפעיל את site-updater.bat באופן ידני.');
        }
      } else {
        console.error('❌ שגיאה בשמירת הקבצים המקומיים:', await response.text());
        alert('❌ שגיאה בשמירת הקבצים המקומיים.\nנסה להפעיל את site-updater.bat באופן ידני.');
      }
    } catch (error) {
      console.error('❌ שגיאה:', error);
      alert('❌ שגיאה: ' + error.message);
    }
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
          <>
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

            <button 
              onClick={resetToOriginalData}
              className="bg-yellow-600 p-2 rounded-full flex items-center gap-2 transition-all hover:bg-yellow-700"
              title="איפוס לנתונים מקוריים"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button 
              onClick={() => downloadUpdatedData(projectData)}
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

            <button 
              onClick={async () => {
                const token = localStorage.getItem('githubToken');
                const username = localStorage.getItem('githubUsername');
                const repo = localStorage.getItem('githubRepo');
                
                if (token && username && repo) {
                  const choice = confirm(`🔧 הגדרות GitHub נוכחיות:
                  
📁 Repository: ${username}/${repo}
🔑 Token: ${token.substring(0, 10)}...${token.slice(-4)}
📅 עדכון אחרון: ${localStorage.getItem('lastGitHubUpdate') || 'לא ידוע'}

✅ לבדוק חיבור API
❌ למחוק הגדרות`);
                  
                  if (choice) {
                    // בדיקת חיבור API ישירה
                    try {
                      console.log('🔍 בודק חיבור ל-GitHub API...');
                      const response = await fetch(`https://api.github.com/repos/${username}/${repo}`, {
                        headers: {
                          'Authorization': `token ${token}`,
                          'Accept': 'application/vnd.github.v3+json',
                        }
                      });
                      
                      if (response.ok) {
                        const repoData = await response.json();
                        alert(`✅ החיבור ל-GitHub תקין!
                        
📁 Repository: ${repoData.full_name}
🌟 Stars: ${repoData.stargazers_count}
📝 Description: ${repoData.description || 'אין תיאור'}
📅 עדכון אחרון: ${new Date(repoData.updated_at).toLocaleString('he-IL')}

🔑 הטוקן עובד בהצלחה!`);
                        localStorage.setItem('lastGitHubUpdate', new Date().toLocaleString('he-IL'));
                      } else if (response.status === 401) {
                        alert('❌ שגיאת הרשאה!\n\nהטוקן לא תקף או שפג תוקפו.\nהגדרות GitHub נמחקו.');
                        localStorage.removeItem('githubToken');
                        localStorage.removeItem('githubUsername');
                        localStorage.removeItem('githubRepo');
                      } else if (response.status === 404) {
                        alert('❌ הריפו לא נמצא!\n\nבדוק שהשם נכון ושיש לך הרשאה לגשת אליו.');
                      } else {
                        alert(`❌ שגיאה בחיבור ל-GitHub\nקוד שגיאה: ${response.status}\n\nבדוק את ההגדרות והרשאות.`);
                      }
                    } catch (error) {
                      console.error('שגיאה בבדיקת GitHub:', error);
                      alert('❌ שגיאה בחיבור לאינטרנט\n\nבדוק את החיבור שלך ונסה שוב.');
                    }
                  } else {
                    // מחיקת הגדרות
                    localStorage.removeItem('githubToken');
                    localStorage.removeItem('githubUsername');
                    localStorage.removeItem('githubRepo');
                    localStorage.removeItem('lastGitHubUpdate');
                    alert('🗑️ כל הגדרות GitHub נמחקו');
                  }
                } else {
                  // הצעה להגדיר טוקן חדש
                  const setupNew = confirm('⚙️ לא נמצאו הגדרות GitHub\n\n✅ להגדיר עכשיו עם הטוקן החדש?\n❌ להמתין לשמירה הבאה?');
                  
                  if (setupNew) {
                    // הגדרה מיידית
                    const newToken = prompt(`🔑 הכנס את הטוקן של GitHub שלך:

איך להשיג טוקן GitHub:
1. עבור ל-GitHub.com → Settings → Developer settings
2. לחץ על Personal access tokens → Tokens (classic)
3. לחץ Generate new token (classic)
4. בחר הרשאות: repo (full control)
5. העתק את הטוקן והדבק כאן`);
                    if (newToken && newToken.trim()) {
                      localStorage.setItem('githubToken', newToken.trim());
                      localStorage.setItem('githubUsername', 'GabiAharon');
                      localStorage.setItem('githubRepo', 'gabiaharonportfolio');
                      localStorage.setItem('lastGitHubUpdate', new Date().toLocaleString('he-IL'));
                      alert('✅ הגדרות GitHub הוגדרו!\n\nכעת ניתן לשמור שינויים אוטומטית ל-GitHub.');
                    } else {
                      alert('❌ לא הוזן טוקן תקף');
                    }
                  }
                }
              }}
              className="bg-purple-600 p-2 rounded-full flex items-center gap-2 transition-all hover:bg-purple-700"
              title="הגדרות ובדיקת GitHub"
            >
              <span className="text-xs">⚙️</span>
            </button>
          </>
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
                  
                  <div className="flex gap-2">
                    <button
                      onClick={addTestProject}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <span>+ הוסף פרויקט בדיקה</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        // הורדת הקובץ
                        downloadUpdatedData(projectData);
                        
                        // הצגת הוראות
                        alert(`✅ הקובץ הורד בהצלחה!

הוראות להעתקת הקובץ:
1. העתק את הקובץ שהורדת (projects-data-updated.json)
2. הדבק אותו בשני המיקומים הבאים:
   - data/projects-data.json
   - public/data/projects-data.json
3. הפעל את site-updater.bat

זהו! השינויים יופיעו באתר תוך מספר דקות.`);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>ייצוא והעתקה</span>
                    </button>
                    
                    <button
                      onClick={createNewProject}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <span>+ פרויקט חדש</span>
                    </button>
                  </div>
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

          {/* רשת הפרויקטים - תיקון גובה אחיד */}
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
                  className="group cursor-pointer flex"
                  whileHover={{ scale: editingProject === project.id ? 1 : 1.02 }}
                  whileTap={{ scale: editingProject === project.id ? 1 : 0.98 }}
                >
                  <div className={`${editingProject === project.id && !editingInModal ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'} p-0.5 rounded-xl w-full flex`}>
                    <div className="bg-gray-900 rounded-xl overflow-hidden flex flex-col w-full min-h-[600px]">
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

                        {/* כפתורי עריכה במצב אדמין */}
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
                          /* מצב עריכה ישירה */
                          <div className="space-y-3 flex-1 flex flex-col">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">כותרת עברית</label>
                              <input
                                type="text"
                                value={editForm.title_he || ''}
                                onChange={(e) => setEditForm({...editForm, title_he: e.target.value})}
                                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">כותרת אנגלית</label>
                              <input
                                type="text"
                                value={editForm.title_en || ''}
                                onChange={(e) => setEditForm({...editForm, title_en: e.target.value})}
                                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-300 mb-1">תיאור קצר עברית</label>
                              <textarea
                                value={editForm.description_he || ''}
                                onChange={(e) => setEditForm({...editForm, description_he: e.target.value})}
                                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm h-20 resize-none"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">סטטוס</label>
                              <select
                                value={editForm.status || ''}
                                onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm"
                              >
                                <option value="בפיתוח">בפיתוח</option>
                                <option value="הושלם">הושלם</option>
                                <option value="פורסם">פורסם</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-1">קטגוריה</label>
                              <select
                                value={editForm.category || ''}
                                onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm"
                              >
                                <option value="plugin">תוספים</option>
                                <option value="tool">כלים</option>
                                <option value="video">סרטונים</option>
                                <option value="interface">ממשקים</option>
                                <option value="app">אפליקציות</option>
                              </select>
                            </div>
                          </div>
                        ) : (
                          /* מצב צפייה רגיל */
                          <>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
                              {project.title[language]}
                            </h3>
                            <div className="flex-1 flex flex-col">
                              <div className="text-gray-300 text-sm mb-4 line-clamp-3 flex-1 whitespace-pre-line">
                                {project.description[language]}
                              </div>
                              
                              {/* טכנולוגיות */}
                              <div className="mb-4">
                                <p className="text-xs text-gray-400 mb-2">{t('technologies')}:</p>
                                <div className="flex flex-wrap gap-1">
                                  {project.technologies.slice(0, 3).map((tech, index) => (
                                    <span key={index} className="bg-gray-700 text-xs px-2 py-1 rounded">
                                      {tech}
                                    </span>
                                  ))}
                                  {project.technologies.length > 3 && (
                                    <span className="bg-gray-600 text-xs px-2 py-1 rounded">
                                      +{project.technologies.length - 3}
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              {/* מידע נוסף */}
                              <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{formatDate(project.date)}</span>
                                </div>
                              </div>
                              
                              {/* כפתורי פעולה */}
                              <div className="mt-auto">
                                {project.isVideo && project.link && !project.link.includes('#') ? (
                                  // שני כפתורים לפרויקטי סרטון
                                  <div className="flex flex-col gap-2">
                                    <button
                                      onClick={() => setSelectedProject(project)}
                                      className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors text-sm"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                      <span>מידע נוסף על הפרויקט</span>
                                    </button>
                                    <a
                                      href={project.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Play className="w-4 h-4" />
                                      <span>{t('watchVideo')}</span>
                                    </a>
                                  </div>
                                ) : project.category === 'tool' ? (
                                  // כפתורים מיוחדים לכלים
                                  <div className="flex flex-col gap-2">
                                    <button
                                      onClick={() => setSelectedProject(project)}
                                      className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors text-sm"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                      <span>מידע נוסף על הכלי</span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (project.link && project.link !== '#' && !project.link.includes('#')) {
                                          window.open(project.link, '_blank');
                                        } else {
                                          alert('🔧 הכלי הזה עדיין בפיתוח!\nיהיה זמין בקרוב.');
                                        }
                                      }}
                                      className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors text-sm"
                                    >
                                      <div className="w-4 h-4 flex items-center justify-center">⚙️</div>
                                      <span>למעבר לכלי לחץ כאן</span>
                                    </button>
                                  </div>
                                ) : (
                                  // כפתור לצפייה מהירה
                                  <button
                                    onClick={() => setSelectedProject(project)}
                                    className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors text-sm"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                    <span>{t('quickView')}</span>
                                  </button>
                                )}
                              </div>
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
              className="bg-gray-900 w-full max-w-4xl h-full max-h-[90vh] overflow-y-auto rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-4 flex justify-between items-center">
                <h3 className="text-xl font-bold">{selectedProject.title[language]}</h3>
                <div className="flex items-center gap-2">
                  {/* כפתורי עריכה במודל */}
                  {isEditMode && (
                    <>
                      {editingInModal ? (
                        <div className="flex gap-2">
                          <button
                            onClick={saveProjectChanges}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg flex items-center gap-2 transition-colors"
                            title="שמור שינויים"
                          >
                            <Save className="w-4 h-4" />
                            <span className="text-sm">שמור</span>
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center gap-2 transition-colors"
                            title="בטל עריכה"
                          >
                            <X className="w-4 h-4" />
                            <span className="text-sm">בטל</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditingProject(selectedProject, true)}
                          className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-lg flex items-center gap-2 transition-colors"
                          title="ערוך פרויקט במודל"
                        >
                          <Edit3 className="w-4 h-4" />
                          <span className="text-sm">{t('editInModal')}</span>
                        </button>
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
                {editingInModal ? (
                  /* מצב עריכה במודל */
                  <div className="space-y-6">
                    {console.log('🔄 מצב עריכה במודל נטען - SHOULD SHOW 2 IMAGES:', {
                      editingInModal,
                      selectedProject: selectedProject?.title,
                      editForm: editForm,
                      hasDetailImage: !!selectedProject?.detailImage,
                      cardImage: editForm.image || selectedProject?.image,
                      detailImage: editForm.detailImage || selectedProject?.detailImage
                    })}
                    {/* תמונות הפרויקט עם אפשרות עריכה */}
                    <div>
                      <h3 className="text-xl font-bold mb-4 text-white">🖼️ תמונות הפרויקט</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* תמונת כרטיס ראשית */}
                        <div>
                          <label className="block text-lg font-semibold mb-3 text-orange-400">🧡 תמונת כרטיס ראשית</label>
                          
                          {/* שדה קישור תמונת כרטיס */}
                          <div className="mb-3">
                            <label className="block text-sm font-medium mb-2">קישור לתמונת כרטיס</label>
                            <div className="flex gap-2">
                              <input
                                type="url"
                                value={editForm.image || ''}
                                onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                                className="flex-1 bg-gray-800 border border-orange-400 rounded-lg px-3 py-2 text-sm"
                                placeholder="https://i.postimg.cc/..."
                              />
                              <button
                                onClick={() => handleImageChange('image')}
                                className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center gap-1"
                                title="פתח בוחר תמונה"
                              >
                                <Camera className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* תצוגה מקדימה */}
                          <div className="relative">
                            <img 
                              src={editForm.image || selectedProject.image} 
                              alt="תמונת כרטיס"
                              className="w-full h-48 object-cover rounded-lg border-2 border-orange-400"
                            />
                          </div>
                          <p className="text-xs text-gray-400 mt-2">התמונה שתופיע בכרטיס הפרויקט</p>
                        </div>

                        {/* תמונה מפורטת */}
                        <div>
                          <label className="block text-lg font-semibold mb-3 text-blue-400">🔵 תמונה מפורטת</label>
                          
                          {/* שדה קישור תמונה מפורטת */}
                          <div className="mb-3">
                            <label className="block text-sm font-medium mb-2">קישור לתמונה מפורטת</label>
                            <div className="flex gap-2">
                              <input
                                type="url"
                                value={editForm.detailImage || ''}
                                onChange={(e) => setEditForm({...editForm, detailImage: e.target.value})}
                                className="flex-1 bg-gray-800 border border-blue-400 rounded-lg px-3 py-2 text-sm"
                                placeholder="https://i.postimg.cc/..."
                              />
                              <button
                                onClick={() => handleImageChange('detailImage')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center gap-1"
                                title="פתח בוחר תמונה"
                              >
                                <Camera className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* תצוגה מקדימה */}
                          <div className="relative">
                            <img 
                              src={editForm.detailImage || selectedProject.detailImage || selectedProject.image} 
                              alt="תמונה מפורטת"
                              className="w-full h-48 object-cover rounded-lg border-2 border-blue-400"
                              onError={(e) => {
                                console.log('❌ שגיאה בטעינת תמונה מפורטת:', e.target.src);
                                e.target.src = selectedProject.image;
                              }}
                            />
                          </div>
                          <p className="text-xs text-gray-400 mt-2">התמונה שתופיע במצב צפייה מפורטת</p>
                        </div>
                      </div>
                    </div>

                    {/* כותרות */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">כותרת עברית</label>
                        <input
                          type="text"
                          value={editForm.title_he || ''}
                          onChange={(e) => setEditForm({...editForm, title_he: e.target.value})}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">כותרת אנגלית</label>
                        <input
                          type="text"
                          value={editForm.title_en || ''}
                          onChange={(e) => setEditForm({...editForm, title_en: e.target.value})}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2"
                        />
                      </div>
                    </div>

                    {/* תיאורים קצרים */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">תיאור קצר עברית</label>
                        <textarea
                          value={editForm.description_he || ''}
                          onChange={(e) => setEditForm({...editForm, description_he: e.target.value})}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 h-24"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">תיאור קצר אנגלית</label>
                        <textarea
                          value={editForm.description_en || ''}
                          onChange={(e) => setEditForm({...editForm, description_en: e.target.value})}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 h-24"
                        />
                      </div>
                    </div>

                    {/* תיאורים מפורטים */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">תיאור מפורט עברית</label>
                        <textarea
                          value={editForm.detailedDescription_he || ''}
                          onChange={(e) => setEditForm({...editForm, detailedDescription_he: e.target.value})}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 h-32"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">תיאור מפורט אנגלית</label>
                        <textarea
                          value={editForm.detailedDescription_en || ''}
                          onChange={(e) => setEditForm({...editForm, detailedDescription_en: e.target.value})}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 h-32"
                        />
                      </div>
                    </div>

                    {/* הגדרות כלליות */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">קטגוריה</label>
                        <select
                          value={editForm.category || ''}
                          onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2"
                        >
                          <option value="plugin">תוספים</option>
                          <option value="tool">כלים</option>
                          <option value="video">סרטונים</option>
                          <option value="interface">ממשקים</option>
                          <option value="app">אפליקציות</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">סטטוס</label>
                        <select
                          value={editForm.status || ''}
                          onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2"
                        >
                          <option value="בפיתוח">בפיתוח</option>
                          <option value="הושלם">הושלם</option>
                          <option value="פורסם">פורסם</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">קישור לפרויקט</label>
                        <input
                          type="url"
                          value={editForm.link || ''}
                          onChange={(e) => setEditForm({...editForm, link: e.target.value})}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2"
                          placeholder="https://..."
                        />
                      </div>
                    </div>



                    {/* כלי AI */}
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('aiTools')}</label>
                      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {getAllAITools().map((tool) => (
                            <button
                              key={tool}
                              onClick={() => handleAIToolToggle(tool)}
                              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                (editForm.technologies || []).includes(tool)
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              }`}
                            >
                              {tool}
                            </button>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={customAITool}
                            onChange={(e) => setCustomAITool(e.target.value)}
                            placeholder={t('customToolPlaceholder')}
                            className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm"
                          />
                          <button
                            onClick={addCustomAITool}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors"
                          >
                            {t('addCustomTool')}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* תכונות */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">תכונות עברית (מופרדות בפסיק)</label>
                        <textarea
                          value={editForm.features_he || ''}
                          onChange={(e) => setEditForm({...editForm, features_he: e.target.value})}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 h-24"
                          placeholder="תכונה 1, תכונה 2, תכונה 3"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">תכונות אנגלית (מופרדות בפסיק)</label>
                        <textarea
                          value={editForm.features_en || ''}
                          onChange={(e) => setEditForm({...editForm, features_en: e.target.value})}
                          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 h-24"
                          placeholder="Feature 1, Feature 2, Feature 3"
                        />
                      </div>
                    </div>

                    {/* חוקי וידיאו */}
                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={editForm.isVideo || false}
                          onChange={(e) => setEditForm({...editForm, isVideo: e.target.checked})}
                          className="rounded"
                        />
                        <span>זהו פרויקט וידיאו</span>
                      </label>
                    </div>
                  </div>
                ) : (
                  /* מצב צפייה רגיל */
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
                      <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {selectedProject.detailedDescription[language]}
                      </div>
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
                    {selectedProject.isVideo && selectedProject.link && selectedProject.link !== '#' && (
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

      {/* מודל החלפת תמונה */}
      <AnimatePresence>
        {showImagePicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-60 flex items-center justify-center p-4"
            onClick={() => setShowImagePicker(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 w-full max-w-md rounded-xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">{t('enterImageUrl')}</h3>
              
              <div className="space-y-4">
                <input
                  type="url"
                  value={imageInputUrl}
                  onChange={(e) => setImageInputUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2"
                  autoFocus
                />
                
                {imageInputUrl && (
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('imagePreview')}</label>
                    <img 
                      src={imageInputUrl} 
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-32 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400" style={{display: 'none'}}>
                      לא ניתן לטעון תמונה
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <button
                    onClick={saveImageChange}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
                  >
                    שמור
                  </button>
                  <button
                    onClick={() => setShowImagePicker(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors"
                  >
                    בטל
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 