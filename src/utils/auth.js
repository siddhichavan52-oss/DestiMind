const USERS_KEY = 'destimind_users';
const SESSION_KEY = 'destimind_session';

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

export function signupUser({ name, email, password }) {
  const users = getUsers();
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return { ok: false, message: 'An account with this email already exists. Log in instead.' };
  }
  users.push({ name, email, password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { ok: true };
}

export function loginUser({ email, password }) {
  const users = getUsers();
  const match = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!match) {
    return { ok: false, message: 'No account found with that email and password. Sign up first.' };
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify({ name: match.name, email: match.email }));
  return { ok: true, user: match };
}

export function isLoggedIn() {
  return !!localStorage.getItem(SESSION_KEY);
}

export function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}
