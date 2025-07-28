document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    // const cabecalho = document.querySelector(".cabecalho");
    // const apresentacao = document.querySelector(".apresentacao");
    // const causas = document.querySelector(".causas");
    // const vagas = document.querySelector(".vagas");
    // const rodape = document.querySelector(".rodape");

    const sections = [
      ".cabecalho",
      ".apresentacao",
      ".causas",
      ".vagas",
      ".rodape",
    ];

    sections.forEach((section) => {
      const elemento = document.querySelector(section);
      if (elemento?.classList.contains("skeleton")) {
        elemento.classList.remove("skeleton");
      }
    });
  }, 2000);
});
