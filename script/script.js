import {GLTFLoader} from "./GLTFLoader.js"

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0F0F0F)
let camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,0.1,5000)
camera.rotation.y = 45/180*Math.PI
camera.position.y = 100
camera.position.x = 600
camera.position.z = 1000
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement)
let loader = new GLTFLoader()
let gameboy
loader.load("./ressources/gameboy/scene.gltf",(gltf)=>{
  gameboy = gltf.scene
  scene.add(gltf.scene)
  renderer.render(scene,camera)
  console.log("model loaded")
})
