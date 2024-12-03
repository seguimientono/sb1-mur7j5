import { User } from '../types/user';

const CURRENT_USER_KEY = 'currentUser';

export const login = (email: string): User => {
  const user: User = {
    email,
    name: email.split('@')[0]
  };
  
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return user;
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(CURRENT_USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};