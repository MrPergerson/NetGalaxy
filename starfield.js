particles = [];

setup();

function setup()
{
  makeParticles()
}

function update()
{
  updateParticles();
}

function updateParticles()
{

  for(var i=0; i<particles.length; i++)
  {
    particle = particles[i];
    particle.position.z += 3;

    if(particle.position.z>1000)
      particle.position.z -= 2000;

  }
}

function makeParticles()
{
  var particle, material;

  for(var zpos = -1000; zpos < 1000; zpos += 20)
  {
    material = new THREE.ParticleCanvasMaterial( { color: Math.random()*0xffffff, program: particleRender } );

    particle = new THREE.Particle(material);

    // place particle some where random
    particle.position.x = Math.random() * 1000 - 500;
    particle.position.y = Math.random() * 1000 - 500;

    // create particles such that they are spread out
    particle.position.z = zpos;

    // var happy = spacemain.mesh;
    // spacemain.scene.add(particle);
    particle.push(particle);
  }
}

function particleRender( context ) {

  context.beginPath();

  context.rect( 4, 4, 2, 2);
  context.fill();
};

setup();
