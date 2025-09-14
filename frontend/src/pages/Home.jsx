import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const reviews = [
    '⭐ Excellent Service!', '⭐⭐⭐⭐', 'A great place!', '⭐⭐⭐',
    'Fast and friendly!', '⭐⭐⭐⭐⭐', 'Highly recommend!', '⭐',
    'Will visit again!', '⭐⭐', 'Amazing experience!', '⭐⭐⭐⭐',
    'Clean and welcoming!', '⭐⭐⭐⭐⭐', 'Good value for money.',
    'A must-visit!', '⭐⭐⭐⭐', 'Top-notch quality!', '⭐⭐⭐⭐⭐'
  ];

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-white">
      <style>{`
        .hero-card {
          background-color: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 3rem 4rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          max-width: 550px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .review-animation {
          position: absolute;
          top: -20px;
          animation: fall linear infinite;
          white-space: nowrap;
          font-size: 1rem;
          color: rgba(236, 147, 155, 0.7);
          text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
        }

        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
      `}</style>
      <script src="https://cdn.tailwindcss.com"></script>
      
      {/* Background with pastel colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 z-0"></div>

      {/* Animated falling reviews */}
      {reviews.map((review, index) => (
        <span
          key={index}
          className="review-animation"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 8 + 5}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          {review}
        </span>
      ))}
      
      {/* Hero Card Content */}
      <div className="hero-card relative z-20">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-900 mb-4 drop-shadow-md">
          Welcome to the Store Rating Platform
        </h2>
        <p className="text-sm sm:text-base text-gray-800 mb-6 drop-shadow-sm">
          Your trusted source for store reviews and ratings. Please log in or sign up to get started!
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-white text-blue-600 rounded-full font-bold shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-gray-100"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 bg-green-500 text-white rounded-full font-bold shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-green-600"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
