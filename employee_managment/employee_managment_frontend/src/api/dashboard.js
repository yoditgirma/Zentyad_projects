const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const dashboardAPI = {
    
  // Admin Dashboard
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

  getAllEmployees: async () => {
    const response = await fetch(`${API_BASE_URL}/employees/`, {
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

  // Employee Dashboard
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
};