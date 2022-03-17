import {GLTFLoader} from "./GLTFLoader.js"
import {OrbitControls} from "./OrbitControls.js"
import {CSS3DObject} from "./CSS3DRenderer.js"
import {CSS3DRenderer} from "./CSS3DRenderer.js"
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
lcd.css3dObject.element.textContent = "This is a test screen"
lcd.position.z=380
lcd.position.y = 120
lcd.position.x = 15
lcd.css3dObject.element.style.transform = 'scale(1.0)';
lcd.css3dObject.element.setAttribute('contenteditable', '');
scene.add(lcd)

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
  renderer2.render(scene,camera)
  requestAnimationFrame(animate)

}

function makeElementObject(type, width, height) {
    const obj = new THREE.Object3D

    const element = document.createElement( type );
    element.style.width = width+'px';
    element.style.height = height+'px';
    element.style.opacity = 0.999;
    element.style.color = 0x0F0F0F

    var css3dObject = new CSS3DObject( element );
    obj.css3dObject = css3dObject
    obj.add(css3dObject)

    // make an invisible plane for the DOM element to chop
    // clip a WebGL geometry with it.
    var material = new THREE.MeshPhongMaterial({
        opacity	: 0,
        color	: new THREE.Color( 0x0000ff ),
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
