var camera, scene, renderer;

var exampleplanet1 =
{
  src: "#",
  geo: new THREE.IcosahedronGeometry(150,0),
  mat: new THREE.MeshBasicMaterial({
    shading: THREE.flatShading,
    color: 0xa8dc00,
  })
}
var exampleplanet2 =
{
  source: "waterworld.html",
  geo: new THREE.IcosahedronGeometry(150, 0),
  mat: new THREE.MeshPhongMaterial({
    flatShading: true,
    color: 0xdcdcdc,
  })
};
var exampleplanet3 =
{
  source: "desertplanet.html",
  geo: new THREE.IcosahedronGeometry(150, 0),
  mat: new THREE.MeshPhongMaterial({
    flatShading: true,
    color: 0x5c6113,
  })
};
var exampleplanet4 =
{
  source: "portal.html",
  geo: new THREE.IcosahedronGeometry(150, 0),
  mat: new THREE.MeshPhongMaterial({
    flatShading: true,
    color: 0xff0000,
  })
};

viewablePlanets = [exampleplanet1,exampleplanet2,exampleplanet3,exampleplanet4];
viewablePlanetsIndex = 0

planetsInView = [];


setup();

function setup()
{
  scene = main.scene;
  renderer = main.renderer
  camera = main.camera;

  initiateNextPlanet(viewablePlanetsIndex);

}

function initiateNextPlanet(index)
{
  planetInView = viewablePlanets[index];

  planetMesh = new THREE.Mesh(planetInView["geo"], planetInView["mat"]);
  planetMesh.scale.set(.2,.2,.2);

  var maxRange = window.innerHeight/2;
  var offset = maxRange / 2;
  planetMesh.position.x = maxRange * Math.random() - offset;
  planetMesh.position.y = maxRange * Math.random() - offset;
  planetMesh.position.z = -500;

  planetsInView[0] = planetMesh;
  scene.add(planetMesh);
  console.log("added " + planetMesh);
}
