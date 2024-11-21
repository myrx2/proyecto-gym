// pages/cart.js
import React, { useEffect, useReducer } from "react";
import { shoppingInitialState } from "@/reducer/shoppingInitialState";
import { shoppingReducer } from "@/reducer/shoppingReducer";
import CartItem from "../components/CartItem";
import axios from "axios";
import { TYPES } from "@/actions/actions";

const CartPage = () => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const { cart } = state;

  const ENDPOINTS = {
    products: "http://localhost:5000/products",
    cart: "http://localhost:5000/cart"
  }

  const updateState = async () => {
    try {
      const responseCart = await axios.get(ENDPOINTS.cart);
      dispatch({
        type: TYPES.READ_STATE,
        payload: {
          products: [],
          cart: responseCart.data
        }
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
      const item = cart.find((item) => item.id === id);

      if (all) {
        await axios.delete(`${ENDPOINTS.cart}/${id}`);
      } else {
        if (item && item.quantity > 1) {
          await axios.put(`${ENDPOINTS.cart}/${id}`, {
            ...item,
            quantity: item.quantity - 1
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
      const cartItems = await axios.get(ENDPOINTS.cart);
      const cartIds = cartItems.data.map((item) => item.id);

      for (let id of cartIds) {
        await axios.delete(`${ENDPOINTS.cart}/${id}`);
      }

      updateState();
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <div className="box">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} deleteFromCart={deleteFromCart} />
        ))}
      </div>
      <button onClick={clearCart}>Limpiar Carrito</button>
    </div>
  );
};

export default CartPage;
