import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Message box component
const MessageBox = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
    <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white text-center">
      <h3 className="text-xl font-medium text-gray-900 leading-tight mb-4">Error</h3>
      <p className="text-gray-500 mb-6">{message}</p>
      <button
        onClick={onClose}
        className="w-full px-4 py-2 bg-indigo-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Close
      </button>
    </div>
  </div>
);

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Manual Form Validations
    if (name.length < 20 || name.length > 60) {
      setErrorMessage('Name must be between 20 and 60 characters.');
      setShowError(true);
      return;
    }
    
    if (address.length > 400) {
      setErrorMessage('Address cannot exceed 400 characters.');
      setShowError(true);
      return;
    }
    
    if (password.length < 8 || password.length > 16) {
      setErrorMessage('Password must be between 8 and 16 characters.');
      setShowError(true);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setErrorMessage('Password must include at least one uppercase letter.');
      setShowError(true);
      return;
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      setErrorMessage('Password must include at least one special character.');
      setShowError(true);
      return;
    }

    try {
      // Placeholder for Firebase signup logic
      // In a real app, you would use:
      // await window.firebase.createUserWithEmailAndPassword(authInstance, email, password);
      // and then save the user data to Firestore.
      
      console.log('Signup successful:', { name, email, address, password });
      
      // Simulate successful signup and redirection
      navigate('/user-dashboard');
      
    } catch (error) {
      setErrorMessage('Signup failed. Please try again.');
      setShowError(true);
    }
  };

  return (
    <div className="bg-lime-50 min-h-screen flex items-center justify-center p-4">
      {showError && <MessageBox message={errorMessage} onClose={() => setShowError(false)} />}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        <p className="text-center text-gray-600">Registration for Normal Users only.</p>
        <form onSubmit={handleSignup} className="space-y-6 mt-6">
          <input
            type="text"
            placeholder="Full Name (20-60 characters)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Address (max 400 characters)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password (8-16 characters, 1 uppercase, 1 special char)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold p-3 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Account
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
