particlesJS.load('animated', './particles.json', function() {
    console.log('particles.js config loaded');
  });

let container = document.querySelector('.app');

//parameters for future plane & animation
let vertexHeight = 10000,
		planeSegments = 100,
		planeSize = 1245000,
    background = "#002135",
    meshColor = "#005e97"; 
    
//creating camera
let camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 400000)
camera.position.z = 10000;
camera.position.y = 6000;



//creating scene
let scene = new THREE.Scene();
scene.fog = new THREE.Fog(background, 1, 300000);



//creating geometry
let planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize, planeSegments, planeSegments);

let planeMaterial =   new THREE.MeshLambertMaterial( {
  color: meshColor,
  polygonOffset: true,
  polygonOffsetFactor: 1, // positive value pushes polygon further away
  polygonOffsetUnits: 1,
  wireframe: true,
});

let plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x -= Math.PI * 0.5;
scene.add(plane);


//creating lights

let hemisphereLight = new THREE.HemisphereLight(0xe3feff, 0xe6ddc8, 0.7);
scene.add(hemisphereLight);
hemisphereLight.position.y = 8000;

let pointLight = new THREE.PointLight(0xffffff, 5);
pointLight.position.z = 400;
scene.add(pointLight);

let pointLight2 = new THREE.PointLight(0xffffff, 2);
pointLight2.position.y = 12000;
pointLight2.position.z = 2000;
scene.add(pointLight2);


//adapting scene for window resize
window.addEventListener( 'resize', onResize);

function onResize() {
  let newWidth = window.innerWidth;
  let newHeight = window.innerHeight;
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( newWidth, newHeight );
};



//creating renderer
let renderer = new THREE.WebGLRenderer({alpha: false});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(background, 1);

container.appendChild(renderer.domElement);

updatePlane();

	function updatePlane() {
		for (let i = 0; i < planeGeometry.vertices.length; i++) {
      planeGeometry.vertices[i].z += Math.random() * vertexHeight - vertexHeight;
      planeGeometry.vertices[i]._myZ = planeGeometry.vertices[i].z
		}
	};

render();

var count = 0
function render() {
		requestAnimationFrame(render);
    var x = camera.position.x; // 0
    var z = camera.position.z;
    camera.position.x = x * Math.cos(0.001) - z * Math.sin(0.001) - 5;
    camera.position.z = z * Math.cos(0.001) + x * Math.sin(0.001);
    camera.lookAt(new THREE.Vector3(0, 8000, 0))

    for (let i = 0; i < planeGeometry.vertices.length; i++) {
      var z = +planeGeometry.vertices[i].z;
      planeGeometry.vertices[i].z = Math.sin(( i + count * 0.00002)) * (planeGeometry.vertices[i]._myZ - (planeGeometry.vertices[i]._myZ* 0.6))
      plane.geometry.verticesNeedUpdate = true;

      count += 0.05;
    }
		renderer.render(scene, camera);
	}



	

