import React, { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';

const Logout = () => {
  useEffect(() => {
    // Check for firebase config to initialize Firebase
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
    if (!firebaseConfig) {
      console.error("Firebase config is not available.");
      window.location.href = '/login'; // Redirect to login page
      return;
    }

    try {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      
      const handleLogout = async () => {
        try {
          await signOut(auth);
          console.log("User logged out successfully.");
          // Redirect to login page after successful logout
          window.location.href = '/login';
        } catch (error) {
          console.error("Error during logout:", error);
          // Redirect to login page even on error, to prevent being stuck
          window.location.href = '/login';
        }
      };

      handleLogout();
    } catch (error) {
      console.error("Firebase initialization failed:", error);
      window.location.href = '/login'; // Redirect to login page
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <p className="text-lg text-gray-700">Logging you out...</p>
      </div>
    </div>
  );
};

export default Logout;
