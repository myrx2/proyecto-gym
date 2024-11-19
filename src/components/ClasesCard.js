import React from "react";
import styles from "../styles/ClasesCard.module.css";

const ClaseCard = ({ image, title, description }) => {
  return (
    <div className={styles["card-container"]}>
      <div className={styles["card"]}>
      <div className={styles["card-inner"]}>
        <div className={styles["card-front"]}>
            <div className="item">
                <img src={image} alt="portada clases"/>
            </div>
        </div>
        <div className={styles["card-back"]}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ClaseCard;
