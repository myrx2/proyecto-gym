
import styles from "../styles/ProfesSection.module.css";

const ProfesCards = ({ image, title, description }) => {
   return (
     <div className={styles["container"]}>
          <div className={styles["card"]}>
             <div className="card-imagen">
                  <img src={image} alt="profes"/>
             </div>
                        
              <div className={styles["card-body"]}>
                  <h3 className={styles["card-title"]}>{title}</h3>
                  <p className="card-description">{description}</p>
              </div>       
          </div>  
     </div>
   );
 };


export default ProfesCards;