import ProfesCards from '@/components/Profes';
import styles from '../styles/ProfesSection.module.css';
// import profesData from '@/utils/profesData';

export default function ProfesSection () {
    const profesData = [
        {
          key:"0",
          image: "../images/profe-boxeo.jpg",
          title: "Ariel Ramírez",
          description:
           "Profe de Boxeo",
        },
        {
          key:"1",
          image: "../images/profe-crossfit.jpg",
          title: "Nadia Pacheco" ,
          description:
           "Profe de Crossfit",
        },
        {
          key:"2",
          image: "../images/profes-zumba.jpg",
          title: "Alejandra y Martina Escobar",
          description:
            "Profes de Zumba",
        },
        {
          key:"3",
          image: "../images/profe-spining.jpg",
          title: "Pablo Díaz",
          description:
            "Profe de Spinning",
        },
        {
          key:"4",
          image: "../images/profe-pilates.jpg",
          title: "Pía Mendoza",
          description:
            "Profe de Pilates",
        },
        {
          key:"5",
          image: "../images/profe-yoga.jpg",
          title: "Mariah Nikel",
          description:
            "Profe de Yoga",
        }
           
      ];
    
    //    export default profesData;
      



    return (
        <> 
            <section className={styles.ProfesSection}>
                <h2 style={{color: 'white', padding: '0 0 10px 0'}}> Nuestros Profes </h2> 
                <p className={styles.description}> Contamos con un Equipo de Profesionales de Primer Nivel 
                     capacitados para brindarte las clases más completas y   prácticas!! 
                    Todos nuestros Profes se perfeccionan  constantemente para traerte las últimas tendencias 
                    y las mejores rutinas... ¡¡¡ No lo dudes y vení a entrenar con nosotros!!! 
                </p>

                 {/* <div className="container" style={{ display:    'flex', flexWrap: 'wrap' }}>
                        {profesData.map((card, index) => (
                            <ProfesCards 
                            key={index}
                            title={card.title} 
                            image={card.image} 
                            description={card.description} 
                            />
                        ))}
                        </div> */}
                <div className= {styles.container}>
                    <div className={styles.card}>
                        <div className={styles.image}>
                             <img src="../images/profe-boxeo.jpg"/>
                        </div>

                        <div className='card-body'>
                            <h3 className='card-title'>Ariel Ramírez</h3>
                            <p className='card-description'>Profe de Boxeo</p>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.image}>
                             <img src="../images/profe-crossfit.jpg"/>
                        </div>

                        <div className='card-body'>
                            <h3 className='card-title'>Nadia Pacheco</h3>
                            <p className='card-description'>Profe de Crossfit</p>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.image}>
                             <img src="../images/profes-zumba.jpg"/>
                        </div>

                        <div className='card-body'>
                            <h3 className='card-title'>Alejandra y Martina Escobar</h3>
                            <p className='card-description'>Profes de Zumba</p>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.image}>
                             <img src="../images/profe-spining.jpg"/>
                        </div>

                        <div className='card-body'>
                            <h3 className='card-title'>Pablo Díaz</h3>
                            <p className='card-description'>Profes de Spinning</p>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.image}>
                             <img src="../images/profe-pilates.jpg"/>
                        </div>

                        <div className='card-body'>
                            <h3 className='card-title'>Pía Mendoza</h3>
                            <p className='card-description'>Profes de Pilates</p>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.image}>
                             <img src="../images/profe-yoga.jpg"/>
                        </div>

                        <div className='card-body'>
                            <h3 className='card-title'>Mariah Nikel</h3>
                            <p className='card-description'>Profes de Yoga</p>
                        </div>
                    </div>

                </div>

            </section>
            
           
       </>   

    );
}