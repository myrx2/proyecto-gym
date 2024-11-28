import React from "react";
import styles from "../styles/CartItem.module.css";

const CartItem = ({ item, addToCart, deleteFromCart }) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemDetails}>
        <span className={styles.cartItemName}>{item.title}</span> {/* Aquí debería ser item.title, no item.name */}
        <span className={styles.cartItemPrice}>
          ${item.totalPrice || item.price * item.quantity}
        </span>
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
          onClick={() => addToCart(item)}
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
