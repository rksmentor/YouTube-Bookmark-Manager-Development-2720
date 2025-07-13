import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTag, FiPlus, FiTrash2 } = FiIcons;

const Categories = ({ categories, selectedCategory, onCategorySelect, onAddCategory, onDeleteCategory }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory('');
      setShowAddForm(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-xl shadow-md p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          <SafeIcon icon={FiTag} className="text-red-600" />
          <span>Categories</span>
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-gray-500 hover:text-red-600 transition-colors"
        >
          <SafeIcon icon={FiPlus} />
        </button>
      </div>

      {showAddForm && (
        <motion.form 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          onSubmit={handleAddCategory}
          className="mb-4"
        >
          <input
            type="text"
            placeholder="Category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            autoFocus
          />
        </motion.form>
      )}

      <div className="space-y-2">
        {categories.map((category) => (
          <motion.div
            key={category}
            whileHover={{ scale: 1.02 }}
            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-red-100 text-red-700 border border-red-200'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <span 
              onClick={() => onCategorySelect(category)}
              className="flex-1 text-sm font-medium"
            >
              {category}
            </span>
            {category !== 'All' && (
              <button
                onClick={() => onDeleteCategory(category)}
                className="text-gray-400 hover:text-red-500 transition-colors ml-2"
              >
                <SafeIcon icon={FiTrash2} className="text-xs" />
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Categories;