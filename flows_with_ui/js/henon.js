function henonInit() {
    coords = [];
    trajColors = [];
    colors = [];
    particleNum = 0;

    camera.near = 0.05;
    camera.far = 250;
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 2;

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
        vertex.z = 0;

        geometry.vertices.push(vertex);

        particleNum ++;

        colors[i] = trajColors[i % 20];
    }

    // collapse all unused vertices into a point way off screen
    for (i = 20; i < 2500; i ++) {
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

    scene.add(particles);
}

function henonAnimate() {
    if (execute && which == 3) {

        requestAnimationFrame(henonAnimate);

        if (particleNum < 2500) {
            calcHenon();
        }

        henonRender();

        stats.update();
    } else {
        return;
    }
}

function henonRender() {
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

function calcHenon() {
    /**
    * x_{n+1} = y_n + 1 - a * (x_n)^2
    * y_{n+1} = b * x_n
    * (This is a 2-D attractor, so there is no z coordinate, technically)
    **/

    var a = 1.4;
    var b = 0.3;

    for (var i = 0; i < coords.length; i += 3) {
        var x0 = coords[i];
        var y0 = coords[i+1];

        coords[i] = y0 + 1 - a * x0 * x0;
        coords[i+1] = b * x0;
        coords[i+2] = 0;

        addPoint(coords[i], coords[i+1], coords[i+2]);

        particleNum ++;
    }

    console.log(particleNum);
}