import React from 'react';
import { Globe, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<{ isDarkMode: boolean; toggleDarkMode: () => void }> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mock UN Assembly</h1>
        </motion.div>
        
        <nav className="flex items-center space-x-8">
          <motion.a 
            href="#script"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            whileHover={{ scale: 1.05 }}
          >
            Script
          </motion.a>
          <motion.a 
            href="#interactive"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            whileHover={{ scale: 1.05 }}
          >
            Interactive
          </motion.a>
          <motion.button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDarkMode ? 
              <Sun className="w-6 h-6 text-yellow-400" /> : 
              <Moon className="w-6 h-6 text-gray-600" />
            }
          </motion.button>
        </nav>
      </div>
    </header>
  );
};

export default Header;