import React from 'react';
import styles from '../styles/PlanCard.module.css';
import Swal from "sweetalert2";

const PlanCard = ({ title, description, price, onAcquire }) => {
  const handleAcquire = () => {
    // Muestra una alerta usando SweetAlert2
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Quieres adquirir el plan: ${title} por $${price}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, adquirir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, ejecuta la función onAcquire pasada como prop
        onAcquire();
        Swal.fire('¡Adquirido!', `Has adquirido el plan ${title}`, 'success');
      }
    });
  };

  return (
    <div className={styles['plan-card']}>
      <h3 className={styles['plan-title']}>{title}</h3>
      <p className={styles['plan-description']}>{description}</p>
      <div className={styles['plan-price']}>{price}</div>
      <button onClick={onAcquire} className={styles['plan-button']}>
        Adquirir
      </button>
    </div>
  );
};

export default PlanCard;
