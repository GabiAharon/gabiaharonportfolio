// Server-side GitHub commit endpoint
// Commits updated projects data to multiple paths using a repo token from env

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      data, // required: array of projects
      commitMessage = `🔄 עדכון אוטומטי של נתוני פרויקטים - ${new Date().toLocaleString('he-IL')}`,
      files = [
        'data/projects-data.json',
        'public/data/projects-data.json'
      ],
    } = req.body || {};

    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'Invalid payload: data must be an array of projects' });
    }

    const githubToken = process.env.GITHUB_TOKEN;
    const repoOwner = process.env.GITHUB_REPO_OWNER;
    const repoName = process.env.GITHUB_REPO_NAME;

    if (!githubToken || !repoOwner || !repoName) {
      return res.status(500).json({
        error: 'Server is missing GitHub configuration (GITHUB_TOKEN, GITHUB_REPO_OWNER, GITHUB_REPO_NAME)'
      });
    }

    const fileContent = JSON.stringify(data, null, 2);
    const base64Content = Buffer.from(fileContent, 'utf8').toString('base64');

    let allOk = true;
    const results = [];

    for (const filePath of files) {
      // Get current SHA if file exists
      let sha = null;
      try {
        const getResp = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        });
        if (getResp.ok) {
          const json = await getResp.json();
          sha = json.sha;
        }
      } catch (_) {}

      // Commit update
      const putResp = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: commitMessage,
          content: base64Content,
          sha,
        }),
      });

      if (!putResp.ok) {
        allOk = false;
        const err = await putResp.json().catch(() => ({}));
        results.push({ filePath, ok: false, status: putResp.status, message: err.message });
      } else {
        results.push({ filePath, ok: true });
      }
    }

    return res.status(allOk ? 200 : 207).json({ success: allOk, results });
  } catch (error) {
    console.error('❌ GitHub commit error:', error);
    return res.status(500).json({ error: error.message || 'Unknown error' });
  }
}


