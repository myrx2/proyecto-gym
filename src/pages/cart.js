import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { shoppingReducer, shoppingInitialState, TYPES } from "@/reducer/shoppingReducer";
import CartItem from "../components/CartItem";
import styles from "../styles/CartPage.module.css";

const CartPage = () => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const { cart } = state;
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);

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
        });
      }
      updateState();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`${ENDPOINTS.cart}/${id}`);
      updateState();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const decreaseItemQuantity = async (id) => {
    const itemToUpdate = cart.find((item) => item.id === id);

    if (itemToUpdate) {
      const updatedQuantity = itemToUpdate.quantity - 1;
      if (updatedQuantity > 0) {
        try {
          await axios.put(`${ENDPOINTS.cart}/${itemToUpdate.id}`, {
            ...itemToUpdate,
            quantity: updatedQuantity,
            totalPrice: updatedQuantity * itemToUpdate.price,
          });
          updateState();
        } catch (error) {
          console.error("Error decreasing item quantity:", error);
        }
      } else {
        removeFromCart(id); // Si la cantidad es 1, eliminamos el producto
      }
    }
  };

  const handleCheckout = async () => {
    try {
      for (let item of cart) {
        await axios.delete(`${ENDPOINTS.cart}/${item.id}`);
      }
      updateState();
      setPurchaseCompleted(true);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const clearCart = async () => {
    try {
      for (let item of cart) {
        await axios.delete(`${ENDPOINTS.cart}/${item.id}`);
      }
      updateState(); // Refrescar después de eliminar todos los productos
    } catch (error) {
      console.error("Error clearing cart:", error);
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
