import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-12">
      <div className="container mx-auto text-center">
        <p className="text-sm">© 2023 Mock UN General Assembly. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
          <a href="#" className="hover:text-blue-400 transition">Contact Us</a>
        </div>
        <a 
          href="https://github.com/Sanket3yoprogrammer" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-4 inline-block text-lg font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text animate-pulse"
        >
          A Project by Sanket3yoprogrammer
        </a>
      </div>
    </footer>
  );
};

export default Footer; 