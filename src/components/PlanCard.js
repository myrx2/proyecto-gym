// PlanCard.js
import React from 'react';
import styles from '../styles/PlanCard.module.css';

const PlanCard = ({ title, description, price, onAcquire }) => {
  return (
    <div className={styles['plan-card-container']}>
      <div className={styles['plan-card']}>
        <h3 className={styles['plan-title']}>{title}</h3>
        <p className={styles['plan-description']}>{description}</p>
        <div className={styles['plan-price']}>{price}</div>
        <button onClick={onAcquire} className={styles['plan-button']}>
          Adquirir
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
