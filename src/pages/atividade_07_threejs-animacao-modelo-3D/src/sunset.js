import * as THREE from 'three';
// OrbitControls: controles para mover a câmera com o mouse
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// Water: objeto para simular superfície de água
import { Water } from 'three/examples/jsm/objects/Water.js';
// Sky: objeto para criar um céu realista
import { Sky } from 'three/examples/jsm/objects/Sky.js';

let container;
let camera, scene, renderer;
let controls, water, sun;
let textureLoader; 

init();

function init() {
    container = document.getElementById('container');

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
    container.appendChild(renderer.domElement);

		//cria a cena
    scene = new THREE.Scene();

    // Inicializa o textureLoader
    textureLoader = new THREE.TextureLoader();    
    

		//proporção da tela
		let aspecto = window.innerWidth / window.innerHeight;

    camera = new THREE.PerspectiveCamera(55, aspecto, 1, 20000);
		// camera.position.z = 5;
    camera.position.set(30, 30, 100);

		//criacao do sol
    sun = new THREE.Vector3();

    // criacao da  geometria da Water
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

    water = new Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load('textures/waternormals.jpg', function(texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
								// scene.background = texture;
            }),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
        }
    );
    water.rotation.x = -Math.PI / 2;
    scene.add(water);

		
    // Skybox
    const sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);

   //valores para controlar o tamanho/aparencia do sol
    const skyUniforms = sky.material.uniforms;	
    skyUniforms['turbidity'].value = 1;
    skyUniforms['rayleigh'].value = 3;
    skyUniforms['mieCoefficient'].value = 0.03;
    skyUniforms['mieDirectionalG'].value = 0.8;//reflexo na agua

    const parameters = {
        elevation: 4,
        azimuth: 180
    };

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const sceneEnv = new THREE.Scene();
    let renderTarget;

    function updateSun() {
        const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
        const theta = THREE.MathUtils.degToRad(parameters.azimuth);

        sun.setFromSphericalCoords(1, phi, theta);
        sky.material.uniforms['sunPosition'].value.copy(sun);
        water.material.uniforms['sunDirection'].value.copy(sun).normalize();

        if (renderTarget !== undefined) renderTarget.dispose();

        sceneEnv.add(sky);
        renderTarget = pmremGenerator.fromScene(sceneEnv);
        scene.add(sky);

        scene.environment = renderTarget.texture;
    }

    updateSun();

    controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI;
    controls.target.set(10, 40, 50);
    controls.minDistance = 60;
    controls.maxDistance = 20000;
    controls.update();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    render();
}

function render() {
    const time = performance.now() * 0.001;
    water.material.uniforms['time'].value += 1.0 / 60.0;
    renderer.render(scene, camera);
}