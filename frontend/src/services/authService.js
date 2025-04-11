const API_URL = 'http://localhost:3000';

export const authService = {
  login: () => {
    try {
      window.location.href = `${API_URL}/auth/google`;
    } catch (error) {
      console.error('Login redirect failed:', error);
    }
  },

  isAuthenticated: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/status`, {
        credentials: 'include'
      });
      const data = await response.json();
      return data.authenticated;
    } catch (error) {
      console.error('Auth check failed:', error);
      return false;
    }
  },

  getUserInfo: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/status`, {
        credentials: 'include'
      });
      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Failed to get user info:', error);
      return null;
    }
  },

  logout: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Logout failed:', error);
      return false;
    }
  }
};