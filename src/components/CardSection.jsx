import React, { useState } from "react";
import styles from "../styles/CardSection.module.css";

// Componente Card para cada producto
const Card = ({ title = "Producto", description, price, image, product, addToCart }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainerCard}>
        <img src={image} alt={`Imagen de ${title}`} className={styles.cardImage} />
        <button
          onClick={() => setLiked(!liked)}
          className={`${styles.likeButton} ${liked ? styles.liked : ""}`}
        >
          ♥
        </button>
      </div>
      <div className={styles.cardContent}>
        <h2>{title}</h2>
        <p>{description}</p>
        <p className={styles.price}>${price}</p>
        <button
          className={styles.buyButton}
          onClick={() => addToCart(product)} // Agregar al carrito
        >
          Comprar
        </button>
      </div>
    </div>
  );
};

// Componente CardSection que contiene todas las tarjetas
const CardSection = ({ products = [], addToCart }) => {
  return (
    <div className={styles.imageContainer}>
      <h1>Productos Destacados</h1>
      <div className={styles.grid}>
        {products && Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id} {...product} product={product} addToCart={addToCart} />
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
    </div>
  );
};

export default CardSection;
