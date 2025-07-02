import React from 'react';

// Set this via .env or config for production
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://your-backend-url.com';

function Snippet({ protectedSite }) {
  if (!protectedSite) return null;

  // Just build the snippet string directly, with access denied logic
  const snippet = `<!-- OsWall Integration Snippet -->
  <script>
  fetch('${BACKEND_URL}/api/visit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ siteId: '${protectedSite._id || protectedSite.id}' })
  }).then(res => {
    if (res.status === 403 || res.status === 429) {
      document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;"><h1 style="color:red;font-size:2.5rem;">Access Denied</h1></div>';
      document.title = "Access Denied";
    }
  });
  </script>`;

  return (
    <div className="integration-snippet-card card my-4">
      <div className="card-body">
        <h5 className="card-title">Integration Snippet</h5>
        <p className="card-text">Copy and paste this snippet into your website's &lt;head&gt; or &lt;body&gt; to enable OsWall protection and logging.</p>
        <pre className="bg-light p-2 rounded">{snippet}</pre>
      </div>
    </div>
  );
}

export default Snippet;
