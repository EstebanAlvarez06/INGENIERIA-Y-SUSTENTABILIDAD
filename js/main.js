import { codCursos } from "./curso/cursos.js";
import { codPlataformas } from "./curso/plataformas.js";
import { codModulos } from "./curso/modulos.js";
import { codUnidad } from "./curso/unidad.js";
import { codActividad } from "./curso/actividad.js";

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".cursosBody")) {
    codCursos();
  } else if (document.querySelector(".plataformas_body")) {
    codPlataformas();
  } else if (document.querySelector(".modulos_body")) {
    codModulos();
  } else if (document.querySelector(".leccionListado")) {
    codUnidad();
  } else if (document.querySelector(".actividadBody")) {
    codActividad();
  }
});
