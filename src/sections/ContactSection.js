import styles from '../styles/contactSection.module.css'; 

export default function ContactSection() {
    return (
      <section className={styles.contactSection}>
         <h2>Contacto</h2>
           
         {/* frase motivadora */}
         <p className= {styles.description}>
            El camino hacia el éxito no es fácil, pero siempre vale la pena!
            Recordá que los desafíos son lo que hacen la vida interesante, y VOS TAMBIÉN PODÉS!! 
            EMPEZÁ HOY a transformar tu cuerpo y tu estilo de vida! 
            Completá con tus datos así nos ponemos en contacto y te asesoramos para que empieces a transformar tu rutina!!
         </p>

          {/* formu */}
        <div>
             <form className= {styles.formulario}>
                <fieldset className={styles.contenido}>
                   <label htmlFor='nombre' className={styles.label} > Nombre: </label>
                   <input className={styles.input} type='text' name="nombre" id='nombre'>                
                   </input>
                </fieldset>
          
                <fieldset className={styles.contenido}>
                   <label htmlFor='apellido'className={styles.label}> Apellido: </label>
                   <input className={styles.input} type='text' name="apellido" id='apellido'>               
                   </input>
                </fieldset>

                <fieldset className={styles.contenido}>
                   <label htmlFor='mail'className={styles.label}> Email :  </label>
                   <input className={styles.input} type='email'name="mail" id='mail'>               
                   </input>
                </fieldset>

                <fieldset className={styles.contenido}>
                   <label htmlFor='celu'className={styles.label}> Celular: </label>
                   <input className={styles.input} type='tel' name="celu" id='celu'>               
                   </input>
                </fieldset>

                <fieldset className={styles.contenido}>
                   <label htmlFor="select"className={styles.label}> Elegir una opción:</label>
                   <select className={styles.select}>
                      <option selected value="info">Info</option>
                      <option value="productos">Productos</option>
                      <option  value="planes">Planes</option>
                      <option  value="planes">Clases</option>
                   </select>
                </fieldset>

                <div className={styles.textarea}>
                   <label className={styles.label}> Ingrese Aquí su Consulta: </label>
                   <textarea className={styles.input} rows="5"> </textarea>
                </div>

                <button className={styles.button}> Enviar </button>
             </form>
        </div>
      </section>
    );
  }
  