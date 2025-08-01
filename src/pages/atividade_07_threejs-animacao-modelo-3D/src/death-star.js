// console.log('Atividade 7: ThreeJs - animação elemento 3D');
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import BgCena from './assets/img/deathStar/bg0.png';
import DeathStar from './assets/img/deathStar/death-star.glb?url'; //textura blender


/***************criando a cena, câmera e renderizador******/
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const fov = 55; // Campo de visão vertical do tronco da câmera.
const aspect = window.innerWidth / window.innerHeight;// Taxa de proporção do tronco da câmera.
const near = 0.1; // Plano próximo do tronco da câmera.
const far = 1000; // Plano distante do tronco da câmera.

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z= 2;



/************************************************************ */

// Aplica mapeamento de tons ao bg
// https://threejs.org/docs/index.html#api/en/constants/Renderer
renderer.toneMapping = THREE.ACESFilmicToneMapping; // Mapeamento de tons ACES Filmic
renderer.toneMappingExposure = 0.4;

//aplica bg a cena
// img bg -> https://www.spacespheremaps.com/local-star-spheremaps/
const loaderBg = new THREE.TextureLoader();
loaderBg.load(BgCena, function(texture) { 
  scene.background = texture;
});


//luz ambiente
// Adiciona luz ambiente (iluminação geral)
                                     //cor //intensidade-0-1
const light = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(light);

//luz direcional
//https://threejs.org/docs/index.html#api/en/lights/DirectionalLight
// Adiciona luz direcional em um alvo
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 0, -15); //x y z
scene.add(directionalLight);

// https://threejs.org/docs/index.html?q=helper#api/en/helpers/DirectionalLightHelper
// obj auxiliar para visualizar a direção da luz
const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
scene.add( helper );


/********************************** */
//controles de orbita da esfera
//https://threejs.org/docs/?q=controls#examples/en/controls/OrbitControls
//permite que a camera orbite em torno do objeto
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(23, 13, 122);
console.log(camera.position);
controls.update();

//carregando o modelo 3D da Estrela da Morte
// https://threejs.org/manual/#en/loading-3d-models
let deathStarModel; 
const loaderstarDeath = new GLTFLoader();
loaderstarDeath.load(DeathStar,  function (gltf) {
    deathStarModel = gltf.scene;

    // Aproxima o modelo da câmera
    deathStarModel.position.x = -40; // opcional: centralizar horizontalmente
    deathStarModel.position.y = 10; // opcional: centralizar verticalmente
    deathStarModel.position.z = 10; // ou -50, ajuste conforme necessário
    deathStarModel.scale.set(20, 20, 20);     
    console.log(deathStarModel.position);
    scene.add(deathStarModel);
  },
  undefined,
  function (error) {
    console.error('Erro ao carregar modelo:', error);
  }
);
/*******************************/
//redimensionamento responsivo da janela
window.addEventListener('resize', onWindowResize);
// Ajusta a proporção da câmera quando a janela é redimensionada
function onWindowResize() {
  const screen_width  = window.innerWidth;
  const screen_height = window.innerHeight;

  camera.aspect = screen_width / screen_height;
	// Atualiza a matriz de projeção da câmera
  camera.updateProjectionMatrix();
	// Redimensiona o renderizador
  renderer.setSize(screen_width , screen_height);
}
/*************************************************************** */

//animacao
function animate() {
  requestAnimationFrame(animate); // loop   
  controls.update();
  if (deathStarModel) { // Só tenta rotacionar se o modelo existir
      deathStarModel.rotation.y += 0.005;
  }
    
  renderer.render(scene, camera); // renderiza a cena, ou seja, desenha a cena na tela
}

animate(); // inicia a animação
