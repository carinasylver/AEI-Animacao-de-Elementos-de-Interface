const links = [
  {path: 'tarefa_1', title: 'efeitos de transição utilizando as regras CSS'}, 
]

const listAtividade = document.querySelector('#listaLinks');
//console.log('main atividade1')

links.forEach((item,index) => listAtividade.innerHTML += `
  <li>
    <a href="src/pages/${item.path}/index.html"
    class="py-1 text-2xl text-gray-900 w-full rounded-lg transition duration-300 hover:bg-blue-100 underline">
      Tarefa ${index+1}: ${item.title}
    </a>
  </li>
` )