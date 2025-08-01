const links = [
  {path: 'death-star-skybox', title: 'loader animation'},  
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