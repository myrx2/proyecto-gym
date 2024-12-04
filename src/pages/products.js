import React from "react";  
import CardSection from "../components/CardSection";  
import PlanCard from "../components/PlanCard";  
import useCart from "../hooks/useCart";  
import Swal from "sweetalert2";

const ProductsPage = () => {
  const { plans, products, addToCart } = useCart();  // Usamos el hook `useCart` para obtener los planes, productos y la función `addToCart`.

  const handleAddToCart = (item) => {
    addToCart(item);  // Llama a la función `addToCart` para agregar el item al carrito.
    Swal.fire({
      title: '¡Producto agregado!',
      text: `Has agregado ${item.title} al carrito.`,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  };
  
  return (
    <div>
      <h1>Planes</h1>
      <div className="plan-card-container">
        {plans && plans.length > 0  // Verifica si hay planes disponibles.
          ? plans.map((plan) => (  // Si hay planes, mapea y renderiza un `PlanCard` por cada uno.
              <PlanCard
                key={plan.id}  
                title={plan.title}  
                description={plan.description}  
                price={plan.price}  
                onAcquire={() => addToCart(plan)}  // Acción de agregar el plan al carrito.
              />
            ))
          : "Cargando planes..."}  
      </div>

      <h1>Productos</h1>
      <div>
        <CardSection products={products} addToCart={addToCart} />  {/* Renderiza los productos utilizando `CardSection` y pasando los productos y la función `addToCart`. */}
      </div>
    </div>
  );
};

export default ProductsPage;  
