import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const gammaCorrection = 2.2; // Adjust this value as needed
const objectBrightness = 2; // Adjust this value as needed
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);


let indexFingerTipX = 0;
let indexFingerTipY = 0;
let indexFingerTipZ = 0;
let X = 0;
let Y = 0;
//ジェスチャー結果識別↓
let name2 = "";

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
    //テクスチャをガンマ補正
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
//renderer.shadowMapCullFrontFaces = false;

const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();


// レンダラーを `canvas2` ディビジョンに追加
// レンダラーを `canvas2` ディビジョンに追加
const canvas2 = document.getElementById('canvas2');
canvas2.style.height = '100vh';
canvas2.appendChild(renderer.domElement);

const light = new THREE.SpotLight(0xffffff);
light.position.set(0, 10, 10);
light.castShadow = true; // ライトから影を生成する
light.shadowCameraVisible = true;
scene.add(light);

const light2 = new THREE.SpotLight(0xffffff);
light2.position.set(0, 0, 30);
light2.castShadow = true; // ライトから影を生成する
light2.shadowCameraVisible = true;
scene.add(light2);

// 影の設定
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // ソフトシャドウマップを使用
renderer.shadowMap.autoUpdate = true;


//renderer.shadowMap.enabled = true;
//renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 影の滑らかさを設定

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true; // 影を生成する
//scene.add(cube);


let gltfScene;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
loader.load('./3Dmodel/bay.glb', function (gltf) {
  gltfScene = gltf.scene;
  gltfScene.castShadow = true; // 影を生成する
  gltfScene.traverse((model) => {
    model.castShadow = true; // 影を生成する
    model.receiveShadow = true; // 影を受け取る
    gltfScene.traverse((model) => {
      if (model.isMesh) {
        // Apply gamma correction to the material
        model.material.gammaFactor = gammaCorrection;
        model.material.needsUpdate = true;

              // Adjust the brightness of the material
      model.material.emissiveIntensity = objectBrightness;
      }
    });
  });
  scene.add(gltf.scene);

}, undefined, function (error) {
  console.error(error);
});

// const objLoader = new THREE.OBJLoader();
// let obj;
// objLoader.load(
//   './3Dmodel/bay.obj',
//   function (loadedObj) {
//     obj = loadedObj; // 読み込まれたOBJオブジェクトを変数に代入
//     const material2 = new THREE.MeshStandardMaterial({ color: 0xff0000 });
//     obj.traverse(function (child) {
//       if (child instanceof THREE.Mesh) {
//         child.material = material2; // オブジェクトのすべてのメッシュにマテリアルを設定
//         obj.castShadow = true; // 影を生成する
//         obj.receiveShadow = true; // 影を受け取る
//       }
//     });
//     const scale = 1; // サイズを調整するためのスケール値
//     obj.scale.set(scale, scale, scale); // オブジェクトのスケールを設定

//     obj.position.x = 0;
//     obj.position.y = 0;
//     obj.position.z = 0;
    
//     scene.add(obj);

    
//   },
// );

// 平面を作成して影を受け取る
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.5 }); // 影のみを表示するマテリアル

//const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });


const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -4;
ground.position.z = -3;
ground.receiveShadow = true; // 影を受け取る
scene.add(ground);

camera.position.z = 5;



function animate() {
  requestAnimationFrame(animate);

  extractIndexFingerTip();

  cube.rotation.x += indexFingerTipY / 5000;
  cube.rotation.y += indexFingerTipX / 500;
  gltfScene.rotation.x += indexFingerTipY / 20000;
  gltfScene.rotation.y += indexFingerTipX / 2000;

  // obj.rotation.x += indexFingerTipY / 5000;
  // obj.rotation.y += indexFingerTipX / 2000;
  

  // if (objLoader.load) {
  //   renderer.render(scene, camera);
  // }

  if (gestures_results && gestures_results.gestures.length > 0) {
    name2 = gestures_results.gestures[0][0].categoryName;
  }

  if (
    name2 === "Closed_Fist" &&
    Math.abs(gltfScene.position.y + indexFingerTipY / 200) < 0.4 &&
    Math.abs(gltfScene.position.x - indexFingerTipX / 200) < 0.4
  ) {
    gltfScene.position.y = -indexFingerTipY / 200;
    gltfScene.position.x = indexFingerTipX / 200;
    gltfScene.position.z = (indexFingerTipZ * -70)-3;
  }

  renderer.render(scene, camera);
}

animate();
console.log(`Index Finger Tip: (${indexFingerTipX}, ${indexFingerTipY})`);

function extractIndexFingerTip() {
  if (gestures_results && gestures_results.landmarks) {
    const landmarks = gestures_results.landmarks[0]; // 最初の手のランドマークデータを取得
    const indexFingerTip = landmarks[8]; // 人差し指の先のランドマークのインデックスは8
    indexFingerTipX = (width - indexFingerTip.x * width) - centerX;
    indexFingerTipY = indexFingerTip.y * height - centerY;
    indexFingerTipZ = indexFingerTip.z; // 奥行きの値を保存
    //X = indexFingerTipX;
    //Y = indexFingerTipY;
  }
}
