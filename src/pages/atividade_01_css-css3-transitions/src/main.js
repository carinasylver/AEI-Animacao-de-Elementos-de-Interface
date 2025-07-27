const links = [
  {path: 'tarefa_1', title: 'efeitos de transição utilizando as regras CSS'}, 
]

const listAtividade = document.querySelector('#listaLinks');
//console.log('main atividade1')

links.forEach((item,index) => listAtividade.innerHTML += `
  <li>
    <a href="src/pages/${item.path}/index.html">
      Tarefa ${index+1}: ${item.title}
    </a>
  </li>
` )