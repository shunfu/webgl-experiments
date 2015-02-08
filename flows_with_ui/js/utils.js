function addPoint(x, y, z) {
  geometry.vertices[particleNum].x = x;
  geometry.vertices[particleNum].y = y;
  geometry.vertices[particleNum].z = z;
  geometry.verticesNeedUpdate = true;
  renderer.clear();
}

function resetAnimation() {
  geometry.__webglVertexBuffer = null;
  geometry.__webglColorBuffer = null;
  renderer.clear();
  removeAllParticleSystems();
}

function removeAllParticleSystems() {
  for (i = scene.children.length - 1; i >= 0; i --) {
    var object = scene.children[i];
    if (object instanceof THREE.ParticleSystem)
      scene.remove(object);
  }
}

function checkCameraBounds() {
  if (camera.position.x > 400)
    camera.position.x = 400;
  else if (camera.position.x < -400)
    camera.position.x = -400

  if (camera.position.y > 400)
    camera.position.y = 400;
  else if (camera.position.y < -400)
    camera.position.y = -400;
}

function setInitialSettingsValues(z, num, max, size) {
  coords = [];
  trajColors = [];
  colors = [];

  camera.near = 0.01;
  camera.far = 3000;
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = z;

  particleNum = num;
  particleMax = max;
  particleSize = size;
}

function setInitialSettings() {
  switch(selectedAttractor) {
    case 0: // lorenz
      setInitialSettingsValues(150, 20, 10000, 0.3);
      break;
    case 1: // rossler
      setInitialSettingsValues(75, 20, 10000, 0.3);
      break;
    case 2: // henon
      setInitialSettingsValues(2, 20, 2500, 0.01);
      break;
    case 3: // chua
      setInitialSettingsValues(5, 20, 10000, 0.01);
      break;
    case 4: // vanderpol
      setInitialSettingsValues(7, 20, 10000, 0.01);
      break;
    case 5: // rab fab
      setInitialSettingsValues(35, 40, 10000, 0.15);
      break;
    case 6: // tinkerbell
      setInitialSettingsValues(3, 20, 10000, 0.01);
      break;
    case 7: // ikeda
      setInitialSettingsValues(20, 40, 2000, 0.0075);
      break;
    case 8: // rainey
      setInitialSettingsValues(100, 20, 2500, 0.3);
      break;
    case 9: // fu
      setInitialSettingsValues(100, 20, 10000, 0.3);
      break;
  }
}

function getGenerateFunction() {
  switch(selectedAttractor) {
    case 0: // lorenz
    case 1: // rossler
    case 8: // rainey
    case 9: // fu
      return function() { return Math.random() * 30 - 15; }
      break;
    case 2: // henon
    case 3: // chua
      return function() { return Math.random() * 1 - .5; }
      break;
    case 4: // vanderpol
      return function() { return Math.random() * 6 - 3; }
      break;
    case 5: // rab fab
      return function() { return Math.random() * 10 - 5; }
      break;
    case 6: // tinkerbell
      return function() { return Math.random() * 2 - 1; }
      break;
    case 7: // ikeda
      return function() { return Math.random() * 40 - 20; }
      break;
  }
}

function getZCoordFunction() {
  if (selectedAttractor == 2 || selectedAttractor == 4 || selectedAttractor == 6 || selectedAttractor == 7) {
    return function() { return 0; }
  } else {
    return function() { return coords[i*3+2]; }
  }
}

function getParticleRotationFunction() {
  if (selectedAttractor == 2 || selectedAttractor == 4 || selectedAttractor == 6 || selectedAttractor == 7) {
    return function() {
      particles.rotation.x = Math.random() * 6;
    }
  } else {
    return function() {
      particles.rotation.x = Math.random() * 6;
      particles.rotation.y = Math.random() * 6;
      particles.rotation.z = Math.random() * 6;
    }
  }
}

function getCalculationFunction() {
  return attractors[selectedAttractor];
}