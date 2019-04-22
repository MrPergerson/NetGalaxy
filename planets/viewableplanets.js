var camera, scene, renderer;

var exampleplanet1 =
{
  src: "#",
  geo: new THREE.IcosahedronGeometry(150,0),
  mat: new THREE.MeshPhongMaterial({
    shading: THREE.FlatShading,
    color: 0xa8dc00,
    ambient: 0x000000,
    emissive: 0x1b5c54,
    specular: 0xdcdcdc,
    shininess: 100
}
var exampleplanet2 =
{
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
var exampleplanet3 =
{
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
var exampleplanet4 =
{
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

viewablePlanets = [exampleplanet1,exampleplanet2,exampleplanet3,exampleplanet4];
viewablePlanetsIndex = 0

planetsInView = [];


setup();

funtion setup()
{
  scene = mainspace.scene;
  renderer = mainspace.renderer

  camera = mainspace.camera;

}

function initiateNextPlanet(index)
{
  planetInView = viewablePlanets[index];

  planetMesh = new THREE.Mesh(planetInView["geo"], planetInView["mat"]);
}
