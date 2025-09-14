import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, onSnapshot, doc, addDoc, setDoc, where, setLogLevel } from 'firebase/firestore';
import { getAuth, signOut, onAuthStateChanged, signInAnonymously } from 'firebase/auth';

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

// Helper function to get a random item from an array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Hardcoded store data for demonstration
const hardcodedStores = [
  { id: '1', name: 'Coffee Shop A', address: '123 Main St', icon: '☕' },
  { id: '2', name: 'Bakery B', address: '456 Elm St', icon: '🍞' },
  { id: '3', name: 'Bookstore C', address: '789 Oak Ave', icon: '📚' },
  { id: '4', name: 'Pizza Place D', address: '101 Pine St', icon: '🍕' },
  { id: '5', name: 'Grocery Store E', address: '202 Maple Dr', icon: '🛒' },
  { id: '6', name: 'Hardware Store F', address: '303 Birch Ln', icon: '🔨' },
  { id: '7', name: 'Sushi Bar G', address: '404 Cedar Rd', icon: '🍣' },
  { id: '8', name: 'Gym H', address: '505 Poplar Blvd', icon: '💪' },
];

const hardcodedUsers = [
  { id: 'user_1', name: 'John Doe', email: 'john@example.com', address: '123 Main St, Anytown', role: 'Normal User' },
  { id: 'user_2', name: 'Jane Smith', email: 'jane@example.com', address: '456 Elm St, Othertown', role: 'Normal User' },
  { id: 'user_3', name: 'Store Owner A', email: 'storeowner@example.com', address: '789 Oak Ave, Storeville', role: 'Store Owner' },
  { id: 'user_4', name: 'Admin User', email: 'admin@example.com', address: '101 Pine St, Adminville', role: 'System Administrator' },
  { id: 'user_5', name: 'Robert Johnson', email: 'robert@example.com', address: '202 Maple Dr, Anytown', role: 'Normal User' },
  { id: 'user_6', name: 'Mary Williams', email: 'mary@example.com', address: '303 Birch Ln, Othertown', role: 'Normal User' },
];

const hardcodedRatings = [
  { id: 'rate_1', storeId: '1', userId: 'user_1', rating: 4, timestamp: { seconds: 1726272000 } },
  { id: 'rate_2', storeId: '2', userId: 'user_2', rating: 5, timestamp: { seconds: 1726358400 } },
  { id: 'rate_3', storeId: '3', userId: 'user_3', rating: 3, timestamp: { seconds: 1726185600 } },
  { id: 'rate_4', storeId: '4', userId: 'user_4', rating: 5, timestamp: { seconds: 1726099200 } },
  { id: 'rate_5', storeId: '5', userId: 'user_5', rating: 4, timestamp: { seconds: 1726012800 } },
];

