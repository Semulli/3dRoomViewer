import * as THREE from "three";
import "./style.css";

const scene = new THREE.Scene();
scene.background = new THREE.Color("#dfe9f3");

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2.7, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// ---------- HELPERS ----------
function createBox(w, h, d, color, x, y, z) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({ color })
  );

  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);

  return mesh;
}

// ---------- LIGHTS ----------
const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
scene.add(ambientLight);

const ceilingLight = new THREE.PointLight(0xffffff, 1.2, 20);
ceilingLight.position.set(0, 4.7, 0);
ceilingLight.castShadow = true;
scene.add(ceilingLight);

const lampLight = new THREE.PointLight(0xffd6a5, 1.4, 8);
lampLight.position.set(-3.6, 2.2, 1.7);
lampLight.castShadow = true;
scene.add(lampLight);

// ---------- ROOM ----------
createBox(10, 0.2, 10, "#b08968", 0, -0.1, 0); // floor
createBox(10, 5, 0.2, "#f8f4ef", 0, 2.5, -5); // back wall
createBox(0.2, 5, 10, "#eee2dc", -5, 2.5, 0); // left wall
createBox(0.2, 5, 10, "#eee2dc", 5, 2.5, 0); // right wall
createBox(10, 0.15, 10, "#ffffff", 0, 5, 0); // ceiling

// ---------- CARPET ----------
createBox(4.5, 0.05, 2.6, "#5a189a", 0, 0.05, 1.4);

// ---------- TABLE ----------
createBox(2.5, 0.2, 1.4, "#6f4e37", 0, 1.15, -1);
createBox(0.2, 1.1, 0.2, "#4b2e1f", -1, 0.55, -0.45);
createBox(0.2, 1.1, 0.2, "#4b2e1f", 1, 0.55, -0.45);
createBox(0.2, 1.1, 0.2, "#4b2e1f", -1, 0.55, -1.55);
createBox(0.2, 1.1, 0.2, "#4b2e1f", 1, 0.55, -1.55);

// laptop
createBox(1.2, 0.08, 0.8, "#1f2937", 0, 1.32, -1);
const screen = createBox(1.2, 0.75, 0.08, "#111827", 0, 1.75, -1.4);
screen.rotation.x = -0.25;

// ---------- SOFA ----------
createBox(3.2, 0.6, 1.1, "#7b2cbf", 0, 0.45, 2.3);
createBox(3.2, 1.2, 0.3, "#5a189a", 0, 1.05, 2.8);
createBox(0.3, 0.9, 1.1, "#5a189a", -1.75, 0.8, 2.3);
createBox(0.3, 0.9, 1.1, "#5a189a", 1.75, 0.8, 2.3);

// pillows
createBox(0.75, 0.45, 0.2, "#ffafcc", -0.8, 1.0, 2.62);
createBox(0.75, 0.45, 0.2, "#bde0fe", 0.2, 1.0, 2.62);

// ---------- WINDOW ----------
createBox(2.3, 1.5, 0.08, "#90e0ef", -2.6, 3, -4.88);
createBox(2.5, 0.12, 0.12, "#333", -2.6, 3.75, -4.82);
createBox(2.5, 0.12, 0.12, "#333", -2.6, 2.25, -4.82);
createBox(0.12, 1.6, 0.12, "#333", -3.85, 3, -4.82);
createBox(0.12, 1.6, 0.12, "#333", -1.35, 3, -4.82);
createBox(0.1, 1.5, 0.12, "#333", -2.6, 3, -4.8);

// ---------- DOOR ----------
createBox(1.35, 2.55, 0.1, "#8d5524", 3, 1.25, -4.85);
createBox(0.12, 0.12, 0.12, "#ffd700", 3.5, 1.25, -4.7);

// ---------- WALL PAINTINGS ----------
createBox(1.4, 0.9, 0.08, "#212529", 1.1, 3.2, -4.8);
createBox(1.1, 0.65, 0.09, "#ffb703", 1.1, 3.2, -4.73);

