import { cursosPlataforma } from "../../js/data/datos.js";

export function codCursos() {
  const cursosBody = document.querySelector(".cursosBody");
  const cursosListado = document.querySelector(".cursosListado");

  let cursosExistentes = [];
  for (let j = 0; j < cursosPlataforma.cursosTipo.length; j++) {
    if (cursosPlataforma.cursosTipo[j].existencia) {
      cursosExistentes.push(cursosPlataforma.cursosTipo[j]);
    }
  }

  for (let i = 0; i < cursosExistentes.length; i++) {
    const cursosDisponibles = document.createElement("button");
    cursosDisponibles.classList.add("cursosDisponibles");
    cursosDisponibles.innerText = cursosExistentes[i].titulo;
    cursosListado.appendChild(cursosDisponibles);

    cursosDisponibles.addEventListener("click", (e) => {
      let cursoSeleccionado = e.target.innerText;
      sessionStorage.setItem("cursoSeleccionado", cursoSeleccionado);

      window.location.href = "plataformas.html";
    });
  }
  cursosBody.appendChild(cursosListado);
}
