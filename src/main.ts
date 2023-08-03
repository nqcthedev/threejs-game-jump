import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


type IBox = {
  width: number;
  height: number;
  depth: number;
}

// Create Camera
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// RENDERER 3D
// antialias:true, chong nhoe;
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
  antialias: true,
});
// enable Shadow
renderer.shadowMap.enabled = true;

// Thiet lap ty le diem anh chinh xac va sac net tren moi thiet bi co mat do diem anh khac nhau
renderer.setPixelRatio(window.devicePixelRatio);
// set Size cho object 3D;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// SCENE - Boi canh;
const scene: THREE.Scene = new THREE.Scene();

// ORBITAL CONTROLS -- Điều khiển camera control
const control = new OrbitControls(camera, renderer.domElement);

class Box extends THREE.Mesh {
  width: number;
  height: number;
  depth: number;
  
  
  constructor({width, height, depth}: IBox) {
    super(
      new THREE.BoxGeometry(width,height,depth),
      new THREE.MeshStandardMaterial({color:0x00ff00})
    ) 
    this.width = 3
    this.height = 3
    this.depth = 3
  }
}

// Cube - Khoi lap phuong;
const cube = new Box({width:1, height:1, depth:1})
cube.castShadow = true;
scene.add(cube);

// ground - Nen dat
const ground = new THREE.Mesh(
  new THREE.BoxGeometry(5, 0.5, 10),
  new THREE.MeshStandardMaterial({ color: 0x0000ff })
);
ground.receiveShadow = true
ground.position.y = -2;

scene.add(ground);

const light: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
light.position.y = 3;
light.position.z = 2;
light.castShadow = true;
scene.add(light);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
}

// Resize scene chính xác trên mọi thiết bị
const handleWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  //Cập nhật lại ma trận chiếu của camera
  camera.updateProjectionMatrix();
  // Update size new khi handleResize callback
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", handleWindowResize);

animate();
