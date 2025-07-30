// components/StarRating.tsx
import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import type { RatingValue, StarRatingProps } from '@/types';

export const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  hoverRating = 0,
  onRatingChange,
  onHoverChange,
  size = 'md',
  interactive = false,
  showNumber = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  };

  const handleClick = (star: RatingValue) => {
    if (interactive && onRatingChange) {
      onRatingChange(star);
    }
  };

  const handleMouseEnter = (star: RatingValue) => {
    if (interactive && onHoverChange) {
      onHoverChange(star);
    }
  };

  const handleMouseLeave = () => {
    if (interactive && onHoverChange) {
      onHoverChange(0);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`p-1 focus:outline-none ${!interactive ? 'cursor-default' : ''}`}
          onClick={() => handleClick(star as RatingValue)}
          onMouseEnter={() => handleMouseEnter(star as RatingValue)}
          onMouseLeave={handleMouseLeave}
          disabled={!interactive}
        >
          <StarIcon
            className={`${sizeClasses[size]} ${
              (hoverRating || rating) >= star
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-zinc-300 dark:text-zinc-600'
            } transition-colors`}
          />
        </button>
      ))}
      {showNumber && (
        <span className="ml-1 text-xs text-zinc-500 dark:text-zinc-400">
          ({rating}/5)
        </span>
      )}
    </div>
  );
};