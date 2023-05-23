import * as THREE from "three";

//Scene
const scene = new THREE.Scene();

//Create a sphere
 const geometry = new THREE.SphereGeometry( 3, 64, 64 );
 const material = new THREE.MeshStandardMaterial({
      color: '#00ff83',
      roughness: 0.4,
 })
 const mesh = new THREE.Mesh( geometry, material );
 scene.add( mesh );

 //Add the Camera
 const camera = new THREE.PerspectiveCamera( 50, 800, 600 );
 scene.add( camera );

 //Renderer
const canvas = document.querySelector('.webgl');
const renderer  = new THREE.WebGLRenderer({ canvas });
renderer.setSize( 800, 600 );
renderer.render( scene, camera );
