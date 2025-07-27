import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  // בדיקה שהבקשה היא מסוג POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'שיטה לא מורשית. יש להשתמש ב-POST' });
  }

  try {
    // הנתיב לסקריפט העדכון
    const scriptPath = path.join(process.cwd(), 'github-update-new.ps1');
    
    // בדיקה שהסקריפט קיים
    if (!fs.existsSync(scriptPath)) {
      console.error(`❌ הסקריפט לא נמצא בנתיב: ${scriptPath}`);
      return res.status(500).json({ error: `הסקריפט לא נמצא בנתיב: ${scriptPath}` });
    }
    
    console.log(`✅ מריץ סקריפט עדכון: ${scriptPath}`);
    
    // הפעלת הסקריפט עם דגל לכפיית עדכון Netlify
    const command = `powershell.exe -NoProfile -ExecutionPolicy Bypass -File "${scriptPath}" -ForceNetlify`;
    console.log(`📝 פקודה: ${command}`);
    
    // הפעלת הסקריפט
    exec(command, { timeout: 60000 }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ שגיאה בהפעלת הסקריפט: ${error.message}`);
        return res.status(500).json({ 
          error: `שגיאה בהפעלת הסקריפט: ${error.message}`,
          stdout: stdout,
          stderr: stderr
        });
      }
      
      if (stderr) {
        console.error(`⚠️ שגיאות מהסקריפט: ${stderr}`);
      }
      
      console.log(`✅ תוצאת הסקריפט: ${stdout}`);
      
      // בדיקה אם הסקריפט הצליח לעדכן את Netlify
      const netlifySuccess = stdout.includes('Netlify build triggered successfully');
      
      return res.status(200).json({ 
        success: true, 
        netlifyUpdated: netlifySuccess,
        message: netlifySuccess ? 'הסקריפט הופעל והאתר יתעדכן בקרוב' : 'הסקריפט הופעל אך יתכן שהעדכון לא הצליח',
        output: stdout
      });
    });
  } catch (error) {
    console.error('❌ שגיאה בהפעלת הסקריפט:', error);
    return res.status(500).json({ error: `שגיאה בהפעלת הסקריפט: ${error.message}` });
  }
} 