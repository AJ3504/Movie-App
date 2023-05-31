const random = (Math.random()*1e8).toFixed(0)
const cookieName = 'sessionID';
const cookieValue = `movie-app: MVA-${random}`

localStorage.setItem(cookieName, cookieValue);