if (!Detector.webgl) Detector.addGetWebGLMessage();

var camera, scene, renderer;

var stars;

var planetmain;

planets = [];

function setup() {

  var W = window.innerWidth,
    H = window.innerHeight;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(W, H);
  document.body.appendChild(renderer.domElement);

  // setup camera
  camera = new THREE.PerspectiveCamera(50, W / H, 1, 10000);
  camera.position.z = 500;

  scene = new THREE.Scene();

  stars = new THREE.ParticleSystem();

  // makeStars();
  makePlanets();
  warpToPlanet();

}

function draw() {
  requestAnimationFrame(draw);

  updatePlanets();

  // stars.rotation.y = Date.now() * 0.00005;

  // camera.position.z += 10;

  runPlanetLoop();

  renderer.render(scene, camera);

}

function updatePlanets() {

  for (var i = 0; i < planets.length; i++) {
    planet = planets[i];
    planet.position.z += 3;

    if (planet.position.z > 1000)
      planet.position.z -= 2000;

  }
}

// draw planets
function makePlanets() {

  for (var i = 0; i < 100; i++) {
    geometry = new THREE.IcosahedronGeometry(150, 0);
    material = new THREE.MeshNormalMaterial({
      shading: THREE.FlatShading
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.1;
    mesh.position.x = Math.random() * 1000 - 500;
    mesh.position.y = Math.random() * 1000 - 500;
    mesh.position.z = Math.random() * 1000 - 500;
    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;
    mesh.rotation.z = Math.random() * 2 * Math.PI;
    scene.add(mesh);
    planets.push(mesh);
  }
}

function makeStars() {
  starGeometry = new THREE.Geometry();
  for (i = 0; i < 5000; i++) {
    var vertex = new THREE.Vector3();
    vertex.x = 1000 * Math.random() - 500;
    vertex.y = 1000 * Math.random() - 500;
    vertex.z = 1000 * Math.random() - 500;
    starGeometry.vertices.push(vertex);
  }
  starMaterial = new THREE.ParticleBasicMaterial({
    size: 5,
    sizeAttenuation: false,
    transparent: true
  });
  starMaterial.color.setHex(0xff00ff);
  stars = new THREE.ParticleSystem(starGeometry, starMaterial);
  stars.sortParticles = true;
  stars.position.z = -1000;
  scene.add(stars);

}

function particleRender(context) {

  context.beginPath();

  context.rect(4, 4, 2, 2);
  context.fill();
};

function warpToPlanet() {
  geometry = new THREE.IcosahedronGeometry(150, 0);
  material = new THREE.MeshNormalMaterial({
    shading: THREE.FlatShading
  });
  planetmain = new THREE.Mesh(geometry, material);
  planetmain.scale.x = planetmain.scale.y = planetmain.scale.z = 0.1;
  scene.add(planetmain);

}

function runPlanetLoop() {

  if (planetmain.position.z < camera.position.z-80)
  {
    planetmain.position.z += 20;
  }
  else
  {
    planet
  }

    planetmain.rotation.y += .01;

}


setup();
draw();
