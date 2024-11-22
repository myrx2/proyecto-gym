import React from 'react';
import PlanCard from '../components/PlanCard';
import CardSection from '../components/CardSection';
import planData from '../utils/planData'; // Datos de los planes
import productData from '../db/db.json'; // Importar db.json directamente

const ProductsSection = () => {
  const addToCart = (product) => {
    console.log('Producto agregado al carrito:', product);
  };

  return (
    <>
      <section className="products-section">
        {planData.map((plan, index) => (
          <PlanCard
            key={index}
            title={plan.title}
            description={plan.description}
            price={plan.price}
            onAcquire={plan.onAcquire}
          />
        ))}
      </section>
      <CardSection products={productData.products} addToCart={addToCart} />
    </>
  );
};

export default ProductsSection;
