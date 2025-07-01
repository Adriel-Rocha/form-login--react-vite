const apiUrl = 'https://login-auth-api-spring.onrender.com/api/v1';

export async function login(email, password) {
  const response = await fetch(apiUrl + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Error when logging in.');
  }

  return await response.json();
}

export async function register(name, email, password) {
  const response = await fetch(apiUrl + '/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Error registering.');
  }

  return await response.json();
}


export function logout() {
  sessionStorage.clear();
  if(sessionStorage.getItem('token')) {
    sessionStorage.removeItem('token');
  }
}

export function isAuthenticated() {
  return !!sessionStorage.getItem('token');
}