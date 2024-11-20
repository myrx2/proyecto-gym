import styles from '../styles/contactSection.module.css'; 

export default function ContactSection() {
    return (
      <section className={styles.contactSection}>
         <h2>Contacto</h2>
        
         <p className= {styles.description}> ➡  to do ... : <br></br>
             🔸rrss arriba <br></br>
             🔸 agregar más opciones en select <br></br>  
             🔸estilo <br></br>
             
         </p>
     
         {/* frase motivadora */}
         <p>
            El camino hacia el éxito no es fácil, pero siempre vale la pena... <br></br> 
            Recordá que los desafíos son lo que hacen la vida interesante, y VOS TAMBIÉN PODÉS!! <br></br>
            EMPEZÁ HOY a transformar tu vida, tu cuerpo, tu estilo de vida! <br></br>
            Completá con tus datos asi nos ponemos en contacto y te asesoramos para que empieces a transformar tu rutina!!
         </p>

          {/* formu */}
        <div>
             <form>
                <fieldset>
                   <label htmlFor='nombre'> Nombre: </label>
                   <input type='text' name="nombre" id='nombre'>                
                   </input>
                </fieldset>
          
                <fieldset>
                   <label htmlFor='apellido'> Apellido: </label>
                   <input type='text' name="apellido" id='apellido'>               
                   </input>
                </fieldset>

                <fieldset>
                   <label htmlFor='mail'> Email: </label>
                   <input type='email'name="mail" id='mail'>               
                   </input>
                </fieldset>

                <fieldset>
                   <label htmlFor='celu'> Celular: </label>
                   <input type='tel' name="celu" id='celu'>               
                   </input>
                </fieldset>

                <fieldset>
                   <label htmlFor="select"> Elegir una opción:</label>
                   <select>
                      <option selected value="info">Info</option>
                      <option value="productos">Productos</option>
                      <option  value="planes">Planes</option>
                   </select>
                </fieldset>

                <div>
                   <label> Ingrese Aquí su Consulta: </label>
                   <textarea> </textarea>
                </div>

                <button className={styles.ctaButton}> Enviar </button>
             </form>
        </div>
      </section>
    );
  }
  