// Card.js
import React, { useState } from "react";
import styles from "../styles/CardSection.module.css";

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
          onClick={() => addToCart(product)} 
        >
          Comprar
        </button>
      </div>
    </div>
  );
};

export default Card;
