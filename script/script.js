import {GLTFLoader} from "./GLTFLoader.js"

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.01,1000)
let render = new THREE.WebGLRenderer()
render.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(render.domElement)
let loader = new GLTFLoader()
let gameboy
loader.load("./ressources/gameboy/scene.gltf",(gltf)=>{
  gameboy = gltf.scene
  scene.add(gltf.scene)
})
let light = new THREE.HemisphereLight(0xffffff,0x000000,2)
scene.add(light)
camera.position.set(0,0,19)
function animate(){
  requestAnimationFrame(animate)
  gameboy.rotate.y += 0.05
  render.render(scene,camera)
}
animate()
