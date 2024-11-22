import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { shoppingReducer } from "@/reducer/shoppingReducer";
import { shoppingInitialState } from "@/reducer/shoppingInitialState";
import { TYPES } from "@/actions/actions";
import CartItem from "../components/CartItem";

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
          products: [], // Los productos no los necesitas aquí, solo el carrito
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
        // Eliminar el producto completo del carrito
        await axios.delete(`${ENDPOINTS.cart}/${id}`);
      } else {
        // Disminuir la cantidad del producto en el carrito
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
      updateState(); // Actualizar el estado después de eliminar
    } catch (error) {
      console.error("Error deleting from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      for (let item of cart) {
        await axios.delete(`${ENDPOINTS.cart}/${item.id}`);
      }
      updateState(); // Limpiar carrito
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            deleteFromCart={deleteFromCart}
          />
        ))
      )}
      <button onClick={clearCart}>Limpiar carrito</button>
    </div>
  );
};

export default CartPage;
