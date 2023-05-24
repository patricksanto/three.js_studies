import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//Scene
const scene = new THREE.Scene();

//Create a sphere
const geometry = new THREE.TorusKnotGeometry( 30, 2, 231, 20, 11, 8 );
 const material = new THREE.MeshStandardMaterial({
      color: '#fbe',
      metalness: 1,
      opacity: 0.8,
      transparent: true,
      emissive: '#000',
      emissiveIntensity: 0.5,
 })
 const mesh = new THREE.Mesh( geometry, material );
 scene.add( mesh );

 //Sizes
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

 //Light
  const light = new THREE.PointLight( '#ffd ', 1 , 100);
  // const light2 = new THREE.PointLight( '#f6e ', 1 , 100);
  light.position.set(20 , 20, 20);
  light.intensity = 4;
  // light2.position.set(-40 , 40, -20);
  // scene.add( light2 );
  scene.add( light );


 //Add the Camera
 const camera = new THREE.PerspectiveCamera( 50, sizes.width / sizes.height, 0.1, 1000 );
 camera.position.z = 100;
 scene.add( camera );


 //Renderer
const canvas = document.querySelector('.webgl');
const renderer  = new THREE.WebGLRenderer({ canvas });
renderer.setSize( sizes.width, sizes.height );
renderer.setPixelRatio (2)
renderer.render( scene, camera );


 //Controls
 const controls = new OrbitControls( camera, canvas );
 controls.enableDamping = true;
 controls.enablePan = false;
 controls.enableZoom = false;
 controls.autoRotate = true;
 controls.autoRotateSpeed = 5;
//Resize
window.addEventListener('resize', () => {
   //Update Sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    //Update Camera
    camera.updateProjectionMatrix();
    camera.aspect = sizes.width / sizes.height;
    renderer.setSize( sizes.width, sizes.height );
});

const loop = () => {
  controls.update();
  renderer.render( scene, camera );
  window.requestAnimationFrame( loop );
}
loop();


// Timeline Magic
const tl = gsap.timeline({defaults: {duration: 2 , ease: 'power2.inOut'}});
tl.fromTo(mesh.scale , {x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 1});
tl.fromTo('.title', {opacity: 0}, {opacity: 1});
tl.fromTo('navbar', {y: '-100%'}, {y: '0%'});

//Mouse animation color change
let mouseDown = false;
let rgb = [];
window.addEventListener('mousedown', () => ( mouseDown = true ));
window.addEventListener('mouseup', () => ( mouseDown = false ));

window.addEventListener('mousemove', (e) => {
  if(mouseDown){
    rgb = [
      Math.round( e.pageX / window.innerWidth * 255 ),
      Math.round( e.pageY / window.innerHeight * 255 ),
      150
    ]
    // Lets Animate
    let newColor = new THREE.Color(`rgb(${rgb.join(',')})`);
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b} );

  }
});
