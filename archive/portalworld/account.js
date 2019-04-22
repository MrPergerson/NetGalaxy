var camera, scene, renderer, stats, group;
var mouseX = 0,
  mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 500;
  scene = new THREE.Scene();
  scene.background = new THREE.TextureLoader().load( "../images/sunset.png");
  scene.fog = new THREE.Fog(0xffffff, 1, 10000);
  var geometry = new THREE.BoxBufferGeometry(100, 100, 100);
  var material = new THREE.MeshNormalMaterial();
  group = new THREE.Group();
  for (var i = 0; i < 4000; i++) {
    var mesh = new THREE.Mesh(geometry, material);
    //create meshes in a random range.
    var maxRange = 6000;
    var offset = maxRange/2;
    mesh.position.x = Math.random() * maxRange - offset;
    mesh.position.y = Math.random() * maxRange - offset;
    mesh.position.z = Math.random() * maxRange - offset;
    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    group.add(mesh);
  }
  scene.add(group);
  //
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  document.addEventListener('mousemove', onDocumentMouseMove, false);
  //
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) * 10;
  mouseY = (event.clientY - windowHalfY) * 10;
}
//
function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  var time = Date.now() * 0.001;
  var rx = Math.sin(time * 0.7) * 0.5,
    ry = Math.sin(time * 0.3) * 0.5,
    rz = Math.sin(time * 0.2) * 0.5;
  var rangeDamper = 4;
  var speed = .02;
  // change position base on mouse position
  camera.position.x += (mouseX - camera.position.x*rangeDamper) * speed;
  camera.position.y += (-mouseY - camera.position.y*rangeDamper) * speed;
  // keep camera focused on middle of the scene
  camera.lookAt(scene.position);
  // rotate the whole collection of meshes
  group.rotation.x = rx;
  group.rotation.y = ry;
  group.rotation.z = rz;
  renderer.render(scene, camera);
}
