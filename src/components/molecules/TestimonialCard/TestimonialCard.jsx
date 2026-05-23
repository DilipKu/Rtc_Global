import React from 'react';
import StarRating from '../../atoms/StarRating/StarRating';
import styles from './TestimonialCard.module.css';

const TestimonialCard = ({ rating, review, name, role, avatar }) => {
  return (
    <article className={styles.card}>
      <StarRating rating={rating} size={18} />
      <p className={styles.review}>{review}</p>
      <div className={styles.author}>
        <img
          src={avatar}
          alt={name}
          className={styles.avatar}
          width={48}
          height={48}
          loading="lazy"
        />
        <div className={styles.authorInfo}>
          <span className={styles.name}>{name}</span>
          <span className={styles.role}>{role}</span>
        </div>
      </div>
    </article>
  );
};

export default TestimonialCard;
