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
  source: "#",
  geo: new THREE.IcosahedronGeometry(150, 0),
  mat: new THREE.MeshBasicMaterial({
    flatShading: true,
    color: 0xdcdcdc,
  })
};
var exampleplanet3 =
{
  source: "#",
  geo: new THREE.IcosahedronGeometry(150, 0),
  mat: new THREE.MeshBasicMaterial({
    flatShading: true,
    color: 0x5c6113,
  })
};
var exampleplanet4 =
{
  source: "#",
  geo: new THREE.IcosahedronGeometry(150, 0),
  mat: new THREE.MeshBasicMaterial({
    flatShading: true,
    color: 0xff0000,
  })
};

viewablePlanets = [exampleplanet1,exampleplanet2,exampleplanet3,exampleplanet4];
viewablePlanetsIndex = 0
hasLapsed = false;
planetsInView = [];

function initiateNextPlanet(scene)
{
  if(viewablePlanetsIndex >= viewablePlanets.length) viewablePlanetsIndex = 0;
  planetInView = viewablePlanets[viewablePlanetsIndex++];

  planetMesh = new THREE.Mesh(planetInView["geo"], planetInView["mat"]);
  planetMesh.scale.set(.2,.2,.2);

  var maxRange = window.innerHeight/2;
  var offset = maxRange / 2;
  planetMesh.position.x = maxRange * Math.random() - offset;
  planetMesh.position.y = maxRange * Math.random() - offset;
  planetMesh.position.z = -500;

  planetsInView[0] = planetMesh;
  scene.add(planetMesh);

  return planetMesh;
}

function mainPlanetLapsed()
{
  if(hasLapsed)
  {
    hasLapsed = false;
    return true;
  }
  else
    return false;
}

function animatePlanet(mesh, speed)
{
  mesh.position.z += 1;

  if (mesh.position.z > 500)
    hasLapsed = true;
}
