/**
* dx/dt = sigma * (y - x)
* dy/dt = x * (rho - z) - y
* dz/dt = x * y - beta * z
**/
var calcLorenz = function() {
  var sigma = 10;
  var rho = 28;
  var beta = 8/3;
  var dt = .015;

  for (var i = 0; i < coords.length; i += 3) {
    var x0 = coords[i];
    var y0 = coords[i+1];
    var z0 = coords[i+2];

    coords[i] = x0 + (sigma * (y0 - x0)) * dt;
    coords[i+1] = y0 + (x0 * (rho - z0) - y0) * dt;
    coords[i+2] = z0 + (x0 * y0 - beta * z0) * dt;

    addPoint(coords[i], coords[i+1], coords[i+2]);

    particleNum ++;
  }
}

/**
* dx/dt = - y - z
* dy/dt = x + a * y
* dz/dt = b + z * (x - c)
**/
var calcRossler = function() {
  var a = 0.1;
  var b = 0.1;
  var c = 14;
  var dt = .015;

  for (var i = 0; i < coords.length; i += 3) {
    var x0 = coords[i];
    var y0 = coords[i+1];
    var z0 = coords[i+2];

    coords[i] = x0 + (- y0 - z0) * dt;
    coords[i+1] = y0 + (x0 + a * y0) * dt;
    coords[i+2] = z0 + (b + z0 * (x0 - c)) * dt;

    addPoint(coords[i], coords[i+1], coords[i+2]);

    particleNum ++;
  }
}

/**
* x_{n+1} = y_n + 1 - a * (x_n)^2
* y_{n+1} = b * x_n
**/
var calcHenon = function() {
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
}

/**
* dx/dt = alpha * (y - x - f(x))
* dy/dt = x - y + z
* dz/dt = - beta * y
* f(x) = m1 * x + (m0-m1)/2 * |x+1| - |x-1|)
**/
var calcChua = function() {
  var alpha = 15.6;
  var beta = 28;
  var dt = .015;

  var m0 = -1.143;
  var m1 = -0.714;
  var f = function(x) { return m1 * x + 0.5 * (m0 - m1) * (Math.abs(x + 1) - Math.abs(x - 1)); }

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
}

/**
* dx/dt = y
* dy/dt = mu * (1 - x^2) * y - x
**/
var calcVanderpol = function() {
  var dt = .015;

  for (var i = 0; i < coords.length; i += 3) {
    var x0 = coords[i];
    var y0 = coords[i+1];
    var mu = coords[i+2];

    coords[i] = x0 + y0 * dt;
    coords[i+1] = y0 + (mu * (1 - x0 * x0) * y0 - x0) * dt;
    coords[i+2] = mu;

    addPoint(coords[i], coords[i+1], 0);

    particleNum ++;
  }
}

/**
* dx/dt = y * (z - 1 + x^2) + gamma * x
* dy/dt = x * (3 * z + 1 - x^2) + gamma * y
* dz/dt = - 2 * z * (alpha + x * y)
**/
var calcRabFab = function() {
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
}

/**
* x_{n+1} = (x_n)^2 - (y_n)^2 + a * x_n + b * y_n
* y_{n+1} = 2 * x_n * y_n + c * x_n + d * y_n
**/
var calcTinkerbell = function() {
  var a = 0.9;
  var b = -0.6013;
  var c = 2;
  var d = 0.5;

  for (var i = 0; i < coords.length; i += 3) {
    var x0 = coords[i];
    var y0 = coords[i+1];

    coords[i] = x0 * x0 - y0 * y0 + a * x0 + b * y0;
    coords[i+1] = 2 * x0 * y0 + c * x0 + d * y0;
    coords[i+2] = 0;

    addPoint(coords[i], coords[i+1], coords[i+2]);

    particleNum ++;
  }
}

/**
* x_{n+1} = 1 + u * (x_n * cos(t_n) - y_n * sin(t_n))
* y_{n+1} = u * (x_n * sin(t_n) + y_n * cos(t_n))
* t_n = 0.4 - 6/(1 + (x_n)^2 + (y_n)^2)
**/
var calcIkeda = function() {
  var u = 0.85;
  var t = function(x, y) { return 0.4 - 6/(1 + x * x + y * y); }

  for (var i = 0; i < coords.length; i += 3) {
    var x0 = coords[i];
    var y0 = coords[i+1];

    coords[i] = 1 + u * (x0 * Math.cos(t(x0, y0)) - y0 * Math.sin(t(x0, y0)));
    coords[i+1] = u * (x0 * Math.sin(t(x0, y0)) + y0 * Math.cos(t(x0, y0)));
    coords[i+2] = 0;

    addPoint(coords[i], coords[i+1], coords[i+2]);

    particleNum ++;
  }
}


/**
* dx/dt = y * z
* dy/dt = x * z
* dz/dt = x * y
**/
var calcRainey = function() {
  var dt = .015;

  for (var i = 0; i < coords.length; i += 3) {
    var x0 = coords[i];
    var y0 = coords[i+1];
    var z0 = coords[i+2];

    coords[i] = x0 + (y0 * z0) * dt;
    coords[i+1] = y0 + (x0 * z0) * dt;
    coords[i+2] = z0 + (x0 * y0) * dt;

    addPoint(coords[i], coords[i+1], coords[i+2]);

    particleNum ++;
  }
}

/**
* dx/dt = alpha * (y + x)/z
* dy/dt = x * (beta - x - y - z)
* dz/dt = x * y * z / gamma
**/
var calcFu = function() {
  var alpha = 18;
  var beta = 42;
  var gamma = 15;
  var dt = .015;

  for (var i = 0; i < coords.length; i += 3) {
    var x0 = coords[i];
    var y0 = coords[i+1];
    var z0 = coords[i+2];

    coords[i] = x0 + (alpha * (y0 + x0)/z0) * dt;
    coords[i+1] = y0 + (x0 * (beta - x0 - y0 - z0)) * dt;
    coords[i+2] = z0 + (x0 * y0 * z0 / gamma) * dt;

    addPoint(coords[i], coords[i+1], coords[i+2]);

    particleNum ++;
  }
}

var attractors = [calcLorenz, calcRossler, calcHenon, calcChua, calcVanderpol, calcRabFab, calcTinkerbell, calcIkeda, calcRainey, calcFu];