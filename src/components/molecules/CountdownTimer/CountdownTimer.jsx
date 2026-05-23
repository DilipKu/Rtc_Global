import React, { useState, useEffect } from 'react';
import styles from './CountdownTimer.module.css';

const calculateTimeLeft = (targetDate) => {
  const diff = targetDate - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    mins: Math.floor((diff / (1000 * 60)) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
};

const pad = (n) => String(n).padStart(2, '0');

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.mins },
    { label: 'Secs', value: timeLeft.secs },
  ];

  return (
    <div className={styles.timer} role="timer" aria-live="polite" aria-label="Countdown timer">
      {units.map(({ label, value }) => (
        <div key={label} className={styles.unit}>
          <span className={styles.value}>{pad(value)}</span>
          <span className={styles.label}>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
