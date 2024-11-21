// src/pages/cart.js
import React, { useEffect, useReducer } from "react";
import { shoppingInitialState } from "@/reducer/shoppingInitialState";
import { shoppingReducer } from "@/reducer/shoppingReducer";
import axios from "axios";
import CardSection from "../components/CardSection"; // Asegúrate de importar CardSection
import { TYPES } from "@/actions/actions";
import { useShoppingCart } from "../context/ShoppingCartContext"; // Importa el hook

const CartPage = () => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const { cart } = state;

  // Usar el hook de carrito para acceder a addToCart
  const { addToCart } = useShoppingCart(); // Aquí está la función addToCart del contexto

  const ENDPOINTS = {
    products: "http://localhost:5000/products",
    cart: "http://localhost:5000/cart",
  };

  const updateState = async () => {
    try {
      const responseCart = await axios.get(ENDPOINTS.cart);
      dispatch({
        type: TYPES.READ_STATE,
        payload: {
          products: [],
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
        <h2>Productos Disponibles</h2>
        <CardSection products={cart} addToCart={addToCart} /> {/* Aquí pasa addToCart al CardSection */}
      </div>
      <button onClick={clearCart}>Limpiar Carrito</button>
    </div>
  );
};

export default CartPage;
