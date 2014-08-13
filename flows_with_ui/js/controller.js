window.onload = function() {
    var lorenz = {
        'Equation': function() {
            alert("dx/dt = σ(y - x)\n" +
                  "dy/dt = x(ρ - z) - y\n" +
                  "dz/dt = xy - βz\n" +
                  "\n" +
                  "σ = 10\n" +
                  "ρ = 28\n" +
                  "β = 8/3");
        },
        'Start': function() {
            execute = false;
            geometry.__webglVertexBuffer = null;
            geometry.__webglColorBuffer = null;
            renderer.clear();
            removeAll();
            execute = true;
            which = 1;
            lorenzInit();
            lorenzAnimate();
        }
    };
    var rossler = {
        'Equation': function() {
            alert("dx/dt = - y - z\n" +
                  "dy/dt = x + ay\n" +
                  "dz/dt = b + z(x - c)\n" +
                  "\n" +
                  "a = 0.1\n" +
                  "b = 0.1\n" +
                  "c = 14");
        },
        'Start': function() {
            execute = false;
            geometry.__webglVertexBuffer = null;
            geometry.__webglColorBuffer = null;
            renderer.clear();
            removeAll();
            execute = true;
            which = 2;
            rosslerInit();
            rosslerAnimate();
        }
    };
    var henon = {
        'Equation': function() {
            alert("x\u2C7C\u208A\u2081 = y\u2C7C + 1 - ax\u2C7C\u00B2\n" +
                  "y\u2C7C\u208A\u2081 = bx\u2C7C\n" +
                  "\n" +
                  "a = 1.4\n" +
                  "b = 0.3\n" +
                  "\n" +
                  "(This is a 2-D attractor, so there is no z coordinate, technically)");
        },
        'Start': function() {
            execute = false;
            geometry.__webglVertexBuffer = null;
            geometry.__webglColorBuffer = null;
            renderer.clear();
            removeAll();
            execute = true;
            which = 3;
            henonInit();
            henonAnimate();
        }
    };
    var chua = {
        'Equation': function() {
            alert("dx/dt = α(y - x - f(x))\n" +
                  "dy/dt = x - y + z\n" +
                  "dz/dt = - βy\n" +
                  "f(x) = m\u2081x + (m\u2080-m\u2081)/2 * (|x+1| - |x-1|)\n" +
                  "\n" +
                  "α = 15.6\n" +
                  "β = 28\n" +
                  "m\u2080 = -1.143\n" +
                  "m\u2081 = -0.714\n" +
                  "\n" +
                  "The equation for f(x) was obtained from matlab code provided at http://www.chuacircuits.com/matlabsim.php");
        },
        'Start': function() {
            execute = false;
            geometry.__webglVertexBuffer = null;
            geometry.__webglColorBuffer = null;
            renderer.clear();
            removeAll();
            execute = true;
            which = 4;
            chuaInit();
            chuaAnimate();
        }
    };
    var vanderpol = {
        'Equation': function() {
            alert("dx/dt = y\n" +
                  "dy/dt = μ(1 - x\u00B2)y - x\n" +
                  "\n" +
                  "This is a 2-D oscillator. I showed flow for various random values of μ plotted with a constant z. It also looks nice if you set z = μ");
        },
        'Start': function() {
            execute = false;
            geometry.__webglVertexBuffer = null;
            geometry.__webglColorBuffer = null;
            renderer.clear();
            removeAll();
            execute = true;
            which = 5;
            vanInit();
            vanAnimate();
        }
    };
    var rabfab = {
        'Equation': function() {
            alert("dx/dt = y(z - 1 + x\u00B2) + γx\n" +
                  "dy/dt = x(3z + 1 - x\u00B2) + γy\n" +
                  "dz/dt = - 2z(α + xy)\n" +
                  "\n" +
                  "α = 0.98\n" +
                  "γ = 0.1");
        },
        'Start': function() {
            execute = false;
            geometry.__webglVertexBuffer = null;
            geometry.__webglColorBuffer = null;
            renderer.clear();
            removeAll();
            execute = true;
            which = 6;
            rabfabInit();
            rabfabAnimate();
        }
    };
    var tinkerbell = {
        'Equation': function() {
            alert("x\u2C7C\u208A\u2081 = x\u2C7C\u00B2 - y\u2C7C\u00B2 + ax\u2C7C + by\u2C7C\n" +
                  "y\u2C7C\u208A\u2081 = 2x\u2C7Cy\u2C7C + cx\u2C7C + dy\u2C7C\n" +
                  "\n" +
                  "a = 0.9\n" +
                  "b = -0.6013\n" +
                  "c = 2\n" +
                  "d = 0.5\n" +
                  "\n" +
                  "(This is a 2-D dynamical system, so there is no z coordinate, technically)");
        },
        'Start': function() {
            execute = false;
            geometry.__webglVertexBuffer = null;
            geometry.__webglColorBuffer = null;
            renderer.clear();
            removeAll();
            execute = true;
            which = 7;
            tinkerbellInit();
            tinkerbellAnimate();
        }
    };
    var ikeda = {
        'Equation': function() {
            alert("x\u2C7C\u208A\u2081 = 1 + u(x\u2C7Ccos(t\u2C7C) - y\u2C7Csin(t\u2C7C))\n" +
                  "y\u2C7C\u208A\u2081 = u(x\u2C7Csin(t\u2C7C) + y\u2C7Ccos(t\u2C7C))\n" +
                  "t\u2C7C = 0.4 - 6/(1 + x\u2C7C\u00B2 + y\u2C7C\u00B2)\n" +
                  "\n" +
                  "u = 0.85\n" +
                  "\n" +
                  "(This is a 2-D dynamical system, so there is no z coordinate, technically)");
        },
        'Start': function() {
            execute = false;
            geometry.__webglVertexBuffer = null;
            geometry.__webglColorBuffer = null;
            renderer.clear();
            removeAll();
            execute = true;
            which = 8;
            ikedaInit();
            ikedaAnimate();
        }
    };
    var rainey = {
        'Equation': function() {
            alert("dx/dt = yz\n" +
                  "dy/dt = xz\n" +
                  "dz/dt = xy\n" +
                  "\n" +
                  "Chris Rainey is a former MATH 198 student who made up his own set of ODEs for a dynamical system");
        },
        'Start': function() {
            execute = false;
            geometry.__webglVertexBuffer = null;
            geometry.__webglColorBuffer = null;
            renderer.clear();
            removeAll();
            execute = true;
            which = 9;
            raineyInit();
            raineyAnimate();
        }
    };
    var fu = {
        'Equation': function() {
            alert("dx/dt = α(y + x)/z\n" +
                  "dy/dt = x(β - x - y - z)\n" +
                  "dz/dt = xyz/γ\n" +
                  "\n" +
                  "α = 18\n" +
                  "β = 42\n" +
                  "γ = 15\n" +
                  "\n" +
                  "My own creation. I think it looks like a genie lamp.");
        },
        'Start': function() {
            execute = false;
            geometry.__webglVertexBuffer = null;
            geometry.__webglColorBuffer = null;
            renderer.clear();
            removeAll();
            execute = true;
            which = 10;
            fuInit();
            fuAnimate();
        }
    };

    var gui = new dat.GUI();

    var f1 = gui.addFolder('Lorenz Strange Attractor');
    f1.add(lorenz, 'Equation');
    f1.add(lorenz, 'Start');

    var f2 = gui.addFolder('Rössler Attractor');
    f2.add(rossler, 'Equation');
    f2.add(rossler, 'Start');

    var f3 = gui.addFolder('Hénon map');
    f3.add(henon, 'Equation');
    f3.add(henon, 'Start');

    var f4 = gui.addFolder('Chua\'s Attractor (Double Scroll Attractor)');
    f4.add(chua, 'Equation');
    f4.add(chua, 'Start');

    var f5 = gui.addFolder('Liénard-Van der Pol Oscillator');
    f5.add(vanderpol, 'Equation');
    f5.add(vanderpol, 'Start');

    var f6 = gui.addFolder('Rabinovich-Fabrikant System');
    f6.add(rabfab, 'Equation');
    f6.add(rabfab, 'Start');

    var f7 = gui.addFolder('Tinkerbell Map');
    f7.add(tinkerbell, 'Equation');
    f7.add(tinkerbell, 'Start');

    var f8 = gui.addFolder('Ikeda Map');
    f8.add(ikeda, 'Equation');
    f8.add(ikeda, 'Start');

    var f9 = gui.addFolder('Rainey Dynamical System');
    f9.add(rainey, 'Equation');
    f9.add(rainey, 'Start');

    var f10 = gui.addFolder('Fu Attractor');
    f10.add(fu, 'Equation');
    f10.add(fu, 'Start');

    f1.open();
};