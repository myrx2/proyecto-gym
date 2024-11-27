// CardSection.js
import React from "react";
import styles from "../styles/CardSection.module.css"; 
import Card from "./Card";

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
