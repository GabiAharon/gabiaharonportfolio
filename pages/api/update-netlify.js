// API endpoint to trigger Netlify build
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Netlify build hook URL
    const netlifyBuildHook = "https://api.netlify.com/build_hooks/688688c76292b35f68ccf3cb";
    
    console.log('🔄 Triggering Netlify build...');
    
    // Send POST request to Netlify build hook
    const response = await fetch(netlifyBuildHook, {
      method: 'POST',
    });
    
    if (response.ok) {
      console.log('✅ Netlify build triggered successfully!');
      return res.status(200).json({ 
        success: true, 
        message: 'Netlify build triggered successfully. Your site will be updated in 1-2 minutes.'
      });
    } else {
      console.error('❌ Failed to trigger Netlify build:', response.status, response.statusText);
      return res.status(500).json({ 
        error: 'Failed to trigger Netlify build', 
        status: response.status,
        statusText: response.statusText
      });
    }
  } catch (error) {
    console.error('❌ Error triggering Netlify build:', error);
    return res.status(500).json({ error: `Error triggering Netlify build: ${error.message}` });
  }
} 