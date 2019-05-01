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


  return new Promise((resolve, reject)=>
  {
    if(typeof jobMesh === "undefined")
    {
      reject("jobMesh hasn't loaded yet");
    }
    else {
      console.log("success, jobMesh was loaded!");
      resolve(jobMesh);
    }
  })
}

function getJobMesh(scene)
{
  return jobMesh;
}

function onLoad(gltf) {
  console.log("it loaded");
  jobMesh = createGroupFromImportedScene(gltf.scene);
  jobMesh.name = "y";

  //jobMesh.children[0].material = new THREE.MeshNormalMaterial();

  jobMesh.scale.set(20, 20, 20);

  var maxRange = window.innerHeight / 2;
  var offset = maxRange / 2;
  jobMesh.position.x = maxRange * Math.random() - offset;
  jobMesh.position.y = maxRange * Math.random() - offset;
  jobMesh.position.z = -500;

  scene.add(jobMesh);

  //console.log("onLoad " + jobMesh.name);

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
  //console.log("currentjob " + mesh.name);
  mesh.position.z += speed;
  //console.log("Mesh position.z: " + mesh.position.z);
  if (mesh.position.z > 500)
    hasJobLapsed = true;
}
