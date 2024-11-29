import React from "react";
import CardSection from "../components/CardSection";
import PlanCard from "../components/PlanCard";
import useCart from "../hooks/useCart";


const ProductsPage = () => {
  const { plans, products, addToCart, clearCart } = useCart();

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
