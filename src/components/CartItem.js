import React from "react";
import styles from "../styles/CartItem.module.css";

const CartItem = ({ item, addToCart, removeFromCart, decreaseItemQuantity }) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemDetails}>
        <span className={styles.cartItemName}>{item.title}</span> {/* Asegúrate de que sea item.title */}
        <span className={styles.cartItemPrice}>
          ${item.totalPrice || item.price * item.quantity}
        </span>
        <span className={styles.cartItemQuantity}>Cantidad: {item.quantity}</span>
      </div>
      <div className={styles.cartItemButtons}>
        <button
          className={styles.decreaseButton}
          onClick={() => decreaseItemQuantity(item.id)} // Llama a decreaseItemQuantity para restar de a uno
        >
          -
        </button>
        <button
          className={styles.increaseButton}
          onClick={() => addToCart(item)} // Llama a addToCart para agregar más
        >
          +
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => removeFromCart(item.id)} // Llama a removeFromCart para eliminar el producto completamente
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CartItem;
