import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardAPI } from '../api/dashboard';
import { authService } from '../services/authService';
import StatCard from '../components/ui/StatCard';
import Button from '../components/ui/Button';

function EmployeeDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await dashboardAPI.getEmployeeStats();
      setStats(data);
    } catch (error) {
      setError(error.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
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
          <p className="text-slate-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const user = stats?.user;
  const companyStats = stats?.company_stats;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#33CC1A] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👤</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#0A3B57]">Employee Dashboard</h1>
                <p className="text-sm text-slate-500">Welcome to your employee portal</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">
                {user?.first_name} {user?.last_name}
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

        {/* Welcome Banner */}
        <div className="bg-linear-to-r from-[#0A3B57] to-[#1a5a7a] rounded-xl shadow-lg p-6 mb-8 text-white">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm">
              {user?.first_name?.charAt(0) || '👤'}
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                Welcome back, {user?.first_name} {user?.last_name}! 👋
              </h2>
              <p className="text-blue-100 mt-1">
                {user?.employee_id} • {user?.role}
              </p>
              <div className="flex flex-wrap gap-4 mt-2 text-sm">
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  📧 {user?.email}
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  📱 {user?.phone || 'No phone'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard 
            icon="👥" 
            label="Total Employees" 
            value={companyStats?.total_employees || 0}
            color="green"
          />
          <StatCard 
            icon="🛡️" 
            label="Total Admins" 
            value={companyStats?.total_admins || 0}
            color="blue"
          />
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="text-lg font-semibold text-[#0A3B57] flex items-center gap-2">
              📋 Your Profile Information
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-slate-500">Employee ID</p>
                <p className="text-slate-800 font-medium font-mono mt-1">
                  {user?.employee_id}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Full Name</p>
                <p className="text-slate-800 font-medium mt-1">
                  {user?.first_name} {user?.last_name}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Email Address</p>
                <p className="text-slate-800 font-medium mt-1">
                  {user?.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Phone Number</p>
                <p className="text-slate-800 font-medium mt-1">
                  {user?.phone || 'Not provided'}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Role</p>
                <p className="mt-1">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {user?.role}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Joined Date</p>
                <p className="text-slate-800 font-medium mt-1">
                  {user?.date_joined}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="font-semibold text-[#0A3B57]">My Profile</h3>
              <p className="text-sm text-slate-500 mt-1">View and edit your details</p>
              <Button className="w-full mt-3 bg-[#0A3B57] hover:bg-[#083045]">
                View Profile
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-3">📅</div>
              <h3 className="font-semibold text-[#0A3B57]">Leave Requests</h3>
              <p className="text-sm text-slate-500 mt-1">Apply for leave</p>
              <Button className="w-full mt-3 bg-[#33CC1A] hover:bg-[#29b816]">
                Apply Leave
              </Button>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-3">⏰</div>
              <h3 className="font-semibold text-[#0A3B57]">Attendance</h3>
              <p className="text-sm text-slate-500 mt-1">Mark your attendance</p>
              <Button className="w-full mt-3 bg-purple-600 hover:bg-purple-700">
                Clock In/Out
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EmployeeDashboard;