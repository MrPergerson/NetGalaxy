// if (!Detector.webgl) Detector.addGetWebGLMessage();

var camera, scene, renderer;

var planetmain;
var viewingPlanet = false;
var findingNewPlanet = false;
var stars;

planets = [];

var pixelplanet = {
  source: "pixelplanet.html",
  geo: new THREE.IcosahedronGeometry(150, 0),
  mat: new THREE.MeshPhongMaterial({
    shading: THREE.FlatShading,
    color: 0xa8dc00,
    ambient: 0x000000,
    emissive: 0x1b5c54,
    specular: 0xdcdcdc,
    shininess: 100
  })
};
var waterworld = {
  source: "waterworld.html",
  geo: new THREE.IcosahedronGeometry(150, 0),
  mat: new THREE.MeshPhongMaterial({
    shading: THREE.FlatShading,
    color: 0xdcdcdc,
    ambient: 0xffffff,
    emissive: 0x4235a4,
    specular: 0x8c8c8c,
    shininess: 30
  })
};
var desertplanet = {
  source: "desertplanet.html",
  geo: new THREE.IcosahedronGeometry(150, 0),
  mat: new THREE.MeshPhongMaterial({
    shading: THREE.FlatShading,
    color: 0x5c6113,
    ambient: 0xffffff,
    emissive: 0xffa566,
    specular: 0x000000,
    shininess: 100
  })
};
var portalworld = {
  source: "portal.html",
  geo: new THREE.IcosahedronGeometry(150, 0),
  mat: new THREE.MeshPhongMaterial({
    shading: THREE.FlatShading,
    color: 0xff0000,
    ambient: 0x9d5f6e,
    emissive: 0x550f0f,
    specular: 0xdcdcdc,
    shininess: 30
  })
};

planetsToVisit = [pixelplanet, waterworld, desertplanet, portalworld];
var visitIndex = 0;
planetsToVisit = randomizePlanetsToVisit(planetsToVisit);
var currentPlanet = planetsToVisit[visitIndex];

function setup() {

  scene = new THREE.Scene();
  // background won't work with threejsplaygnd
  // scene.background = new THREE.Color("rgb(255, 0, 0)");

  var W = window.innerWidth,
    H = window.innerHeight;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(W, H);
  document.body.appendChild(renderer.domElement);

  // setup camera
  camera = new THREE.PerspectiveCamera(50, W / H, 1, 10000);
  camera.position.z = 500;

  ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);

  hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.33);
  scene.add(hemisphereLight);



  makeStars();
  makePlanets();
  // warpToPlanet();
  setTimeout(warpToPlanet, 2000);

  document.addEventListener('mousedown', onDocumentMouseDown, false);

}

function draw() {
  requestAnimationFrame(draw);

  updatePlanets();

  // stars.rotation.y = Date.now() * 0.00005;

  // camera.position.z += 10;

  runMainPlanetLoop();

  renderer.render(scene, camera);

}

function updatePlanets() {

  for (var i = 0; i < planets.length; i++) {
    planet = planets[i];
    planet.position.z += 3;

    if (planet.position.z > 500)
      planet.position.z -= 1500;
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
    var maxRange = 3000;
    var offset = maxRange / 2;
    vertex.x = maxRange * Math.random() - offset;
    vertex.y = maxRange * Math.random() - offset;
    // vertex.z = 1000 * Math.random() - 500;
    starGeometry.vertices.push(vertex);
  }
  starMaterial = new THREE.ParticleBasicMaterial({
    size: 2,
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
  // geometry = new THREE.IcosahedronGeometry(150, 0);
  // material = new THREE.MeshNormalMaterial({
  //   shading: THREE.FlatShading
  // })
  currentPlanet = planetsToVisit[visitIndex]
  planetmain = new THREE.Mesh(currentPlanet["geo"], currentPlanet["mat"]);
  planetmain.scale.x = planetmain.scale.y = planetmain.scale.z = 0.1;
  scene.add(planetmain);

}

function runMainPlanetLoop() {

  if(planetmain == null) return;

  if (findingNewPlanet) { // make planetmain warp away
    planetmain.position.z += 5;
    planetmain.position.y -= 5;
    planetmain.position.x += 5;
  } else if (viewingPlanet == false) { // let planetmain warp to camera
    if (planetmain.position.z < camera.position.z - 80) {
      planetmain.position.z += 50;
    } else {
      viewingPlanet = true;
      setTimeout(removeMainPlanet, 3000); // remove planetmain in 5 seconds
    }
  }

  planetmain.rotation.y += .01;
}

function removeMainPlanet() {
  viewingPlanet = false;
  findingNewPlanet = true;
  setTimeout(spawnNewMainPlanet, 3000);
}

// set new planet to view
function spawnNewMainPlanet() {
  scene.remove(planetmain);

  // choose which page it will link too
  visitIndex++;
  if (visitIndex >= planetsToVisit.length) visitIndex = 0;
  warpToPlanet();

  planetmain.position.z = -500;
  planetmain.position.y = 0;
  planetmain.position.x = 0;
  findingNewPlanet = false;
}

function onDocumentMouseDown(event) {

  // view the planet if clicked
  if (viewingPlanet) {

    document.location.href = currentPlanet["source"];
  }

}

function randomizePlanetsToVisit(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


setup();
draw();