createBox(1.4, 0.9, 0.08, "#212529", 3.2, 3.2, -4.8);
createBox(1.1, 0.65, 0.09, "#219ebc", 3.2, 3.2, -4.73);

// ---------- LAMP ----------
createBox(0.15, 1.4, 0.15, "#3a3a3a", -3.6, 0.8, 1.7);
createBox(0.8, 0.15, 0.8, "#3a3a3a", -3.6, 0.1, 1.7);

const lampShade = new THREE.Mesh(
  new THREE.ConeGeometry(0.55, 0.75, 32),
  new THREE.MeshStandardMaterial({ color: "#ffcad4" })
);
lampShade.position.set(-3.6, 1.7, 1.7);
lampShade.castShadow = true;
scene.add(lampShade);

// ---------- CEILING FAN ----------
const fanGroup = new THREE.Group();
const fanCenter = createBox(0.35, 0.15, 0.35, "#333", 0, 4.72, 0);
fanGroup.add(fanCenter);

const blade1 = createBox(2.2, 0.05, 0.25, "#444", 0, 4.65, 0);
const blade2 = createBox(0.25, 0.05, 2.2, "#444", 0, 4.65, 0);
fanGroup.add(blade1);
fanGroup.add(blade2);
scene.add(fanGroup);

// ---------- CAMERA MOVEMENT ----------
const keys = {};
window.addEventListener("keydown", (e) => (keys[e.key.toLowerCase()] = true));
window.addEventListener("keyup", (e) => (keys[e.key.toLowerCase()] = false));

let yaw = 0;
let pitch = 0;
let isMouseDown = false;

window.addEventListener("mousedown", () => (isMouseDown = true));
window.addEventListener("mouseup", () => (isMouseDown = false));

window.addEventListener("mousemove", (e) => {
  if (!isMouseDown) return;

  yaw -= e.movementX * 0.003;
  pitch -= e.movementY * 0.003;
  pitch = Math.max(-0.8, Math.min(0.8, pitch));
});

function moveCamera() {
  const speed = 0.08;

  const forward = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));
  const right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));

  if (keys["w"]) camera.position.addScaledVector(forward, -speed);
  if (keys["s"]) camera.position.addScaledVector(forward, speed);
  if (keys["a"]) camera.position.addScaledVector(right, -speed);
  if (keys["d"]) camera.position.addScaledVector(right, speed);
  if (keys["q"]) camera.position.y += speed;
  if (keys["e"]) camera.position.y -= speed;

  camera.rotation.order = "YXZ";
  camera.rotation.y = yaw;
  camera.rotation.x = pitch;
}

// ---------- UI ----------
const info = document.createElement("div");
info.className = "info";
info.innerHTML = `
  <h2>3D Room Viewer</h2>
  <p><b>WASD</b> - move</p>
  <p><b>Q / E</b> - up / down</p>
  <p><b>Hold Mouse</b> - look around</p>
  <button id="modeBtn">Night Mode</button>
`;
document.body.appendChild(info);

let nightMode = false;

document.getElementById("modeBtn").addEventListener("click", () => {
  nightMode = !nightMode;

  if (nightMode) {
    scene.background = new THREE.Color("#0b132b");
    ambientLight.intensity = 0.15;
    ceilingLight.intensity = 0.35;
    lampLight.intensity = 2.5;
    document.getElementById("modeBtn").textContent = "Day Mode";
  } else {
    scene.background = new THREE.Color("#dfe9f3");
    ambientLight.intensity = 0.45;
    ceilingLight.intensity = 1.2;
    lampLight.intensity = 1.4;
    document.getElementById("modeBtn").textContent = "Night Mode";
  }
});

// ---------- ANIMATION ----------
function animate() {
  requestAnimationFrame(animate);

  moveCamera();

  fanGroup.rotation.y += 0.05;

  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});