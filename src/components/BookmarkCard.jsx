import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import SafeIcon from '../common/SafeIcon';
import EditBookmark from './EditBookmark';
import StarRating from './StarRating';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiEdit3, FiTrash2, FiCalendar, FiUser, FiTag, FiExternalLink } = FiIcons;

const BookmarkCard = ({ bookmark, onDelete, onUpdate, onUpdateRating, categories }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this bookmark?')) {
      onDelete(bookmark.id);
    }
  };

  const handleUpdate = (updatedBookmark) => {
    onUpdate(bookmark.id, updatedBookmark);
    setShowEditForm(false);
  };

  const handleRatingChange = (newRating) => {
    onUpdateRating(bookmark.id, newRating);
  };

  const openVideo = () => {
    window.open(bookmark.url, '_blank');
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <div className="relative">
          <img
            src={bookmark.thumbnail}
            alt={bookmark.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/480x360/ff0000/ffffff?text=YouTube';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={openVideo}
              className="bg-red-600 text-white p-3 rounded-full shadow-lg"
            >
              <SafeIcon icon={FiPlay} className="text-xl" />
            </motion.button>
          </div>
          <div className="absolute top-3 right-3 flex space-x-2">
            <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
              {bookmark.duration || '00:00'}
            </span>
          </div>
          <div className="absolute bottom-3 left-3 bg-black bg-opacity-60 px-2 py-1 rounded">
            <StarRating 
              rating={bookmark.rating || 0} 
              onRatingChange={handleRatingChange} 
              readOnly={false}
              size="md"
            />
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-800 line-clamp-2 text-sm leading-tight">
              {bookmark.title}
            </h3>
            <div className="flex space-x-1 ml-2">
              <button
                onClick={() => setShowEditForm(true)}
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <SafeIcon icon={FiEdit3} className="text-sm" />
              </button>
              <button
                onClick={handleDelete}
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <SafeIcon icon={FiTrash2} className="text-sm" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <SafeIcon icon={FiUser} className="text-xs text-gray-500" />
            <span className="text-xs text-gray-600">{bookmark.channel}</span>
          </div>
          {bookmark.description && (
            <p className="text-xs text-gray-600 line-clamp-2 mb-3">
              {bookmark.description}
            </p>
          )}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiTag} />
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
                {bookmark.category}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiCalendar} />
              <span>{format(new Date(bookmark.dateAdded), 'MMM dd')}</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <button
              onClick={openVideo}
              className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              <SafeIcon icon={FiExternalLink} className="text-sm" />
              <span className="text-sm font-medium">Watch Now</span>
            </button>
          </div>
        </div>
      </motion.div>
      {showEditForm && (
        <EditBookmark
          bookmark={bookmark}
          onUpdate={handleUpdate}
          onClose={() => setShowEditForm(false)}
          categories={categories}
        />
      )}
    </>
  );
};

export default BookmarkCard;