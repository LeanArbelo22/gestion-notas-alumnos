// Seleccionamos el elemento HTML del formulario a traves de su id
let form = document.getElementById("form-alumnos");
console.log(form);

// Lo mismo pero seleccionamos la tabla
let tabla = document.getElementById("tabla-alumnos");

form.addEventListener("submit", subirFormulario);

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
  evento.preventDefault();
  console.log(evento);
  
  formDataAlumnos = new FormData(form);

  console.log(formDataAlumnos.get("nota1"));

  cicloLectivo = formDataAlumnos.get("año");
  materia = formDataAlumnos.get("materia");
  matricula = formDataAlumnos.get("matricula");
  nombre = formDataAlumnos.get("nombre");
  
  nota1 = parseInt(formDataAlumnos.get("nota1"));
  nota2 = parseInt(formDataAlumnos.get("nota2"));
  nota3 = parseInt(formDataAlumnos.get("nota3"));
  promedio = (nota1 + nota2 + nota3) / 3;

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
	if (materia === "Matematicas" && estado === "Aprobado") {
		aprobadosMatematicas += 1;
	}
	if (materia === "Matematicas" && estado === "Desaprobado") {
		desaprobadosMatematicas += 1;
	}

	if (materia === "Programacion" && condicion === "Promocion") {
		promocionProgramacion += 1;
	}
	if (materia === "Programacion" && estado === "Aprobado") {
		aprobadosProgramacion += 1;
	}
	if (materia === "Programacion" && estado === "Desaprobado") {
		desaprobadosProgramacion += 1;
	}

	  /* seleccionamos en que parte de la tabla se va a cargar la info dependiendo la materia */
  let bodyMatematicas = document.getElementById("mates");
  let bodyProgramacion = document.getElementById("progra");

  matriculasMatematicas = aprobadosMatematicas + desaprobadosMatematicas
  matriculasProgramacion = aprobadosProgramacion + desaprobadosProgramacion

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
				<p>Cantidad de alumnos del ciclo lectivo actual: ${matriculas} </p>
        <p>Cantidad de alumnos por materia del ciclo actual.</p>
				<p>Matematicas: ${matriculasMatematicas}</p>
        <p>Programacion: ${matriculasProgramacion}</p>
				<p>Cantidad de aprobados por materia.</p>
				<p>Matematicas: ${aprobadosMatematicas}</p>
				<p>Programacion: ${aprobadosProgramacion}</p>
        <p>Cantidad de desaprobados por materia.</p>
				<p>Matematicas: ${desaprobadosMatematicas}</p>
				<p>Programacion: ${desaprobadosProgramacion}</p>
				<p>Cantidad de promocionados por materia.</p>
        <p>Matematicas: ${promocionMatematicas}</p>
				<p>Programacion: ${promocionProgramacion}</p>
	`
	estadisticas.innerHTML = fullText
}