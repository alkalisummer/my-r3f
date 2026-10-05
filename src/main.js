import './style.css';
import * as Three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const renderer = new Three.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.y = 1;
camera.position.z = 5;

const directionalLight = new Three.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true;
directionalLight.position.set(3, 4, 5);
directionalLight.lookAt(0, 0, 0);
scene.add(directionalLight);

const floorGeometry = new Three.PlaneGeometry(20, 20);
const floorMaterial = new Three.MeshStandardMaterial({ color: 0xbbbbbb });
const floor = new Three.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

const geometry = new Three.BoxGeometry(1, 1, 1);
const material = new Three.MeshStandardMaterial({ color: 0xff0000 });
const mesh = new Three.Mesh(geometry, material);
mesh.castShadow = true;
mesh.position.y = 0.5;
scene.add(mesh);

const capsuleGeometry = new Three.CapsuleGeometry(1, 2, 20, 30);
const capsuleMaterial = new Three.MeshStandardMaterial({ color: 0xffff00 });
const capsuleMesh = new Three.Mesh(capsuleGeometry, capsuleMaterial);
scene.add(capsuleMesh);

capsuleMesh.position.set(3, 1.75, 0);
capsuleMesh.castShadow = true;
capsuleMesh.receiveShadow = true;
scene.add(capsuleMesh);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

render();
