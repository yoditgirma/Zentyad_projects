import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardAPI } from '../api/dashboard';
import { authService } from '../services/authService';
import StatCard from '../components/ui/StatCard';
import Button from '../components/ui/Button';

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    
    try {
      const [statsData, employeesData] = await Promise.all([
        dashboardAPI.getAdminStats(),
        dashboardAPI.getAllEmployees()
      ]);
      
      setStats(statsData);
      setEmployees(employeesData.employees || []);
    } catch (error) {
      setError(error.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length >= 2) {
      try {
        const data = await dashboardAPI.getAllEmployees(value);
        setEmployees(data.employees || []);
      } catch (error) {
        console.error('Search error:', error);
      }
    } else if (value.length === 0) {
      fetchDashboardData();
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#33CC1A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0A3B57] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🏢</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#0A3B57]">Admin Dashboard</h1>
                <p className="text-sm text-slate-500">Manage employees and view insights</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">
                Welcome, {dashboardAPI.getCurrentUser()?.first_name || 'Admin'}
              </span>
              <Button 
                onClick={handleLogout}
                className="w-auto px-4 py-2 bg-red-600 hover:bg-red-700"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            ❌ {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            icon="👥" 
            label="Total Employees" 
            value={stats?.total_employees || 0}
            color="green"
          />
          <StatCard 
            icon="🛡️" 
            label="Total Admins" 
            value={stats?.total_admins || 0}
            color="blue"
          />
          <StatCard 
            icon="📊" 
            label="Total Users" 
            value={stats?.total_users || 0}
            color="purple"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-[#0A3B57] mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Button className="w-auto px-6 bg-[#33CC1A] hover:bg-[#29b816]">
              ➕ Add New Employee
            </Button>
            <Button className="w-auto px-6 bg-[#0A3B57] hover:bg-[#083045]">
              📋 Export Report
            </Button>
            <Button className="w-auto px-6 bg-blue-600 hover:bg-blue-700">
              👥 View All Employees
            </Button>
          </div>
        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-[#0A3B57]">
              Employees ({employees.length})
            </h2>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={handleSearch}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33CC1A] focus:border-transparent"
              />
              <Button 
                onClick={fetchDashboardData}
                className="w-auto px-4 py-2 bg-slate-600 hover:bg-slate-700"
              >
                🔄 Refresh
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {employees.length > 0 ? (
                  employees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono text-slate-800">
                        {employee.employee_id}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">
                        {employee.first_name} {employee.last_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {employee.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {employee.phone || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {employee.date_joined}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          employee.is_active 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {employee.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-sm text-slate-500">
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;