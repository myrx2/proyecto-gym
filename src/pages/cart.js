import React, { useState } from "react";
import CartItem from "../components/CartItem";
import useCart from "../hooks/useCart";
import styles from "../styles/CartPage.module.css";

const CartPage = () => {
  const { cart, addToCart, removeFromCart, decreaseItemQuantity, clearCart } = useCart();
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);

  const handleCheckout = async () => {
    try {
      for (let item of cart) {
        await removeFromCart(item.id);
      }
      setPurchaseCompleted(true);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className={styles.cartContainer}>
      <h1>Carrito de compras</h1>
      {cart && cart.length > 0 ? (
        <>
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                decreaseItemQuantity={decreaseItemQuantity}
              />
            ))}
          </div>
          <div className={styles.buttonsContainer}>
            <button className={styles.checkoutButton} onClick={handleCheckout}>
              <i className={`fas fa-shopping-cart ${styles.cartIcon}`}></i>
              Comprar ahora
            </button>
            <button className={styles.clearCartButton} onClick={clearCart}>
              <i className={`fas fa-trash-alt ${styles.trashIcon}`}></i>
              Vaciar carrito
            </button>
          </div>
        </>
      ) : (
        <p>El carrito está vacío.</p>
      )}
    </div>
  );
};

export default CartPage;
