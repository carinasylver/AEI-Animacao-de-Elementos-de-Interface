const links = [
  {path: 'tarefa_1', title: 'loader animation'}, 
  {path: 'tarefa_2', title: 'loader animation efeito hover'}, 
  {path: 'tarefa_3', title: 'loader animation bit efeito hover'}, 
  {path: 'tarefa_4', title: 'loader progress animation'}, 
  {path: 'tarefa_5', title: 'sprite duende animation'}, 
  {path: 'tarefa_6', title: 'skeleton animation'}, 
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