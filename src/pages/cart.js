import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { shoppingReducer, shoppingInitialState, TYPES } from "@/reducer/shoppingReducer";
import CartItem from "../components/CartItem";
import styles from "../styles/CartPage.module.css"; // Asegúrate de que la ruta sea correcta


const CartPage = () => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const { cart } = state;

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

  const deleteFromCart = async (id, all = false) => {
    try {
      if (all) {
        await axios.delete(`${ENDPOINTS.cart}/${id}`);
      } else {
        const itemToDelete = cart.find((item) => item.id === id);
        if (itemToDelete.quantity > 1) {
          await axios.put(`${ENDPOINTS.cart}/${id}`, {
            ...itemToDelete,
            quantity: itemToDelete.quantity - 1,
          });
        } else {
          await axios.delete(`${ENDPOINTS.cart}/${id}`);
        }
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

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.cartTitle}>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p className={styles.cartEmptyMessage}>No hay productos en el carrito</p>
      ) : (
        <div className={styles.cartItemList}>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              deleteFromCart={deleteFromCart}
            />
          ))}
        </div>
      )}
      <button onClick={clearCart} className={styles.clearCartButton}>
        Limpiar carrito
      </button>
    </div>
  );
};

export default CartPage;
