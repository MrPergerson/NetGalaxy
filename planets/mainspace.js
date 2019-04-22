var camera, renderer, scene;

setup();

funtion setup()
{
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1E1E1E);

  var W = window.innerWidth;
  var H = window.innerHeight;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(W,H);
  document.body.appendChild(renderer.domElement);

  camera = new Three.PerspectiveCamera(50, W/H, 1, 10000);
  camera.position.z = 500;

}
