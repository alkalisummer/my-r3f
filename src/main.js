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

const cylinderGeometry = new Three.CylinderGeometry(1, 1, 2);
const cylinderMaterial = new Three.MeshStandardMaterial({ color: 0x00ff00 });
const cylinderMesh = new Three.Mesh(cylinderGeometry, cylinderMaterial);
cylinderMesh.position.set(-3, 1, 0);
cylinderMesh.castShadow = true;
cylinderMesh.receiveShadow = true;
scene.add(cylinderMesh);

const torusGeometry = new Three.TorusGeometry(0.5, 0.1, 16, 100);
const torusMaterial = new Three.MeshStandardMaterial({ color: 0x0000ff });
const torusMesh = new Three.Mesh(torusGeometry, torusMaterial);
torusMesh.position.set(0, 0.5, 1);
torusMesh.castShadow = true;
torusMesh.receiveShadow = true;
scene.add(torusMesh);

const starShape = new Three.Shape();
starShape.moveTo(0, 1);
starShape.lineTo(0.2, 0.2);
starShape.lineTo(1, 0.2);
starShape.lineTo(0.4, -0.1);
starShape.lineTo(0.6, -1);
starShape.lineTo(0, -0.5);
starShape.lineTo(-0.6, -1);
starShape.lineTo(-0.4, -0.1);
starShape.lineTo(-1, 0.2);
starShape.lineTo(-0.2, 0.2);

const shapeGeometry = new Three.ShapeGeometry(starShape);
const shapeMaterial = new Three.MeshStandardMaterial({ color: 0xff00ff });
const shapeMesh = new Three.Mesh(shapeGeometry, shapeMaterial);
shapeMesh.position.set(0, 1, 2);
scene.add(shapeMesh);

const extrudeSettings = { step: 1, depth: 0.1, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.3, bevelSegments: 100 };

const extrudeGeometry = new Three.ExtrudeGeometry(starShape, extrudeSettings);
const extrudeMaterial = new Three.MeshStandardMaterial({ color: 0x0ddaaf });
const extrudeMesh = new Three.Mesh(extrudeGeometry, extrudeMaterial);
extrudeMesh.position.set(2, 1.3, 2);
extrudeMesh.castShadow = true;
extrudeMesh.receiveShadow = true;
scene.add(extrudeMesh);

const sphereGeometry = new Three.SphereGeometry(1, 32, 32);
const sphereMaterial = new Three.MeshStandardMaterial({ color: 0x98daaf });
const sphereMesh = new Three.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.position.set(0, 1, -3);
sphereMesh.castShadow = true;
sphereMesh.receiveShadow = true;
scene.add(sphereMesh);

const numPoints = 1000;
const positions = new Float32Array(numPoints * 3);

for (let i = 0; i < numPoints; i++) {
  const x = (Math.random() - 0.5) * 1;
  const y = (Math.random() - 0.5) * 1;
  const z = (Math.random() - 0.5) * 1;
  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 2] = z;
}

const bufferGeometry = new Three.BufferGeometry();
bufferGeometry.setAttribute('position', new Three.BufferAttribute(positions, 3));
const pointsMaterial = new Three.PointsMaterial({ color: 0xffff00, size: 0.05 });
const pointsMesh = new Three.Points(bufferGeometry, pointsMaterial);
pointsMesh.position.set(0, 5, -5);
scene.add(pointsMesh);

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
