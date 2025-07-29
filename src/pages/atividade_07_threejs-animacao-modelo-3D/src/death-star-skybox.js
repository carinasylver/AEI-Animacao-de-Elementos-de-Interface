// console.log('Atividade 7: ThreeJs - animação elemento 3D');
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import BgCena from './assets/img/deathStar/bg3.png'; //bg esfera
import DeathStar from './assets/img/deathStar/death-star.glb?url'; //textura blender

const fov = 75; // Campo de visão vertical do tronco da câmera.
const aspect = window.innerWidth / window.innerHeight; // Taxa de proporção do tronco da câmera.
const near = 0.1; // Plano próximo do tronco da câmera.
const far = 1000; // Plano distante do tronco da câmera.

/***************criando a cena, câmera e renderizador******/
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x000000); default background color

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// camera.position.z= 5;
camera.position.z = 1;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
/************************************************ */


//doc geometries
// https://threejs.org/docs/index.html#api/en/geometries/SphereGeometry
//crio a esfera 
const geometry = new THREE.SphereGeometry( 1, 32, 16 ); // 1, 32 segmentos ao longo do eixo horizontal, 16 segmentos ao longo do eixo vertical

//doc loaders 
// https://threejs.org/docs/index.html?q=texture#api/en/loaders/TextureLoader
//crio a textura da esfera
// const texture = new THREE.TextureLoader().load('/assets/img/12.jpg');
const texture = new THREE.TextureLoader().load(BgCena);//

const material = new THREE.MeshBasicMaterial( { 
  // color: 0xffffff,
  map:texture,
  side: THREE.BackSide
} );

const sphere = new THREE.Mesh( geometry, material );
scene.add(sphere);


//luz ambiente na estrela
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

// // https://threejs.org/docs/index.html?q=helper#api/en/helpers/DirectionalLightHelper
// // obj auxiliar para visualizar a direção da luz
// const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
// scene.add( helper );


// doc controls
//https://threejs.org/docs/?q=controls#examples/en/controls/OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// console.log(camera.position);


// Aplica mapeamento de tons 
// https://threejs.org/docs/index.html#api/en/constants/Renderer
renderer.toneMapping = THREE.AgXToneMapping// Mapeamento de tons ACES Filmic
renderer.toneMappingExposure = 0.6;

//loaders
//carregando o modelo 3D da Estrela da Morte
// https://threejs.org/manual/#en/loading-3d-models

let deathStarModel; 
const loaderstarDeath = new GLTFLoader();
loaderstarDeath.load(DeathStar,  function (gltf) {
    deathStarModel = gltf.scene;
    deathStarModel.scale.set(0.2, 0.2, 0.2);     
    deathStarModel.position.y = 0.2;     
    deathStarModel.position.x = 0.2; 
    scene.add(deathStarModel);
  },
  undefined,
  function (error) {
    console.error('Erro ao carregar modelo:', error);
  }
);

/**************redimensionamento responsivo da janela*****/
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
  //sphere.rotation.y += 0.005; // rotação da esfera
  if (deathStarModel) { // Só tenta rotacionar se o modelo existir
      deathStarModel.rotation.y += 0.005;
  }
  controls.update();
  renderer.render(scene, camera); // renderiza a cena, ou seja, desenha a cena na tela
}

animate(); 



