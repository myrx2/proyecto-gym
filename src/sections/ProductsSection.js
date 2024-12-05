import React from 'react';
import PlanCard from '../components/PlanCard';
import CardSection from '../components/CardSection';
import useCart from '../hooks/useCart';  // Si prefieres seguir utilizando el hook useCart

const ProductsSection = () => {
  const { plans, products, addToCart } = useCart();  // Usamos el hook `useCart` para obtener los planes y productos.

  return (
    <> <h2>Planes</h2>
      <section className="plans-section">
        {plans && plans.length > 0 ? (
          plans.map((plan) => (
            <PlanCard
              key={plan.id}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              onAcquire={() => addToCart(plan)}  // Acción de agregar el plan al carrito.
            />
          ))
        ) : (
          <p>Cargando planes...</p>
        )}
      </section>

      <section className="products-section">
        <h2>Productos</h2>
        <CardSection products={products} addToCart={addToCart} />
      </section>
    </>
  );
};

export default ProductsSection;
