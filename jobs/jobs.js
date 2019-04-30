var job1 = {
  src: "job1.html",
  objPath: '../models/job.obj'
}

var jobs = [job1];
var jobsIndex = 0
var hasLapsed = false;
var jobMesh = new THREE.Object3D();



function initiateJob(scene) {
  if (jobsIndex >= jobs.length) jobsIndex = 0;
  job = jobs[jobsIndex++];

  jobMesh.name = "x";

  var loader = new THREE.GLTFLoader();
  loader.load('../models/job.gltf', onLoad);

  return getJobMesh();

}

function getJobMesh()
{
  return jobMesh;
}

function onLoad(gltf) {
  jobMesh = gltf.scene;
  jobMesh.name = "y";

  jobMesh.children[0].material = new THREE.MeshNormalMaterial();
  jobMesh.children[1].material = new THREE.MeshNormalMaterial();
  jobMesh.children[2].material = new THREE.MeshNormalMaterial();

  jobMesh.scale.set(20, 20, 20);

  var maxRange = window.innerHeight / 2;
  var offset = maxRange / 2;
  jobMesh.position.x = maxRange * Math.random() - offset;
  jobMesh.position.y = maxRange * Math.random() - offset;
  jobMesh.position.z = -500;

  scene.add(jobMesh);
}

function getJobInView() {
  return jobInView;
}

function jobHasLapsed() {
  if (hasLapsed) {
    hasLapsed = false;
    console.log("joblapsed called :)");
    return true;
  } else
    return false;
}

function animateJob(mesh, speed) {
  mesh.position.z += 1;
  //console.log("Mesh position.z: " + mesh.position.z);
  if (mesh.position.z > 500)
    hasLapsed = true;
}
