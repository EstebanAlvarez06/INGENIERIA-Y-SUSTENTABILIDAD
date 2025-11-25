export function codModulos() {
  const curso = JSON.parse(sessionStorage.getItem("curso"));

  let plataformaSeleccionada = sessionStorage.getItem("plataformaSeleccionada");

  const modulos_body = document.querySelector(".modulos_body");
  const moduloListado = document.querySelector(".moduloListado");

  const bienvenida = document.getElementById("bienvenida");

  let mensaje = document.getElementById("plataformaSeleccionada");
  mensaje.innerText = plataformaSeleccionada;
  modulos_body.prepend(mensaje);

  const plataformaActual = curso.plataformas.find(
    (p) => p.nombre === plataformaSeleccionada
  );
  if (plataformaActual && plataformaActual.modulos.length > 0) {
    plataformaActual.modulos.forEach((modulo) => {
      let modulosDisponible = document.createElement("button");
      modulosDisponible.classList.add("modulosDisponible");
      modulosDisponible.innerText = modulo.modulo;
      moduloListado.appendChild(modulosDisponible);

      modulosDisponible.addEventListener("click", (e) => {
        let moduloSeleccionado = e.target.innerText;
        sessionStorage.setItem("moduloSeleccionado", moduloSeleccionado);
        sessionStorage.setItem(
          "plataformaActual",
          JSON.stringify(plataformaActual)
        );
        window.location.href = "unidad.html";
      });
    });
  } else {
    let advertencia = document.createElement("h1");
    advertencia.classList.add("advertencia");
    advertencia.innerText = `¡La plataforma ${plataformaSeleccionada}\nestará disponible proximamente!`;
    modulos_body.appendChild(advertencia);
    bienvenida.remove();
  }
  modulos_body.appendChild(moduloListado);
}
