const link = {
  path: 'atividade_01_css-css3-transitions', title: 'CSS Transition'
};

const linkAtividade = document.querySelector('#listaLinks');
console.log(linkAtividade)

linkAtividade.innerHTML += `
  <li>
    <a href="/src/pages/${link.path}/index.html">
      Atividade 01: ${link.title}
    </a>
  </li>
`;

