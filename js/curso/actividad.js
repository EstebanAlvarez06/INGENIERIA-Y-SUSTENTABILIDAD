import { actividadesPlataforma } from "../../js/data/actividades.js";

export function codActividad() {
  let leccionSeleccionada = sessionStorage.getItem("leccionSeleccionada");

  let leccionesActuales = JSON.parse(
    sessionStorage.getItem("leccionesActuales")
  );

  let actividadBody = document.querySelector(".actividadBody");
  let inicioActividad = document.getElementById("inicioActividad");
  let mensaje = document.getElementById("leccionSeleccionada");
  mensaje.innerText = leccionSeleccionada;

  const actividadesActuales = leccionesActuales.lecciones.find(
    (i) => i.titulo === leccionSeleccionada
  );
  actividadesActuales.actividades.forEach((actividad) => {
    inicioActividad.innerText = actividad.inicio;
  });

  const trabajo = actividadesPlataforma.lecciones.find(
    (j) => j.titulo === leccionSeleccionada
  );

  trabajo.actividades.forEach((trabajos) => {
    trabajos.trabajo();
  });
}
