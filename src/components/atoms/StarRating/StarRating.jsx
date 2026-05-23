import React from 'react';
import { Star } from 'lucide-react';
import styles from './StarRating.module.css';

const StarRating = ({ rating = 5, max = 5, size = 16 }) => {
  return (
    <div className={styles.stars} role="img" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? styles.filled : styles.empty}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

export default StarRating;
