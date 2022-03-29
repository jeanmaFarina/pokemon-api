import {GLTFLoader} from "./GLTFLoader.js"
import {OrbitControls} from "./OrbitControls.js"
import {CSS3DObject} from "./CSS3DRenderer.js"
import {CSS3DRenderer} from "./CSS3DRenderer.js"
const scene = new THREE.Scene({ antialias: true});
let res
let clone = document.importNode(document.querySelector("#template").content,true)
let pokemon
let description
let counter = 1
scene.background = new THREE.Color(0x0F0F0F)
let camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,0.1,5000)
camera.rotation.y = 20/180*Math.PI
camera.position.y = 150
camera.position.x = 100
camera.position.z = 1000

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff,2)
directionalLight.position.set(0.5,4,0.5)
directionalLight.castShadow = true
scene.add(directionalLight)

let renderer2 = new CSS3DRenderer();
    renderer2.setSize( window.innerWidth, window.innerHeight );
    renderer2.domElement.style.position = 'absolute';
    renderer2.domElement.style.top = 0;
    document.body.appendChild( renderer2.domElement );

let renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(window.innerWidth,window.innerHeight)

document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera,renderer.domElement)
const controls2 = new OrbitControls(camera,renderer2.domElement)
controls.addEventListener("change", renderer)
controls2.addEventListener("change", renderer2)

const lcd = makeElementObject('div', 150,150)
//lcd.css3dObject.element.textContent = "This is a test screen"
//description = await apiDescription(33)
pokemon= await apiCall(counter)
description = await apiDescription(counter)
fillClone(pokemon,description)
lcd.css3dObject.element.appendChild(clone)
lcd.position.z=38
lcd.position.y = 20
lcd.position.x = 11
lcd.css3dObject.element.style.transform = 'scale(1.0)';
//lcd.css3dObject.element.setAttribute('contenteditable', '');
scene.add(lcd)

let loader = new GLTFLoader()
let gameboy
loader.load("./ressources/gameboy/scene.gltf",(gltf)=>{
  gameboy = gltf.scene
  gameboy.position.y = -100
  scene.add(gameboy)
  animate()
  console.log("model loaded")
})

async function apiCall(id){
    res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    let json = await res.json()
    //console.log(json)
    return json
}

async function apiDescription(id){
  res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
  let json = await res.json()
  //console.log(json)
  return json
}

function fillClone(poke,desc){
  //console.log(desc.flavor_text_entries)
  clone = document.importNode(document.querySelector("#template").content,true)
  clone.querySelector(".name").textContent =  poke.name
  clone.querySelector(".number").textContent = `N° ${poke.id}`
  clone.querySelector("img").src = poke.sprites.front_default
  clone.querySelector(".weight").textContent = `WT ${poke.weight} lb`
  clone.querySelector(".height").textContent = `HT ${poke.height}'`
  clone.querySelector(".type").textContent = poke.types[0].type.name
  clone.querySelector(".description").textContent = desc.flavor_text_entries[0].flavor_text
  //lcd.css3dObject.element.removeChild(lcd.css3dObject.element.querySelector(".screen"))
  lcd.css3dObject.element.appendChild(clone)
}

function animate(){
  renderer.render(scene,camera)
  renderer2.render(scene,camera)
  requestAnimationFrame(animate)

}

function makeElementObject(type, width, height) {
    const obj = new THREE.Object3D

    const element = document.createElement( type );
    element.style.width = width+'px';
    element.style.height = height+'px';
    element.style.opacity = 0.999;
    element.style.color = 0x00FF00

    var css3dObject = new CSS3DObject( element );
    obj.css3dObject = css3dObject
    obj.add(css3dObject)

    // make an invisible plane for the DOM element to chop
    // clip a WebGL geometry with it.
    var material = new THREE.MeshPhongMaterial({
        opacity	: 0,
        color	: new THREE.Color( 0x00ff00 ),
        blending: THREE.NoBlending,
        side	: THREE.DoubleSide,
    });
    var geometry = new THREE.BoxGeometry( width, height, 0.01 );
    var mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    obj.lightShadowMesh = mesh
    obj.add( mesh );

    return obj
}

document.addEventListener("keyup",async (e)=>{
  if(e.keyCode === 37){
    console.log("left")
    if(counter>1)
      counter = counter -1
    pokemon= await apiCall(counter)
    description = await apiDescription(counter)
    lcd.css3dObject.element.removeChild(lcd.css3dObject.element.querySelector(".screen"))
    fillClone(pokemon,description)

  }if(e.keyCode === 39){
    console.log("right")
    if(counter < 151)
      counter = counter +1
    pokemon= await apiCall(counter)
    description = await apiDescription(counter)
    lcd.css3dObject.element.removeChild(lcd.css3dObject.element.querySelector(".screen"))
    fillClone(pokemon,description)

  }

})
