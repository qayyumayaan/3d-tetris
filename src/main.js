import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { matrix, updateMatrix } from './tetris.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setX(1.66);
camera.position.setY(7.5);
camera.position.setZ(38);


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(pointLight, ambientLight, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function createGrid() {
  const cubeSize = 2;

  scene.remove(...scene.children.filter(child => child.type === 'Mesh'));

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const cubeMaterial = new THREE.MeshStandardMaterial({ color: matrix[i][j] !== 0 ? 0xff0000 : 0x0000ff });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

      cube.position.x = j * cubeSize;
      cube.position.y = -i * cubeSize;
      cube.position.z = 0;

      scene.add(cube);
    }
  }
}

createGrid();

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

animate();

setInterval(() => {
  updateMatrix();
  createGrid();
}, 1000);
