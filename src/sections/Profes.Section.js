import ProfesCards from '@/components/Profes';
import styles from '../styles/ProfesSection.module.css';
import profesData from '@/utils/profesData';

export default function ProfesSection () {
    return (
        <> 
            <section className={styles.ProfesSection}>
                <h2 style={{color: 'white', padding: '0 0 10px 0'}}> Nuestros Profes </h2> 
                <p className={styles.description}> Contamos con un Equipo de Profesionales de Primer Nivel 
                     capacitados para brindarte las clases más completas y   prácticas!! 
                    Todos nuestros Profes se perfeccionan  constantemente para traerte las últimas tendencias 
                    y las mejores rutinas... ¡¡¡No lo dudes y vení a entrenar con nosotros!!! 
                </p>
            </section>
             {/* 1- toda la section de cards deberia de estar dentro de la section de arriba.
                 2- debería de ocupar hasta el 80% del ancho. 3 o 4 cards por linea.
                 3- compartir el background oscuro.
                 4- ver el border radius d las img en la parte inferior.
                 5- achicar tamaño de titulo y descripcion de las cards. */}
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