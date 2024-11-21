// pages/products.js
import React, { useEffect, useReducer } from "react";
import { shoppingInitialState } from "@/reducer/shoppingInitialState";
import { shoppingReducer } from "@/reducer/shoppingReducer";
import { TYPES } from "@/actions/actions";
import Product from "../components/Product";
import axios from "axios";

const ProductsPage = () => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const { products } = state;

  const ENDPOINTS = {
    products: "http://localhost:5000/products",
    cart: "http://localhost:5000/cart"
  }

  const updateState = async () => {
    try {
      const responseProducts = await axios.get(ENDPOINTS.products);
      dispatch({
        type: TYPES.READ_STATE,
        payload: {
          products: responseProducts.data,
          cart: [] // Asegúrate de no modificar el carrito aquí
        }
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    updateState();
  }, []);

  const addToCart = async (id) => {
    try {
      const response = await axios.get(`${ENDPOINTS.products}/${id}`);
      const product = response.data;

      await axios.post(ENDPOINTS.cart, { ...product, quantity: 1 });

      // Actualiza el estado del carrito (lo puedes hacer llamando a updateState() o usando un contexto)
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
      <h1>Productos</h1>
      <div className="box grid-responsive">
        {products.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
