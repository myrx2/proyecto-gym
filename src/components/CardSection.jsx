import React, { useState } from "react";
import styles from "../styles/CardSection.module.css";

// Array de imágenes
const images = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
  "/images/img4.jpg",
  "/images/img5.jpg",
  "/images/img6.jpg",
  "/images/img7.jpg",
  "/images/img8.jpg",
  "/images/img9.jpg",
  "/images/img10.jpg",
  "/images/img11.jpg",
  "/images/img12.jpg",
  "/images/img13.jpg",
  "/images/img14.jpg",
  "/images/img15.jpg",
  "/images/img16.jpg",
];

// Componente Card para cada producto
const Card = ({ title = "Producto", description, price, image }) => {
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
        <button className={styles.buyButton}>Comprar</button>
      </div>
    </div>
  );
};

// Componente CardSection que contiene todas las tarjetas
const CardSection = () => {
  const cards = [
    {
      title: "Remera Deportiva",
      description: "Remera ideal para entrenamiento fresca y comoda.",
      price: 10000,
      image: images[0],
    },
    {
      title: "Remera Deportiva",
      description: "Remera ideal para entrenamiento fresca y comoda.",
      price: 10000,
      image: images[1],
    },
    {
      title: "Creatina",
      description: "Creatina Monohidrato marca Gentech.",
      price: 20000,
      image: images[2],
    },
    {
      title: "Proteina",
      description: "La proteina Universal es la mejor del mercado.",
      price: 30000,
      image: images[3],
    },
    {
      title: "Pantalon Jogging",
      description: "Pantalon flexible y comodo para cualquier deporte.",
      price: 12000,
      image: images[4],
    },
    {
      title: "Auriculares Inalambricos",
      description: "Auriculares con cancelacion de ruidos u bluetooth 5.0.",
      price: 18000,
      image: images[5],
    },
    {
      title: "Gorra Deportiva",
      description: "Gorra ligera y ajustable para actividades al aire libre.",
      price: 8000,
      image: images[6],
    },
    {
      title: "Pesas Ajustables",
      description: "Pesas ideales para entrenamientos en casa.",
      price: 25000,
      image: images[7],
    },
    {
      title: "Bicicleta de Montaña",
      description: "Bicicleta robusta para caminos exigentes.",
      price: 120000,
      image: images[8],
    },
    {
      title: "Guantes de entrenamiento",
      description: "Guantes antideslizantes para mejor agarre en el gimnasio.",
      price: 3500,
      image: images[9],
    },
    {
      title: "Barra Deportiva",
      description: "Barra deportiva a base de proteina.",
      price: 1500,
      image: images[10],
    },
    {
      title: "Barra Deportiva",
      description: "Barra deportiva a base de proteina sabor frutilla.",
      price: 1500,
      image: images[11],
    },
    {
      title: "Barra Deportiva",
      description: "Barra deportiva a base de proteina sabor chocolate.",
      price: 1500,
      image: images[12],
    },
    {
      title: "Zapatillas Deportiva",
      description: "Marca Rebook, el mejor agarre.",
      price: 30000,
      image: images[13],
    },
    {
      title: "Botella de agua",
      description: "Botella para agua en acero inoxidable.",
      price: 12000,
      image: images[14],
    },
    {
      title: "Mancuernas",
      description: "Mancuernas de alta calidad con revestimiento.",
      price: 20000,
      image: images[15],
    },
  ];

  return (
    <div className={styles.imageContainer}>
      <h1>Productos Destacados</h1>
      <div className={styles.grid}>
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default CardSection;