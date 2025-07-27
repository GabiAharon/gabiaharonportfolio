import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // בדיקה שהבקשה היא מסוג POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'שיטה לא מורשית. יש להשתמש ב-POST' });
  }

  try {
    const { data, files } = req.body;

    if (!data || !files || !Array.isArray(files)) {
      return res.status(400).json({ error: 'נתונים חסרים או לא תקינים' });
    }

    // המרת הנתונים ל-JSON מפורמט
    const jsonData = JSON.stringify(data, null, 2);

    // שמירת כל הקבצים
    for (const filePath of files) {
      // קבלת הנתיב המלא
      const fullPath = path.join(process.cwd(), filePath);
      
      // וידוא שהתיקייה קיימת
      const directory = path.dirname(fullPath);
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }
      
      // כתיבת הקובץ
      fs.writeFileSync(fullPath, jsonData, 'utf8');
      console.log(`✅ נשמר: ${filePath}`);
    }

    // החזרת תשובה חיובית
    return res.status(200).json({ success: true, message: 'הקבצים נשמרו בהצלחה' });
  } catch (error) {
    console.error('❌ שגיאה בשמירת הקבצים:', error);
    return res.status(500).json({ error: `שגיאה בשמירת הקבצים: ${error.message}` });
  }
} 