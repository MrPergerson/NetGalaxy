
var main =
{

  scene: {},
  renderer: {},
  camera: {},

  setup: function()
  {

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1E1E1E);

    var W = window.innerWidth;
    var H = window.innerHeight;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(W,H);
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(50,  window.innerWidth/window.innerHeight, 1, 10000),
    this.camera.position.z = 500;

  }
}


  main.setup();
