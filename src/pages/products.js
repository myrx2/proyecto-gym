import React, { useEffect, useReducer } from "react";
import { shoppingInitialState } from "@/reducer/shoppingInitialState";
import { shoppingReducer } from "@/reducer/shoppingReducer";
import axios from "axios";
import CardSection from "../components/CardSection"; // Asegúrate de importar CardSection
import { TYPES } from "@/actions/actions";

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
      dispatch({
        type: TYPES.READ_STATE,
        payload: {
          products: responseProducts.data,
          cart: [], // Asegúrate de no modificar el carrito aquí
        },
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    updateState();
  }, []);

  const addToCart = async (product) => {
    try {
      // Verificar si el producto ya existe en el carrito
      const existingProduct = cart.find((item) => item.id === product.id);

      if (existingProduct) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        await axios.put(`${ENDPOINTS.cart}/${existingProduct.id}`, {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
        });
      } else {
        // Si no existe, agregar al carrito
        await axios.post(ENDPOINTS.cart, { ...product, quantity: 1 });
      }

      updateState(); // Actualizar el estado del carrito después de agregar un producto
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
