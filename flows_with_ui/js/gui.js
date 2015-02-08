function initGUI() {
  var guiDescriptions = [
  // lorenz
  "dx/dt = σ(y - x)\n" +
  "dy/dt = x(ρ - z) - y\n" +
  "dz/dt = xy - βz\n" +
  "\n" +
  "σ = 10\n" +
  "ρ = 28\n" +
  "β = 8/3",

  // rossler
  "dx/dt = - y - z\n" +
  "dy/dt = x + ay\n" +
  "dz/dt = b + z(x - c)\n" +
  "\n" +
  "a = 0.1\n" +
  "b = 0.1\n" +
  "c = 14",

  // henon
  "x\u2C7C\u208A\u2081 = y\u2C7C + 1 - ax\u2C7C\u00B2\n" +
  "y\u2C7C\u208A\u2081 = bx\u2C7C\n" +
  "\n" +
  "a = 1.4\n" +
  "b = 0.3\n" +
  "\n" +
  "(This is a 2-D attractor, so there is no z coordinate, technically)",

  // chua
  "dx/dt = α(y - x - f(x))\n" +
  "dy/dt = x - y + z\n" +
  "dz/dt = - βy\n" +
  "f(x) = m\u2081x + (m\u2080-m\u2081)/2 * (|x+1| - |x-1|)\n" +
  "\n" +
  "α = 15.6\n" +
  "β = 28\n" +
  "m\u2080 = -1.143\n" +
  "m\u2081 = -0.714\n" +
  "\n" +
  "The equation for f(x) was obtained from matlab code provided at http://www.chuacircuits.com/matlabsim.php",

  // vanderpol
  "dx/dt = y\n" +
  "dy/dt = μ(1 - x\u00B2)y - x\n" +
  "\n" +
  "This is a 2-D oscillator. I showed flow for various random values of μ plotted with a constant z. It also looks nice if you set z = μ",

  // rabfab
  "dx/dt = y(z - 1 + x\u00B2) + γx\n" +
  "dy/dt = x(3z + 1 - x\u00B2) + γy\n" +
  "dz/dt = - 2z(α + xy)\n" +
  "\n" +
  "α = 0.98\n" +
  "γ = 0.1",

  // tinkerbell
  "x\u2C7C\u208A\u2081 = x\u2C7C\u00B2 - y\u2C7C\u00B2 + ax\u2C7C + by\u2C7C\n" +
  "y\u2C7C\u208A\u2081 = 2x\u2C7Cy\u2C7C + cx\u2C7C + dy\u2C7C\n" +
  "\n" +
  "a = 0.9\n" +
  "b = -0.6013\n" +
  "c = 2\n" +
  "d = 0.5\n" +
  "\n" +
  "(This is a 2-D dynamical system, so there is no z coordinate, technically)",

  // ikeda
  "x\u2C7C\u208A\u2081 = 1 + u(x\u2C7Ccos(t\u2C7C) - y\u2C7Csin(t\u2C7C))\n" +
  "y\u2C7C\u208A\u2081 = u(x\u2C7Csin(t\u2C7C) + y\u2C7Ccos(t\u2C7C))\n" +
  "t\u2C7C = 0.4 - 6/(1 + x\u2C7C\u00B2 + y\u2C7C\u00B2)\n" +
  "\n" +
  "u = 0.85\n" +
  "\n" +
  "(This is a 2-D dynamical system, so there is no z coordinate, technically)",

  // rainey
  "dx/dt = yz\n" +
  "dy/dt = xz\n" +
  "dz/dt = xy\n" +
  "\n" +
  "Chris Rainey is a former MATH 198 student who made up his own set of ODEs for a dynamical system",

  // fu
  "dx/dt = α(y + x)/z\n" +
  "dy/dt = x(β - x - y - z)\n" +
  "dz/dt = xyz/γ\n" +
  "\n" +
  "α = 18\n" +
  "β = 42\n" +
  "γ = 15\n" +
  "\n" +
  "My own creation. I think it looks like a genie lamp."
  ];

  var gui = new dat.GUI();

  var guiButtons = [];
  for (var i = 0; i < 10; i++) {
  guiButtons[i] = {
    'Equation': (function(index) {
    return function() {
      alert(guiDescriptions[index]);
    }
    })(i),
    'Render': (function(index) {
    return function() {
      resetAnimation();
      selectedAttractor = index;
      initAnimation();
    }
    })(i)
  };
  }

  var folderNames = ['Lorenz Strange Attractor', 'Rössler Attractor', 'Hénon map', 'Chua\'s Attractor (Double Scroll Attractor)', 'Liénard-Van der Pol Oscillator', 'Rabinovich-Fabrikant System', 'Tinkerbell Map', 'Ikeda Map', 'Rainey Dynamical System', 'Fu Attractor']
  var folders = [];
  for (var i = 0; i < 10; i++) {
  var folder = gui.addFolder(folderNames[i]);
  folder.add(guiButtons[i], 'Equation');
  folder.add(guiButtons[i], 'Render');
  folders.push(folder);
  }

  folders[0].open();
}