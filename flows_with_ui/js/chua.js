function chuaInit() {
    coords = [];
    trajColors = [];
    colors = [];
    particleNum = 0;

    camera.near = 0.05;
    camera.far = 250;
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 5;

    geometry = new THREE.Geometry();

    // randomly generate 20 initial starting vertices
    for (var i = 0; i < 60; i ++) {
        coords[i] = Math.random() * 1 - .5;
    }

    // randomly generate a color for each trajectory
    for (i = 0; i < 20; i ++) {
        trajColors[i] = new THREE.Color(0xffffff);
        trajColors[i].setHSL(Math.random(), 1.0, 0.5);
    }

    // plot the starting vertices
    for (i = 0; i < 20; i ++) {
        var vertex = new THREE.Vector3();
        vertex.x = coords[i*3];
        vertex.y = coords[i*3+1];
        vertex.z = coords[i*3+2];

        geometry.vertices.push(vertex);

        particleNum ++;

        colors[i] = trajColors[i % 20];
    }

    // collapse all unused vertices into a point way off screen
    for (i = 20; i < 10000; i ++) {
        var vertex = new THREE.Vector3();
        vertex.x = 1000;
        vertex.y = 1000;
        vertex.z = 1000;

        geometry.vertices.push(vertex);

        colors[i] = trajColors[i % 20];
    }

    geometry.colors = colors;

    material = new THREE.ParticleSystemMaterial({ size: 0.01, vertexColors: true, transparent: true });
    material.color.setHSL(1.0, 0.2, 0.7);

    particles = new THREE.ParticleSystem(geometry, material);

    particles.rotation.x = Math.random() * 6;
    particles.rotation.y = Math.random() * 6;
    particles.rotation.z = Math.random() * 6;

    scene.add(particles);
}

function chuaAnimate() {
    if (execute && which == 4) {
        requestAnimationFrame(chuaAnimate);

        if (particleNum < 10000) {
            calcChua();
        }

        chuaRender();

        stats.update();
    } else {
        return;
    }
}

function chuaRender() {
    var time = Date.now() * 0.00005;

    camera.position.x += (mouseX - camera.position.x) * 0.0005;
    camera.position.y += (- mouseY - camera.position.y) * 0.0005;

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

function calcChua() {
    /**
    * dx/dt = alpha * (y - x - f(x))
    * dy/dt = x - y + z
    * dz/dt = - beta * y
    * f(x) = m1 * x + (m0-m1)/2 * |x+1| - |x-1|)
    *
    * The equation for f(x) was taken from matlab code provided on http://www.chuacircuits.com/matlabsim.php
    **/

    var alpha = 15.6;
    var beta = 28;
    var dt = .015;

    var m0 = -1.143;
    var m1 = -0.714;
    function f(x) { return m1 * x + 0.5 * (m0 - m1) * (Math.abs(x + 1) - Math.abs(x - 1)); }

    for (var i = 0; i < coords.length; i += 3) {
        var x0 = coords[i];
        var y0 = coords[i+1];
        var z0 = coords[i+2];

        coords[i] = x0 + (alpha * (y0 - x0 - f(x0))) * dt;
        coords[i+1] = y0 + (x0 - y0 + z0) * dt;
        coords[i+2] = z0 + (- beta * y0) * dt;

        addPoint(coords[i], coords[i+1], coords[i+2]);

        particleNum ++;
    }

    console.log(particleNum);
}