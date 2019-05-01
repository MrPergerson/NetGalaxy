var job1 = {
  src: "job1.html",
  objPath: '../models/job.obj'
}

var jobs = [job1];
var jobsIndex = 0
var hasJobLapsed = false;
var jobMesh;



function initiateJob(scene) {

  if (jobsIndex >= jobs.length) jobsIndex = 0;
  job = jobs[jobsIndex++];

  var loader = new THREE.GLTFLoader();
  loader.load('../models/job.gltf', onLoad);

}

function getJobMesh(scene)
{
  return jobMesh;
}

function onLoad(gltf) {
  jobMesh = createGroupFromImportedScene(gltf.scene);
  jobMesh.name = "job";
  console.log("it loaded: jobMesh: " + jobMesh + " name: " + jobMesh.name);

  jobMesh.scale.set(20, 20, 20);

  var maxRange = window.innerHeight / 2;
  var offset = maxRange / 2;
  jobMesh.position.x = maxRange * Math.random() - offset;
  jobMesh.position.y = maxRange * Math.random() - offset;
  jobMesh.position.z = -500;

  scene.add(jobMesh);

}

function createGroupFromImportedScene(gltfScene)
{
  var group = new THREE.Group();
  var length =  gltfScene.children.length;
  for(i = length-1; i >= 0; i--)
  {
    gltfScene.children[i].material = new THREE.MeshNormalMaterial();
    group.add(gltfScene.children[i]);
  }

  return group;
}

function getJobInView() {
  return jobInView;
}

function jobHasLapsed() {
  if (hasJobLapsed) {
    hasJobLapsed = false;
    return true;
  } else
    return false;
}

function animateJob(mesh, speed) {
  mesh.position.z += speed;



  if (mesh.position.z > 500)
    hasJobLapsed = true;
}
