import { authAPI } from '../api/auth';

// Business logic for authentication
export const authService = {

  // Register with validation
  register: async (userData) => {

    // Client-side validation before sending to API
    const errors = validateRegistration(userData);
    
    if (Object.keys(errors).length > 0) {
      throw new Error(Object.values(errors)[0]);
    }

    try {
      const response = await authAPI.register(userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // login function
  login: async (email, password) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    try {
      const response = await authAPI.login({ email, password });
      return response;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    await authAPI.logout();
  },

  isAuthenticated: () => {
    return !!authAPI.getCurrentUser();
  },

  getUserRole: () => {
    const user = authAPI.getCurrentUser();
    return user?.role || null;
  },

  getCurrentUser: () => {
    return authAPI.getCurrentUser();
  },
};

function validateRegistration(data) {
  const errors = {};

  if (!data.username?.trim()) errors.username = 'Username is required';
  if (!data.first_name?.trim()) errors.first_name = 'First name is required';
  if (!data.last_name?.trim()) errors.last_name = 'Last name is required';
  if (!data.email?.trim()) errors.email = 'Email is required';
  if (!data.employee_id?.trim()) errors.employee_id = 'Employee ID is required';
  
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  if (data.password !== data.confirm_password) {
    errors.confirm_password = 'Passwords do not match';
  }

  return errors;
}