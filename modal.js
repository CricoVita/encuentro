let imagenes = [];
let indiceActual = 0;

function abrirModalDesdeGaleria(index) {
  indiceActual = index;
  const img = imagenes[indiceActual];
  mostrarImagen(img.src, img.dataset.texto || "");
}

function mostrarImagen(src, texto) {
  const modalImg = document.getElementById("modal-img");
  const modalText = document.getElementById("modal-text");

  modalImg.src = src;
  modalText.textContent = texto;

  document.getElementById("modal").style.display = "block";
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

function navegar(direccion) {
  indiceActual = (indiceActual + direccion + imagenes.length) % imagenes.length;
  const img = imagenes[indiceActual];
  mostrarImagen(img.src, img.dataset.texto || "");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

document.addEventListener("DOMContentLoaded", function () {
  imagenes = Array.from(document.querySelectorAll("#galeria img"));

  imagenes.forEach((img, index) => {
    img.addEventListener("click", () => abrirModalDesdeGaleria(index));
  });

  const modal = document.getElementById("modal");
  const cerrarBtn = document.querySelector(".modal-close");
  const modalContenido = document.querySelector(".modal-contenido");

  if (cerrarBtn) {
    cerrarBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      cerrarModal();
    });
  }

  if (modal) {
    modal.addEventListener("click", cerrarModal);
  }

  if (modalContenido) {
    modalContenido.addEventListener("click", (e) => e.stopPropagation());
  }

  // Navegación con teclado
  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "block") {
      if (e.key === "Escape") cerrarModal();
      if (e.key === "ArrowRight") navegar(1);
      if (e.key === "ArrowLeft") navegar(-1);
    }
  });

  const fecha = document.getElementById("fecha");
  if (fecha) {
    fecha.textContent = new Date().toLocaleDateString("es-AR");
  }
});
