import { exec } from 'child_process';
import path from 'path';

export default async function handler(req, res) {
  // בדיקה שהבקשה היא מסוג POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'שיטה לא מורשית. יש להשתמש ב-POST' });
  }

  try {
    // הנתיב לסקריפט העדכון
    const scriptPath = path.join(process.cwd(), 'github-update-new.ps1');
    
    // הפעלת הסקריפט
    exec(`powershell.exe -NoProfile -ExecutionPolicy Bypass -File "${scriptPath}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ שגיאה בהפעלת הסקריפט: ${error.message}`);
        return res.status(500).json({ error: `שגיאה בהפעלת הסקריפט: ${error.message}` });
      }
      
      if (stderr) {
        console.error(`⚠️ שגיאות מהסקריפט: ${stderr}`);
      }
      
      console.log(`✅ תוצאת הסקריפט: ${stdout}`);
      return res.status(200).json({ 
        success: true, 
        message: 'הסקריפט הופעל בהצלחה',
        output: stdout
      });
    });
  } catch (error) {
    console.error('❌ שגיאה בהפעלת הסקריפט:', error);
    return res.status(500).json({ error: `שגיאה בהפעלת הסקריפט: ${error.message}` });
  }
} 