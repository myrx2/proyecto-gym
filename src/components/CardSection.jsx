import React, { useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert2
import styles from "../styles/CardSection.module.css";

const CardSection = ({ products = [], addToCart }) => {
  const [likedProducts, setLikedProducts] = useState({});

  const toggleLike = (productId) => {
    setLikedProducts((prevLikes) => ({
      ...prevLikes,
      [productId]: !prevLikes[productId],
    }));
  };

  const handleAddToCart = (product) => {
    // Llama a la función `addToCart` que viene como prop
    addToCart(product);

    // Muestra la alerta de éxito de SweetAlert2
    Swal.fire({
      icon: 'success',
      title: 'Producto añadido',
      text: `El producto ${product.title} ha sido añadido al carrito.`,
      confirmButtonText: 'Aceptar',
    });
  };

  return (
    <div className={styles.imageContainer}>
      <div className={styles.grid}>
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.imageContainerCard}>
                <img
                  src={product.image}
                  alt={`Imagen de ${product.title}`}
                  className={styles.cardImage}
                />
                <button
                  onClick={() => toggleLike(product.id)}
                  className={`${styles.likeButton} ${
                    likedProducts[product.id] ? styles.liked : ""
                  }`}
                >
                  ♥
                </button>
              </div>
              <div className={styles.cardContent}>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p className={styles.price}>${product.price}</p>
                <button
                  className={styles.buyButton}
                  onClick={() => handleAddToCart(product)} // Usa la función modificada
                >
                  Comprar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
    </div>
  );
};

export default CardSection;
