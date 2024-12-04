import React from "react";
import ClasesCard from "../components/ClasesCard";
import clasesData from "../utils/clasesData";
import styles from '../styles/about.module.css';

export default function AboutSection() {
  return (
    <>
      <section className="sectionUs">
        <h2>Acerca de Nosotros</h2>
      <div className={styles.info}>
        <p>
        
          Somos Gym nuestra <strong>misión</strong> es brindarte un espacio donde no solo entrenes tu cuerpo, 
          sino que también cultives una mente y un espíritu fuerte. Creemos en el poder del movimiento para liberar 
          tu potencial físico y mental. Queremos que al cruzar nuestras puertas, te sientas motivado a alcanzar tus metas.
        </p>
       
        <p>
          Nuestra <strong>visión</strong> es incentivar una comunidad saludable, promoviendo habitos de vida positivos
           y fomentando la disciplina para un bienestar integral. Por ende, te ofreceremos más que solo máquinas y pesas;
           te proporcionaremos las herramientas, el conocimiento y la inspiración para que logres tus objetivos.
        </p>

        <p>
          Nuestra maquinaria de última generación te permitirá trabajar todos los grupos musculares de forma segura y 
          efectiva. Además, contamos con un staff de profesionales altamente capacitados que te brindarán la orientación y 
          el apoyo personalizado que necesitas para maximizar tus resultados. En Gym tenes todo lo que necesitas 
          para alcanzar tus objetivos.


        </p>

      </div>       

        <div className={styles.corre}>
          <img src="/images/cinta.jpg" alt={styles.ImagendelGimnasio}/>
        </div>

      </section>

<br></br>

      <section>
        <h2>Nuestras clases</h2>
        <div className="owl-carousel owl-theme">
          {clasesData.map((clase, index) => (
            <ClasesCard
              key={index}
              image={clase.image}
              title={clase.title}
              description={clase.description}
            />
          ))}
        </div>
      </section>
    </>

  );
}
