if (!Detector.webgl) Detector.addGetWebGLMessage();

var camera, scene, renderer;
var geometry, material, mesh;

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

  // draw planets
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
  }





}

function draw() {

  requestAnimationFrame(draw);

  renderer.render(scene, camera);



}

setup();
draw();
