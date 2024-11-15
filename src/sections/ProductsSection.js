import React from 'react';
import PlanCard from '../components/PlanCard';
import planData from '../utils/planData';

const ProductsSection = () => {
  return (
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
  );
};

export default ProductsSection;
