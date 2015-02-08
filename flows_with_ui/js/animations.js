function initAnimation() {
  setInitialSettings();
  generateCoord = getGenerateFunction();
  getZCoord = getZCoordFunction();
  rotateParticles = getParticleRotationFunction();

  var calcFunction = getCalculationFunction();
  calcAttractor = function() {
    calcFunction();
    if (particleNum >= particleMax)
      console.log(particleNum + " particles generated");
  }

  initAttractor();
  animateAttractor();
}

function initAttractor() {
  geometry = new THREE.Geometry();

  // randomly generate initial starting vertices
  for (var i = 0; i < particleNum * 3; i ++) {
    coords[i] = generateCoord();
  }

  // randomly generate a color for each trajectory
  for (i = 0; i < particleNum; i ++) {
    trajColors[i] = new THREE.Color(0xffffff);
    trajColors[i].setHSL(Math.random(), 1.0, 0.5);
  }

  // plot the starting vertices
  for (i = 0; i < particleNum; i ++) {
    var vertex = new THREE.Vector3();
    vertex.x = coords[i*3];
    vertex.y = coords[i*3+1];
    vertex.z = getZCoord();
    geometry.vertices.push(vertex);

    colors[i] = trajColors[i % 20];
  }

  // collapse all unused vertices into a point way off screen
  for (i = particleNum; i < particleMax; i ++) {
    var vertex = new THREE.Vector3();
    vertex.x = 1000;
    vertex.y = 1000;
    vertex.z = 1000;
    geometry.vertices.push(vertex);

    colors[i] = trajColors[i % 20];
  }

  geometry.colors = colors;

  material = new THREE.ParticleSystemMaterial({ size: particleSize, vertexColors: true, transparent: true });
  material.color.setHSL(1.0, 0.2, 0.7);

  particles = new THREE.ParticleSystem(geometry, material);
  rotateParticles();
  scene.add(particles);
}

function animateAttractor() {
  if (particleNum < particleMax)
    calcAttractor();

  renderAttractor();
  stats.update();
  requestAnimationFrame(animateAttractor);
}

function renderAttractor() {
  var time = Date.now() * 0.00005;

  if (mouseDown) {
    camera.position.x += (mouseX - camera.position.x) * 0.0001 * camera.position.z;
    camera.position.y += (- mouseY - camera.position.y) * 0.0001 * camera.position.z;
    checkCameraBounds();
  }

  camera.lookAt(scene.position);

  for (i = 0; i < scene.children.length; i ++) {
    var object = scene.children[i];

    if (object instanceof THREE.ParticleSystem) {
      object.rotation.y = time * (i < 4 ? i + 1 : - (i + 1));
    }
  }

  color = [0.95, 1, 0.5];

  h = (360 * (color[0] + time) % 360) / 360;
  material.color.setHSL(h, color[1], color[2]);

  renderer.render(scene, camera);
}