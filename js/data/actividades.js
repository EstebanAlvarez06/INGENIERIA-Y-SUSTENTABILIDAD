export const actividadesPlataforma = {
  lecciones: [
    {
      titulo: "Hola, Soy Tu Lienzo",
      actividades: [
        {
          trabajo: function iniciarTutorialZoom() {
            const style = document.createElement("style");
            style.textContent = `
  body {
    background: linear-gradient(135deg, #fff7eb, #fde6e0);
    font-family: "Poppins", sans-serif;
    color: #4b3f35;
  }
  #tutorial-overlay {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    display: none;
    background: rgba(255, 230, 210, 0.02);
    z-index: 1000;
  }
  #tutorial-message {
    position: fixed;
    top: 25%; left: 50%;
    transform: translate(-50%, -50%);
    background: #fff7f0;
    padding: 20px 28px;
    border-radius: 18px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    z-index: 1001;
    display: none;
    font-size: 18px;
    text-align: center;
    max-width: 420px;
    line-height: 1.4;
  }
  #zoom-area {
    position: relative;
    width: 420px;
    height: 260px;
    margin: 120px auto 40px auto;
    border-radius: 20px;
    border: 3px dashed #e3bfa5;
    background: #faf3eb url('https://picsum.photos/400/250') center/cover;
    transition: transform 0.3s ease;
    z-index: 900;
    box-shadow: 0 6px 14px rgba(0,0,0,0.07);
  }
  #zoom-control {
    position: fixed;
    bottom: 40px;
    right: 40px;
    z-index: 1001;
    display: flex;
    align-items: center;
    gap: 12px;
    background: #fff7eb;
    padding: 14px 20px;
    border-radius: 16px;
    box-shadow: 0 6px 16px rgba(0,0,0,0.1);
    border: 1px solid #f2d8c2;
  }
  #zoom-slider {
    width: 170px;
    accent-color: #f5a36d;
  }
  #zoom-value {
    font-size: 1.1rem;
    font-weight: 600;
  }
  .highlight-arrow {
    position: absolute;
    width: 40px; height: 40px;
    border: 3px solid #ffd59e;
    border-radius: 50%;
    animation: pulse 1s infinite alternate;
    z-index: 1002;
    top: 60%;
  }
  @keyframes pulse {
    0% { transform: scale(1); box-shadow: 0 0 8px #ffddb0; }
    100% { transform: scale(1.25); box-shadow: 0 0 18px #ffe2bd; }
  }
  .xp-feedback {
    position: absolute;
    color: #2e9655;
    font-weight: 700;
    font-size: 20px;
    animation: floatUp 1.5s ease-out forwards;
    z-index: 1003;
    text-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }
  @keyframes floatUp {
    0% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-50px); }
  }
        `;
            document.head.appendChild(style);

            const overlay = document.createElement("div");
            overlay.id = "tutorial-overlay";
            document.body.appendChild(overlay);
            const messageBox = document.createElement("div");
            messageBox.id = "tutorial-message";
            document.body.appendChild(messageBox);
            const zoomArea = document.createElement("div");
            zoomArea.id = "zoom-area";
            document.body.appendChild(zoomArea);

            const zoomControl = document.createElement("div");
            zoomControl.id = "zoom-control";
            zoomControl.innerHTML = `<input type="range" id="zoom-slider" min="50" max="200" value="100"><span id="zoom-value">100%</span>`;
            document.body.appendChild(zoomControl);

            const zoomSlider = document.getElementById("zoom-slider");
            const zoomValue = document.getElementById("zoom-value");

            const messages = [
              {
                text: "¡Bienvenido! Esto que ves es tu lienzo digital. Vamos a darle una revisada",
                action: null,
              },
              {
                text: "Esto controla tu 'vista'. Haz clic y arrastra el control deslizante hacia la derecha para acercarte.",
                action: "zoom-in",
              },
              {
                text: "¡Bien! Ahora puedes ver hasta el más mínimo detalle. ¡+10 XP!",
                action: null,
              },
              {
                text: "Ahora, arrástralo hacia la izquierda para alejarte y ver la página completa.",
                action: "zoom-out",
              },
              {
                text: "¡Perfecto! Ya dominas la perspectiva. +10 XP!",
                action: null,
              },
              {
                text: "Has completado tu primer paso. ¡Sigamos explorando!",
                action: null,
              },
            ];

            let step = 0;

            function showMessage(index) {
              messageBox.textContent = messages[index].text;
              overlay.style.display = "block";
              messageBox.style.display = "block";
              if (messages[index].action) {
                const rect = zoomControl.getBoundingClientRect();
                let arrow = document.createElement("div");
                arrow.classList.add("highlight-arrow");
                arrow.style.top = rect.top + rect.height / 2 - 20 + "px";
                arrow.style.left = rect.left + "px";
                arrow.id = "arrow-highlight";
                document.body.appendChild(arrow);
              }
            }

            function hideMessage() {
              overlay.style.display = "none";
              messageBox.style.display = "none";
              const oldArrow = document.getElementById("arrow-highlight");
              if (oldArrow) oldArrow.remove();
            }

            function showXP(x, y, text) {
              const xp = document.createElement("div");
              xp.classList.add("xp-feedback");
              xp.style.left = x + "px";
              xp.style.top = y + "px";
              xp.textContent = text;
              document.body.appendChild(xp);
              setTimeout(() => xp.remove(), 1500);
            }

            function nextStep() {
              hideMessage();
              step++;
              if (step < messages.length) {
                showMessage(step);
                if (messages[step].text.includes("+10 XP")) {
                  const rect = zoomControl.getBoundingClientRect();
                  showXP(rect.left, rect.top - 60, "+10 XP");
                }
                if (!messages[step].action) setTimeout(nextStep, 2500);
              }
            }

            zoomSlider.addEventListener("input", (e) => {
              const value = e.target.value;
              zoomValue.textContent = value + "%";
              zoomArea.style.transform = `scale(${value / 100})`;
              if (step === 1 && value > 100) nextStep();
              if (step === 3 && value < 100) nextStep();
            });

            const audio = new Audio(
              "https://www.soundjay.com/buttons/sounds/button-3.mp3"
            );
            zoomSlider.addEventListener("input", () => {
              if (
                (step === 2 && zoomSlider.value > 100) ||
                (step === 4 && zoomSlider.value < 100)
              )
                audio.play();
            });

            showMessage(0);
            setTimeout(nextStep, 3000);
          },
        },
      ],
    },
    {
      titulo: "La Caja De Herramientas",
      actividades: [
        {
          trabajo: function iniciarTutorialPestañas() {
            const audioUnlockBtn = document.createElement("button");
            audioUnlockBtn.textContent = "unlock";
            audioUnlockBtn.style.position = "fixed";
            audioUnlockBtn.style.opacity = 0;
            audioUnlockBtn.style.pointerEvents = "auto";
            audioUnlockBtn.style.zIndex = 99999;
            audioUnlockBtn.style.left = "0";
            audioUnlockBtn.style.top = "0";
            document.body.appendChild(audioUnlockBtn);

            let audioUnlocked = false;
            function unlockAllAudio() {
              if (audioUnlocked) return;
              audioUnlocked = true;
              const test = new Audio();
              test.src =
                "data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCA...";
              test.volume = 0;
              test.play().catch(() => {});
              audioUnlockBtn.remove();
            }
            audioUnlockBtn.addEventListener("click", unlockAllAudio);

            const style = document.createElement("style");
            style.textContent = `
body {background: linear-gradient(135deg, #fff7eb, #fde6e0); font-family: "Poppins", sans-serif; color: #4b3f35;}
#tutorial-overlay {background: rgba(255, 230, 210, 0.02);}
#tutorial-message {background: #fff7f0 !important; border: 2px solid #fbd9c4; color: #4b3f35; padding: 18px 25px; border-radius: 18px; box-shadow: 0 8px 22px rgba(0, 0, 0, 0.15); font-size: 18px;top:}
#ribbon {display: flex; justify-content: center; gap: 12px; margin-top: 180px;}
.tab-button {background: #fbe3c6; border: none !important; padding: 12px 24px; font-size: 16px; font-weight: 600; color: #4b3f35; border-radius: 14px; cursor: pointer; transition: 0.25s ease; box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); user-select: none;}
.tab-button:hover {background: #ffd8b8; transform: scale(1.05); box-shadow: 0 10px 26px rgba(0, 0, 0, 0.15);}
.tab-highlight {border: 3px solid #ffef9f !important; box-shadow: 0 0 16px #ffe680 !important; animation: blinkPastel 1s infinite alternate;}
@keyframes blinkPastel {0% {opacity: 1;} 100% {opacity: 0.5;}}
.xp-feedback {font-family: "Poppins", sans-serif; color: #53c653 !important; font-weight: 700; text-shadow: 0 0 6px rgba(0,255,0,0.25);}
#tutorial-completado {background: #fff7eb; padding: 20px 40px; border-radius: 16px; box-shadow: 0 8px 22px rgba(0, 0, 0, 0.15); border: 2px solid #ffe0c7; text-align: center; font-size: 20px; font-weight: 700; color: #4b3f35; font-family: "Poppins", sans-serif;}
        `;
            document.head.appendChild(style);

            const s_click = new Audio(
              "https://raw.githubusercontent.com/itsned/video-host/main/sounds/click.mp3"
            );
            const s_message = new Audio(
              "https://raw.githubusercontent.com/itsned/video-host/main/sounds/pop.mp3"
            );
            const s_xp = new Audio(
              "https://raw.githubusercontent.com/itsned/video-host/main/sounds/achievement.mp3"
            );
            const s_complete = new Audio(
              "https://raw.githubusercontent.com/itsned/video-host/main/sounds/complete.mp3"
            );

            const overlay = document.createElement("div");
            overlay.id = "tutorial-overlay";
            document.body.appendChild(overlay);

            const messageBox = document.createElement("div");
            messageBox.id = "tutorial-message";
            document.body.appendChild(messageBox);

            const ribbon = document.createElement("div");
            ribbon.id = "ribbon";
            const tabs = ["Inicio", "Insertar", "Diseño", "Revisar"];
            tabs.forEach((tabName) => {
              const btn = document.createElement("button");
              btn.className = "tab-button";
              btn.textContent = tabName;
              btn.id = `tab-${tabName}`;
              ribbon.appendChild(btn);
            });
            document.body.appendChild(ribbon);

            const steps = [
              {
                text: "🔧 <b>Insertar</b> es la pestaña donde puedes agregar imágenes, tablas, formas y más.<br><br>Haz clic en <b>Insertar</b>.",
                action: "Insertar",
                xp: 15,
              },
              {
                text: "🏠 <b>Inicio</b> contiene las herramientas básicas: fuente, color de texto, párrafos.<br><br>Haz clic en <b>Inicio</b>.",
                action: "Inicio",
                xp: 10,
              },
              {
                text: "🎨 <b>Diseño</b> controla la apariencia global del documento: colores, fuentes, temas y espaciado.<br><br>Haz clic en <b>Diseño</b>.",
                action: "Diseño",
                xp: 20,
              },
              {
                text: "🔍 <b>Revisar</b> es donde puedes ver la ortografía, agregar comentarios y controlar cambios.<br><br>Haz clic en <b>Revisar</b>.",
                action: "Revisar",
                xp: 15,
              },
              {
                text: "🎉 ¡Lección completada! Ya sabes moverte entre las pestañas esenciales de Word.",
                action: null,
                xp: 0,
              },
            ];

            let step = 0;

            function showMessage(text) {
              s_message.currentTime = 0;
              s_message.play();
              messageBox.innerHTML = text;
              overlay.style.display = "block";
              messageBox.style.display = "block";
            }

            function hideMessage() {
              overlay.style.display = "none";
              messageBox.style.display = "none";
            }

            function highlightTab(tabName) {
              const tab = document.getElementById(`tab-${tabName}`);
              if (tab) tab.classList.add("tab-highlight");
            }

            function removeHighlights() {
              tabs.forEach((tabName) => {
                const tab = document.getElementById(`tab-${tabName}`);
                if (tab) tab.classList.remove("tab-highlight");
              });
            }

            function showXP(x, y, text) {
              s_xp.currentTime = 0;
              s_xp.play();
              const xp = document.createElement("div");
              xp.className = "xp-feedback";
              xp.style.left = x + "px";
              xp.style.top = y + "px";
              xp.textContent = text;
              document.body.appendChild(xp);
              setTimeout(() => xp.remove(), 1500);
            }

            function nextStep() {
              removeHighlights();
              step++;
              if (step < steps.length) {
                showMessage(steps[step].text);
                if (steps[step].action) highlightTab(steps[step].action);
              } else {
                s_complete.play();
                hideMessage();
              }
            }

            tabs.forEach((tabName) => {
              const tab = document.getElementById(`tab-${tabName}`);
              tab.addEventListener("click", () => {
                if (step < steps.length && tabName === steps[step].action) {
                  s_click.currentTime = 0;
                  s_click.play();
                  const rect = tab.getBoundingClientRect();
                  showXP(rect.left, rect.top - 30, `+${steps[step].xp} XP`);
                  nextStep();
                }
              });
            });

            showMessage(steps[0].text);
            highlightTab(steps[0].action);
          },
        },
      ],
    },
    {
      titulo: "Tus Primeras Palabras",
      actividades: [
        {
          trabajo: function iniciarTutorialEscritura() {
            const style = document.createElement("style");
            style.textContent = `
body {background: linear-gradient(135deg, #fff7eb, #fde6e0); font-family: "Poppins", sans-serif; color: #4b3f35;}
#tutorial-overlay {position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000; background: rgba(255, 230, 210, 0.02); pointer-events: none;}
#tutorial-message {position: fixed; top: 60%; left: 50%; transform: translateX(-50%); background: #fff7f0; padding: 20px 25px; border-radius: 16px; box-shadow: 0 6px 16px rgba(0,0,0,0.15); font-family: 'Poppins', sans-serif; font-size: 17px; color: #4b3f35; text-align: center; animation: fadeIn 0.6s ease; z-index: 1001; max-width: 300px; border: 2px solid #ffe1c4;}
#texto-input {display: block; margin: 20px auto; font-size: 18px; padding: 12px 16px; width: 240px; border: 2px solid #f7c9a9; border-radius: 12px; outline: none; background: #fff4e8; color: #4b3f35; transition: 0.3s; box-shadow: inset 0 2px 6px rgba(0,0,0,0.06);}
#texto-input:focus {border-color: #ffb88a; box-shadow: 0 0 12px #ffb88a66; background: #fff1e2;}
#btn-inicio,#btn-diseño {background: #fbe3c6; color: #4b3f35; border: none; padding: 12px 20px; border-radius: 16px; cursor: pointer; font-size: 1.1rem; font-weight: 600; box-shadow: 0 6px 16px rgba(0,0,0,0.1); transition: background 0.3s, transform 0.2s, box-shadow 0.3s;}
#btn-inicio:hover,#btn-diseño:hover {background: #ffd8b8; transform: scale(1.06); box-shadow: 0 8px 20px rgba(0,0,0,0.15);}
.xp-feedback {position: absolute; color: #34d16e; font-weight: bold; font-size: 18px; animation: floatUp 1.5s ease-out forwards; z-index: 1002; text-shadow: 0 0 8px #00ff8855;}
@keyframes floatUp {0% {opacity: 1; transform: translateY(0);} 100% {opacity: 0; transform: translateY(-50px);}}
.confeti {position: absolute; width: 12px; height: 12px; background: red; animation: caer 2s linear forwards; z-index: 1003; border-radius: 30%; box-shadow: 0 0 6px rgba(0,0,0,0.2);}
@keyframes caer {0% {transform: translateY(-20px) rotate(0deg); opacity: 1;} 100% {transform: translateY(500px) rotate(360deg); opacity: 0;}}
@keyframes fadeIn {from {opacity: 0; transform: translate(-50%, 10px);} to {opacity: 1; transform: translate(-50%, 0);}}
        `;
            document.head.appendChild(style);

            const overlay = document.createElement("div");
            overlay.id = "tutorial-overlay";
            document.body.appendChild(overlay);

            const messageBox = document.createElement("div");
            messageBox.id = "tutorial-message";
            document.body.appendChild(messageBox);

            const input = document.createElement("input");
            input.type = "text";
            input.id = "texto-input";
            input.placeholder = "Escribe aquí...";
            document.body.appendChild(input);

            const botones = document.createElement("div");
            botones.innerHTML = `<button id="btn-inicio">Inicio</button><button id="btn-diseño">Diseño</button>`;
            botones.style.display = "flex";
            botones.style.justifyContent = "center";
            botones.style.gap = "15px";
            botones.style.marginTop = "20px";
            document.body.appendChild(botones);

            const popSound = new Audio(
              "https://www.soundjay.com/button/sounds/button-16.mp3"
            );

            const steps = [
              {
                text: "Usa tu teclado y escribe tu comida favorita.",
                action: "write",
              },
              { text: "¡Ya eres un autor! +15 XP", action: null },
              {
                text: "Pulsa Backspace para borrar la última letra.",
                action: "backspace",
              },
              { text: "¡Perfecto! +15 XP!", action: null },
              { text: "Haz clic en 'Diseño'.", action: "click-diseño", xp: 5 },
              {
                text: "Ahora, vuelve a 'Inicio'.",
                action: "click-inicio",
                xp: 5,
              },
              {
                text: "Escribe 'EXPLORADOR'.",
                action: "write-explorador",
                xp: 10,
              },
              {
                text: "Bórrala con Backspace.",
                action: "backspace-explorador",
                xp: 10,
              },
              { text: "¡Has completado el desafío! 🎉", action: "confeti" },
            ];

            let step = 0;

            function showMessage(text) {
              messageBox.innerText = text;
            }

            function showXP(x, y, text) {
              const xp = document.createElement("div");
              xp.className = "xp-feedback";
              xp.style.left = x + "px";
              xp.style.top = y + "px";
              xp.innerText = text;
              document.body.appendChild(xp);
              setTimeout(() => xp.remove(), 1500);
            }

            function showConfeti() {
              for (let i = 0; i < 50; i++) {
                const conf = document.createElement("div");
                conf.className = "confeti";
                conf.style.left = Math.random() * window.innerWidth + "px";
                conf.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
                document.body.appendChild(conf);
                setTimeout(() => conf.remove(), 2000);
              }
            }

            function nextStep() {
              step++;
              if (step >= steps.length) return;
              showMessage(steps[step].text);
              if (!steps[step].action) setTimeout(nextStep, 2500);
            }

            input.addEventListener("input", (e) => {
              if (steps[step].action === "write") {
                showXP(
                  input.getBoundingClientRect().left,
                  input.getBoundingClientRect().top - 30,
                  "+15 XP"
                );
                nextStep();
              }
              if (
                steps[step].action === "write-explorador" &&
                e.target.value.toUpperCase() === "EXPLORADOR"
              ) {
                showXP(
                  input.getBoundingClientRect().left,
                  input.getBoundingClientRect().top - 30,
                  "+10 XP"
                );
                nextStep();
              }
            });

            input.addEventListener("keydown", (e) => {
              if (steps[step].action === "backspace" && e.key === "Backspace") {
                popSound.play();
                showXP(
                  input.getBoundingClientRect().left,
                  input.getBoundingClientRect().top - 30,
                  "+1 XP"
                );
                nextStep();
              }
              if (
                steps[step].action === "backspace-explorador" &&
                e.key === "Backspace"
              ) {
                popSound.play();
                if (input.value.length === 0) {
                  showXP(
                    input.getBoundingClientRect().left,
                    input.getBoundingClientRect().top - 30,
                    "+10 XP"
                  );
                  nextStep();
                }
              }
            });

            document.addEventListener("click", (e) => {
              if (
                steps[step].action === "click-diseño" &&
                e.target.id === "btn-diseño"
              ) {
                showXP(e.clientX, e.clientY, "+5 XP");

                input.style.fontFamily = "'Courier New', monospace";
                input.style.fontWeight = "bold";
                input.style.fontStyle = "italic";
                input.style.color = "#b34700";

                nextStep();
              }

              if (
                steps[step].action === "click-inicio" &&
                e.target.id === "btn-inicio"
              ) {
                showXP(e.clientX, e.clientY, "+5 XP");

                input.style.fontFamily = "Poppins, sans-serif";
                input.style.fontWeight = "normal";
                input.style.fontStyle = "normal";
                input.style.color = "#4b3f35";

                nextStep();
              }
            });

            showMessage(steps[0].text);
            input.focus();

            const observer = new MutationObserver(() => {
              if (steps[step].action === "confeti") {
                showConfeti();
                observer.disconnect();
              }
            });
            observer.observe(messageBox, { childList: true });
          },
        },
      ],
    },
    {
      titulo: "El Ciclo De Edición",
      actividades: [
        {
          trabajo: function iniciarTutorialLista() {
            const style = document.createElement("style");
            style.textContent = `
body {background: linear-gradient(135deg, #fff7eb, #fde6e0); font-family: "Poppins", sans-serif; color: #4b3f35;}
#tutorial-overlay {position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(255,230,210,0.02); z-index:900; pointer-events:none;}
#tutorial-message {position: fixed; top:70%; left:50%; transform: translateX(-50%); background:#fff7f0; padding:22px 26px; border-radius:20px; color:#4b3f35; font-family:"Poppins",sans-serif; font-size:17px; text-align:center; box-shadow:0 8px 22px rgba(0,0,0,0.1); animation:fadeIn 0.6s ease; z-index:1001; max-width:390px;}
ul#lista-compra {list-style: disc; margin: 60px auto 20px; width: 230px; color:#4b3f35; font-family:"Poppins",sans-serif; font-size:19px; position:relative; cursor:pointer; z-index:1000; padding-left:25px;}
ul#lista-compra li {margin:10px 0; transition:0.2s;}
.highlight {background:#ffeecf; padding:4px 7px; border-radius:12px; transition:0.3s;}
.xp-feedback {position:absolute; color:#4b3f35; font-weight:700; font-size:18px; background:#fff5eb; padding:6px 12px; border-radius:12px; box-shadow:0 2px 12px rgba(0,0,0,0.1); animation:floatUp 1.6s ease-out forwards; z-index:1100;}
@keyframes floatUp {0%{opacity:1; transform:translateY(0);}100%{opacity:0; transform:translateY(-45px);}}
#ribbon-cinta {display:flex; justify-content:center; gap:14px; margin-top:25px; position:relative; z-index:1001;}
.btn-cinta {padding:10px 18px; border:none; border-radius:16px; font-size:15px; background:#fbe3c6; color:#4b3f35; font-family:"Poppins",sans-serif; cursor:pointer; box-shadow:0 6px 16px rgba(0,0,0,0.1); transition:0.25s ease, transform 0.2s ease;}
.btn-cinta:hover {background:#ffd8b8; transform:scale(1.05);}
.btn-cinta.active {background:#ffebc2; box-shadow:0 0 14px #ffd8b8; transform:scale(1.07);}
@keyframes fadeIn {from{opacity:0; transform:translate(-50%,12px);} to{opacity:1; transform:translate(-50%,0);}}
        `;
            document.head.appendChild(style);

            const overlay = document.createElement("div");
            overlay.id = "tutorial-overlay";
            document.body.appendChild(overlay);

            const messageBox = document.createElement("div");
            messageBox.id = "tutorial-message";
            document.body.appendChild(messageBox);

            const lista = document.createElement("ul");
            lista.id = "lista-compra";
            lista.innerHTML = `<li>Leche</li><li>Manzanas</li><li>Pan</li>`;
            document.body.appendChild(lista);

            const ribbon = document.createElement("div");
            ribbon.id = "ribbon-cinta";
            ribbon.innerHTML = `
<button id="btn-cortar" class="btn-cinta">✂ Cortar (Ctrl+X)</button>
<button id="btn-copiar" class="btn-cinta">📋 Copiar (Ctrl+C)</button>
<button id="btn-pegar" class="btn-cinta">📎 Pegar (Ctrl+V)</button>
`;
            document.body.appendChild(ribbon);

            const cortarBtn = document.getElementById("btn-cortar");
            const copiarBtn = document.getElementById("btn-copiar");
            const pegarBtn = document.getElementById("btn-pegar");
            const sonidoXP = new Audio(
              "https://www.soundjay.com/button/sounds/button-16.mp3"
            );

            const steps = [
              {
                text: "Esta lista está un poco desordenada. ¡Vamos a arreglarla sin tener que reescribir nada! Doble clic en la palabra 'Manzanas' para seleccionarla.",
                action: "select",
              },
              {
                text: "¡Perfecto! Ahora que la tienes 'agarrada', usa Ctrl + X (Cortar). La palabra desaparecerá, ¡no te asustes! La tienes guardada en tu portapapeles.",
                action: "cut",
              },
              {
                text: "Ahora haz clic al principio de la lista, antes de 'Leche'. Usa Ctrl + V (Pegar) para colocarla ahí.",
                action: "paste",
              },
              {
                text: "¡Impresionante! Has reorganizado la lista. Ahora, duplica 'Pan' con Ctrl + C (Copiar) y Ctrl + V (Pegar). ¡+30 XP por dominar el flujo!",
                action: "copy",
              },
              {
                text: "🎉 ¡Perfecto! Has completado la lección de copiar, cortar y pegar.",
                action: null,
              },
            ];

            let step = 0;
            let portapapeles = "";
            const items = lista.querySelectorAll("li");

            function showMessage(text) {
              messageBox.innerText = text;
            }
            function showXP(x, y, text) {
              const xp = document.createElement("div");
              xp.className = "xp-feedback";
              xp.style.left = x + "px";
              xp.style.top = y + "px";
              xp.innerText = text;
              document.body.appendChild(xp);
              setTimeout(() => xp.remove(), 1500);
            }
            function nextStep() {
              step++;
              if (step < steps.length) showMessage(steps[step].text);
            }

            items.forEach((li) => {
              li.addEventListener("dblclick", () => {
                if (
                  steps[step].action === "select" &&
                  li.textContent === "Manzanas"
                ) {
                  li.classList.add("highlight");
                  showXP(
                    li.getBoundingClientRect().x,
                    li.getBoundingClientRect().y - 30,
                    "+10 XP"
                  );
                  sonidoXP.play();
                  nextStep();
                }
              });
            });

            cortarBtn.addEventListener("click", () => {
              const selected = document.querySelector(".highlight");
              if (steps[step].action === "cut" && selected) {
                portapapeles = selected.textContent;
                selected.remove();
                cortarBtn.classList.add("active");
                showXP(
                  cortarBtn.getBoundingClientRect().x,
                  cortarBtn.getBoundingClientRect().y - 20,
                  "+10 XP"
                );
                sonidoXP.play();
                setTimeout(() => cortarBtn.classList.remove("active"), 1500);
                nextStep();
              }
            });

            copiarBtn.addEventListener("click", () => {
              if (steps[step].action === "copy") {
                const panLi = Array.from(lista.querySelectorAll("li")).find(
                  (li) => li.textContent.trim() === "Pan"
                );
                if (panLi) {
                  portapapeles = panLi.textContent;
                  copiarBtn.classList.add("active");
                  showXP(
                    copiarBtn.getBoundingClientRect().x,
                    copiarBtn.getBoundingClientRect().y - 20,
                    "+10 XP"
                  );
                  sonidoXP.play();
                  setTimeout(() => copiarBtn.classList.remove("active"), 1500);
                }
              }
            });

            pegarBtn.addEventListener("click", () => {
              if (!portapapeles) return;
              if (steps[step].action === "paste") {
                const nuevo = document.createElement("li");
                nuevo.textContent = portapapeles;
                lista.insertBefore(nuevo, lista.firstChild);
                pegarBtn.classList.add("active");
                showXP(
                  pegarBtn.getBoundingClientRect().x,
                  pegarBtn.getBoundingClientRect().y - 20,
                  "+15 XP"
                );
                sonidoXP.play();
                setTimeout(() => pegarBtn.classList.remove("active"), 1500);
                nextStep();
              } else if (steps[step].action === "copy") {
                const nuevo = document.createElement("li");
                nuevo.textContent = portapapeles;
                lista.appendChild(nuevo);
                pegarBtn.classList.add("active");
                showXP(
                  pegarBtn.getBoundingClientRect().x,
                  pegarBtn.getBoundingClientRect().y - 20,
                  "+20 XP"
                );
                sonidoXP.play();
                setTimeout(() => pegarBtn.classList.remove("active"), 1500);
                nextStep();
              }
            });

            showMessage(steps[0].text);
          },
        },
      ],
    },
    {
      titulo: "Borrón",
      actividades: [
        {
          trabajo: function iniciarTutorialDeshacer() {
            const style = document.createElement("style");
            style.textContent = `
body {background: linear-gradient(135deg,#fff7eb,#fde6e0); font-family:"Poppins",sans-serif; color:#4b3f35;}
#tutorial-overlay {position: fixed; top:0; left:0; width:100%; height:100%; background:rgba(255,230,210,0.02); pointer-events:none; z-index:900;}
#tutorial-message {position:fixed; top:60%; left:50%; transform:translateX(-50%); background:#fff7f0; padding:22px 26px; border-radius:20px; color:#4b3f35; font-size:17px; text-align:center; box-shadow:0 8px 22px rgba(0,0,0,0.1); animation:fadeIn 0.6s ease; max-width:380px; z-index:1001;}
#editor-area {margin:100px auto; width:480px; min-height:80px; border-radius:12px; border:2px dashed #d3b8a0; padding:20px; font-size:18px; color:#4b3f35; background:#fff5eb; box-shadow:0 6px 14px rgba(0,0,0,0.06);}
#toolbar {display:flex; justify-content:center; align-items:center; gap:15px; margin-top:25px; z-index:1000;}
.tool-btn {padding:10px 18px; border:none; background:#fbe3c6; color:#4b3f35; border-radius:14px; font-size:16px; cursor:pointer; box-shadow:0 6px 16px rgba(0,0,0,0.1); transition:0.25s ease, transform 0.2s ease;}
.tool-btn:hover {background:#ffd8b8; transform:scale(1.05);}
.tool-btn.highlight,.tool-btn.redo {background:#ffebc2 !important; box-shadow:0 0 14px #ffd8b8; transform:scale(1.07);}
.xp-feedback {position:absolute; color:#4b3f35; font-weight:700; font-size:18px; background:#fff5eb; padding:6px 12px; border-radius:12px; box-shadow:0 2px 12px rgba(0,0,0,0.1); animation:floatUp 1.6s ease-out forwards; z-index:1100;}
@keyframes floatUp {0%{opacity:1;transform:translateY(0);}100%{opacity:0;transform:translateY(-45px);}}
@keyframes fadeIn {from{opacity:0; transform:translate(-50%,12px);} to{opacity:1; transform:translate(-50%,0);}}
        `;
            document.head.appendChild(style);

            const overlay = document.createElement("div");
            overlay.id = "tutorial-overlay";
            document.body.appendChild(overlay);

            const messageBox = document.createElement("div");
            messageBox.id = "tutorial-message";
            document.body.appendChild(messageBox);

            const editor = document.createElement("div");
            editor.id = "editor-area";
            editor.contentEditable = true;
            editor.innerText =
              "“El secreto de la creatividad es saber cómo esconder tus fuentes.”";
            document.body.appendChild(editor);

            const toolbar = document.createElement("div");
            toolbar.id = "toolbar";
            toolbar.innerHTML = `
<button id="btn-undo" class="tool-btn">↩ Deshacer</button>
<button id="btn-redo" class="tool-btn">↪ Rehacer</button>
`;
            document.body.appendChild(toolbar);

            const undoBtn = document.getElementById("btn-undo");
            const redoBtn = document.getElementById("btn-redo");

            const sonidoError = new Audio(
              "https://www.soundjay.com/button/sounds/button-10.mp3"
            );
            const sonidoRevelacion = new Audio(
              "https://www.soundjay.com/misc/sounds/magic-chime-01.mp3"
            );

            const steps = [
              {
                text: "“El secreto de la creatividad es saber cómo esconder tus fuentes.”",
                action: "intro",
              },
              {
                text: "Selecciona toda la frase y bórrala. ¡Hazlo ahora! Pulsa Supr.",
                action: "delete",
              },
              {
                text: "¡No te preocupes! Tienes un superpoder: Ctrl + Z",
                action: "undo-hint",
              },
              { text: "Pulsa Ctrl + Z para deshacer.", action: "undo" },
              {
                text: "¡Salvado! +20 XP. Ahora, Ctrl + Y para rehacer. +15 XP",
                action: "redo",
              },
            ];

            let step = 0;
            let history = [editor.innerText];
            let redoStack = [];

            function showMessage(text) {
              messageBox.innerText = text;
            }
            function showXP(x, y, text) {
              const xp = document.createElement("div");
              xp.className = "xp-feedback";
              xp.style.left = x + "px";
              xp.style.top = y + "px";
              xp.innerText = text;
              document.body.appendChild(xp);
              setTimeout(() => xp.remove(), 1500);
            }
            function nextStep() {
              step++;
              if (step < steps.length) {
                showMessage(steps[step].text);
                if (steps[step].action === "undo-hint")
                  undoBtn.classList.add("highlight");
                if (steps[step].action === "redo")
                  redoBtn.classList.add("redo");
              }
            }

            editor.addEventListener("input", () => {
              if (step === 1 && editor.innerText.trim() === "") {
                sonidoError.play();
                nextStep();
                setTimeout(() => nextStep(), 2500);
              }
              history.push(editor.innerText);
              redoStack = [];
            });

            document.addEventListener("keydown", (e) => {
              if (e.ctrlKey && e.key.toLowerCase() === "z") {
                e.preventDefault();
                if (history.length > 1) {
                  redoStack.push(history.pop());
                  editor.innerText = history[history.length - 1];
                  if (step === 3) {
                    sonidoRevelacion.play();
                    showXP(
                      undoBtn.getBoundingClientRect().x,
                      undoBtn.getBoundingClientRect().y - 30,
                      "+20 XP"
                    );
                    undoBtn.classList.remove("highlight");
                    nextStep();
                  }
                }
              }

              if (e.ctrlKey && e.key.toLowerCase() === "y") {
                e.preventDefault();
                if (redoStack.length > 0) {
                  const redoContent = redoStack.pop();
                  editor.innerText = redoContent;
                  history.push(redoContent);
                  if (step === 4) {
                    showXP(
                      redoBtn.getBoundingClientRect().x,
                      redoBtn.getBoundingClientRect().y - 30,
                      "+15 XP"
                    );

                    setTimeout(() => {
                      showMessage(
                        "🎉 ¡Tutorial completado! Has dominado Deshacer y Rehacer."
                      );
                    }, 500);
                  }
                }
              }
            });

            showMessage(steps[0].text);
            setTimeout(() => nextStep(), 3000);
          },
        },
      ],
    },
    {
      titulo: "Y Cuenta Nueva",
      actividades: [
        {
          trabajo: function iniciarTutorialFormatoTexto() {
            const prevOverlay = document.getElementById("tutorial-overlay");
            const prevMessage = document.getElementById("tutorial-message");
            const prevEditor = document.getElementById("editor-area");
            const prevToolbar = document.getElementById("toolbar");
            document
              .querySelectorAll("style[data-tutorial]")
              .forEach((s) => s.remove());
            if (prevOverlay) prevOverlay.remove();
            if (prevMessage) prevMessage.remove();
            if (prevEditor) prevEditor.remove();
            if (prevToolbar) prevToolbar.remove();

            const style = document.createElement("style");
            style.dataset.tutorial = "true";
            style.textContent = `
body {
  background: linear-gradient(135deg, #fff7eb, #fde6e0);
  font-family: "Poppins", sans-serif;
  color: #4b3f35;
}
#tutorial-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(255, 230, 210, 0.03);
  z-index: 900;
  pointer-events: none;
}
#tutorial-message {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff7f0;
  padding: 22px 26px;
  border-radius: 20px;
  color: #4b3f35;
  font-size: 17px;
  text-align: center;
  box-shadow: 0 8px 22px rgba(0,0,0,0.12);
  animation: fadeIn 0.6s ease;
  z-index: 1001;
  max-width: 420px;
}
#editor-area {
  margin: 80px auto;
  width: 500px;
  min-height: 120px;
  border: 2px dashed #c8a58a;
  border-radius: 14px;
  padding: 20px;
  background: #fffaf6;
  font-size: 18px;
  color: #4b3f35;
  font-family: "Poppins", sans-serif;
  box-shadow: 0 4px 18px rgba(0,0,0,0.08);
}
#toolbar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
  margin-top: 20px;
  z-index: 1002;
}
.tool-btn {
  padding: 10px 16px;
  border: none;
  border-radius: 16px;
  font-size: 15px;
  background: #fbe3c6;
  color: #4b3f35;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
  transition: 0.25s ease, transform 0.2s ease;
}
.tool-btn:hover {
  background: #ffd8b8;
  transform: scale(1.06);
}
.tool-btn.highlight {
  background: #ffebc2;
  box-shadow: 0 0 12px #ffd8b8;
  transform: scale(1.08);
}
.xp-feedback {
  position: absolute;
  color: #4b3f35;
  font-weight: 700;
  font-size: 18px;
  background: #fff5eb;
  padding: 6px 12px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  animation: floatUp 1.6s ease-out forwards;
  z-index: 1100;
}
@keyframes floatUp {
  0% {opacity: 1; transform: translateY(0);}
  100% {opacity: 0; transform: translateY(-45px);}
}
.confetti {
  position: fixed;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: confetti 3s ease-out forwards;
}
@keyframes confetti {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(200px) rotate(720deg); opacity: 0; }
}
@keyframes fadeIn {
  from {opacity: 0; transform: translate(-50%, 12px);}
  to {opacity: 1; transform: translate(-50%, 0);}
}
`;
            document.head.appendChild(style);

            const overlay = document.createElement("div");
            overlay.id = "tutorial-overlay";
            document.body.appendChild(overlay);

            const messageBox = document.createElement("div");
            messageBox.id = "tutorial-message";
            document.body.appendChild(messageBox);

            const editor = document.createElement("div");
            editor.id = "editor-area";
            editor.contentEditable = true;
            editor.innerHTML = "ATENCIÓN: La reunión es a las 5 PM en punto.";
            document.body.appendChild(editor);

            const toolbar = document.createElement("div");
            toolbar.id = "toolbar";
            toolbar.innerHTML = `
      <button id="btn-bold" class="tool-btn"><b>N</b></button>
      <button id="btn-italic" class="tool-btn"><i>K</i></button>
      <button id="btn-sizeup" class="tool-btn">A+</button>
      <button id="btn-sizedown" class="tool-btn">A-</button>
    `;
            document.body.appendChild(toolbar);

            const sonidoXP = new Audio(
              "https://www.soundjay.com/button/sounds/button-30.mp3"
            );
            const sonidoExito = new Audio(
              "https://www.soundjay.com/misc/sounds/magic-chime-02.mp3"
            );

            let autoAdvanceTimeout = null;
            let fontSize = 18;
            let step = 0;

            const steps = [
              {
                text: "ATENCIÓN: La reunión es a las 5 PM en punto.",
                action: "intro",
              },
              {
                text: "Selecciona la palabra 'ATENCIÓN' y haz clic en la 'N' (Negrita).",
                action: "bold",
              },
              { text: "¡Perfecto! +15 XP", action: "bold-feedback" },
              {
                text: "Ahora selecciona '5 PM en punto' y haz clic en la 'K' (Cursiva).",
                action: "italic",
              },
              { text: "¡Muy bien! +10 XP", action: "italic-feedback" },
              {
                text: "Selecciona toda la frase y usa A+ o A- para ajustar el tamaño.",
                action: "size",
              },
              { text: "¡Excelente! +20 XP", action: "size-feedback" },
              {
                text: "Desafío Final: Crea una nota de 'Fuera de la Oficina'.",
                action: "desafio",
              },
            ];

            function showMessage(t) {
              messageBox.innerText = t;
            }
            function showXP(x, y, text) {
              const xp = document.createElement("div");
              xp.className = "xp-feedback";
              xp.style.left = x + "px";
              xp.style.top = y + "px";
              xp.innerText = text;
              document.body.appendChild(xp);
              setTimeout(() => xp.remove(), 1500);
            }
            function lanzarConfeti() {
              for (let i = 0; i < 40; i++) {
                const c = document.createElement("div");
                c.className = "confetti";
                c.style.background = `hsl(${Math.random() * 360},100%,60%)`;
                c.style.left = Math.random() * window.innerWidth + "px";
                c.style.top = "-20px";
                c.style.animationDelay = Math.random() * 1 + "s";
                document.body.appendChild(c);
                setTimeout(() => c.remove(), 3000);
              }
            }
            function nextStep() {
              clearTimeout(autoAdvanceTimeout);
              if (step >= steps.length - 1) return;
              step++;
              const current = steps[step];
              showMessage(current.text);
              [boldBtn, italicBtn, upBtn, downBtn].forEach((b) =>
                b.classList.remove("highlight")
              );
              if (current.action === "bold") boldBtn.classList.add("highlight");
              if (current.action === "italic")
                italicBtn.classList.add("highlight");
              if (current.action === "size") {
                upBtn.classList.add("highlight");
                downBtn.classList.add("highlight");
              }
              if (current.action.endsWith("-feedback"))
                autoAdvanceTimeout = setTimeout(nextStep, 2000);
              if (current.action === "desafio")
                autoAdvanceTimeout = setTimeout(iniciarDesafio, 2500);
            }

            const boldBtn = document.getElementById("btn-bold");
            const italicBtn = document.getElementById("btn-italic");
            const upBtn = document.getElementById("btn-sizeup");
            const downBtn = document.getElementById("btn-sizedown");

            boldBtn.addEventListener("click", () => {
              if (steps[step].action !== "bold") return;
              document.execCommand("bold");
              sonidoXP.play();
              showXP(boldBtn.offsetLeft, boldBtn.offsetTop - 30, "+15 XP");
              nextStep();
            });
            italicBtn.addEventListener("click", () => {
              if (steps[step].action !== "italic") return;
              document.execCommand("italic");
              sonidoXP.play();
              showXP(italicBtn.offsetLeft, italicBtn.offsetTop - 30, "+10 XP");
              nextStep();
            });
            upBtn.addEventListener("click", () => {
              if (steps[step].action !== "size") return;
              fontSize += 2;
              editor.style.fontSize = fontSize + "px";
              sonidoXP.play();
              showXP(upBtn.offsetLeft, upBtn.offsetTop - 30, "+20 XP");
              nextStep();
            });
            downBtn.addEventListener("click", () => {
              if (steps[step].action !== "size") return;
              fontSize -= 2;
              editor.style.fontSize = fontSize + "px";
            });

            showMessage(steps[0].text);
            autoAdvanceTimeout = setTimeout(nextStep, 2500);

            function iniciarDesafio() {
              toolbar.innerHTML = `
      <button id="btn-bold" class="tool-btn"><b>N</b></button>
      <button id="btn-center" class="tool-btn">↔</button>
      <button id="btn-bullet" class="tool-btn">• Lista</button>
    `;
              editor.innerHTML = "";
              editor.style.fontSize = "18px";
              const boldBtn2 = document.getElementById("btn-bold");
              const centerBtn = document.getElementById("btn-center");
              const bulletBtn = document.getElementById("btn-bullet");
              boldBtn2.onclick = () => document.execCommand("bold");
              centerBtn.onclick = () => document.execCommand("justifyCenter");
              bulletBtn.onclick = () =>
                document.execCommand("insertUnorderedList");
              showMessage(
                "Desafío Final: título en negrita y centrado (fuera de la oficina), párrafo de ausencia (estaré fuera de la oficina), y lista con nombres (Ana y Carlos)."
              );
              function evaluarNota() {
                const texto = editor.innerText.toLowerCase();
                const centrado = [...editor.children].some(
                  (el) =>
                    getComputedStyle(el).textAlign === "center" ||
                    el.getAttribute("align") === "center"
                );
                const condiciones = [
                  texto.includes("fuera de la oficina"),
                  texto.includes("estaré"),
                  texto.includes("ana"),
                  texto.includes("carlos"),
                  editor.querySelector("ul, ol") !== null,
                  editor.querySelector("b, strong") !== null,
                  centrado,
                ];
                if (condiciones.every(Boolean)) {
                  sonidoExito.play();
                  lanzarConfeti();
                  showMessage(
                    "🎉 ¡Desafío completado! Documento impecable. 🏅"
                  );
                }
              }
              setInterval(evaluarNota, 1000);
            }
          },
        },
      ],
    },
    {
      titulo: "Organizando Ideas (Listas Multinivel)",
      actividades: [
        {
          trabajo: function iniciarTutorialListas() {
            const style = document.createElement("style");
            style.textContent = `
body {
  background: linear-gradient(135deg, #fff7eb, #fde6e0);
  font-family: "Poppins", sans-serif;
  color: #4b3f35;
}
#tutorial-overlay {
  position: fixed;
  top: 0; 
  left: 0;
  width: 100%; 
  height: 100%;
  display: none;
  z-index: 1000;
  pointer-events: none;
}
#tutorial-message {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff7f0;
  padding: 18px 28px;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  display: none;
  font-family: "Poppins", sans-serif;
  font-size: 17px;
  text-align: center;
  color: #4b3f35;
  z-index: 1001;
  border: 1px solid #f5d5b8;
}
#lista-ejemplo {
  width: 340px;
  margin: 100px auto;
  padding: 18px;
  border: 2px dashed #c7a48e;
  background: #fffaf5;
  border-radius: 14px;
  font-family: "Poppins", sans-serif;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
ul {
  list-style-type: disc;
  color: #4b3f35;
  font-size: 17px;
}
ul ul {
  list-style-type: circle;
  margin-left: 25px;
  color: #6b5c50;
}
.xp-feedback {
  position: absolute;
  color: #00aa55;
  font-weight: 700;
  font-size: 19px;
  animation: floatUp 1.5s ease-out forwards;
  z-index: 1100;
  text-shadow: 0 0 6px rgba(0,255,100,0.5);
}
@keyframes floatUp {
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-50px); }
}
`;
            document.head.appendChild(style);

            const overlay = document.createElement("div");
            overlay.id = "tutorial-overlay";
            document.body.appendChild(overlay);

            const messageBox = document.createElement("div");
            messageBox.id = "tutorial-message";
            document.body.appendChild(messageBox);

            const lista = document.createElement("div");
            lista.id = "lista-ejemplo";
            lista.innerHTML = `
<ul id="lista-viaje" contenteditable="true">
  <li>Ropa</li>
  <li>Artículos de aseo</li>
  <li>Documentos</li>
</ul>
<p><em>Haz clic después de "Ropa" y presiona Enter.</em></p>
`;
            document.body.appendChild(lista);

            const mensajes = [
              {
                texto:
                  "Haz clic después de 'Ropa' y presiona Enter para crear una nueva línea.",
                accion: "crear-subitem",
              },
              {
                texto:
                  "Presiona Tab para indentar la nueva línea. ¡Observa lo que pasa!",
                accion: "indentar",
              },
              {
                texto:
                  "¡Exacto! Escribe 'Camisetas' ó 'Pantalones' en la sublista, luego presiona Enter +20 XP 🎉",
                accion: "escribir",
              },
              {
                texto:
                  "Practica ahora bajo 'Artículos de aseo' con 'Cepillo de dientes' y 'Pasta dental', nuevamente presiona Enter. +15 XP 🧠",
                accion: "practica",
              },
              {
                texto: "¡Bien hecho! Pasemos a la siguiente actividad.",
                accion: "mostrar",
              },
            ];

            let paso = 0;
            let primerIndentDetectado = false;

            function mostrarMensaje(index) {
              messageBox.textContent = mensajes[index].texto;
              overlay.style.display = "block";
              messageBox.style.display = "block";
            }

            function ocultarMensaje() {
              overlay.style.display = "none";
              messageBox.style.display = "none";
            }

            function mostrarXP(x, y, texto) {
              const xp = document.createElement("div");
              xp.classList.add("xp-feedback");
              xp.textContent = texto;
              xp.style.left = x + "px";
              xp.style.top = y + "px";
              document.body.appendChild(xp);
              setTimeout(() => xp.remove(), 1500);
            }

            function siguientePaso() {
              ocultarMensaje();
              paso++;
              if (paso < mensajes.length) mostrarMensaje(paso);
            }

            mostrarMensaje(0);

            const editor = document.getElementById("lista-viaje");

            editor.addEventListener("keydown", (e) => {
              const texto = editor.innerText.toLowerCase();

              if (paso === 0 && e.key === "Enter") {
                setTimeout(() => {
                  const liCount = editor.querySelectorAll("li").length;
                  if (liCount > 3) siguientePaso();
                }, 100);
              }

              if (e.key === "Tab" && !e.shiftKey) {
                e.preventDefault();
                const seleccion = window.getSelection();
                const rango = seleccion.getRangeAt(0);
                const liActual = rango.startContainer.closest("li");
                if (liActual) {
                  const anterior = liActual.previousElementSibling;
                  if (anterior) {
                    let sublista = anterior.querySelector("ul");
                    if (!sublista) sublista = document.createElement("ul");
                    anterior.appendChild(sublista);
                    sublista.appendChild(liActual);
                    mostrarXP(
                      lista.offsetLeft + 100,
                      lista.offsetTop - 20,
                      "+10 XP"
                    );
                  }
                  if (!primerIndentDetectado) {
                    primerIndentDetectado = true;
                    if (paso === 1) siguientePaso();
                  }
                }
              }

              if (
                paso === 2 &&
                (texto.includes("camisetas") || texto.includes("pantalones"))
              ) {
                mostrarXP(
                  lista.offsetLeft + 100,
                  lista.offsetTop - 20,
                  "+20 XP"
                );
                siguientePaso();
              }

              if (
                paso === 3 &&
                (texto.includes("cepillo de dientes") ||
                  texto.includes("pasta dental"))
              ) {
                mostrarMensaje(4);
                mostrarXP(window.innerWidth / 2, 200, "+15 XP");
              }
            });
          },
        },
      ],
    },
    {
      titulo: "La Cuadricula Perfecta (Introduccion A Tablas)",
      actividades: [
        {
          trabajo: function iniciarTutorialTablas() {
            const style = document.createElement("style");
            style.textContent = `
body {
  background: linear-gradient(135deg, #fff7eb, #fde6e0);
  font-family: "Poppins", sans-serif;
  color: #4b3f35;
}
#tutorial-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  display: none;
  z-index: 900;
  pointer-events: none;
}
#tutorial-message {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff7f0;
  padding: 18px 28px;
  border-radius: 14px;
  border: 1px solid #f5d5b8;
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
  display: none;
  font-family: "Poppins", sans-serif;
  font-size: 17px;
  text-align: center;
  color: #4b3f35;
  z-index: 901;
}
#boton-tabla {
  position: relative;
  background: #fff7f0;
  color: black;
  padding: 12px 26px;
  border-radius: 12px;
  border: none;
  font-size: 17px;
  cursor: pointer;
  margin: 70px auto;
  display: block;
  font-family: "Poppins", sans-serif;
  box-shadow: 0 3px 10px rgba(0,0,0,0.12);
  transition: transform 0.2s;
}
#boton-tabla:hover {
  transform: scale(1.03);
}
#boton-tabla.highlight {
  box-shadow: 0 0 18px 6px rgba(214, 181, 123, 0.9);
}
#cuadricula {
  display: grid;
  grid-template-columns: repeat(5, 32px);
  grid-template-rows: repeat(5, 32px);
  gap: 4px;
  margin-top: 10px;
  justify-content: center;
  display: none;
}
.celda {
  border: 2px solid #d7c5b8;
  width: 32px;
  height: 32px;
  cursor: pointer;
  border-radius: 6px;
  background: #fffaf5;
  transition: background 0.15s;
}
.celda.seleccionada {
  background: rgba(120, 180, 255, 0.45);
}
.tabla-creada {
  border-collapse: collapse;
  margin: 30px auto;
  font-family: "Poppins", sans-serif;
}
.tabla-creada td, .tabla-creada th {
  border: 1px solid #c7a48e;
  padding: 10px 16px;
  text-align: center;
  background: #fffdf9;
  font-size: 16px;
}
.xp-feedback {
  position: absolute;
  color: #00aa55;
  font-weight: 700;
  font-size: 19px;
  animation: floatUp 1.5s ease-out forwards;
  z-index: 1100;
  text-shadow: 0 0 6px rgba(0,255,100,0.5);
}
@keyframes floatUp {
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-50px); }
}
`;
            document.head.appendChild(style);

            const overlay = document.createElement("div");
            overlay.id = "tutorial-overlay";
            document.body.appendChild(overlay);

            const messageBox = document.createElement("div");
            messageBox.id = "tutorial-message";
            document.body.appendChild(messageBox);

            const boton = document.createElement("button");
            boton.id = "boton-tabla";
            boton.textContent = "Tabla";
            document.body.appendChild(boton);

            const cuadricula = document.createElement("div");
            cuadricula.id = "cuadricula";
            for (let i = 0; i < 25; i++) {
              const celda = document.createElement("div");
              celda.classList.add("celda");
              cuadricula.appendChild(celda);
            }
            document.body.appendChild(cuadricula);

            const mensajes = [
              {
                texto:
                  "A veces, las listas no son suficientes. ¡Es hora de las tablas! Ve a la pestaña 'Insertar' y haz clic en el botón 'Tabla'.",
                accion: "mostrar-boton",
              },
              {
                texto:
                  "Mueve tu ratón sobre la cuadrícula para seleccionar 3 columnas y 3 filas. Haz clic cuando lo tengas.",
                accion: "seleccionar-cuadricula",
              },
              {
                texto:
                  "¡Ahí la tienes! Una cuadrícula perfecta. +20 XP. Ahora escribe en la primera fila: 'Actividad', 'Día' y 'Hora'.",
                accion: "llenar-encabezados",
              },
              {
                texto:
                  "¡Excelente! Rellena una o dos filas más con tus propias actividades. Puedes moverte entre celdas con las flechas o clics. +15 XP",
                accion: "completar-tabla",
              },
            ];

            let paso = 0;
            let tabla = null;

            function mostrarMensaje(i) {
              messageBox.textContent = mensajes[i].texto;
              overlay.style.display = "block";
              messageBox.style.display = "block";
            }

            function ocultarMensaje() {
              overlay.style.display = "none";
              messageBox.style.display = "none";
            }

            function mostrarXP(x, y, texto) {
              const xp = document.createElement("div");
              xp.classList.add("xp-feedback");
              xp.textContent = texto;
              xp.style.left = x + "px";
              xp.style.top = y + "px";
              document.body.appendChild(xp);
              setTimeout(() => xp.remove(), 1500);
            }

            function siguientePaso() {
              ocultarMensaje();
              paso++;
              if (paso < mensajes.length) mostrarMensaje(paso);
            }

            mostrarMensaje(0);
            boton.classList.add("highlight");

            boton.addEventListener("click", () => {
              if (paso === 0) {
                siguientePaso();
                cuadricula.style.display = "grid";
                boton.classList.remove("highlight");
              }
            });

            const celdas = cuadricula.querySelectorAll(".celda");
            celdas.forEach((celda, index) => {
              celda.addEventListener("mouseenter", () => {
                const fila = Math.floor(index / 5);
                const col = index % 5;
                celdas.forEach((c, i) => {
                  const f = Math.floor(i / 5);
                  const cIndex = i % 5;
                  c.classList.toggle(
                    "seleccionada",
                    f <= fila && cIndex <= col
                  );
                });
              });

              celda.addEventListener("click", () => {
                const fila = Math.floor(index / 5) + 1;
                const col = (index % 5) + 1;
                if (fila === 3 && col === 3 && paso === 1) {
                  cuadricula.style.display = "none";
                  tabla = document.createElement("table");
                  tabla.classList.add("tabla-creada");
                  for (let i = 0; i < 3; i++) {
                    const tr = document.createElement("tr");
                    for (let j = 0; j < 3; j++) {
                      const td = document.createElement("td");
                      td.contentEditable = "true";
                      tr.appendChild(td);
                    }
                    tabla.appendChild(tr);
                  }
                  document.body.appendChild(tabla);
                  mostrarXP(window.innerWidth / 2, 150, "+20 XP");
                  siguientePaso();
                }
              });
            });

            document.addEventListener("input", () => {
              if (!tabla) return;
              const texto = tabla.innerText.toLowerCase();

              if (
                paso === 2 &&
                texto.includes("actividad") &&
                texto.includes("día") &&
                texto.includes("hora")
              ) {
                mostrarXP(window.innerWidth / 2, 180, "+20 XP");
                siguientePaso();
              }

              if (paso === 3 && texto.split("\n").length > 4) {
                mostrarXP(window.innerWidth / 2, 180, "+15 XP");
              }
            });
          },
        },
      ],
    },
    {
      titulo: "Ponle Algo De Estilo",
      actividades: [
        {
          trabajo: function iniciarTutorialDisenoTablas() {
            const style = document.createElement("style");
            style.textContent = `
body {
  background: linear-gradient(135deg, #fff7eb, #fde6e0);
  font-family: "Poppins", sans-serif;
  color: #4b3f35;
}
#tutorial-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  display: none;
  z-index: 900;
  pointer-events: none;
}
#tutorial-message {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff7f0;
  padding: 18px 28px;
  border-radius: 14px;
  border: 1px solid #f5d5b8;
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);
  display: none;
  font-family: "Poppins", sans-serif;
  font-size: 17px;
  text-align: center;
  color: #4b3f35;
  z-index: 901;
}
#cinta {
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 80%;
  border-radius: 50%;
  background: #fff3ea;
  border-bottom: 1px solid #e4cbb8;
  padding: 12px 0;
  font-family: "Poppins", sans-serif;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.boton-cinta {
  padding: 10px 18px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.25s;
  font-size: 16px;
  color: #4b3f35;
  background: #f9e6d8ff;
  border: 1px solid #dfd6d0ff;
}
.boton-cinta:hover { background: #ffe9d9; }
.boton-cinta.activo {
  background: #7fb9ff;
  color: white;
  border-color: #7fb9ff;
  box-shadow: 0 0 12px rgba(120, 170, 255, 0.8);
}
#tabla-ejemplo {
  border-collapse: collapse;
  margin: 60px auto;
  font-family: "Poppins", sans-serif;
  background: #fffdf9;
  border-radius: 10px;
  overflow: hidden;
}
#tabla-ejemplo td, #tabla-ejemplo th {
  border: 1px solid #d8b9a4;
  padding: 10px 18px;
  text-align: center;
  color: #4b3f35;
  font-size: 16px;
}
#panel-diseno, #panel-disposicion {
  display: none;
  text-align: center;
  padding: 15px 10px;
  background: #fff9f3;
  border-bottom: 1px solid #e4cbb8;
  font-family: "Poppins", sans-serif;
}
#panel-diseno button, #panel-disposicion button {
  margin: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #e4cbb8;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  background: white;
  transition: 0.2s;
}
#panel-diseno button:hover, #panel-disposicion button:hover { background: #ffe9d9; }
.xp-feedback {
  position: absolute;
  color: #00aa55;
  font-weight: 700;
  font-size: 19px;
  animation: floatUp 1.5s ease-out forwards;
  z-index: 1003;
  text-shadow: 0 0 6px rgba(0,255,100,0.5);
}
@keyframes floatUp { 0% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-50px); } }
`;
            document.head.appendChild(style);

            const overlay = document.createElement("div");
            overlay.id = "tutorial-overlay";
            document.body.appendChild(overlay);

            const messageBox = document.createElement("div");
            messageBox.id = "tutorial-message";
            document.body.appendChild(messageBox);

            const cinta = document.createElement("div");
            cinta.id = "cinta";
            cinta.innerHTML = `<div id="btnDiseno" class="boton-cinta">Diseño de tabla</div><div id="btnDisposicion" class="boton-cinta">Disposición</div>`;
            document.body.appendChild(cinta);

            const panelDiseno = document.createElement("div");
            panelDiseno.id = "panel-diseno";
            panelDiseno.innerHTML = `<button id="btnSombreado">🎨 Sombreado</button>`;
            document.body.appendChild(panelDiseno);

            const panelDisposicion = document.createElement("div");
            panelDisposicion.id = "panel-disposicion";
            panelDisposicion.innerHTML = `<button id="btnInsertarFila">➕ Insertar debajo</button>`;
            document.body.appendChild(panelDisposicion);

            const tabla = document.createElement("table");
            tabla.id = "tabla-ejemplo";
            tabla.innerHTML = `<tr><th contenteditable="true">Actividad</th><th contenteditable="true">Día</th><th contenteditable="true">Hora</th></tr>
<tr><td contenteditable="true">Correr</td><td contenteditable="true">Lunes</td><td contenteditable="true">7:00 AM</td></tr>
<tr><td contenteditable="true">Leer</td><td contenteditable="true">Martes</td><td contenteditable="true">8:00 PM</td></tr>`;
            document.body.appendChild(tabla);

            const mensajes = [
              {
                texto:
                  "Cuando haces clic dentro de una tabla, aparecen nuevas pestañas mágicas: 'Diseño de tabla' y 'Disposición'. ¡Vamos a usarlas!\nHaz clic dentro de la tabla para mostrar las pestañas",
                accion: "mostrar-pestañas",
              },
              {
                texto:
                  "En la pestaña 'Diseño de tabla', busca la opción 'Sombreado'. Selecciona toda la primera fila (los encabezados) y elige un color gris suave.",
                accion: "sombreado",
              },
              {
                texto: "¡Mucho mejor! Ahora los títulos destacan. +15 XP",
                accion: null,
              },
              {
                texto:
                  "Imagina que necesitas añadir una nueva actividad. Ve a la pestaña 'Disposición', haz clic en la última fila y elige 'Insertar debajo'.",
                accion: "insertar-fila",
              },
              {
                texto:
                  "¡Así de fácil! Puedes hacer tus tablas tan grandes como necesites. +20 XP. Pasemos a la siguiente actividad",
                accion: null,
              },
            ];

            let paso = 0;

            function mostrarMensaje(i) {
              messageBox.textContent = mensajes[i].texto;
              overlay.style.display = "block";
              messageBox.style.display = "block";
            }

            function ocultarMensaje() {
              overlay.style.display = "none";
              messageBox.style.display = "none";
            }

            function mostrarXP(x, y, texto) {
              const xp = document.createElement("div");
              xp.classList.add("xp-feedback");
              xp.textContent = texto;
              xp.style.left = x + "px";
              xp.style.top = y + "px";
              document.body.appendChild(xp);
              setTimeout(() => xp.remove(), 1500);
            }

            function siguientePaso() {
              ocultarMensaje();
              paso++;
              if (paso < mensajes.length) mostrarMensaje(paso);
            }

            mostrarMensaje(0);
            tabla.addEventListener("click", () => {
              if (paso === 0) {
                siguientePaso();
                document.getElementById("btnDiseno").classList.add("activo");
                panelDiseno.style.display = "block";
              }
            });

            const btnSombreado = document.getElementById("btnSombreado");
            btnSombreado.addEventListener("click", () => {
              if (paso === 1) {
                tabla.querySelector("tr:first-child").style.background = "#ddd";
                mostrarXP(window.innerWidth / 2, 180, "+15 XP");
                siguientePaso(setTimeout(() => siguientePaso(), 2000));
                document.getElementById("btnDiseno").classList.remove("activo");
                document
                  .getElementById("btnDisposicion")
                  .classList.add("activo");
                panelDiseno.style.display = "none";
                panelDisposicion.style.display = "block";
              }
            });

            const btnInsertar = document.getElementById("btnInsertarFila");
            btnInsertar.addEventListener("click", () => {
              if (paso === 3) {
                const nuevaFila = document.createElement("tr");
                nuevaFila.innerHTML = `<td contenteditable="true">Nueva actividad</td><td contenteditable="true">Miércoles</td><td contenteditable="true">9:00 AM</td>`;
                tabla.appendChild(nuevaFila);
                mostrarXP(window.innerWidth / 2, 180, "+20 XP");
                siguientePaso();
              }
            });
          },
        },
      ],
    },

    {
      titulo: "Dale Vida Con Imágenes",
      actividades: [
        {
          trabajo: function iniciarTutorialInsertarImagen() {
            const style = document.createElement("style");
            style.textContent = `
        body { background: linear-gradient(135deg,#fff7eb,#fde6e0); font-family:"Poppins",sans-serif; color:#4b3f35; }
        #tutorial-overlay { position:fixed; top:0; left:0; width:100%; height:100%; display:none; z-index:1000; pointer-events:none; }
        #texto-amazonas { overflow:auto; width:650px; margin:70px auto; font-size:19px; line-height:1.6; background:#fff9f3; padding:22px 28px; border-radius:14px; border:1px solid #e4cbb8; box-shadow:0 6px 18px rgba(0,0,0,0.07); }
        #tutorial-message { position:fixed; bottom:40px; left:50%; transform:translateX(-50%); background:#fff7f0; padding:16px 24px; border-radius:14px; box-shadow:0 6px 20px rgba(0,0,0,.15); border:1px solid #f2d2b4; z-index:1001; display:none; max-width:550px; text-align:center; font-size:17px; color:#4b3f35; }
        .xp-feedback { position:absolute; color:#00aa55; font-size:20px; font-weight:700; animation:floatUp 1.4s forwards; z-index:2000; text-shadow:0 0 6px rgba(0,255,100,0.4);}
        @keyframes floatUp {0% {opacity:1; transform:translateY(0);} 100% {opacity:0; transform:translateY(-40px);}}
        `;
            document.head.appendChild(style);

            const overlay = document.createElement("div");
            overlay.id = "tutorial-overlay";
            document.body.appendChild(overlay);
            const msg = document.createElement("div");
            msg.id = "tutorial-message";
            document.body.appendChild(msg);

            const texto = document.createElement("div");
            texto.id = "texto-amazonas";
            texto.innerHTML = `
        La selva amazónica es el bosque tropical más grande del mundo,
        hogar de millones de especies de animales y plantas.
        `;
            document.body.appendChild(texto);

            let step = 0;
            let imagen = null;
            let botonDiseno = null;
            let panelDiseno = null;
            let arrow = null;
            let resizing = false;
            let startX = 0,
              startY = 0,
              startW = 0,
              startH = 0;

            function showMessage(text) {
              msg.innerHTML = text;
              msg.style.display = "block";
              overlay.style.display = "none";
            }

            function hideMessage() {
              msg.style.display = "none";
              overlay.style.display = "none";
            }

            function showXP(x, y, text) {
              const xp = document.createElement("div");
              xp.className = "xp-feedback";
              xp.style.left = x + "px";
              xp.style.top = y + "px";
              xp.textContent = text;
              document.body.appendChild(xp);
              setTimeout(() => xp.remove(), 1400);
            }

            function removeArrow() {
              if (arrow && arrow.parentNode)
                arrow.parentNode.removeChild(arrow);
              arrow = null;
            }

            function insertarTucanOnce() {
              if (imagen) return;
              imagen = document.createElement("img");
              imagen.src = "https://picsum.photos/400/260?random=92";
              imagen.style.width = "450px";
              imagen.style.display = "block";
              imagen.style.margin = "0px";
              imagen.style.cursor = "pointer";

              texto.prepend(imagen);
              prepararListenersImagen();

              step = 1;
              showMessage(
                "¡Ahí está nuestro amigo! Haz clic en la imagen para seleccionarla."
              );
            }

            function prepararListenersImagen() {
              const onClick = (e) => {
                if (step !== 1) return;
                step = 2;
                showMessage(
                  "+10 XP — Haz clic en 'Opciones de diseño' (aparecerá cerca de la imagen)."
                );
                showXP(e.clientX, e.clientY - 30, "+10 XP");

                crearBotonDiseno();
                posicionarBotonDiseno();
                createArrowAt(botonDiseno);
              };

              imagen.addEventListener("click", onClick);

              const onMouseDown = (e) => {
                if (step !== 3) return;
                const rect = imagen.getBoundingClientRect();
                const corner = 28;
                const inCornerX =
                  e.clientX >= rect.right - corner &&
                  e.clientX <= rect.right + corner;
                const inCornerY =
                  e.clientY >= rect.bottom - corner &&
                  e.clientY <= rect.bottom + corner;
                if (!(inCornerX && inCornerY)) return;

                resizing = true;
                startX = e.clientX;
                startY = e.clientY;
                startW = rect.width;
                startH = rect.height;
                document.addEventListener("mousemove", onMouseMove);
                document.addEventListener("mouseup", onMouseUp);
                e.preventDefault();
              };

              const onMouseMove = (e) => {
                if (!resizing) return;
                const dx = e.clientX - startX;
                const newW = Math.max(80, startW + dx);
                imagen.style.width = newW + "px";
              };

              const onMouseUp = (e) => {
                if (!resizing) return;
                resizing = false;
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);

                if (step === 3) {
                  step = 4;
                  showMessage(
                    "¡Bien! Ahora elige la opción 'Cuadrado' en el panel de diseño."
                  );
                  const r = imagen.getBoundingClientRect();
                  showXP(r.left, r.top - 40, "+15 XP");

                  if (panelDiseno) posicionarPanelDiseno();
                }
              };

              imagen.addEventListener("mousedown", onMouseDown);
              imagen._onClick = onClick;
              imagen._onMouseDown = onMouseDown;
            }

            function crearBotonDiseno() {
              if (botonDiseno) return;
              botonDiseno = document.createElement("div");
              botonDiseno.textContent = "⚙️ Opciones de diseño";
              botonDiseno.style.position = "absolute";
              botonDiseno.style.background = "#fff";
              botonDiseno.style.padding = "6px 10px";
              botonDiseno.style.borderRadius = "8px";
              botonDiseno.style.border = "1px solid #ccc";
              botonDiseno.style.cursor = "pointer";
              botonDiseno.style.zIndex = 1500;
              document.body.appendChild(botonDiseno);

              botonDiseno.addEventListener("click", (e) => {
                if (step < 2) return;

                if (step === 2) {
                  step = 3;
                  showMessage(
                    "Ahora toma la esquina inferior-derecha de la imagen y arrastra para redimensionarla."
                  );
                  removeArrow();
                }

                mostrarPanelDiseno();
              });
            }

            function posicionarBotonDiseno() {
              if (!botonDiseno || !imagen) return;
              const r = imagen.getBoundingClientRect();
              botonDiseno.style.top = window.scrollY + r.top - 44 + "px";
              botonDiseno.style.left = window.scrollX + r.left + "px";
            }

            function mostrarPanelDiseno() {
              if (panelDiseno) return;
              panelDiseno = document.createElement("div");
              panelDiseno.style.position = "absolute";
              panelDiseno.style.background = "#fff";
              panelDiseno.style.padding = "8px";
              panelDiseno.style.border = "1px solid #bbb";
              panelDiseno.style.borderRadius = "8px";
              panelDiseno.style.zIndex = 1500;

              let opc = document.createElement("button");
              opc.textContent = "⬛ Cuadrado";
              opc.style.display = "block";
              opc.style.margin = "4px 0";
              opc.style.padding = "6px 8px";
              panelDiseno.appendChild(opc);
              document.body.appendChild(panelDiseno);

              opc.addEventListener("click", () => {
                imagen.style.cssFloat = "left";
                imagen.style.margin = "0 14px 8px 0";
                texto.style.display = "block";

                showXP(
                  panelDiseno.getBoundingClientRect().left,
                  panelDiseno.getBoundingClientRect().top - 30,
                  "+40 XP"
                );

                showMessage(
                  "✨ ¡MAGIA! El texto se está reorganizando alrededor de la imagen…"
                );

                setTimeout(() => {
                  showMessage(
                    "¡INCREÍBLE! Acabas de dar un paso de gigante. " +
                      "Ahora puedes crear documentos que parecen de revista. " +
                      "¡+40 XP por esta habilidad de nivel PRO!"
                  );

                  setTimeout(() => iniciarFase2(), 1600);
                }, 1600);
              });
            }

            function iniciarFase2() {
              if (panelDiseno) {
                const botones = panelDiseno.querySelectorAll("button");
                botones.forEach((btn) => {
                  if (btn.textContent.includes("⬛ Cuadrado")) {
                    btn.remove();
                  }
                });
              }

              if (texto) texto.remove();
              if (botonDiseno) botonDiseno.remove();
              overlay.style.display = "none";
              msg.style.display = "none";

              const area = document.createElement("div");
              area.id = "documento";
              area.contentEditable = "true";
              area.style.minHeight = "110px";
              area.style.width = "700px";
              area.style.border = "1px solid #ccc";
              area.style.padding = "12px";
              area.style.marginTop = "25px";
              area.style.overflowWrap = "break-word";
              document.body.appendChild(area);

              let toolbar = document.querySelector("#toolbar");
              if (!toolbar) {
                toolbar = document.createElement("div");
                toolbar.id = "toolbar";
                toolbar.style.display = "flex";
                toolbar.style.gap = "10px";
                toolbar.style.marginTop = "20px";
                toolbar.innerHTML = `<button id="insertar-imagen">🖼 Insertar imagen</button>
                         <button id="insertar-tabla">📊 Insertar tabla</button>`;
                document.body.prepend(toolbar);
              }

              const imgBtn = document.querySelector("#insertar-imagen");
              const tablaBtn = document.querySelector("#insertar-tabla");

              let paso = 1;

              showMessage(
                "🛠️ DESAFÍO FINAL: Crea la ficha técnica del Chrono-Reloj X1."
              );

              showMessage(
                "1️⃣ Escribe el título: <b>Chrono-Reloj X1</b> y presiona Enter."
              );
              area.addEventListener("input", function checkTitulo() {
                if (/chrono[- ]reloj x1/i.test(area.innerText)) {
                  area.removeEventListener("input", checkTitulo);
                  showXP(area.offsetLeft, area.offsetTop - 20, "+20 XP");
                  paso = 2;
                  iniciarPaso2();
                }
              });

              function iniciarPaso2() {
                showMessage(
                  "📸 Inserta la imagen con el botón 'Insertar imagen'"
                );
                imgBtn.addEventListener("click", function clickImagen() {
                  const img = document.createElement("img");
                  img.src =
                    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600";
                  img.id = "reloj-x1";
                  img.style.width = "180px";
                  img.style.cursor = "pointer";
                  area.appendChild(img);
                  imgBtn.removeEventListener("click", clickImagen);
                  paso = 3;
                  iniciarPaso3();
                });
              }

              function iniciarPaso3() {
                showMessage(
                  "3️⃣ Haz clic en la imagen para moverla a la derecha"
                );
                const img = document.querySelector("#reloj-x1");
                img.addEventListener("click", function moverDerecha() {
                  img.style.float = "right";
                  img.style.margin = "0 0 10px 10px";
                  showXP(img.offsetLeft, img.offsetTop - 20, "+25 XP");
                  img.removeEventListener("click", moverDerecha);
                  paso = 4;
                  iniciarPaso4();
                });
              }

              function iniciarPaso4() {
                showMessage(
                  "4️⃣ Inserta la tabla de especificaciones usando el botón 'Insertar tabla'"
                );
                tablaBtn.addEventListener("click", function clickTabla() {
                  const tabla = document.createElement("table");
                  tabla.style.width = "100%";
                  tabla.style.borderCollapse = "collapse";
                  tabla.innerHTML = `
        <tr><th style="border:1px solid #ccc; padding:4px;">Característica</th>
            <th style="border:1px solid #ccc; padding:4px;">Detalle</th></tr>
        <tr><td style="border:1px solid #ccc; padding:4px;">Pantalla</td><td style="border:1px solid #ccc; padding:4px;">AMOLED 1.5"</td></tr>
        <tr><td style="border:1px solid #ccc; padding:4px;">Batería</td><td style="border:1px solid #ccc; padding:4px;">350 mAh</td></tr>
      `;
                  area.appendChild(tabla);
                  tablaBtn.removeEventListener("click", clickTabla);
                  showXP(tabla.offsetLeft, tabla.offsetTop - 20, "+30 XP");
                  paso = 5;
                  iniciarPaso5();
                });
              }

              function iniciarPaso5() {
                showMessage(
                  "5️⃣ Escribe una breve reseña a tu gusto sobre Chrono-Reloj X1 en el área editable de la tabla."
                );
                area.addEventListener("input", function checkResena() {
                  if (area.innerText.length > 20) {
                    area.removeEventListener("input", checkResena);
                    showXP(area.offsetLeft, area.offsetTop - 20, "+40 XP");
                    showMessage(
                      "¡Perfecto! Has completado el desafío final 🎉"
                    );
                  }
                });
              }
            }

            showMessage("Vamos a insertar una imagen...");
            setTimeout(insertarTucanOnce, 700);
          },
        },
      ],
    },

    {
      titulo: "La Marca Constante (Encabezados Y Pies De Página)",
      actividades: [
        {
          trabajo: function iniciarTutorialEncabezado() {
            document.getElementById("tutorial-doc")?.remove();
            document.getElementById("tutorial-overlay")?.remove();

            const SID = "tutorial-header-style";
            if (!document.getElementById(SID)) {
              const st = document.createElement("style");
              st.id = SID;
              st.textContent = `
body {
  background: linear-gradient(135deg, #fff7eb, #fde6e0);
  font-family: "Poppins", sans-serif;
  color: #4b3f35;
}
#tutorial-doc {
  width: 820px;
  margin: 40px auto;
  font-family: "Poppins", sans-serif;
}
.page {
  width: 100%;
  height: 900px;
  padding: 60px 60px 80px 60px;
  box-sizing: border-box;
  background: #fffdfb;
  margin-bottom: 40px;
  border: 1px solid #f0d9c8;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  position: relative;
}
.header-zone {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 18px 60px;
  font-size: 20px;
  opacity: 0.35;
  user-select: none;
  pointer-events: none;
  color: #6b5c50;
  font-weight: 600;
  background: transparent;
  border-bottom: 1px dashed #e8d4c3;
}
.header-zone.active {
  background: #fff3e8;
  opacity: 1;
  pointer-events: all;
  border-bottom: 2px solid #f1c9a5;
  color: #4b3f35;
}
.page-body {
  margin-top: 120px;
  white-space: pre-wrap;
  color: #4b3f35;
  font-size: 17px;
  line-height: 1.65;
}
#tutorial-overlay {
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff7f0;
  padding: 18px 22px;
  border-radius: 16px;
  box-shadow: 0 6px 25px rgba(0,0,0,0.15);
  z-index: 9999;
  max-width: 700px;
  border: 1px solid #f2d2b4;
  font-family: "Poppins", sans-serif;
}
#tutorial-overlay p {
  margin: 0;
  font-size: 17px;
  text-align: center;
  color: #4b3f35;
}
#tutorial-overlay button {
  background: #ffe7d6;
  border: 1px solid #f2c1a0;
  padding: 10px 18px;
  font-size: 16px;
  border-radius: 14px;
  cursor: pointer;
  margin-top: 12px;
  transition: 0.2s;
  color: #4b3f35;
  font-family: "Poppins", sans-serif;
}
#tutorial-overlay button:hover {
  background: #ffd9c1;
  transform: scale(1.05);
}
.xp-pop {
  position: fixed;
  color: #00b55a;
  font-size: 24px;
  font-weight: 700;
  text-shadow: 0 0 6px rgba(0,255,120,0.4);
  animation: xpUp 1.1s forwards;
  z-index: 999999;
}
@keyframes xpUp {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-40px); }
}
          `;
              document.head.appendChild(st);
            }

            let encabezadoGlobal = "";
            function syncHeaders() {
              document.querySelectorAll(".header-zone").forEach((h) => {
                h.textContent = encabezadoGlobal || "Encabezado… (vacío)";
              });
            }

            const doc = document.createElement("div");
            doc.id = "tutorial-doc";

            const TEXTO = `
Introducción

TecnoTask cierra el año con un crecimiento sostenido en sus operaciones digitales, consolidándose como una de las empresas líderes en soluciones de productividad empresarial. A lo largo del año, se implementaron mejoras clave en infraestructura, automatización y experiencia del usuario.

Crecimiento General

Durante el último ciclo anual, la compañía incrementó su base de usuarios activos en un 27%. La integración de nuevas plataformas internas permitió reducir los tiempos de procesamiento hasta en un 40%, especialmente en labores operativas de gran volumen.

Proyecciones

Se espera que el próximo año esté marcado por la expansión hacia mercados latinoamericanos, el desarrollo de nuevas herramientas de IA y la optimización completa del sistema de reportes empresariales.
`.repeat(1);

            function crearPagina() {
              const p = document.createElement("div");
              p.className = "page";

              const h = document.createElement("div");
              h.className = "header-zone";
              h.textContent = encabezadoGlobal || "Encabezado… (vacío)";
              p.appendChild(h);

              const b = document.createElement("div");
              b.className = "page-body";
              b.textContent = TEXTO;
              p.appendChild(b);

              return p;
            }

            doc.appendChild(crearPagina());
            doc.appendChild(crearPagina());
            doc.appendChild(crearPagina());

            document.body.appendChild(doc);

            const headers = [...doc.querySelectorAll(".header-zone")];

            const overlay = document.createElement("div");
            overlay.id = "tutorial-overlay";
            overlay.innerHTML = `<p>Cargando…</p>`;
            document.body.appendChild(overlay);

            const msg = (t) => (overlay.innerHTML = `<p>${t}</p>`);

            function xp(text) {
              const rect = overlay.getBoundingClientRect();
              const x = rect.right - 70;
              const y = rect.top - 10;
              const e = document.createElement("div");
              e.className = "xp-pop";
              e.textContent = text;
              e.style.left = x + "px";
              e.style.top = y + "px";
              document.body.appendChild(e);
              setTimeout(() => e.remove(), 1500);
            }

            let step = 0;

            msg(
              "Aquí tienes un documento de 3 páginas. Desplázate un poco para ver su contenido."
            );

            setTimeout(() => {
              step = 1;
              msg("Ve a Insertar > Encabezado. (Simulado con el botón abajo)");

              const btn = document.createElement("button");
              btn.textContent = "Insertar Encabezado";
              btn.style.marginTop = "12px";

              btn.onclick = () => {
                if (step !== 1) return;

                headers.forEach((h) => h.classList.add("active"));
                headers.forEach((h) => (h.contentEditable = "true"));

                msg(
                  "Estás en la zona de encabezado. Escribe: 'Reporte Anual de TecnoTask'."
                );
                step = 2;
                btn.remove();
              };

              overlay.appendChild(btn);
            }, 1500);

            headers.forEach((h) => {
              h.addEventListener("input", () => {
                if (step === 2) {
                  const text = h.textContent.trim().toLowerCase();
                  if (text === "reporte anual de tecnotask") {
                    encabezadoGlobal = "Reporte Anual de TecnoTask";
                    syncHeaders();

                    msg(
                      "Perfecto. Ahora sal del encabezado haciendo doble clic en el cuerpo del documento."
                    );
                    step = 3;
                    headers.forEach((z) => z.classList.remove("active"));
                  }
                }
              });
            });

            doc.addEventListener("dblclick", (e) => {
              if (step === 3 && !e.target.classList.contains("header-zone")) {
                msg("Bien. Ahora desplázate entre las páginas…");

                step = 4;
                setTimeout(() => {
                  msg(
                    "¡Mira! El encabezado aparece en TODAS las páginas.\n+30 XP"
                  );
                  xp("+30 XP");
                  step = 5;
                }, 1800);
              }
            });
          },
        },
      ],
    },
    {
      titulo: "Nunca Te Pierdas (Numeración De Páginas)",
      actividades: [
        {
          trabajo: function iniciarTutorialNumeracion() {
            document.getElementById("tutorial-doc")?.remove();
            document.getElementById("tutorial-overlay")?.remove();

            const SID = "tutorial-page-style";
            if (!document.getElementById(SID)) {
              const st = document.createElement("style");
              st.id = SID;
              st.textContent = `
body {
  background: linear-gradient(135deg, #fff7eb, #fde6e0);
  font-family: "Poppins", sans-serif;
  color: #4b3f35;
}
#tutorial-doc {
  width: 820px;
  margin: 40px auto;
}
.page {
  width: 100%;
  height: 900px;
  padding: 60px 60px 80px 60px;
  box-sizing: border-box;
  background: #fffdfb;
  margin-bottom: 40px;
  border: 1px solid #f0d9c8;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  position: relative;
}
.header-zone {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 18px 60px;
  font-size: 20px;
  opacity: 0.35;
  user-select: none;
  pointer-events: none;
  color: #6b5c50;
  font-weight: 600;
  border-bottom: 1px dashed #e8d4c3;
}
.header-zone.active {
  background: #fff3e8;
  opacity: 1;
  pointer-events: all;
  border-bottom: 2px solid #f1c9a5;
  color: #4b3f35;
}
.page-body {
  margin-top: 120px;
  white-space: pre-wrap;
  color: #4b3f35;
  font-size: 17px;
  line-height: 1.65;
}
.footer-zone {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 14px 60px;
  font-size: 22px;
  opacity: 0.35;
  user-select: none;
  pointer-events: none;
  color: #6b5c50;
  text-align: right;
  font-weight: 600;
}
.footer-zone.active {
  opacity: 1;
  pointer-events: all;
  background: #fff3e8;
  color: #4b3f35;
}
.footer-right {
  display: inline-block;
  font-size: 20px;
  opacity: 0.9;
}
#tutorial-overlay {
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff7f0;
  padding: 18px 22px;
  border-radius: 16px;
  box-shadow: 0 6px 25px rgba(0,0,0,0.15);
  z-index: 9999;
  max-width: 700px;
  border: 1px solid #f2d2b4;
  font-family: "Poppins", sans-serif;
}
#tutorial-overlay p {
  margin: 0;
  font-size: 17px;
  text-align: center;
  color: #4b3f35;
}
#tutorial-overlay button {
  background: #ffe7d6;
  border: 1px solid #f2c1a0;
  padding: 10px 18px;
  font-size: 16px;
  border-radius: 14px;
  cursor: pointer;
  margin-top: 12px;
  transition: 0.2s;
  color: #4b3f35;
}
#tutorial-overlay button:hover {
  background: #ffd9c1;
  transform: scale(1.05);
}
.xp-pop {
  position: fixed;
  color: #00b55a;
  font-size: 24px;
  font-weight: 700;
  text-shadow: 0 0 6px rgba(0,255,120,0.4);
  animation: xpUp 1.1s forwards;
  z-index: 999999;
}
@keyframes xpUp {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-40px); }
}`;
              document.head.appendChild(st);
            }

            const doc = document.createElement("div");
            doc.id = "tutorial-doc";

            const PAGE_TEXT = `
Resumen Ejecutivo

TecnoTask cierra el año con un crecimiento sostenido en sus operaciones digitales, consolidándose como una de las empresas líderes en soluciones de productividad empresarial.

Resultados Operativos

Infraestructura, módulos, satisfacción de clientes y proyecciones para el próximo año.
`;

            function crearPagina() {
              const p = document.createElement("div");
              p.className = "page";

              const h = document.createElement("div");
              h.className = "header-zone";

              const body = document.createElement("div");
              body.className = "page-body";
              body.innerText = PAGE_TEXT;

              const f = document.createElement("div");
              f.className = "footer-zone";
              const fr = document.createElement("div");
              fr.className = "footer-right";
              fr.textContent = "";
              f.appendChild(fr);

              p.appendChild(h);
              p.appendChild(body);
              p.appendChild(f);
              return p;
            }

            doc.appendChild(crearPagina());
            doc.appendChild(crearPagina());
            doc.appendChild(crearPagina());
            document.body.appendChild(doc);

            const footers = [...doc.querySelectorAll(".footer-zone")];

            const overlay = document.createElement("div");
            overlay.id = "tutorial-overlay";
            overlay.innerHTML = `<p>Intro: Documento de 3 páginas sin numeración.</p>`;
            document.body.appendChild(overlay);

            function showMsg(html) {
              overlay.innerHTML = `<p>${html}</p>`;
            }

            function popXP(text) {
              const r = overlay.getBoundingClientRect();
              const xp = document.createElement("div");
              xp.className = "xp-pop";
              xp.textContent = text;
              xp.style.left = r.right - 80 + "px";
              xp.style.top = r.top - 20 + "px";
              document.body.appendChild(xp);
              setTimeout(() => xp.remove(), 900);
            }

            let step = 0;
            let numberingInserted = false;
            let firstPageDifferent = false;

            function actualizarNumeros() {
              if (!numberingInserted) return;
              footers.forEach((f, idx) => {
                const right = f.querySelector(".footer-right");
                if (!right) return;
                right.textContent =
                  firstPageDifferent && idx === 0 ? "" : String(idx + 1);
              });
            }

            setTimeout(() => {
              step = 1;
              showMsg(
                `<b>Un reporte sin números de página es un laberinto.</b> Vamos a añadir numeración. Simula 'Insertar > Número de página' con el botón.`
              );

              const insertBtn = document.createElement("button");
              insertBtn.textContent =
                "Insertar número de página (final / derecha)";
              insertBtn.onclick = () => {
                if (step !== 1) return;
                numberingInserted = true;
                actualizarNumeros();
                showMsg("¡Perfecto! Números 1, 2, 3 visibles. +20 XP");
                popXP("+20 XP");
                step = 2;

                setTimeout(() => {
                  showMsg(
                    `La portada normalmente no lleva número. Simula marcar 'Primera página diferente'. <button id="toggle-first">Marcar primera página diferente</button>`
                  );
                  document.getElementById("toggle-first").onclick = () => {
                    firstPageDifferent = true;
                    actualizarNumeros();
                    showMsg(
                      "Primera página oculta. Página 2 sigue siendo 2. +25 XP"
                    );
                    popXP("+25 XP");
                    step = 3;
                  };
                }, 1500);
              };
              overlay.appendChild(insertBtn);
            }, 1500);

            window.addEventListener("resize", actualizarNumeros);
            window.addEventListener("scroll", actualizarNumeros);
          },
        },
      ],
    },

    {
      titulo: "El Arma Secreta (El Poder De Los Estilos)",
      actividades: [
        {
          trabajo: function iniciarTutorialEstilos() {
            const SID = "tutorial-estilos-style";
            if (!document.getElementById(SID)) {
              const css = document.createElement("style");
              css.id = SID;
              css.textContent = `
body {
  background: linear-gradient(135deg, #fff7eb, #fde6e0);
  font-family: "Poppins", sans-serif;
  color: #4b3f35;
}
#tutorial-doc { 
  width: 760px; 
  margin: 40px auto; 
  font-family: "Poppins", sans-serif; 
  line-height: 1.6; 
  color: #4b3f35;
  background: #fffdfb;
  padding: 40px 60px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
}
.estilo-galeria { 
  position: fixed; 
  top: 140px; 
  left: 50%; 
  transform: translateX(-50%);
  background: #fff7f0; 
  padding: 12px 20px; 
  border-radius: 16px;
  box-shadow: 0 6px 25px rgba(0,0,0,0.15); 
  display: flex; 
  gap: 14px; 
  z-index: 9999;
}
.estilo-btn { 
  padding: 10px 14px; 
  border-radius: 12px; 
  border: 1px solid #f2c1a0; 
  cursor: pointer; 
  background: #ffe7d6;
  color: #4b3f35;
  font-family: "Poppins", sans-serif;
  transition: 0.2s;
}
.estilo-btn:hover {
  background: #ffd9c1;
  transform: scale(1.05);
}
.highlight { 
  outline: 3px solid #e4d7adff; 
}
.titulo1 { 
  font-size: 28px;      
  color: #1958d8;         
  font-weight: 700;       
  margin-top: 30px;      
  text-decoration: underline;
}

.titulo2 { 
  font-size: 22px;       
  color: #3971e8;         
  font-weight: 600;       
  margin-top: 20px;
  font-style: italic;    
}

#tutorial-overlay { 
  position: fixed; 
  bottom: 25px; 
  left: 50%; 
  transform: translateX(-50%); 
  background: #fff7f0; 
  padding: 18px 22px; 
  border-radius: 16px;
  box-shadow: 0 6px 25px rgba(0,0,0,0.15); 
  max-width: 700px; 
  font-size: 16px; 
  z-index: 9999; 
  text-align: center;
  font-family: "Poppins", sans-serif;
}
#tutorial-overlay p {
  margin: 0;
  font-size: 16px;
  color: #4b3f35;
}
.xp-pop {
  position: fixed; 
  font-weight: 700; 
  color: #0cc251; 
  font-size: 22px;
  text-shadow: 0 0 6px rgba(0,255,120,0.4);
  animation: xpup 1s forwards; 
  z-index: 99999;
}
@keyframes xpup {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-40px); }
}
#tutorial-doc p {
  margin: 14px 0;
  font-size: 16px;
  color: #4b3f35;
  line-height: 1.65;
}`;
              document.head.appendChild(css);
            }

            document.getElementById("tutorial-doc")?.remove();
            document.getElementById("tutorial-overlay")?.remove();
            document.getElementById("estilos-galeria")?.remove();

            const doc = document.createElement("div");
            doc.id = "tutorial-doc";
            doc.innerHTML = `
<p class="titulo" id="t-intro">Introducción</p>
<p>El presente reporte analiza el desempeño general del proyecto, evaluando tiempos, recursos, entregables y la eficiencia del flujo de trabajo aplicado...</p>

<p class="titulo" id="t-obj-proy">Objetivos del Proyecto</p>

<p class="titulo" id="t-obj-princ">Objetivo Principal</p>
<p>Maximizar la eficiencia operativa mediante la implementación de sistemas automatizados y la estandarización de procesos internos.</p>

<p class="titulo" id="t-obj-sec">Objetivos Secundarios</p>
<p>Optimizar la comunicación interna, reducir tiempos muertos y mejorar la trazabilidad de cada actividad en el ciclo operativo general.</p>
`;
            document.body.appendChild(doc);

            const tIntro = document.getElementById("t-intro");
            const tObjProy = document.getElementById("t-obj-proy");
            const tObjPrinc = document.getElementById("t-obj-princ");
            const tObjSec = document.getElementById("t-obj-sec");

            const gal = document.createElement("div");
            gal.className = "estilo-galeria";
            gal.id = "estilos-galeria";

            const bT1 = document.createElement("button");
            bT1.className = "estilo-btn";
            bT1.textContent = "Título 1";

            const bT2 = document.createElement("button");
            bT2.className = "estilo-btn";
            bT2.textContent = "Título 2";

            gal.appendChild(bT1);
            gal.appendChild(bT2);
            document.body.appendChild(gal);

            const overlay = document.createElement("div");
            overlay.id = "tutorial-overlay";
            overlay.innerHTML = `<b>Intro:</b> Documento cargado.`;
            document.body.appendChild(overlay);

            function msg(t) {
              overlay.innerHTML = t;
            }
            function xp(text) {
              const r = overlay.getBoundingClientRect();
              const box = document.createElement("div");
              box.className = "xp-pop";
              box.style.left = r.right - 80 + "px";
              box.style.top = r.top - 20 + "px";
              box.textContent = text;
              document.body.appendChild(box);
              setTimeout(() => box.remove(), 900);
            }

            let step = 0;

            setTimeout(() => {
              step = 1;
              msg(`Hasta ahora hacías títulos con negrita y tamaño... lento.  
<b>Bienvenido al mundo profesional: Estilos.</b><br><br>
Haz clic en <b>Introducción</b>.`);
              gal.classList.add("highlight");
            }, 1500);

            tIntro.addEventListener("click", () => {
              if (step !== 1) return;
              step = 2;
              tIntro.classList.add("highlight");
              msg(
                `Perfecto. Ahora haz clic en <b>Título 1</b> en la galería de estilos.`
              );
            });

            bT1.addEventListener("click", () => {
              if (step === 2) {
                tIntro.classList.remove("highlight");
                tIntro.classList.add("titulo1");
                step = 3;
                msg(`¡Boom! No solo cambió el estilo: ahora es un <b>capítulo principal</b>.<br>
Haz lo mismo con <b>Objetivos del Proyecto</b>. +20 XP`);
                xp("+20 XP");
              }
              if (step === 3 && !tObjProy.classList.contains("titulo1")) {
                tObjProy.classList.add("titulo1");
                step = 4;
                msg(`Perfecto. Ahora sigue con:<br>
<b>Objetivo Principal</b> y <b>Objetivos Secundarios</b> usando <b>Título 2</b>.`);
              }
            });

            bT2.addEventListener("click", () => {
              if (step === 4) {
                tObjPrinc.classList.add("titulo2");
                tObjSec.classList.add("titulo2");
                step = 5;
                msg(`<b>¡Felicidades!</b>  
Acabas de estructurar tu documento de forma inteligente.  
Esto desbloquea la automatización más poderosa: índices automáticos, navegación y mucho más.`);
              }
            });
          },
        },
      ],
    },

    {
      titulo: "El Mapa De Tu Documento (Tabla De Contenido Automatica)",
      actividades: [
        {
          trabajo: function iniciarTutorialTablaContenido() {
            const SID = "tutorial-toc-style";
            if (!document.getElementById(SID)) {
              const css = document.createElement("style");
              css.id = SID;
              css.textContent = `
body {
  background: linear-gradient(135deg, #fff7eb, #fde6e0);
  font-family: "Poppins", sans-serif;
  color: #4b3f35;
}
#tutorial-doc { 
  width: 820px; 
  margin: 40px auto; 
  font-family: "Poppins", sans-serif; 
  line-height: 1.65; 
  color: #4b3f35;
  background: #fffdfb;
  padding: 40px 60px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  position: relative;
}
.page {
  width: 100%;
  min-height: 900px;
  padding: 50px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #e2e2e2;
  margin-bottom: 40px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}
.titulo1 { font-size: 28px; font-weight: 700; color: #1958d8; margin-top: 20px; }
.titulo2 { font-size: 22px; font-weight: 600; color: #3971e8; margin-top: 18px; }
#tutorial-overlay {
  position: fixed; bottom: 25px; left: 50%; transform: translateX(-50%);
  background: #fff7f0; padding: 18px 22px; border-radius: 16px;
  box-shadow: 0 6px 25px rgba(0,0,0,0.15); max-width: 700px;
  z-index: 9999; font-size: 16px; text-align: center; font-family: "Poppins", sans-serif;
}
#tutorial-overlay p { margin: 0; font-size: 16px; color: #4b3f35; }
.highlight { outline: 3px solid #e3c984ff; border-radius: 6px; transition: 0.2s; }
#sim-ref-panel {
  position: fixed; top: 570px; left: 50%; transform: translateX(-50%);
  background: #fff7f0; padding: 12px 20px; border-radius: 16px;
  box-shadow: 0 6px 25px rgba(0,0,0,0.15); display: flex; gap: 14px; z-index: 9999;
}
.ref-btn {
  padding: 10px 14px; border-radius: 12px; border: 1px solid #f2c1a0;
  background: #ffe7d6; cursor: pointer; font-family: "Poppins", sans-serif;
  transition: 0.2s; color: #4b3f35;
}
.ref-btn:hover { background: #ffd9c1; transform: scale(1.05); }
#tabla-contenido {
  border: 1px solid #ddd; padding: 20px; border-radius: 16px; background: #fafafa; margin: 20px 0;
}
#tabla-contenido h3 { margin-bottom: 12px; font-size: 20px; color: #000000ff; }
#tabla-contenido p { margin: 8px 0; cursor: pointer; transition: 0.15s; font-family: "Poppins", sans-serif; }
#tabla-contenido p:hover { text-decoration: underline; color: #1958d8; }
.xp-pop {
  position: fixed; font-size: 22px; font-weight: 700; color: #0cc251;
  text-shadow: 0 0 6px rgba(0,255,120,0.4); animation: xp-rise 1s forwards; z-index: 99999;
}
@keyframes xp-rise { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-40px); } }
#tutorial-doc p { margin: 14px 0; font-size: 16px; color: #4b3f35; line-height: 1.65; }
`;
              document.head.appendChild(css);
            }

            const doc = document.createElement("div");
            doc.id = "tutorial-doc";
            doc.innerHTML = `
<div class="page"><div id="toc-insert-point" style="height:60px; border:2px dashed #ddd; margin-bottom:20px;"></div></div>
<div class="page"><p class="titulo1" id="sec-intro">Introducción</p><p>Texto simulado sobre el funcionamiento general del proyecto, rendimiento anual y datos clave...</p></div>
<div class="page"><p class="titulo1" id="sec-obj-proy">Objetivos del Proyecto</p></div>
<div class="page"><p class="titulo2" id="sec-obj-princ">Objetivo Principal</p><p>Texto del objetivo principal...</p></div>
<div class="page"><p class="titulo2" id="sec-obj-sec">Objetivos Secundarios</p><p>Texto de objetivos secundarios...</p></div>
<div class="page"><p class="titulo1" id="sec-metodologia">Metodología</p><p>Texto simulado sobre métodos utilizados…</p></div>
<div class="page"><p class="titulo1" id="sec-resultados">Resultados</p><p>Texto simulado sobre los resultados…</p></div>
<div class="page"><p class="titulo1" id="sec-conclusiones">Conclusiones</p><p>Texto simulado para las conclusiones…</p></div>
`;
            document.body.appendChild(doc);

            const tocInsertPoint = document.getElementById("toc-insert-point");
            const targets = [
              { id: "sec-intro", label: "Introducción" },
              { id: "sec-obj-proy", label: "Objetivos del Proyecto" },
              { id: "sec-obj-princ", label: "Objetivo Principal" },
              { id: "sec-obj-sec", label: "Objetivos Secundarios" },
              { id: "sec-metodologia", label: "Metodología" },
              { id: "sec-resultados", label: "Resultados" },
              { id: "sec-conclusiones", label: "Conclusiones" },
            ];

            const panel = document.createElement("div");
            panel.id = "sim-ref-panel";
            const btnToC = document.createElement("button");
            btnToC.className = "ref-btn";
            btnToC.textContent = "Tabla de contenido (automática)";
            panel.appendChild(btnToC);
            document.body.appendChild(panel);

            const overlay = document.createElement("div");
            overlay.id = "tutorial-overlay";
            document.body.appendChild(overlay);

            function msg(t) {
              overlay.innerHTML = t;
            }
            function popXP(txt) {
              const r = overlay.getBoundingClientRect();
              const xp = document.createElement("div");
              xp.className = "xp-pop";
              xp.textContent = txt;
              xp.style.left = r.right - 40 + "px";
              xp.style.top = r.top - 20 + "px";
              document.body.appendChild(xp);
              setTimeout(() => xp.remove(), 900);
            }

            let step = 0;
            msg(
              "Intro: Aquí está tu documento estructurado. Vamos a generar magia automática..."
            );

            setTimeout(() => {
              step = 1;
              msg(
                "Haz clic al inicio del documento (dentro del recuadro punteado)."
              );
              tocInsertPoint.classList.add("highlight");
            }, 1500);

            tocInsertPoint.addEventListener("click", () => {
              if (step !== 1) return;
              step = 2;
              tocInsertPoint.classList.remove("highlight");
              msg(
                `Perfecto. Ahora ve a la pestaña <b>Referencias</b> y haz clic en <b>Tabla de contenido</b> → Primer estilo automático.`
              );
              panel.classList.add("highlight");
            });

            btnToC.addEventListener("click", () => {
              if (step !== 2) return;
              panel.classList.remove("highlight");
              const toc = document.createElement("div");
              toc.id = "tabla-contenido";
              toc.innerHTML = "<h3>Tabla de contenido</h3>";
              const pageMap = {
                "sec-intro": 2,
                "sec-obj-proy": 3,
                "sec-obj-princ": 4,
                "sec-obj-sec": 5,
                "sec-metodologia": 6,
                "sec-resultados": 7,
                "sec-conclusiones": 8,
              };
              targets.forEach((sec) => {
                const p = document.createElement("p");
                p.textContent =
                  sec.label + " ........................ " + pageMap[sec.id];
                p.onclick = () =>
                  document
                    .getElementById(sec.id)
                    .scrollIntoView({ behavior: "smooth" });
                toc.appendChild(p);
              });
              tocInsertPoint.replaceWith(toc);
              msg(
                "<b>¡¡BOOM!!</b> ¡Índice completo, profesional y preciso!<br><br><b>+50 XP</b>"
              );
              popXP("+50 XP");
              step = 3;
              setTimeout(() => {
                msg(
                  `✨ PRO TIP: Pasa el ratón sobre cualquier línea del índice. Verás que puedes <b>Ctrl + clic</b> (simulado con simple clic) para saltar a la sección correspondiente.`
                );
              }, 1800);
            });
          },
        },
      ],
    },
  ],
};
