import React from "react";
import styles from "../styles/CardSection.module.css"; 

const CartItem = ({ item, deleteFromCart }) => {
  return (
    <div className={styles.card}> 
      <div className={styles.imageContainerCard}>
        <img src={item.image} alt={item.name} className={styles.cardImage} />
      </div>
      <div className={styles.cardContent}>
        <h4>{item.name}</h4>
        <p>Cantidad: {item.quantity}</p>
        <p>${item.price * item.quantity}</p>
        <button
          className={styles.deleteButton} 
          onClick={() => deleteFromCart(item.id)} 
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CartItem;
