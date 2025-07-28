document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    // const cabecalho = document.querySelector(".cabecalho");
    // console.log(cabecalho);
    // const logo = document.querySelector(".logo");
    // console.log(logo);
    // const menu__links = document.querySelector(".navegacao__menu__links");
    // console.log(menu__links);
    // const autenticacao = document.querySelector(
    //   ".navegacao__menu__links_autenticacao"
    // );
    // console.log(autenticacao);

    const sectionHeader = [
      ".cabecalho",
      ".logo",
      ".navegacao__menu__links_autenticacao",
      ".btn__cadastro.skeleton",
      ".navegacao__menu__links",
      ".navegacao__menu__link",
      ".btn__login",
      ".btn__cadastro",
    ];

    const sectionApresentacao = [
      ".apresentacao__container",
      ".apresentacao__card__titulo",
      ".destaque1",
      ".destaque2",
      ".apresentacao__btn__cadastro",
      ".apresentacao__card__imagem",
      ".apresentacao__imagem",
    ];

    const sectionCausas = [
      ".causas",
      ".causas__titulo",
      ".causas__card",
      ".causas__img",
      ".causas__card__titulo",
    ];

    const sectionVagas = [
      ".vagas",
      ".vagas__titulo",
      ".vagas__card",
      ".causas__img",
      ".vagas__card__imagem",
      ".vagas__card .skeleton img",
      ".vagas__card__conteudo",
      ".vagas__card__titulo",
      ".vagas__card__conteudo ",
      ".btn__vaga ",
    ];

    sectionHeader.forEach((classe) => {
      const elemento1 = document.querySelector(classe);
      if (elemento1?.classList.contains("skeleton")) {
        elemento1.classList.remove("skeleton");
      }
    });

    sectionApresentacao.forEach((classe) => {
      const elemento2 = document.querySelector(classe);
      if (elemento2?.classList.contains("skeleton")) {
        elemento2.classList.remove("skeleton");
      }
    });

    sectionCausas.forEach((classe) => {
      const elemento3 = document.querySelector(classe);
      if (elemento3?.classList.contains("skeleton")) {
        elemento3.classList.remove("skeleton");
      }
    });

    sectionVagas.forEach((classe) => {
      const elemento4 = document.querySelector(classe);
      if (elemento4?.classList.contains("skeleton")) {
        elemento4.classList.remove("skeleton");
      }
    });

    const menuLink = document.querySelectorAll(".navegacao__menu__link");
    menuLink.forEach((link) => {
      if (link.classList.contains("skeleton")) {
        link.classList.remove("skeleton");
      }
    });
  }, 2000);
});
