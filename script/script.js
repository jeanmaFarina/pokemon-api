import {GLTFLoader} from "./GLTFLoader.js"
import {OrbitControls} from "./OrbitControls.js"
const scene = new THREE.Scene({ antialias: true});
scene.background = new THREE.Color(0x0F0F0F)

let camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,0.1,5000)
camera.rotation.y = 20/180*Math.PI
camera.position.y = 100
camera.position.x = 500
camera.position.z = 1000

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff,2)
directionalLight.position.set(0.5,4,0.5)
directionalLight.castShadow = true
scene.add(directionalLight)

let renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)

document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera,renderer.domElement)
controls.addEventListener("change", renderer)

let loader = new GLTFLoader()
let gameboy
loader.load("./ressources/gameboy/scene.gltf",(gltf)=>{
  gameboy = gltf.scene
  scene.add(gltf.scene)
  animate()
  console.log("model loaded")
})

function animate(){
  renderer.render(scene,camera)
  requestAnimationFrame(animate)

}
