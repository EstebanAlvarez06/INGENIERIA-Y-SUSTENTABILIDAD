export function codUnidad() {
  let plataformaActual = JSON.parse(sessionStorage.getItem("plataformaActual"));
  let moduloSeleccionado = sessionStorage.getItem("moduloSeleccionado");
  let mensaje = document.getElementById("moduloSeleccionado");
  mensaje.innerText = moduloSeleccionado;

  let leccionListado = document.querySelector(".leccionListado");

  const leccionesActuales = plataformaActual.modulos.find(
    (i) => i.modulo === moduloSeleccionado
  );

  leccionesActuales.lecciones.forEach((unidad) => {
    let leccionesDisponible = document.createElement("button");
    leccionesDisponible.classList.add("leccionesDisponible");
    leccionesDisponible.innerText = unidad.titulo;
    leccionListado.appendChild(leccionesDisponible);

    leccionesDisponible.addEventListener("click", (e) => {
      let leccionSeleccionada = e.target.innerText;
      sessionStorage.setItem("leccionSeleccionada", leccionSeleccionada);

      sessionStorage.setItem(
        "leccionesActuales",
        JSON.stringify(leccionesActuales)
      );
      window.location.href = "actividad.html";
    });
  });
}
