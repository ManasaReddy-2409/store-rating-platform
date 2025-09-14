import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Normal User');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      return;
    }

    // Pre-defined credentials for specific roles
    const storeOwnerEmail = 'storeowner@example.com';
    const storeOwnerPassword = 'StorePass!123';
    const adminEmail = 'admin@example.com';
    const adminPassword = 'AdminPass!123';

    // Check for specific credentials and navigate accordingly
    if (email === adminEmail && password === adminPassword) {
      navigate('/admin-dashboard');
      return;
    } else if (email === storeOwnerEmail && password === storeOwnerPassword) {
      navigate('/store-owner-dashboard');
      return;
    }

    // Default validation and navigation for Normal User
    if (password.length < 8 || password.length > 16) {
      setErrorMessage('Password must be between 8 and 16 characters.');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setErrorMessage('Password must include at least one uppercase letter.');
      return;
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      setErrorMessage('Password must include at least one special character.');
      return;
    }

    // Simulate successful login for Normal User
    console.log(`Attempting login with: ${email}, Role: ${role}`);
    navigate('/user-dashboard');
  };

  const handleForgotPassword = () => {
    // In a real app, you would send a password reset email here
    setErrorMessage('A password reset link has been sent to your email address.');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 p-4 relative">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to the Platform</h2>
        <p className="text-center text-gray-600 mb-6">Enter your credentials to access your dashboard.</p>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Select Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Normal User">Normal User</option>
              <option value="System Administrator">System Administrator</option>
              <option value="Store Owner">Store Owner</option>
            </select>
          </div>
          {errorMessage && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
              {errorMessage}
            </div>
          )}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-sm text-center">
          <button onClick={handleForgotPassword} className="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot password?
          </button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-72">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-md mb-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Store Owner</h4>
          <p className="text-sm text-gray-600">Email: storeowner@example.com</p>
          <p className="text-sm text-gray-600">Password: StorePass!123</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-md">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">System Administrator</h4>
          <p className="text-sm text-gray-600">Email: admin@example.com</p>
          <p className="text-sm text-gray-600">Password: AdminPass!123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
