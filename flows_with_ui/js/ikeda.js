function ikedaInit() {
    coords = [];
    trajColors = [];
    colors = [];
    particleNum = 0;

    camera.near = 0.1;
    camera.far = 300;
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 20;

    geometry = new THREE.Geometry();

    // randomly generate 40 initial starting vertices
    for (var i = 0; i < 120; i ++) {
        coords[i] = Math.random() * 40 - 20;
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
        vertex.z = 0;

        geometry.vertices.push(vertex);

        particleNum ++;

        colors[i] = trajColors[i % 20];
    }

    // collapse all unused vertices into a point way off screen
    for (i = 40; i < 2000; i ++) {
        var vertex = new THREE.Vector3();
        vertex.x = 1000;
        vertex.y = 1000;
        vertex.z = 1000;

        geometry.vertices.push(vertex);

        colors[i] = trajColors[i % 20];
    }

    geometry.colors = colors;

    material = new THREE.ParticleSystemMaterial({ size: 0.0075, vertexColors: true, transparent: true });
    material.color.setHSL(1.0, 0.2, 0.7);

    particles = new THREE.ParticleSystem(geometry, material);

    scene.add(particles);
}

function ikedaAnimate() {
    if (execute && which == 8) {
        requestAnimationFrame(ikedaAnimate);

        if (particleNum < 2000) {
            calcIkeda();
        }

        ikedaRender();

        stats.update();
    } else {
        return;
    }
}

function ikedaRender() {
    var time = Date.now() * 0.00005;

    camera.position.x += (mouseX - camera.position.x) * 0.001;
    camera.position.y += (- mouseY - camera.position.y) * 0.001;

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

function calcIkeda() {
    /**
    * x_{n+1} = 1 + u * (x_n * cos(t_n) - y_n * sin(t_n))
    * y_{n+1} = u * (x_n * sin(t_n) + y_n * cos(t_n))
    * t_n = 0.4 - 6/(1 + (x_n)^2 + (y_n)^2)
    *
    * (This is a 2-D dynamical system, so there is no z coordinate, technically)
    **/

    var u = 0.85;
    function t(x, y) { return 0.4 - 6/(1 + x * x + y * y); }

    for (var i = 0; i < coords.length; i += 3) {
        var x0 = coords[i];
        var y0 = coords[i+1];

        coords[i] = 1 + u * (x0 * Math.cos(t(x0, y0)) - y0 * Math.sin(t(x0, y0)));
        coords[i+1] = u * (x0 * Math.sin(t(x0, y0)) + y0 * Math.cos(t(x0, y0)));
        coords[i+2] = 0;

        addPoint(coords[i], coords[i+1], coords[i+2]);

        particleNum ++;
    }

    console.log(particleNum);
}