document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const sections = {
      header: [
        ".cabecalho",
        ".logo",
        ".navegacao__menu__links_autenticacao",
        ".btn__cadastro.skeleton",
        ".navegacao__menu__links",
        ".navegacao__menu__link",
        ".btn__login",
        ".btn__cadastro",
      ],
      apresentacao: [
        ".apresentacao__container",
        ".apresentacao__card__titulo",
        ".destaque1",
        ".destaque2",
        ".apresentacao__btn__cadastro",
        ".apresentacao__card__imagem",
        ".apresentacao__imagem",
      ],
      causas: [
        ".causas",
        ".causas__titulo",
        ".causas__card",
        ".causas__img",
        ".causas__card__titulo",
      ],
      vagas: [
        ".vagas",
        ".vagas__titulo",
        ".vagas__card",
        ".vagas__img",
        ".vagas__card__imagem",
        ".vagas__card .skeleton img",
        ".vagas__card__conteudo",
        ".vagas__card__titulo",
        ".btn__vaga",
      ],
      rodape: [
        ".rodape",
        ".rodape__navegacao",
        ".rodape__projeto",
        ".rodape__titulo",
        ".rodape__texto",
        ".rodape__redes__links.skeleton i.fa-brands",
        ".rodape__app__link",
        ".rodape__app__link .skeleton img",
        ".rodape__links",
        ".rodape__links__titulo",
        ".rodape__links__item",
        ".rodape__newsletter",
        ".rodape__titulo",
        ".rodape__newsletter__form",
      ],
    };

    // remove skeletons
    const removeSkeletons = (selectors) => {
      selectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          if (element.classList.contains("skeleton")) {
            element.classList.remove("skeleton");
          }
        });
      });
    };

    // remove skeletons de todas as seções
    Object.values(sections).forEach((section) => {
      removeSkeletons(section);
    });
  }, 2000);
});
