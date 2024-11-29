import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { shoppingReducer, shoppingInitialState, TYPES } from "@/reducer/shoppingReducer";
import CardSection from "../components/CardSection";
import PlanCard from "../components/PlanCard";

const ProductsPage = () => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const { products, plans, cart } = state;

  const ENDPOINTS = {
    products: "http://localhost:5000/products",
    plans: "http://localhost:5000/plans",
    cart: "http://localhost:5000/cart",
  };

  const updateState = async () => {
    try {
      const responseProducts = await axios.get(ENDPOINTS.products);
      const responsePlans = await axios.get(ENDPOINTS.plans);
      const responseCart = await axios.get(ENDPOINTS.cart);

      dispatch({
        type: TYPES.READ_STATE,
        payload: {
          products: responseProducts.data,
          plans: responsePlans.data,
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

  const addToCart = async (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
  
    if (existingItem) {
      // Actualizar cantidad en el estado y backend
      const updatedQuantity = existingItem.quantity + 1;
  
      dispatch({
        type: TYPES.UPDATE_QUANTITY,
        payload: { id: existingItem.id, quantity: updatedQuantity },
      });
  
      // Actualizar cantidad en el backend
      try {
        await axios.patch(`${ENDPOINTS.cart}/${existingItem.id}`, {
          quantity: updatedQuantity,
        });
      } catch (error) {
        console.error("Error updating item quantity:", error);
      }
    } else {
      // Agregar nuevo producto al carrito en el estado y backend
      const newItem = { ...item, quantity: 1 };
  
      dispatch({
        type: TYPES.ADD_TO_CART,
        payload: newItem,
      });
  
      try {
        await axios.post(ENDPOINTS.cart, newItem);
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };
  

  const clearCart = async () => {
    try {
      for (let item of cart) {
        await axios.delete(`${ENDPOINTS.cart}/${item.id}`);
      }
      dispatch({ type: TYPES.CLEAR_CART });
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
  };

  return (
    <div>
      <h1>Planes</h1>
      <div className="plan-card-container">
        {plans && plans.length > 0
          ? plans.map((plan) => (
              <PlanCard
                key={plan.id}
                title={plan.title}
                description={plan.description}
                price={plan.price}
                onAcquire={() => addToCart(plan)}
              />
            ))
          : "Cargando planes..."}
      </div>

      <h1>Productos</h1>
      <div>
        <CardSection products={products} addToCart={addToCart} />
      </div>

      <button onClick={clearCart}>Limpiar carrito</button>
    </div>
  );
};

export default ProductsPage;
