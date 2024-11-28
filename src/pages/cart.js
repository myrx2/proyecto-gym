import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { shoppingReducer, shoppingInitialState, TYPES } from "@/reducer/shoppingReducer";
import CartItem from "../components/CartItem";
import styles from "../styles/CartPage.module.css";

const CartPage = () => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const { cart } = state;
  const [purchaseCompleted, setPurchaseCompleted] = useState(false); // Nuevo estado para gestionar la compra

  const ENDPOINTS = {
    cart: "http://localhost:5000/cart",
  };

  const updateState = async () => {
    try {
      const responseCart = await axios.get(ENDPOINTS.cart);
      dispatch({
        type: TYPES.READ_STATE,
        payload: {
          cart: responseCart.data,
        },
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    updateState();
  }, []);

  const addToCart = async (item) => {
    try {
      const existingItem = cart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;
        await axios.put(`${ENDPOINTS.cart}/${existingItem.id}`, {
          ...existingItem,
          quantity: newQuantity,
          totalPrice: newQuantity * existingItem.price,
        });
      } else {
        await axios.post(ENDPOINTS.cart, {
          ...item,
          quantity: 1,
          totalPrice: item.price,
        });
      }

      updateState();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const deleteFromCart = async (id, all = false) => {
    try {
      const itemToDelete = cart.find((item) => item.id === id);

      if (all || itemToDelete.quantity === 1) {
        await axios.delete(`${ENDPOINTS.cart}/${id}`);
      } else {
        const newQuantity = itemToDelete.quantity - 1;
        await axios.put(`${ENDPOINTS.cart}/${id}`, {
          ...itemToDelete,
          quantity: newQuantity,
          totalPrice: newQuantity * itemToDelete.price,
        });
      }

      updateState();
    } catch (error) {
      console.error("Error deleting from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      for (let item of cart) {
        await axios.delete(`${ENDPOINTS.cart}/${item.id}`);
      }
      updateState();
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
  };

  const handlePurchase = async () => {
    try {
      // Simular la compra (puedes integrar con un sistema de pago real)
      await clearCart();
      setPurchaseCompleted(true); // Cambiar estado a 'comprado'
    } catch (error) {
      console.error("Error completing the purchase:", error);
    }
  };

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.cartTitle}>Carrito de Compras</h1>
      {purchaseCompleted ? (
        <p className={styles.cartEmptyMessage}>¡Gracias por su compra!</p>
      ) : cart.length === 0 ? (
        <p className={styles.cartEmptyMessage}>No hay productos en el carrito</p>
      ) : (
        <div className={styles.cartItemList}>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}  // Asegúrate de que item tiene las propiedades correctas
              addToCart={addToCart}
              deleteFromCart={deleteFromCart}
            />
          ))}
        </div>
      )}
      {purchaseCompleted ? null : (
        <div className={styles.cartFooter}>
          <button onClick={handlePurchase} className={styles.buyButton}>
            Comprar
          </button>
        </div>
      )}
      <button onClick={clearCart} className={styles.clearCartButton}>
        Limpiar carrito
      </button>
    </div>
  );
};

export default CartPage;
