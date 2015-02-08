if (!Detector.webgl) Detector.addGetWebGLMessage();

var container, stats;
var camera, scene, renderer, particles, geometry, material, parameters, i, h, color;
var coords = [];
var trajColors = [];
var colors = [];

var particleNum = 0, particleMax = 0, particleSize = 0.3;
var generateCoord, getZCoord, rotateParticles, calcAttractor;
var selectedAttractor = 0;

var mouseX = 0, mouseY = 0;
var mouseDown = false;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

container = document.getElementById('container');

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);

scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.0007);

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
container.appendChild(stats.domElement);

document.addEventListener('mousemove', onDocumentMouseMove, false);
document.getElementById("container").addEventListener('mousedown', onDocumentMouseDown, false);
document.getElementById("container").addEventListener('mouseup', onDocumentMouseUp, false);
window.addEventListener('resize', onWindowResize, false);

initGUI();
initAnimation();

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onDocumentMouseDown(event) {
  mouseDown = true;
}

function onDocumentMouseUp(event) {
  mouseDown = false;
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}