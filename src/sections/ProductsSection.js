import React from 'react';
import PlanCard from '../components/PlanCard';
import CardSection from '../components/CardSection';
import productData from '../db/db.json'; 


const ProductsSection = () => {
  const addToCart = (product) => {
    console.log('Producto agregado al carrito:', product);
  };

  return (
    <>
      <section className="plans-section">
        {productData.plans && productData.plans.length > 0 ? (
          productData.plans.map((plan) => (
            <PlanCard
              key={plan.id}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              onAcquire={() => alert(`${plan.title} adquirido!`)}
            />
          ))
        ) : (
          <p>Cargando planes...</p>
        )}
      </section>

      <section className="products-section">
      <h2>Productos</h2>
        <CardSection products={productData.products} addToCart={addToCart} />
      </section>
    </>
  );
};

export default ProductsSection;
