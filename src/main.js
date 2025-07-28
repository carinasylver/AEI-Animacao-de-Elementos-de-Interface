const links = [
  {path: 'atividade_01_css-css3-transitions', title: 'CSS3 Transition'},
  {path: 'atividade_02_css-css3-animation', title: 'CSS3 Animation'},
  {path: 'atividade_03_bibliotecas_frameworks-animate-css', title: 'Animações com a biblioteca Animate CSS'},
]

const listAtividade = document.querySelector('#listaLinks');
//console.log(listAtividade)

links.forEach((item,index) => listAtividade.innerHTML += `
  <li>
    <a href="/src/pages/${item.path}/index.html">
      Atividade ${index+1}: ${item.title}
    </a>
  </li>
` )