export default function AdminDashboard() {
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalStores, setTotalStores] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState([]);

  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', address: '', role: 'Normal User' });
  const [addStoreName, setAddStoreName] = useState('');
  const [addStoreAddress, setAddStoreAddress] = useState('');

  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [storeSearchTerm, setStoreSearchTerm] = useState('');

  // Firebase Initialization
  useEffect(() => {
    const initFirebase = async () => {
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
      const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

      try {
        if (!firebaseConfig.projectId) {
          console.error("Firebase project ID not provided. Using hardcoded data.");
          setUsers(hardcodedUsers);
          setStores(hardcodedStores);
          setRatings(hardcodedRatings);
          setTotalUsers(hardcodedUsers.length);
          setTotalStores(hardcodedStores.length);
          setTotalRatings(hardcodedRatings.length);
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
            console.log("User is authenticated:", currentUser.uid);
          } else {
            console.log("No user signed in. Signing in anonymously.");
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

  // Firestore Data Fetching
  useEffect(() => {
    if (!db || !isAuthReady) return;

    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

    const usersRef = collection(db, 'artifacts', appId, 'public', 'data', 'users');
    const unsubscribeUsers = onSnapshot(usersRef, (querySnapshot) => {
      const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData.length > 0 ? usersData : hardcodedUsers);
      setTotalUsers(usersData.length || hardcodedUsers.length);
    }, (error) => {
      console.error("Error fetching users:", error);
      setUsers(hardcodedUsers);
      setTotalUsers(hardcodedUsers.length);
    });

    const storesRef = collection(db, 'artifacts', appId, 'public', 'data', 'stores');
    const unsubscribeStores = onSnapshot(storesRef, (querySnapshot) => {
      const storesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStores(storesData.length > 0 ? storesData : hardcodedStores);
      setTotalStores(storesData.length || hardcodedStores.length);
    }, (error) => {
      console.error("Error fetching stores:", error);
      setStores(hardcodedStores);
      setTotalStores(hardcodedStores.length);
    });

    const ratingsRef = collection(db, 'artifacts', appId, 'public', 'data', 'ratings');
    const unsubscribeRatings = onSnapshot(ratingsRef, (querySnapshot) => {
      const ratingsData = querySnapshot.docs.map(doc => doc.data());
      setRatings(ratingsData.length > 0 ? ratingsData : hardcodedRatings);
      setTotalRatings(ratingsData.length > 0 ? ratingsData.length : hardcodedRatings.length);
    }, (error) => {
      console.error("Error fetching ratings:", error);
      setRatings(hardcodedRatings);
      setTotalRatings(hardcodedRatings.length);
    });

    return () => {
      unsubscribeUsers();
      unsubscribeStores();
      unsubscribeRatings();
    };
  }, [db, isAuthReady]);

  // Handlers
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!db) {
      setMessage("Database not initialized. Please try again.");
      setIsError(true);
      return;
    }
    try {
      await addDoc(collection(db, 'artifacts', 'default-app-id', 'public', 'data', 'users'), newUser);
      setMessage("User added successfully!");
      setIsError(false);
      setNewUser({ name: '', email: '', password: '', address: '', role: 'Normal User' });
      setShowAddUserForm(false);
    } catch (error) {
      console.error("Error adding user:", error);
      setMessage("Failed to add user.");
      setIsError(true);
    }
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    if (!db) {
      setMessage("Database not initialized. Please try again.");
      setIsError(true);
      return;
    }
    try {
      await addDoc(collection(db, 'artifacts', 'default-app-id', 'public', 'data', 'stores'), {
        name: addStoreName,
        address: addStoreAddress,
        overallRating: 0,
      });
      setMessage("Store added successfully!");
      setIsError(false);
      setAddStoreName('');
      setAddStoreAddress('');
    } catch (error) {
      console.error("Error adding store:", error);
      setMessage("Failed to add store.");
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
    const storeRatings = ratings.filter(rating => rating.storeId === storeId);
    if (storeRatings.length === 0) return 'N/A';
    const sum = storeRatings.reduce((total, current) => total + current.rating, 0);
    return (sum / storeRatings.length).toFixed(1);
  };

  const getStoreOverallRatingDisplay = (storeId) => {
    const overallRating = getOverallRating(storeId);
    if (overallRating === 'N/A') return 'N/A';

    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-lg ${i < overallRating ? 'text-yellow-400' : 'text-gray-300'}`}>&#9733;</span>
        ))}
        <span className="text-xs text-gray-500">{overallRating}</span>
      </div>
    );
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.address?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  const filteredStores = stores.filter(store =>
    store.name?.toLowerCase().includes(storeSearchTerm.toLowerCase()) ||
    store.address?.toLowerCase().includes(storeSearchTerm.toLowerCase())
  );

  if (!isAuthReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 min-h-screen font-sans p-4">
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
        .animated-section {
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
        
        {/* Header */}
        <div className="header-gradient p-6 rounded-lg shadow-md mb-6 text-white flex justify-between items-center animated-section" style={{ animationDelay: '0s' }}>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="bg-white text-red-600 px-4 py-2 rounded-full hover:bg-gray-200 transition-all duration-200 text-sm font-semibold"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 animated-section" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl text-gray-500">Total Users</h2>
            <p className="text-4xl font-bold text-blue-600 mt-2">{totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl text-gray-500">Total Stores</h2>
            <p className="text-4xl font-bold text-blue-600 mt-2">{totalStores}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl text-gray-500">Total Ratings</h2>
            <p className="text-4xl font-bold text-blue-600 mt-2">{totalRatings}</p>
          </div>
        </div>

        {/* Add User/Store Forms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md animated-section" style={{ animationDelay: '0.4s' }}>
            <form onSubmit={handleAddUser} className="space-y-4">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Add New User</h3>
              <input type="text" placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="w-full p-2 border rounded-lg" required />
              <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="w-full p-2 border rounded-lg" required />
              <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="w-full p-2 border rounded-lg" required />
              <input type="text" placeholder="Address" value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} className="w-full p-2 border rounded-lg" required />
              <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="w-full p-2 border rounded-lg">
                <option value="Normal User">Normal User</option>
                <option value="Store Owner">Store Owner</option>
                <option value="System Administrator">System Administrator</option>
              </select>
              <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">Add User</button>
            </form>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md animated-section" style={{ animationDelay: '0.6s' }}>
            <form onSubmit={handleAddStore} className="space-y-4">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Add New Store</h3>
              <input type="text" placeholder="Store Name" value={addStoreName} onChange={(e) => setAddStoreName(e.target.value)} className="w-full p-2 border rounded-lg" required />
              <input type="text" placeholder="Address" value={addStoreAddress} onChange={(e) => setAddStoreAddress(e.target.value)} className="w-full p-2 border rounded-lg" required />
              <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">Add Store</button>
            </form>
          </div>
        </div>

        {/* All Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto mb-6 animated-section" style={{ animationDelay: '0.8s' }}>
          <h2 className="text-2xl font-semibold p-4 border-b">All Users</h2>
          <input
            type="text"
            placeholder="Search users..."
            value={userSearchTerm}
            onChange={(e) => setUserSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-lg my-4 mx-4"
          />
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Rating</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{user.name}</td>
                    <td className="py-3 px-6 text-left">{user.email}</td>
                    <td className="py-3 px-6 text-left">{user.address}</td>
                    <td className="py-3 px-6 text-left">{user.role}</td>
                    <td className="py-3 px-6 text-left">
                      {user.role === 'Store Owner' ? (
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-lg ${i < Math.floor(Math.random() * 5) + 1 ? 'text-yellow-400' : 'text-gray-300'}`}>&#9733;</span>
                          ))}
                        </div>
                      ) : 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-b border-gray-200">
                  <td colSpan="5" className="py-4 text-center text-gray-500">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* All Stores Table */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto animated-section" style={{ animationDelay: '1s' }}>
          <h2 className="text-2xl font-semibold p-4 border-b">All Stores</h2>
          <input
            type="text"
            placeholder="Search stores..."
            value={storeSearchTerm}
            onChange={(e) => setStoreSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-lg my-4 mx-4"
          />
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Store Name</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Overall Rating</th>
                <th className="py-3 px-6 text-left">Store ID</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredStores.length > 0 ? (
                filteredStores.map((store) => (
                  <tr key={store.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{store.name}</td>
                    <td className="py-3 px-6 text-left">{store.address}</td>
                    <td className="py-3 px-6 text-left">
                      {getStoreOverallRatingDisplay(store.id)}
                    </td>
                    <td className="py-3 px-6 text-left">{store.id}</td>
                  </tr>
                ))
              ) : (
                <tr className="border-b border-gray-200">
                  <td colSpan="4" className="py-4 text-center text-gray-500">No stores found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
