import { codCursos } from "../js/curso/cursos.js";
import { codPlataformas } from "../js/curso/plataformas.js";
import { codModulos } from "../js/curso/modulos.js";
import { codUnidad } from "../js/curso/unidad.js";
import { codActividad } from "../js/curso/actividad.js";

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
