import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, onSnapshot, doc, setLogLevel, where } from 'firebase/firestore';
import { getAuth, updatePassword, signOut, onAuthStateChanged, signInAnonymously } from 'firebase/auth';

// A component for displaying simple messages to the user.
const MessageBox = ({ message, onClose, isError = false }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center h-full w-full bg-gray-600 bg-opacity-50 overflow-y-auto p-4">
    <div className={`relative w-full max-w-md p-6 rounded-xl shadow-lg text-center transform transition-all scale-100 ease-out duration-200 ${isError ? 'bg-red-50' : 'bg-white'}`}>
      <h3 className={`text-xl font-medium leading-tight mb-4 ${isError ? 'text-red-800' : 'text-gray-900'}`}>
        {isError ? 'Error' : 'Message'}
      </h3>
      <p className={`text-gray-600 mb-6 ${isError ? 'text-red-700' : ''}`}>{message}</p>
      <button
        onClick={onClose}
        className={`w-full px-4 py-2 rounded-md shadow-sm text-base font-medium transition-colors duration-200 ${isError ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
      >
        Close
      </button>
    </div>
  </div>
);

export default function StoreOwnerDashboard() {
  const [stores, setStores] = useState([
    { id: '2', name: 'Bakery B', address: '456 Elm St' },
    { id: '3', name: 'Bookstore C', address: '789 Oak Ave' },
    { id: '4', name: 'Pizza Place D', address: '101 Pine St' },
  ]);
  const [ratings, setRatings] = useState([
    { id: 'rate_1', storeId: '2', userId: 'user_xyz_1', rating: 4, timestamp: { seconds: 1726272000 } },
    { id: 'rate_2', storeId: '2', userId: 'user_abc_2', rating: 5, timestamp: { seconds: 1726358400 } },
    { id: 'rate_3', storeId: '3', userId: 'user_def_3', rating: 3, timestamp: { seconds: 1726185600 } },
    { id: 'rate_4', storeId: '3', userId: 'user_ghi_4', rating: 5, timestamp: { seconds: 1726099200 } },
    { id: 'rate_5', storeId: '4', userId: 'user_jkl_5', rating: 4, timestamp: { seconds: 1726012800 } },
    { id: 'rate_6', storeId: '4', userId: 'user_mno_6', rating: 5, timestamp: { seconds: 1725926400 } },
    { id: 'rate_7', storeId: '4', userId: 'user_pqr_7', rating: 2, timestamp: { seconds: 1725840000 } },
  ]);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Hardcoded random user data for demonstration
  const randomUserDetails = [
    { userId: 'user_xyz_1', name: 'John Doe', location: 'New York' },
    { userId: 'user_abc_2', name: 'Jane Smith', location: 'London' },
    { userId: 'user_def_3', name: 'Peter Jones', location: 'Sydney' },
    { userId: 'user_ghi_4', name: 'Maria Garcia', location: 'Madrid' },
    { userId: 'user_jkl_5', name: 'Chen Wei', location: 'Beijing' },
    { userId: 'user_mno_6', name: 'Fatima Ahmed', location: 'Dubai' },
    { userId: 'user_pqr_7', name: 'David Lee', location: 'Seoul' },
    { userId: 'user_stu_8', name: 'Sophie Dupont', location: 'Paris' },
  ];

  useEffect(() => {
    const initFirebase = async () => {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
      const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

      try {
        if (!firebaseConfig.projectId) {
          console.error("Firebase project ID not provided.");
          setIsAuthReady(true);
          return;
        }

        const app = initializeApp(firebaseConfig, appId);
        const firestoreDb = getFirestore(app);
        const authService = getAuth(app);
        setLogLevel('debug');
        setDb(firestoreDb);
        setAuth(authService);

        onAuthStateChanged(authService, (currentUser) => {
          if (currentUser) {
            setUser(currentUser);
          } else {
            signInAnonymously(authService);
          }
          setIsAuthReady(true);
        });
      } catch (error) {
        console.error("Firebase initialization failed:", error);
        setIsAuthReady(true);
      }
    };
    initFirebase();
  }, []);

  useEffect(() => {
    if (!db || !isAuthReady || !user) return;

    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

    const storeIds = stores.map(s => s.id);
    const storesRef = collection(db, 'artifacts', appId, 'public', 'data', 'stores');
    const unsubscribeStores = onSnapshot(query(storesRef, where('id', 'in', storeIds)), (querySnapshot) => {
      const fetchedStores = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStores(fetchedStores);
    }, (error) => {
      console.error("Error fetching store data:", error);
    });

    const ratingsRef = collection(db, 'artifacts', appId, 'public', 'data', 'ratings');
    const unsubscribeRatings = onSnapshot(query(ratingsRef, where('storeId', 'in', storeIds)), (querySnapshot) => {
      const fetchedRatings = querySnapshot.docs.map(doc => doc.data());
      setRatings(fetchedRatings);
    }, (error) => {
      console.error("Error fetching ratings:", error);
    });

    return () => {
      unsubscribeStores();
      unsubscribeRatings();
    };
  }, [db, isAuthReady, user, stores.length]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    if (!user || user.isAnonymous) {
      setMessage("Password update is not available for anonymous users.");
      setIsError(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setIsError(true);
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters.");
      setIsError(true);
      return;
    }

    try {
      await updatePassword(user, newPassword);
      setMessage("Password updated successfully!");
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordUpdate(false);
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("Failed to update password. Please log in again and try.");
      setIsError(true);
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
      setMessage("Failed to log out. Please try again.");
      setIsError(true);
    }
  };

  const getOverallRating = (storeId) => {
    const storeRatings = ratings.filter(r => r.storeId === storeId);
    if (storeRatings.length === 0) return 'N/A';
    const sum = storeRatings.reduce((total, r) => total + r.rating, 0);
    return (sum / storeRatings.length).toFixed(1);
  };

  const getTotalRatings = (storeId) => {
    return ratings.filter(r => r.storeId === storeId).length;
  };

  if (!isAuthReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Loading store data...</p>
      </div>
    );
  }

  return (
    <div className="bg-teal-50 min-h-screen font-sans p-4">
      <style>{`
        body { font-family: 'Inter', sans-serif; }
        .header-gradient {
          background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
        }
        @keyframes rise-in {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .store-card {
          animation: rise-in 0.5s ease-out forwards;
        }
      `}</style>
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="container mx-auto">
        {message && (
          <MessageBox
            message={message}
            isError={isError}
            onClose={() => setMessage('')}
          />
        )}
        <div className="header-gradient p-6 rounded-lg shadow-md mb-6 text-white flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold">Store Ratings</h1>
            <span className="text-xl"> | </span>
            <h1 className="text-3xl font-bold">Store Owner Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowPasswordUpdate(!showPasswordUpdate)}
              className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-gray-200 transition-all duration-200 text-sm font-semibold"
            >
              Update Password
            </button>
            <button
              onClick={handleLogout}
              className="bg-white text-red-600 px-4 py-2 rounded-full hover:bg-gray-200 transition-all duration-200 text-sm font-semibold"
            >
              Log Out
            </button>
          </div>
        </div>

        {showPasswordUpdate && (
          <form onSubmit={handleUpdatePassword} className="bg-white p-6 rounded-lg shadow-md mb-6 store-card">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Update Password</h2>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Submit
            </button>
          </form>
        )}

        {stores.map((store, index) => (
          <div 
            key={store.id} 
            className="bg-white p-6 rounded-lg shadow-md mb-6 store-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{store.name}</h2>
            <p className="text-gray-600 mb-4">{store.address}</p>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-semibold text-gray-800 mr-2">
                Overall Rating: {getOverallRating(store.id)}
              </span>
              <span className="text-gray-500">({getTotalRatings(store.id)} ratings)</span>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-x-auto mt-4">
              <h3 className="text-xl font-semibold p-4 border-b">All Ratings for {store.name}</h3>
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">User Name</th>
                    <th className="py-3 px-6 text-left">Location</th>
                    <th className="py-3 px-6 text-left">Rating</th>
                    <th className="py-3 px-6 text-left">Submitted At</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {ratings.filter(r => r.storeId === store.id).length > 0 ? (
                    ratings.filter(r => r.storeId === store.id).map((rating, index) => {
                      const userDetails = randomUserDetails.find(user => user.userId === rating.userId) || randomUserDetails[0];
                      const submittedAt = new Date(rating.timestamp.seconds * 1000).toLocaleString();
                      return (
                        <tr key={rating.id} className="border-b border-gray-200 hover:bg-gray-100">
                          <td className="py-3 px-6 text-left">{userDetails.name}</td>
                          <td className="py-3 px-6 text-left">{userDetails.location}</td>
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-lg ${i < rating.rating ? 'text-yellow-400' : 'text-gray-300'}`}>&#9733;</span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">{submittedAt}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className="border-b border-gray-200">
                      <td colSpan="4" className="py-4 text-center text-gray-500">No ratings submitted yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
