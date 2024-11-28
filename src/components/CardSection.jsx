import React, { useState } from "react";
import styles from "../styles/CardSection.module.css";

const CardSection = ({ products = [], addToCart }) => {
  const [likedProducts, setLikedProducts] = useState({});

  const toggleLike = (productId) => {
    setLikedProducts((prevLikes) => ({
      ...prevLikes,
      [productId]: !prevLikes[productId],
    }));
  };

  return (
    <div className={styles.imageContainer}>
      <h1>Productos Destacados</h1>
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
                  className={`${styles.likeButton} ${likedProducts[product.id] ? styles.liked : ""}`}
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
                  onClick={() => addToCart(product)} // Llamada a addToCart para agregar el producto
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
