// src/sections/AboutSection.js
import React from "react";
import ClasesCard from "../components/ClasesCard";
import clasesData from "../utils/clasesData";

export default function AboutSection() {
  return (
    <>
      <section className="sectionUs">
        <h2>Acerca de Nosotros</h2>
        <h3>
          En <strong>Gym</strong>, nuestra misión es ayudarte a transformar tu
          vida a través del ejercicio
        </h3>
        <ul>
          <li>
            Buscamos ofrecerte un espacio donde puedas entrenar tu cuerpo y
            fortalecer tu mente, rodeado de una comunidad que te apoya.
          </li>
          <li>
            Nos enfocamos en brindarte las mejores herramientas y la motivación
            necesaria para alcanzar tus objetivos, con un equipo de
            profesionales que te guiarán en cada paso del camino.
          </li>
          <li>
            Contamos con equipos de última tecnología para ofrecerte un
            entrenamiento seguro y efectivo, adaptado a tus necesidades.
          </li>
        </ul>

        <div className="imageUs">
          <img src="/images/cinta.jpg" alt="Imagen del Gimnasio"/>
        </div>

      </section>

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
