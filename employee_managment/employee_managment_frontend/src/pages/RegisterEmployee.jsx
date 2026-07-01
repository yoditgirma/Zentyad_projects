import { useState } from 'react';
import { authService } from '../services/authService';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';

function RegisterEmployee() {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    employee_id: '',
    phone: '',
    password: '',
    confirm_password: '',
    role: 'Employee',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear messages when user types
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Use the service instead of direct API call
      const response = await authService.register(formData);
      
      setSuccess(response.message || 'Registration successful!');
      
      // Reset form
      setFormData({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        employee_id: '',
        phone: '',
        password: '',
        confirm_password: '',
        role: 'Employee',
      });

    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center bg-blue-600 text-white p-12">
          <h1 className="text-4xl font-bold mb-4">Employee Management</h1>
          <p className="text-blue-100 leading-7 text-lg">
            Register new employees and manage your workforce
          </p>
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-blue-50">
              <span>Secure registration</span>
            </div>
            <div className="flex items-center gap-3 text-blue-50">
              <span>Role-based access</span>
            </div>
            <div className="flex items-center gap-3 text-blue-50">
              <span>Real-time validation</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800">Create Account</h2>
            <p className="text-slate-500 mt-2">
              Register a new employee into the system
            </p>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              {success}
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />

              <Input
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Employee ID"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                required
                placeholder="e.g., EMP001"
              />

              <Input
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g., 0912345678"
              />
            </div>

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="employee@company.com"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
              />
            </div>

            <Select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={[
                { value: 'Employee', label: 'Employee' },
                { value: 'Admin', label: 'Admin' },
              ]}
            />

            <Button
              type="submit"
              disabled={loading}
              className={loading ? 'opacity-75 cursor-not-allowed' : ''}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Registering...
                </span>
              ) : (
                'Register Employee'
              )}
            </Button>

            <p className="text-sm text-slate-500 text-center mt-4">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:underline font-medium">
                Sign in here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterEmployee;