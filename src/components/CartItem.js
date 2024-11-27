import React from "react";
import styles from "../styles/CartItem.module.css";


const CartItem = ({ item, deleteFromCart }) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemDetails}>
        <span className={styles.cartItemName}>{item.name}</span>
        <span className={styles.cartItemPrice}>${item.price}</span>
        <span className={styles.cartItemQuantity}>Cantidad: {item.quantity}</span>
      </div>
      <div className={styles.cartItemButtons}>
        <button
          className={styles.decreaseButton}
          onClick={() => deleteFromCart(item.id)}
        >
          -
        </button>
        <button
          className={styles.increaseButton}
          onClick={() => deleteFromCart(item.id, true)}
        >
          +
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => deleteFromCart(item.id, true)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CartItem;
