import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { shoppingReducer } from "@/reducer/shoppingReducer";
import { shoppingInitialState } from "@/reducer/shoppingInitialState";
import { TYPES } from "@/actions/actions";
import CardSection from "../components/CardSection";

const ProductsPage = () => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const { products, cart } = state;

  const ENDPOINTS = {
    products: "http://localhost:5000/products",
    cart: "http://localhost:5000/cart",
  };

  const updateState = async () => {
    try {
      const responseProducts = await axios.get(ENDPOINTS.products);
      const responseCart = await axios.get(ENDPOINTS.cart);

      dispatch({
        type: TYPES.READ_STATE,
        payload: {
          products: responseProducts.data,
          cart: responseCart.data,
        },
      });
    } catch (error) {
      console.error("Error fetching state:", error);
    }
  };

  useEffect(() => {
    updateState();
  }, []);

  const addToCart = async (product) => {
    try {
      const existingProduct = cart.find((item) => item.id === product.id);

      if (existingProduct) {
        await axios.put(`${ENDPOINTS.cart}/${existingProduct.id}`, {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
        });
      } else {
        await axios.post(ENDPOINTS.cart, { ...product, quantity: 1 });
      }

      updateState();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
      <h1>Productos</h1>
      <CardSection products={products} addToCart={addToCart} />
    </div>
  );
};

export default ProductsPage;
