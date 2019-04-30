var scene, renderer, camera;
var bdPlanets
var mainPlanet;
var currentJob;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

setup();
draw();

function setup() {

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1E1E1E);

  var W = window.innerWidth;
  var H = window.innerHeight;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(W, H);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000),
  camera.position.z = 500;

  createStars(scene);
  createBackgroundPlanets(scene, 200, 1500);

  mainPlanet = initiateNextPlanet(scene);
  currentJob = initiateJob(scene);

  // type is case senstive
  window.addEventListener('resize', onWindowResize, false);
  document.addEventListener('mousemove', onMouseMove, false);
  document.addEventListener('mousedown', onMouseClick, false);
}

function draw() {
  requestAnimationFrame(draw);

  updateCameraPosition();
  animateBackgroundPlanets();



  if(mainPlanetLapsed())
  {
    scene.remove(mainPlanet);
    mainPlanet = initiateNextPlanet(scene);
  }
  else {
    animatePlanet(mainPlanet, .3);
  }


  renderer.render(scene, camera);

}

// allow mouse movement
function updateCameraPosition() {


  var maxY = 50
  var minY = -maxY;
  var maxX = ((((maxY * 2) * window.innerWidth) / window.innerHeight)) / 2; // keep aspect ratio
  var minX = -maxX;

  var mx = Math.max(minX, Math.min(maxX, mouseX));
  var my = Math.max(minY, Math.min(maxY, mouseY));

  camera.position.x += (mx - camera.position.x) * .02;
  camera.position.y += (-my - camera.position.y) * .02;
}

function onMouseMove(event) {
  // not sure how to use the Vector2 mouse for this function
  // doesn't work for raycasting
  mouseX = (event.clientX - window.innerWidth / 2);
  mouseY = (event.clientY - window.innerHeight / 2);

  mouse.x =   ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onMouseClick(event) {
  //console.log("you clicked");
  //console.log("you clicked at (" + mouse.x + ", " + mouse.y +")");

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0)
  {
    var selected = intersects[0].object;  // Mesh IS-A Object3D

    if(selected == mainPlanet)
    {
      scene.remove(mainPlanet);
      mainPlanet = initiateNextPlanet(scene);
    }

  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
