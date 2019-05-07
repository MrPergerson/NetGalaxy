var job1 = {
  src: "job1.html",
  objPath: '../models/job.obj'
}

var jobs = [job1];
var hasJobLapsed = false;
var jobMeshs = [];
var jobMeshs_Index = 0; // store on computre

var jobSrc = ["jobs/job1.html","jobs/job2.html","jobs/job3.html","jobs/job4.html"];

var jobSrc_locked = false;


function initiateAllJobs() {

  var loader = new THREE.GLTFLoader();
  loader.load('../models/job.gltf', onLoad);

  // var loader = new THREE.GLTFLoader();
  // loader.load('../models/job2.gltf', onLoad, onError);

  var loader = new THREE.GLTFLoader();
  loader.load('../models/job3.gltf', onLoad, onError);

  var loader = new THREE.GLTFLoader();
  loader.load('../models/job4.gltf', onLoad, onError);

  var loader = new THREE.GLTFLoader();
  loader.load('../models/job5.gltf', onLoad, onError);



}

function getNextJobMesh()
{
  var jobMeshs_Index = parseInt(localStorage.getItem('meshindex'),10);
  if(jobMeshs_Index >= jobMeshs.length) jobMeshs_Index = 0;
  var jobMesh = jobMeshs[jobMeshs_Index];
  localStorage.setItem('meshindex',(jobMeshs_Index+1).toString());

  var maxRange = window.innerHeight / 3;
  var offset = maxRange / 2;
  jobMesh.position.x = maxRange * Math.random() - offset;
  jobMesh.position.y = maxRange * Math.random() - offset;
  jobMesh.position.z = -500;

  return jobMesh;
}

function onLoad(gltf) {
  var jobMesh = createGroupFromImportedScene(gltf.scene);
  jobMesh.name = "job";
  console.log("it loaded: jobMesh: " + jobMesh + " name: " + jobMesh.name);

  jobMesh.scale.set(20, 20, 20);

  jobMeshs.push(jobMesh);

}

function onError(error)
{
  console.log("!- Failed to load gltf: " + error);
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
    jobSrc_locked = false;
    return true;
  } else
    return false;
}

function getNextJobSrc()
{
  if(jobSrc_locked == false)
  {
    var jobSrc_index = parseInt(localStorage.getItem('jobindex'),10);
    console.log(jobSrc_index);
    if(jobSrc_index >= jobSrc.length)
    {
      localStorage.setItem('jobindex','0');
      // make index store on browser
      return "../theend.html";
    }
    else {
      jobSrc_locked = true;
      localStorage.setItem('jobindex',(jobSrc_index+1).toString());
      return jobSrc[jobSrc_index];
    }

  }

}

function animateJob(mesh, speed) {
  mesh.position.z += speed;

  var time = Date.now() * 0.001;

  var rx = Math.sin( time * 0.7 ) * 0.01,
					ry = Math.sin( time * 0.3 ) * 0.01,
					rz = Math.sin( time * 0.2 ) * 0.01;

  mesh.rotation.x += rx;
  mesh.rotation.y += ry;
  mesh.rotation.z += rz;

  if (mesh.position.z > 500)
    hasJobLapsed = true;
}
