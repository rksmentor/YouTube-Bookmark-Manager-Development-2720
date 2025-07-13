import React from 'react';
import { motion } from 'framer-motion';
import BookmarkCard from './BookmarkCard';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBookmark } = FiIcons;

const BookmarkList = ({ bookmarks, onDelete, onUpdate, onUpdateRating, categories }) => {
  if (bookmarks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <SafeIcon icon={FiBookmark} className="text-6xl text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No bookmarks found</h3>
        <p className="text-gray-500">Start by adding your first YouTube bookmark!</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
    >
      {bookmarks.map((bookmark, index) => (
        <motion.div
          key={bookmark.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <BookmarkCard
            bookmark={bookmark}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onUpdateRating={onUpdateRating}
            categories={categories}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BookmarkList;