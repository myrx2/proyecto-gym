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
    try {
      const existingItem = cart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        await axios.put(`${ENDPOINTS.cart}/${existingItem.id}`, {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        });
      } else {
        await axios.post(ENDPOINTS.cart, { ...item, quantity: 1 });
      }

      updateState();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
      <h1>Planes</h1>
      <div className="plan-card-container"> {/* Contenedor con flexbox */}
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
    </div>
  );
};

export default ProductsPage;
