import { cursosPlataforma } from "../../js/data/datos.js";

export function codPlataformas() {
  const cursoSeleccionado = sessionStorage.getItem("cursoSeleccionado");

  let curso = cursosPlataforma.cursosTipo.find(
    (i) => i.titulo === cursoSeleccionado
  );

  const plataformas_body = document.querySelector(".plataformas_body");
  const plataformasListado = document.querySelector(".plataformasListado");
  let mensaje = document.getElementById("cursoSeleccionado");
  mensaje.innerText = cursoSeleccionado;
  plataformas_body.prepend(mensaje);

  curso.plataformas.forEach((plataforma) => {
    let plataformas = document.createElement("button");
    plataformas.classList.add("plataformas");
    plataformas.innerText = plataforma.nombre;
    plataformasListado.appendChild(plataformas);

    plataformas.addEventListener("click", (e) => {
      let plataformaSeleccionada = e.target.innerText;

      sessionStorage.setItem("plataformaSeleccionada", plataformaSeleccionada);
      sessionStorage.setItem("curso", JSON.stringify(curso));
      window.location.href = "modulos.html";
    });
  });
}
