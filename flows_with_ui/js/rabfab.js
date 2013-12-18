function rabfabInit() {
    coords = [];
    trajColors = [];
    colors = [];
    particleNum = 0;

    camera.near = 0.1;
    camera.far = 300;
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 25;

    geometry = new THREE.Geometry();

    // randomly generate 40 initial starting vertices
    for (var i = 0; i < 120; i ++) {
        coords[i] = Math.random() * 10 - 5;
    }

    // randomly generate a color for each trajectory
    for (i = 0; i < 40; i ++) {
        trajColors[i] = new THREE.Color(0xffffff);
        trajColors[i].setHSL(Math.random(), 1.0, 0.5);
    }

    // plot the starting vertices
    for (i = 0; i < 40; i ++) {
        var vertex = new THREE.Vector3();
        vertex.x = coords[i*3];
        vertex.y = coords[i*3+1];
        vertex.z = coords[i*3+2];

        geometry.vertices.push(vertex);

        particleNum ++;

        colors[i] = trajColors[i % 20];
    }

    // collapse all unused vertices into a point way off screen
    for (i = 40; i < 10000; i ++) {
        var vertex = new THREE.Vector3();
        vertex.x = 1000;
        vertex.y = 1000;
        vertex.z = 1000;

        geometry.vertices.push(vertex);

        colors[i] = trajColors[i % 20];
    }

    geometry.colors = colors;

    material = new THREE.ParticleSystemMaterial({ size: 0.15, vertexColors: true, transparent: true });
    material.color.setHSL(1.0, 0.2, 0.7);

    particles = new THREE.ParticleSystem(geometry, material);

    particles.rotation.x = Math.random() * 6;
    particles.rotation.y = Math.random() * 6;
    particles.rotation.z = Math.random() * 6;

    scene.add(particles);
}

function rabfabAnimate() {
    if (execute && which == 6) {
        requestAnimationFrame(rabfabAnimate);

        if (particleNum < 10000) {
            calcRabFab();
        }

        rabfabRender();

        stats.update();
    } else {
        return;
    }
}

function rabfabRender() {
    var time = Date.now() * 0.00005;

    camera.position.x += (mouseX - camera.position.x) * 0.005;
    camera.position.y += (- mouseY - camera.position.y) * 0.005;

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

function calcRabFab() {
    /**
    * dx/dt = y * (z - 1 + x^2) + gamma * x
    * dy/dt = x * (3 * z + 1 - x^2) + gamma * y
    * dz/dt = - 2 * z * (alpha + x * y)
    **/

    var alpha = 0.98;
    var gamma = 0.1;
    var dt = .015;

    for (var i = 0; i < coords.length; i += 3) {
        var x0 = coords[i];
        var y0 = coords[i+1];
        var z0 = coords[i+2];

        coords[i] = x0 + (y0 * (z0 - 1 + x0 * x0) + gamma * x0) * dt;
        coords[i+1] = y0 + (x0 * (3 * z0 + 1 - x0 * x0) + gamma * y0) * dt;
        coords[i+2] = z0 + (- 2 * z0 * (alpha + x0 * y0)) * dt;

        addPoint(coords[i], coords[i+1], - coords[i+2]);

        particleNum ++;
    }

    console.log(particleNum);
}