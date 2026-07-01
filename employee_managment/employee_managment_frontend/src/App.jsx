import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import RegisterEmployee from './pages/RegisterEmployee';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';

function App() {
  // Helper to check if user is authenticated
  const isAuthenticated = () => {
    return !!localStorage.getItem('user');
  };

  // Helper to get user role
  const getUserRole = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : null;
  };

  // Protected route wrapper
  const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }
    
    const role = getUserRole();
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      return <Navigate to="/login" replace />;
    }
    
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterEmployee />} />
        
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute allowedRoles={['Employee']}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;