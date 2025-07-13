import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiYoutube, FiBookmark } = FiIcons;

const Header = ({ onAddClick, bookmarkCount }) => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-lg border-b border-gray-200"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiYoutube} className="text-3xl text-red-600" />
              <h1 className="text-2xl font-bold text-gray-800">YouTube Bookmarks</h1>
            </div>
            <div className="hidden sm:flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
              <SafeIcon icon={FiBookmark} className="text-sm text-gray-600" />
              <span className="text-sm text-gray-600 font-medium">{bookmarkCount} saved</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddClick}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-md"
          >
            <SafeIcon icon={FiPlus} className="text-lg" />
            <span className="hidden sm:inline font-medium">Add Bookmark</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;