const links = [
  {path: 'atividade_01_tarefa_1', title: 'animação formulario'}, 
  {path: 'atividade_01_tarefa_2', title: 'animações usando classes da animatecss'}, 
  {path: 'atividade_02', title: 'skeleton'},
]

const listTarefas = document.querySelector('#listaLinks');
//console.log('main atividade2')

links.forEach((item,index) => listTarefas.innerHTML += `
  <li>
    <a href="src/pages/${item.path}/index.html">
      Tarefa ${index+1}: ${item.title}
    </a>
  </li>
` )