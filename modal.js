let imagenes = [];
let indiceActual = 0;

/* ============================
   ABRIR MODAL DESDE GALERÍA
============================ */
function abrirModalDesdeGaleria(index) {
  indiceActual = index;
  const img = imagenes[indiceActual];
  mostrarImagen(img.src, img.dataset.texto || "");
}

/* ============================
   MOSTRAR IMAGEN EN MODAL
============================ */
function mostrarImagen(src, texto) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalText = document.getElementById("modal-text");

  modalImg.src = src;
  modalText.textContent = texto;

  modal.classList.add("visible");   // 🔥 Fade-in
}

/* ============================
   CERRAR MODAL
============================ */
function cerrarModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("visible"); // 🔥 Fade-out
}

/* ============================
   NAVEGAR ENTRE IMÁGENES
============================ */
function navegar(direccion) {
  indiceActual = (indiceActual + direccion + imagenes.length) % imagenes.length;
  const img = imagenes[indiceActual];
  mostrarImagen(img.src, img.dataset.texto || "");
}

/* ============================
   EVENTOS PRINCIPALES
============================ */
document.addEventListener("DOMContentLoaded", function () {
  imagenes = Array.from(document.querySelectorAll("#galeria img"));

  // Abrir modal al hacer clic en una imagen
  imagenes.forEach((img, index) => {
    img.addEventListener("click", () => abrirModalDesdeGaleria(index));
  });

  const modal = document.getElementById("modal");
  const cerrarBtn = document.querySelector(".modal-close");
  const modalContenido = document.querySelector(".modal-contenido");

  // Botón cerrar
  cerrarBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    cerrarModal();
  });

  // Cerrar al hacer clic fuera del contenido
  modal.addEventListener("click", cerrarModal);

  // Evitar cierre al hacer clic dentro del contenido
  modalContenido.addEventListener("click", (e) => e.stopPropagation());

  // Navegación con teclado
  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("visible")) {
      if (e.key === "Escape") cerrarModal();
      if (e.key === "ArrowRight") navegar(1);
      if (e.key === "ArrowLeft") navegar(-1);
    }
  });
});
