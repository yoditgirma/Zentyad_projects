const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const dashboardAPI = {
  getAdminStats: async () => {
    const response = await fetch(`${API_BASE_URL}/admin-stats/`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch admin stats');
    }
    
    return response.json();
  },

  getAllEmployees: async (search = '') => {
    const url = search 
      ? `${API_BASE_URL}/employees/?search=${encodeURIComponent(search)}`
      : `${API_BASE_URL}/employees/`;
      
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch employees');
    }
    
    return response.json();
  },

  getEmployeeStats: async () => {
    const response = await fetch(`${API_BASE_URL}/employee-stats/`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch employee stats');
    }
    
    return response.json();
  },

  getCurrentUser: () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('user');
  },

  getUserRole: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : null;
  },
};