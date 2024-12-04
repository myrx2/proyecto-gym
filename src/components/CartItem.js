import React from "react"; 
import styles from "../styles/CartItem.module.css";

// El componente CartItem recibe varias props que se usarán para manipular el artículo en el carrito
const CartItem = ({
  item, // El artículo actual del carrito (incluye título, precio, cantidad)
  addToCart, // Función para agregar más cantidad de un artículo al carrito
  removeFromCart, // Función para eliminar un artículo del carrito
  decreaseItemQuantity, // Función para reducir la cantidad de un artículo en el carrito
}) => {
  return (
    <div className={styles.cartItem}> {/* Contenedor principal del artículo en el carrito */}
      <div className={styles.cartItemDetails}> {/* Contenedor de los detalles del artículo */}
        {/* Muestra el nombre del artículo */}
        <span className={styles.cartItemName}>{item.title}</span>
        
        {/* Muestra el precio total, si no existe, calcula el precio multiplicando precio por cantidad */}
        <span className={styles.cartItemPrice}>
          ${item.totalPrice || item.price * item.quantity}
        </span>

        {/* Muestra la cantidad actual del artículo */}
        <span className={styles.cartItemQuantity}>
          Cantidad: {item.quantity}
        </span>
      </div>

      <div className={styles.cartItemButtons}> {/* Contenedor de los botones para modificar el carrito */}
        {/* Botón para disminuir la cantidad del artículo */}
        <button
          className={styles.decreaseButton}
          onClick={() => decreaseItemQuantity(item.id)} // Llama a la función para disminuir la cantidad
        >
          -
        </button>

        {/* Botón para aumentar la cantidad del artículo */}
        <button
          className={styles.increaseButton}
          onClick={() => addToCart({ ...item, quantity: 1 })} // Llama a la función para aumentar la cantidad
        >
          +
        </button>

        {/* Botón para eliminar el artículo del carrito */}
        <button
          className={styles.deleteButton}
          onClick={() => removeFromCart(item.id)} // Llama a la función para eliminar el artículo
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CartItem; // Exporta el componente CartItem para usarlo en otros lugares
