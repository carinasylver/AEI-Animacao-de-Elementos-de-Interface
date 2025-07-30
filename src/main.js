const links = [
  {path: 'atividade_01_css-css3-transitions', title: 'CSS3 Transition'},
  {path: 'atividade_02_css-css3-animation', title: 'CSS3 Animation'},
  {path: 'atividade_03_bibliotecas_frameworks-animate-css', title: 'Animações com a biblioteca Animate CSS'},
  {path: 'atividade_04_bibliotecas_frameworks-animeJS', title: 'Animações com a biblioteca Anime JS'},
  {path: 'atividade_05_bibliotecas_frameworks-tailwind-svgator', title: 'Animações com framework Tailwind CSS'},
  {path: 'atividade_06_bibliotecas_frameworks-slides-parallax', title: 'Animações slider com a biblioteca swiper'},
  {path: 'atividade_07_threejs-animacao-modelo-3D', title: 'Animações com a biblioteca ThreeJS'},
]

const listAtividade = document.querySelector('#listaLinks');
//console.log(listAtividade)

links.forEach((item,index) => listAtividade.innerHTML += `
  <li class="mb-2 border-l-4 pl-4 border-purple-600">
    <a href="/src/pages/${item.path}/index.html" class="block py-1 rounded transition duration-200 hover:bg-blue-100 hover:text-blue-600"
     >
      Atividade ${index+1}: ${item.title}
    </a>
  </li>
` )


