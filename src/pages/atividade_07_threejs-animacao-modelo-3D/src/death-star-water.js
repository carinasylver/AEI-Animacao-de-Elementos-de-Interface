import * as THREE from 'three';

// OrbitControls: controles para mover a câmera com o mouse
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// Water: objeto para simular superfície de água
import { Water } from 'three/examples/jsm/objects/Water.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
// BgStar: imagem de fundo do espaço
import BgStar from './assets/img/deathStar/bg3.png'; //bg esfera

// container: elemento HTML que conterá a cena
let container;
// camera, scene, renderer: os três componentes principais do Three.js
let camera, scene, renderer;
// controls: controles de órbita
// water: objeto de água
let controls, water;

init();

function init() {
	// Obtém o elemento HTML com id "container" onde a cena será renderizada
  container = document.getElementById('container');

	//renderizador
	// Cria um renderizador WebGL com antialiasing
  renderer = new THREE.WebGLRenderer({ antialias: true });
	// Ajusta para a proporção de pixels do dispositivo
  renderer.setPixelRatio(window.devicePixelRatio);
	// Define o tamanho para ocupar toda a janela
  renderer.setSize(window.innerWidth, window.innerHeight);
	// Configura o loop de animação
  renderer.setAnimationLoop(animate);
	// Aplica mapeamento de tons para realismo visual 
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.5;
	// Adiciona o renderizador ao container
  container.appendChild(renderer.domElement);

	//criacao da cena e luz
	// Cria uma nova cena 3D
  scene = new THREE.Scene();

	//luz ambiente
	// Adiciona luz ambiente (iluminação geral)
  const light = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(light);

	//luz direcional
	// Adiciona luz direcional (simula o sol/direcional)
  const plight = new THREE.DirectionalLight(0xffffff, 10);
  plight.position.set(3, 20, -15);
  scene.add(plight);

	//posicao da camera
	// Cria câmera perspectiva com campo de visão de 55 graus
  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
	// Posiciona a câmera nas coordenadas (30, 30, 100)
  camera.position.set(30, 30, 100);

  //criacao da agua
	// Cria um plano gigante (70.000x70.000 unidades) como superfície de água
  const waterGeometry = new THREE.PlaneGeometry(70000, 70000);

  water = new Water(waterGeometry, {
    textureWidth: 312,
    textureHeight: 312,
    waterNormals: new THREE.TextureLoader().load('/textures/waternormals.jpg', texture => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    }),

		//parametros luz do sol na agua
		// Configura texturas e propriedades da água:
    sunDirection: new THREE.Vector3(),
    sunColor: 0x1a0000,     // Roxo sombrio (brilho Sith)
    waterColor: 0x8b0000,
    distortionScale: 4.0, //Escala de distorção para efeito de ondulação
    fog: scene.fog !== undefined,
  });

	// Rotaciona o plano para ficar horizontal
  water.rotation.x = -Math.PI / 2;
	// Adiciona a água à cena
  scene.add(water);


  const modelPath = "textures/deathStar/";
  const filename = "death-star";
	
	// Cria carregadores para materiais (MTL) e geometria (OBJ)
  const manager = new THREE.LoadingManager();
  const mtlLoader = new MTLLoader(manager);
  const objLoader = new OBJLoader();
  const textureLoader = new THREE.TextureLoader();

  //criacao estrela da morta
  let starDeath;

  function loadObj() {
    mtlLoader.setPath(modelPath).load(filename + ".mtl", materials => {
      materials.preload();
      objLoader.setMaterials(materials);
      objLoader.setPath(modelPath).load(filename + ".obj", object => {
        starDeath = object;
        starDeath.scale.set(15, 15, 15);
        //starDeath.rotation.x = THREE.MathUtils.degToRad(10);
        //starDeath.rotation.y = THREE.MathUtils.degToRad(90);
        starDeath.position.y = 50;
        starDeath.position.z = -0.5;
        scene.add(starDeath);

        textureLoader.load(BgStar, texture => {
          scene.background = texture;
        });
      });
    });
  }

  loadObj();

  controls = new OrbitControls(camera, renderer.domElement);
  //controls.maxPolarAngle = Math.PI;
  controls.target.set(20, 40, 50); //faz girar em torno do ponto (20, 40, 50)
  controls.minDistance = 100.0;//nao some ao rotacionar
  controls.maxDistance = 20000;
  controls.update();


  const waterUniforms = water.material.uniforms;
  folderWater.add(waterUniforms.distortionScale, 'value', 0, 8, 0.1).name('distortionScale');
  folderWater.add(waterUniforms.size, 'value', 0.1, 10, 0.1).name('size');
  folderWater.open();

	//redimensionamento responsivo da janela
  window.addEventListener('resize', onWindowResize);
}

// Ajusta a proporção da câmera quando a janela é redimensionada
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
	// Atualiza a matriz de projeção da câmera
  camera.updateProjectionMatrix();
	// Redimensiona o renderizador
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// render(): atualiza o tempo da água (para animação das ondas) e renderiza a cena
function render() {
   const time = performance.now() * 0.001;
  water.material.uniforms['time'].value += 1.0 / 60.0;
  renderer.render(scene, camera);
}

function animate() {
  render();
}