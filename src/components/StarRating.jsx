import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiStar } = FiIcons;

const StarRating = ({ rating, onRatingChange, readOnly = false, size = 'md' }) => {
  const totalStars = 5;
  
  // Determine size class based on prop
  const sizeClass = {
    'sm': 'text-base',
    'md': 'text-xl',
    'lg': 'text-2xl'
  }[size] || 'text-xl';
  
  const handleClick = (index) => {
    if (readOnly) return;
    
    // If clicking the same star that's already selected, remove the rating
    const newRating = rating === index ? 0 : index;
    onRatingChange(newRating);
  };

  const handleHover = (index) => {
    // Implemented for future hover effects if needed
  };

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;
        
        return (
          <motion.button
            key={index}
            type="button"
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleHover(starValue)}
            whileHover={!readOnly ? { scale: 1.2 } : {}}
            whileTap={!readOnly ? { scale: 0.9 } : {}}
            className={`${sizeClass} focus:outline-none ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
            disabled={readOnly}
          >
            <span className={`${isFilled ? 'text-yellow-400' : 'text-gray-300'}`}>
              <SafeIcon icon={FiStar} className={`${isFilled ? 'fill-current' : ''}`} />
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default StarRating;