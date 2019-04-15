var container, stats;
var camera, controls, scene, renderer;
var objects = [];
var treasure;
init();
animate();

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000);
  camera.position.z = 1000;
  controls = new THREE.TrackballControls(camera);
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);
  scene.add(new THREE.AmbientLight(0x505050));
  var light = new THREE.SpotLight(0xffffff, 1.5);
  light.position.set(0, 500, 2000);
  light.angle = Math.PI / 9;
  light.castShadow = true;
  light.shadow.camera.near = 1000;
  light.shadow.camera.far = 4000;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  scene.add(light);

  var geo = new THREE.BoxGeometry(100,100,100,2,2,2);
  var treasure = new THREE.Mesh(geo, new THREE.MeshNormalMaterial({
    shading: THREE.flatShading,
    wireframe: true
  }));
  treasure.scale.x = treasure.scale.y = treasure.scale.z = 10
  scene.add(treasure);


  var geo = new THREE.TetrahedronGeometry(6,1);
  var treasure = new THREE.Mesh(geo, new THREE.MeshNormalMaterial({shading: THREE.flatShading}));
  treasure.scale.x = treasure.scale.y = treasure.scale.z = 10
  scene.add(treasure);


  var geometry2 = new THREE.BoxBufferGeometry(40, 40, 40);
  for (var i = 0; i < 200; i++) {
    var object = new THREE.Mesh(geometry2, new THREE.MeshLambertMaterial({shading: THREE.flatShading}));
    object.position.x = Math.random() * 1000 - 500;
    object.position.y = Math.random() * 600 - 300;
    object.position.z = Math.random() * 800 - 400;
    object.rotation.x = Math.random() * 2 * Math.PI;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;
    object.scale.x = Math.random() * 2 + 1;
    object.scale.y = Math.random() * 2 + 1;
    object.scale.z = Math.random() * 2 + 1;
    object.castShadow = true;
    object.receiveShadow = true;
    scene.add(object);
    objects.push(object);
  }
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  container.appendChild(renderer.domElement);

  // enable drag controls
  var dragControls = new THREE.DragControls(objects, camera, renderer.domElement);
  dragControls.addEventListener('dragstart', function() {
    controls.enabled = false;
  });
  dragControls.addEventListener('dragend', function() {
    controls.enabled = true;
  });

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
//
function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  controls.update();
  renderer.render(scene, camera);
}
