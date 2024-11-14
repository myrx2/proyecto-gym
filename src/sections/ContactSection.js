export default function ContactSection() {
    return (
      <section>
         <h2>Contacto</h2>
        
         <p> ➡  section in progress ... ✔ </p>
     
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
                   <input type='text' id='nombre'>               
                   </input>
                </fieldset>
          
                <fieldset>
                   <label htmlFor='apellido'> Apellido: </label>
                   <input type='text' id='apellido'>               
                   </input>
                </fieldset>

                <fieldset>
                   <label htmlFor='mail'> Email: </label>
                   <input type='email' id='mail'>               
                   </input>
                </fieldset>

                <fieldset>
                   <label htmlFor='celu'> Celular: </label>
                   <input type='tel' id='celu'>               
                   </input>
                </fieldset>

                <div>
                   <label> Ingrese Aquí su Consulta: </label>
                   <textarea> </textarea>
                </div>

                <button> Enviar </button>
             </form>
        </div>
      </section>
    );
  }
  