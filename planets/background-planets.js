var mouseX = 0;
var mouseY = 0;

var bgPlanets = [];

function createBackgroundPlanets(scene, amount, maxRange)
{
  for (var i = 0; i < amount; i++)
  {
    // create mesh
    geometry = new THREE.IcosahedronBufferGeometry(150,0);
    material = new THREE.MeshNormalMaterial({flatShading: true});
    mesh = new THREE.Mesh(geometry,material);
    mesh.name = "Star";

    // set random location
    var offset = maxRange/2;
    mesh.position.x = Math.random() * maxRange - offset;
    mesh.position.y = Math.random() * maxRange - offset;
    mesh.position.z = Math.random() * maxRange - offset;

    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;
    mesh.rotation.z = Math.random() * 2 * Math.PI;

    mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.1;

    scene.add(mesh);
    bgPlanets.push(mesh);

  }
}

function createStars(scene)
{
  starGeometry = new THREE.Geometry();

  for (i = 0; i < 5000; i++) {
    var vertex = new THREE.Vector3();
    var maxRange = 3000;
    var offset = maxRange / 2;
    vertex.x = maxRange * Math.random() - offset;
    vertex.y = maxRange * Math.random() - offset;
    // vertex.z = 1000 * Math.random() - 500;
    starGeometry.vertices.push(vertex);
  }

  starMaterial = new THREE.PointsMaterial({
    size: 2,
    sizeAttenuation: false,
    transparent: true
  });
  starMaterial.color.setHex(0xff00ff);

  stars = new THREE.Points(starGeometry, starMaterial);
  stars.sortParticles = true;
  stars.position.z = -1000;
  scene.add(stars);
}

function animateBackgroundPlanets(spd)
{

  for (var i = 0; i < bgPlanets.length; i++)
  {
    var planet = bgPlanets[i];
    planet.position.z += spd;

    if(planet.position.z > 500)
    {
      planet.position.z -= 1500;
      planet.scale.x = planet.scale.y = planet.scale.z = .01;
    }

    increaseScaleOnRepeat(planet,.001)


  }

}

function increaseScaleOnRepeat(planet, amount)
{
  if(planet.scale.x < .1)
  {
    planet.scale.set(planet.scale.x+amount,planet.scale.y+amount,planet.scale.z+amount);
  }
  else if (planet.scale.x > .1) {
    planet.scale.set(.1,.1,.1);
  }
}
