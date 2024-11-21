import styles from '../styles/about.module.css';

export default function AboutSection() {
  return (
    <section>
      <h2>Acerca de Nosotros</h2>
      <h3>
        En <strong>Gym</strong>, nuestra misión es ayudarte a transformar tu vida a través del ejercicio
      </h3>
      <ul>
        <li>
          Buscamos ofrecerte un espacio donde puedas entrenar tu cuerpo y fortalecer tu mente, rodeado de una comunidad que te apoya.
        </li>
        <li>
          Nos enfocamos en brindarte las mejores herramientas y la motivación necesaria para alcanzar tus objetivos, 
          con un equipo de profesionales que te guiarán en cada paso del camino.
        </li>
        <li>
          Contamos con equipos de última tecnología para ofrecerte un entrenamiento seguro y efectivo, adaptado a tus necesidades.
        </li>
      </ul>
      <div className={styles.corre}>
        <img className={styles.imagenGimnasio} src="/images/cinta.jpg" alt="Imagen del Gimnasio" />
      </div>
    </section>
  );
}
