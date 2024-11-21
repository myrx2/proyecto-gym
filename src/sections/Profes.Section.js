import ProfesCards from '@/components/Profes';
import styles from '../styles/ProfesSection.module.css';
import profesData from '@/utils/profesData';

export default function ProfesSection () {
    return (
        <> 
            <section className={styles.ProfesSection}>
                <h2 className={styles.title}> Nuestros Profes </h2>
                <p className={styles.description}> Contamos con un Equipo de Profesionales de Primer Nivel que están capacitados
                     para brindarte las clases
                    más completas y   prácticas! 
                    Todos nuestros Profes se perfeccionan  constantemente para traerte las últimas tendencias y las mejores rutinas. No lo dudes y vení a entrenar con nosotros!!! </p>

            </section>

            <section>
                <div className="owl-carousel ">
                    {profesData.map((clase, index) => (
                        <ProfesCards
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