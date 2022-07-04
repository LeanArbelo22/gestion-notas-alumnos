/* Me quiero imaginar que ya sabes 
para que funciona el console.log 
asi que voy a omitir eso */

// Seleccionamos el elemento HTML del formulario a traves de su id
let form = document.getElementById("form-alumnos");
console.log(form);

// Lo mismo pero seleccionamos la tabla
let tabla = document.getElementById("tabla-alumnos");

/* al seleccionar un elemento html como <table>, se pueden acceder 
a diversos metodos para manipularlo, como por ejemplo table.insertRow() */

/* De la siguiente forma se escucha a 
un evento particular asignado a un elemento html, 
en este caso escuchamos el evento submit del formulario,
tambien podria ser el evento click del boton, para eso
estudia los eventos de JS 
elementoHTML.addEventListener(evento a escuchar, funcion que quieras que se ejecute cuando se escuche el evento) 
la funcion puede declararse antes, despues o dentro del addEventListener, es indiferente */

form.addEventListener("submit", subirFormulario);

/* Como las variables tienen cierto alcance dependiendo donde esten ubicadas (scope),
a veces es necesario declararlas fuera de la funcion para posteriormente poder manipularlas,
en este caso declaramos variables sin darle ningun valor, el valor lo van a obtener cuando
se ejecute la funcion */
let formDataAlumnos;
let cicloLectivo;
let materia;
let matricula;
let nombre;
let nota1;
let nota2;
let nota3;
let promedio;
let estado;
let condicion;

/* numeros necesarios para guardar la info y despues procesarla en las estadisticas */
let matriculas = 0;
let matriculasMatematicas = 0;
let matriculasProgramacion = 0;

let aprobados = 0;
let aprobadosMatematicas = 0;
let aprobadosProgramacion = 0;

let desaprobados = 0;
let desaprobadosMatematicas = 0;
let desaprobadosProgramacion = 0;

let promocionMatematicas = 0;
let promocionProgramacion = 0;

function subirFormulario(evento) {
  /* por defecto, cuando se ejecuta el evento submit (en este
  caso cuando se hace click en el boton del formulario) la 
  pagina se recarga y se borran los campos de los inputs,
  para eliminar ese comportamiento (o el de otro evento) se usa 
  preventDefault(), es necesario que la funcion reciba el evento como 
  parametro para que sirva, igualmente, cancela todo comportamiento, 
  por ende tampoco enviaria la informacion al servidor (lo manejamos aparte) */
  evento.preventDefault();
  console.log(evento); // si queres ver informacion detallada del evento

  /* Obtenemos los valores del formulario 
  (esta es UNA de varias formas de hacerlo),
  se va a crear un objeto FormData cuando se ejecute
  el evento submit, para que asi pueda acceder a los valores 
  ingresados en los inputs en el momento en que se hace click, 
  si no, obtiene los valores por defecto (los que tiene apenas carga la pagina) */
  formDataAlumnos = new FormData(form);

  /* FormData devuelve un objeto un poco dificil de leer, 
  para acceder a los valores individuales de cada input
  se hace con el metodo get(name del input), 
  ej formDataAlumnos.get("año") */
  console.log(formDataAlumnos.get("nota1"));

  /* guardamos en las variables (que estaban vacias) toda la info obtenida de los inputs */
  cicloLectivo = formDataAlumnos.get("año");
  materia = formDataAlumnos.get("materia");
  matricula = formDataAlumnos.get("matricula");
  nombre = formDataAlumnos.get("nombre");
  
	/* nota 1 2 y 3 son devueltos como strings, 
  hay que convertirlos a numeros para poder calcular el promedio 
	(use parseInt porque vi que en lo que me mandaste usaban eso, 
	pero tambien se puede con Number() ) */
  nota1 = parseInt(formDataAlumnos.get("nota1"));
  nota2 = parseInt(formDataAlumnos.get("nota2"));
  nota3 = parseInt(formDataAlumnos.get("nota3"));
  promedio = (nota1 + nota2 + nota3) / 3;

	// += 1 es "el valor que ya existia mas 1"
	matriculas += 1;

  if (promedio >= 4) {
    estado = "Aprobado";
		aprobados += 1;
  } 
	else {
    estado = "Desaprobado";
		desaprobados += 1;
  };

  if (promedio <= 4) {
    condicion = "Libre"
  }
	else if (promedio > 4 && promedio < 7) {
    condicion = "Regular"
  }
	else {
    condicion = "Promocion";
  }

	/* modificando los valores necesarios para las estadisticas */
	if (materia === "Matematicas" && condicion === "Promocion") {
		promocionMatematicas += 1
	}
	else if (materia === "Matematicas" && estado === "Aprobado") {
		aprobadosMatematicas += 1;
	}
	else if (materia === "Matematicas" && estado === "Desaprobado") {
		desaprobadosMatematicas += 1;
	}

	if (materia === "Programacion" && condicion === "Promocion") {
		promocionProgramacion += 1;
	}
	else if (materia === "Programacion" && estado === "Aprobado") {
		aprobadosProgramacion += 1;
	}
	else if (materia === "Programacion" && estado === "Desaprobado") {
		desaprobadosProgramacion += 1;
	}

	  /* seleccionamos en que parte de la tabla se va a cargar la info dependiendo la materia */
  let bodyMatematicas = document.getElementById("mates");
  let bodyProgramacion = document.getElementById("progra");

  if (materia === "Matematicas"){
    agregarFila(bodyMatematicas);
  } else {
    agregarFila(bodyProgramacion);
  }

	imprimirEstadisticas();

  alert("Informacion cargada correctamente");
}

function agregarFila(bodyMateria) {
  // agregamos una nueva fila al final del cuerpo de cada materia
  let nuevaFila = bodyMateria.insertRow(-1); // -1 hace referencia a la ultima fila de la tabla

  // Creando celdas
  let campos = [matricula, nombre, nota1, nota2, nota3, promedio, estado, condicion];

  for (let i = 0; i < campos.length; i++){
    let td = nuevaFila.insertCell(i);
    let campo = campos[i];
    td.innerHTML = campo;
  }
}

function imprimirEstadisticas() {
	let estadisticas = document.getElementById("texto-estadisticas");
	let fullText = `
				<p>Total de alumnos del ciclo lectivo actual: ${matriculas} </p>
        <p>Total de alumnos por materia del ciclo lectivo actual.</p>
				<p>Matematicas: ${aprobadosMatematicas + desaprobadosMatematicas}</p>
        <p>Programacion: ${aprobadosProgramacion + desaprobadosProgramacion}</p>
				<p>Total de aprobados por materia.</p>
				<p>Matematicas: ${aprobadosMatematicas}</p>
				<p>Programacion: ${aprobadosProgramacion}</p>
        <p>Total de desaprobados por materia.</p>
				<p>Matematicas: ${desaprobadosMatematicas}</p>
				<p>Programacion: ${desaprobadosProgramacion}</p>
				<p>Total de promocionados por materia.</p>
        <p>Matematicas: ${promocionMatematicas}</p>
				<p>Programacion: ${promocionProgramacion}</p>
	`
	estadisticas.innerHTML = fullText
}

/* El unico error es que si se repiten las matriculas en las materias las va a contar como si fuesen diferentes */