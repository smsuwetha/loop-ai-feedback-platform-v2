export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  workspaceId: string;
  workspaceSlug: string;
}

const AUTH_STORAGE_KEY = "loop_auth_user";

export function saveAuthUser(user: AuthUser) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify(user)
  );
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  const storedUser =
    localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function clearAuthUser() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function isAuthenticated() {
  return getAuthUser() !== null;
}