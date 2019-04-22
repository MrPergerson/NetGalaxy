// if (!Detector.webgl) Detector.addGetWebGLMessage();

var camera, scene, renderer;
var geometry, material;
var mesh1, mesh2, mesh3, mesh4;
var mouseX = 0;
var mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

function setup() {

  console.log("Working");

  var W = window.innerWidth,
    H = window.innerHeight;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(W, H);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(50, W / H, 1, 10000);
  camera.position.z = 500;

  scene = new THREE.Scene();


  // paste your code from the geometryGUI here
  geometry = new THREE.TorusGeometry(100, 3.16, 40, 40, 9.42);
  material = new THREE.MeshNormalMaterial({shading: THREE.FlatShading});
  mesh1 = new THREE.Mesh(geometry, material);
  mesh1.scale.x = mesh1.scale.y = mesh1.scale.z = 1.06;
  scene.add(mesh1);

  var points = [
    new THREE.Vector3( 51.03, 85.74, -98.42 ),
    new THREE.Vector3( -66.13, 14.61, -99.39 ),
    new THREE.Vector3( -15.43, 77.37, 67.45 ),
    new THREE.Vector3( 30.4, -89.89, 76.6 ),
    new THREE.Vector3( 29.95, -95.81, -27.29 ),
    new THREE.Vector3( 82.03, -44.34, 13.1 ),
    new THREE.Vector3( -58.45, -30.89, 18.51 ),
    new THREE.Vector3( 2.67, -56.94, 25.95 ),
    new THREE.Vector3( 9.98, -45.51, -99.25 ),
];

geometry = new THREE.ConvexGeometry( points );
material = new THREE.MeshNormalMaterial({shading: THREE.FlatShading});
mesh2 = new THREE.Mesh(geometry, material);
mesh2.scale.x = mesh2.scale.y = mesh2.scale.z = .8;
mesh2.rotation.z = 10;
mesh2.rotation.y = 95;
scene.add(mesh2);

geometry = new THREE.OctahedronGeometry(67.86, 0);
material = new THREE.MeshNormalMaterial({shading: THREE.FlatShading});
mesh3 = new THREE.Mesh(geometry, material);
mesh3.scale.x = mesh3.scale.y = mesh3.scale.z = 1.06;
mesh3.position.x = 200;
scene.add(mesh3);

geometry = new THREE.OctahedronGeometry(67.86, 0);
material = new THREE.MeshNormalMaterial({shading: THREE.FlatShading});
mesh4 = new THREE.Mesh(geometry, material);
mesh4.scale.x = mesh4.scale.y = mesh4.scale.z = 1.06;
mesh4.position.y = 50;
mesh4.position.x = -200;
scene.add(mesh4);

document.addEventListener('mousemove', onDocumentMouseMove, false);
window.addEventListener('resize', onWindowResize, false);

}

function draw() {

  requestAnimationFrame(draw);

  mesh1.rotation.y += .01;
  mesh3.position.y += Math.sin( Date.now() * 0.002 )
  mesh4.position.y -= Math.sin( Date.now() * 0.002 )

  // experiment with code from the snippets menu here

  camera.position.x += ( mouseX - camera.position.x ) * 0.005;
  camera.position.y += ( - mouseY - camera.position.y ) * 0.005;

  renderer.render(scene, camera);

}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
  mouseX = ( event.clientX - windowHalfX );
  mouseY = ( event.clientY - windowHalfY );
}

setup();
draw();
