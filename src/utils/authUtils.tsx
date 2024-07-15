export function isLoggedIn() {
  const token = sessionStorage.getItem('token');
  return !!token;
}

export function login() {
  sessionStorage.setItem('token', 'true');
}

export function logout() {
  sessionStorage.removeItem('token');
}
