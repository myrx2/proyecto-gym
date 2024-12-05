import React, { useState } from "react";  
import CartItem from "../components/CartItem";  
import useCart from "../hooks/useCart";  
import styles from "../styles/CartPage.module.css";  

const CartPage = () => {
  const { cart, addToCart, removeFromCart, decreaseItemQuantity, clearCart } = useCart();  // Obtenemos el carrito y las funciones del hook `useCart`.
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);  // Estado local para gestionar si la compra fue completada.

  const handleCheckout = async () => {  // Función para procesar el checkout (compra).
    try {
      await clearCart();  // Vaciar el carrito al hacer el checkout.
      setPurchaseCompleted(true);  // Marcar que la compra fue completada.
    } catch (error) {
      console.error("Error during checkout:", error);  // Manejo de errores si falla el checkout.
    }
  };

  return (
    <div className={styles.cartContainer}>
      <h1>Carrito de compras</h1>
      {purchaseCompleted ? (  // Condicional para mostrar mensaje si la compra fue completada.
        <p className={styles.purchaseMessage}>
          ¡Gracias por tu compra! El carrito ahora está vacío.
        </p>
      ) : cart && cart.length > 0 ? (  // Si hay productos en el carrito, los renderiza.
        <>
          <div className={styles.cartItems}>
            {cart.map((item) => (  // Mapea el carrito para renderizar un `CartItem` por cada producto.
              <CartItem
                key={item.id}  
                item={item}  
                addToCart={addToCart}  // Pasa la función `addToCart` para añadir más cantidad.
                removeFromCart={removeFromCart}  // Pasa la función `removeFromCart` para eliminar el ítem.
                decreaseItemQuantity={decreaseItemQuantity}  // Pasa la función para reducir la cantidad.
              />
            ))}
          </div>
          <div className={styles.buttonsContainer}>
            <button className={styles.checkoutButton} onClick={handleCheckout}>  {/* Botón para realizar el checkout. */}
              <i className={`fas fa-shopping-cart ${styles.cartIcon}`}></i>
              Comprar ahora
            </button>
            <button className={styles.clearCartButton} onClick={clearCart}>  {/* Botón para vaciar el carrito. */}
              <i className={`fas fa-trash-alt ${styles.trashIcon}`}></i>
              Vaciar carrito
            </button>
          </div>
        </>
      ) : (
        <p>El carrito está vacío.</p>  // Si no hay productos en el carrito, muestra un mensaje.
      )}
    </div>
  );
};

export default CartPage;  
