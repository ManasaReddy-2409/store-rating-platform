import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

export default function NormalUserDashboard() {
  const [stores] = useState([
    { id: '1', name: 'Coffee Shop A', address: '123 Main St', overallRating: 4.5, icon: '☕' },
    { id: '2', name: 'Bakery B', address: '456 Elm St', overallRating: 3.8, icon: '🍞' },
    { id: '3', name: 'Bookstore C', address: '789 Oak Ave', overallRating: 4.1, icon: '📚' },
    { id: '4', name: 'Pizza Place D', address: '101 Pine St', overallRating: 4.9, icon: '🍕' },
    { id: '5', name: 'Grocery Store E', address: '202 Maple Dr', overallRating: 3.5, icon: '🛒' },
    { id: '6', name: 'Hardware Store F', address: '303 Birch Ln', overallRating: 4.2, icon: '🔨' },
    { id: '7', name: 'Sushi Bar G', address: '404 Cedar Rd', overallRating: 4.7, icon: '🍣' },
    { id: '8', name: 'Gym H', address: '505 Poplar Blvd', overallRating: 3.9, icon: '💪' },
    { id: '9', name: 'Pharmacy I', address: '606 Willow Ct', overallRating: 4.0, icon: '💊' },
    { id: '10', name: 'Pet Store J', address: '707 Redwood St', overallRating: 4.3, icon: '🐾' },
    { id: '11', name: 'Flower Shop K', address: '808 Spruce St', overallRating: 4.6, icon: '🌸' },
    { id: '12', name: 'Car Wash L', address: '909 Fir St', overallRating: 3.2, icon: '🚗' },
    { id: '13', name: 'Burger Joint M', address: '111 Sycamore Ln', overallRating: 4.8, icon: '🍔' },
    { id: '14', name: 'Nail Salon N', address: '222 Holly Blvd', overallRating: 3.7, icon: '💅' },
    { id: '15', name: 'Movie Theater O', address: '333 Magnolia Ct', overallRating: 4.4, icon: '🎬' },
    { id: '16', name: 'Electronics Store P', address: '444 Ash Ave', overallRating: 4.1, icon: '📱' },
    { id: '17', name: 'Toy Store Q', address: '555 Chestnut Dr', overallRating: 4.0, icon: '🧸' },
    { id: '18', name: 'Donut Shop R', address: '666 Aspen Rd', overallRating: 4.6, icon: '🍩' },
    { id: '19', name: 'Liquor Store S', address: '777 Hemlock St', overallRating: 3.0, icon: '🍾' },
    { id: '20', name: 'Diner T', address: '888 Redwood St', overallRating: 4.2, icon: '🍽️' },
    { id: '21', name: 'Optician U', address: '999 Willow Rd', overallRating: 4.5, icon: '👓' },
    { id: '22', name: 'Shoe Store V', address: '112 Oak St', overallRating: 3.9, icon: '👟' },
    { id: '23', name: 'Dry Cleaner W', address: '223 Birch Ave', overallRating: 4.1, icon: '🧺' },
    { id: '24', name: 'Barber Shop X', address: '334 Pine St', overallRating: 4.8, icon: '💈' },
    { id: '25', name: 'Ice Cream Parlor Y', address: '445 Maple Dr', overallRating: 4.9, icon: '🍦' },
    { id: '26', name: 'Gas Station Z', address: '556 Cedar St', overallRating: 3.1, icon: '⛽' },
    { id: '27', name: 'Jewelry Store AA', address: '667 Walnut Ln', overallRating: 4.7, icon: '💎' },
    { id: '28', name: 'Art Gallery BB', address: '778 Sycamore Ave', overallRating: 4.6, icon: '🖼️' },
    { id: '29', name: 'Music Store CC', address: '889 Holly Rd', overallRating: 4.2, icon: '🎸' },
    { id: '30', name: 'Tailor DD', address: '990 Magnolia Ct', overallRating: 4.0, icon: '🧵' }
  ]);
  const [userRatings, setUserRatings] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleRateStore = (storeId, rating) => {
    setUserRatings(prevRatings => ({
      ...prevRatings,
      [storeId]: parseInt(rating)
    }));
    setMessage('Rating submitted successfully!');
    setIsError(false);
  };

  const filteredStores = stores.filter(store =>
    store.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="bg-orange-50 min-h-screen font-sans p-4">
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
        .store-row {
          animation: rise-in 0.5s ease-out forwards;
        }
      `}</style>
      <div className="container mx-auto">
        {message && (
          <MessageBox
            message={message}
            isError={isError}
            onClose={() => setMessage('')}
          />
        )}
        <div className="header-gradient p-6 rounded-lg shadow-md mb-6 text-white flex justify-between items-center">
          <h1 className="text-3xl font-bold">Store Ratings</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search stores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48 p-2 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-gray-200 transition-all duration-200 text-sm font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Store Name</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Overall Rating</th>
                <th className="py-3 px-6 text-left">Your Rating</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredStores.length > 0 ? (
                filteredStores.map((store, index) => (
                  <tr 
                    key={store.id} 
                    className="border-b border-gray-200 hover:bg-gray-100 store-row"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{store.icon}</span>
                        <span>{store.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">{store.address}</td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-lg ${i < store.overallRating ? 'text-yellow-400' : 'text-gray-300'}`}>&#9733;</span>
                        ))}
                        <span className="text-xs text-gray-500">{store.overallRating?.toFixed(1) || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {userRatings[store.id] ? (
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-lg ${i < userRatings[store.id] ? 'text-yellow-400' : 'text-gray-300'}`}>&#9733;</span>
                          ))}
                        </div>
                      ) : 'N/A'}
                    </td>
                    <td className="py-3 px-6 text-left">
                      <div className="flex justify-start space-x-1 items-center">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <span
                            key={rating}
                            onClick={() => handleRateStore(store.id, rating)}
                            className={`cursor-pointer text-2xl transition-colors duration-200 ${userRatings[store.id] >= rating ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-300'}`}
                          >
                            &#9733;
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-b border-gray-200">
                  <td colSpan="5" className="py-4 text-center text-gray-500">No stores found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
