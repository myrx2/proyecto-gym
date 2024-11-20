import { useReducer, useEffect } from "react";
import { shoppingInitialState } from "@/reducer/shoppingInitialState";
import { shoppingReducer } from "@/reducer/shoppingReducer";
import Product from "./Product";
import CartItem from "./CartItem";
import axios from "axios";
import { TYPES } from "@/actions/actions";

const ShoppingCart = () => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const { products, cart } = state;

  const ENDPOINTS = {
    products: "http://localhost:5000/products",
    cart: "http://localhost:5000/cart"
  }

  const updateState = async () => {
    try {
      const responseProducts = await axios.get(ENDPOINTS.products);
      const responseCart = await axios.get(ENDPOINTS.cart);

      const productsList = responseProducts.data;
      const itemsList = responseCart.data;

      dispatch({
        type: TYPES.READ_STATE,
        payload: {
          products: productsList,
          cart: itemsList
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    updateState();
  }, []);

  const addToCart = async (id) => {
    try {
      const response = await axios.get(`${ENDPOINTS.products}/${id}`);
      const product = response.data;
      const existingItem = cart.find((item) => item.id === product.id);

      if (existingItem) {
        await axios.put(`${ENDPOINTS.cart}/${existingItem.id}`, {
          ...existingItem,
          quantity: existingItem.quantity + 1
        });
      } else {
        await axios.post(ENDPOINTS.cart, { ...product, quantity: 1 });
      }

      updateState();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

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
    <>
      <h2>Carrito de Compras</h2>
      <h3>Productos</h3>
      <div className="box grid-responsive">
        {products.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      <h3>Carrito</h3>
      <div className="box">
        {cart.map((item, i) => (
          <CartItem
            key={i}
            item={item}
            deleteFromCart={deleteFromCart}
          />
        ))}
      </div>

      <button onClick={clearCart}>Limpiar Carrito</button>
    </>
  );
};

export default ShoppingCart;
