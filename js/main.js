import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import Ammo from '/hands-landmarker-gesture-recognition/js/ammo.js'

// const timeStep =1/60;
// let TIMEOUT = true;


function playMP3() {
  // ここでmp3を再生する処理を実装する
  // 例えば、音声ファイルの読み込みと再生を行う
  // 以下は仮の例として、ブラウザのAudio APIを使用する
  const audio = new Audio('./sound/a.mp3');
  //  audio.renew();
  audio.play();
}
let audio1; 
function playMP3_1() {
  audio1 = new Audio('./sound/b.mp3');
  audio1.play();
  const stopAudioOnTimeout = function () {
    if (!TIMEOUT && audio1) {
      audio1.pause();
    }
  };

  audio1.addEventListener('ended', stopAudioOnTimeout);
}


function playMP3_2() {

  const audio2 = new Audio('./sound/c.mp3');
  audio2.play();
}
function playMP3_3() {

  const audio3 = new Audio('./sound/jump.mp3');
  // audio3.renew();
  audio3.play();
}
function playMP3_4() {

  const audio4 = new Audio('./sound/d.mp3');
  
  audio4.play();
}

let meme =50;
let lx =0;
let ly =0;
let lz =4;

let aa =false;
let bb =false;


// Aキーが押されたときの処理
document.addEventListener('keydown', function(event) {
  if (event.key === 'a') {
    TIMEOUT = false; // アニメーションを停止するフラグを立てる
    // ここでMP3_1を停止する
    if (audio1) {
      audio1.pause();
      
    }
  }
});

const gammaCorrection = 2.2; // Adjust this value as needed
const objectBrightness = 2; // Adjust this value as needed
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  meme,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);


let indexFingerTipX = 0;
let indexFingerTipY = 0;
let indexFingerTipZ = 0;
let secondHandIndexFingerTipX = 0;
let secondHandIndexFingerTipY = 0;
let secondHandIndexFingerTipZ = 0;
let X = 0;
let Y = 0;
//ジェスチャー結果識別↓
let name2 = "";
playMP3_1();


const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0xffffff); // 背景色を白に設定

//renderer.setClearColor(0x000000, 0);
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
light2.position.set(-20, 10, 10);
light2.castShadow = true; // ライトから影を生成する
light2.shadowCameraVisible = true;
scene.add(light2);

const light3 = new THREE.SpotLight(0xffffff);
light3.position.set(20, 10, 10);
light3.castShadow = true; // ライトから影を生成する
light3.shadowCameraVisible = true;
scene.add(light3);

const light4 = new THREE.SpotLight(0xffffff);
light4.position.set(20, 10, -10);
light4.castShadow = true; // ライトから影を生成する
light4.shadowCameraVisible = true;
scene.add(light4);

const light5 = new THREE.SpotLight(0xffffff);
light5.position.set(-20, 10, -10);
light5.castShadow = true; // ライトから影を生成する
light5.shadowCameraVisible = true;
scene.add(light5);


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
  gltfScene.position.x= 0;
  gltfScene.position.y= 0;
  gltfScene.position.z= 0;

  scene.add(gltf.scene);

}, undefined, function (error) {
  console.error(error);
});

let gltfScene2;

loader.load('./3Dmodel/teki.glb', function (gltf2) {
  gltfScene2 = gltf2.scene;
  gltfScene2.castShadow = true; // 影を生成する
  gltfScene2.traverse((model2) => {
    model2.castShadow = true; // 影を生成する
    model2.receiveShadow = true; // 影を受け取る
    gltfScene2.traverse((model2) => {
      if (model2.isMesh) {
        // Apply gamma correction to the material
        model2.material.gammaFactor = gammaCorrection;
        model2.material.needsUpdate = true;

              // Adjust the brightness of the material
      model2.material.emissiveIntensity = objectBrightness;
      }
    });
  });
  gltfScene2.position.y= 0;
  scene.add(gltf2.scene);

}, undefined, function (error) {
  console.error(error);
});

let gltfScene3;

loader.load('./3Dmodel/stage.glb', function (gltf3) {
  gltfScene3 = gltf3.scene;
  gltfScene3.castShadow = true; // 影を生成する
  gltfScene3.traverse((model3) => {
    model3.castShadow = true; // 影を生成する
    model3.receiveShadow = true; // 影を受け取る
    gltfScene3.traverse((model3) => {
      if (model3.isMesh) {
        // Apply gamma correction to the material
        model3.material.gammaFactor = gammaCorrection;
        model3.material.needsUpdate = true;

              // Adjust the brightness of the material
      model3.material.emissiveIntensity = objectBrightness;
      }
    });
  });
  gltfScene3.position.y= 5.3;
  gltfScene3.scale.set(5, 5, 5); // スケールを10倍に設定
  scene.add(gltf3.scene);

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
const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
//const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.5 }); // 影のみを表示するマテリアル

const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });


const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -1.5;
//ground.position.z = -3;
ground.receiveShadow = true; // 影を受け取る
//scene.add(ground);

camera.position.z = 5;

let bounceDistance = 3; // 弾き飛ばされる距離

const maxSpeed = 0.1; // 最大速度
const acceleration = 0.001; // 減速度

function animateInteraction() {
  // gltfSceneとgltfScene2の距離を計算
  const distance = Math.sqrt(
    Math.pow(gltfScene.position.x - gltfScene2.position.x, 2) +
    Math.pow(gltfScene.position.z - gltfScene2.position.z, 2)
  );

  if (distance <= 2.4) { // 距離が一定範囲内に入った場合
    const direction = new THREE.Vector3(
      gltfScene2.position.x - gltfScene.position.x,
      0,
      gltfScene2.position.z - gltfScene.position.z
    ).normalize();

    // gltfScene2を弾き飛ばす
    gltfScene2.position.x += direction.x * bounceDistance;
    gltfScene2.position.z += direction.z * bounceDistance;

    // 弾き飛ばされた後の速度を減速させる
    const speed = Math.sqrt(
      Math.pow(gltfScene2.position.x - gltfScene.position.x, 2) +
      Math.pow(gltfScene2.position.z - gltfScene.position.z, 2)
    );

    const deceleration = acceleration * speed;
    const newSpeed = Math.max(speed - deceleration, 0);
    const newDirection = direction.clone().multiplyScalar(newSpeed);

    gltfScene2.position.x = gltfScene.position.x + newDirection.x;
    gltfScene2.position.z = gltfScene.position.z + newDirection.z;
  }

  // 常に減速させる
  gltfScene2.position.x *= 1 - acceleration;
  gltfScene2.position.z *= 1 - acceleration;

    // gltfSceneとgltfScene2の距離を計算
    
  
    if (distance <= 2.4) { // 距離が一定範囲内に入った場合
      if(distance>0){playMP3();}
      const direction2 = new THREE.Vector3(
        gltfScene.position.x - gltfScene2.position.x,
        0,
        gltfScene.position.z - gltfScene2.position.z
      ).normalize();
  
      // gltfScene2を弾き飛ばす
      gltfScene.position.x += direction2.x * bounceDistance;
      gltfScene.position.z += direction2.z * bounceDistance;
  
      // 弾き飛ばされた後の速度を減速させる
      const speed2 = Math.sqrt(
        Math.pow(gltfScene.position.x - gltfScene2.position.x, 2) +
        Math.pow(gltfScene.position.z - gltfScene2.position.z, 2)
      );
  
      const deceleration2 = acceleration * speed2;
      const newSpeed2 = Math.max(speed2 - deceleration2, 0);
      const newDirection2 = direction2.clone().multiplyScalar(newSpeed2);
  
      gltfScene.position.x = gltfScene2.position.x + newDirection2.x;
      gltfScene.position.z = gltfScene2.position.z + newDirection2.z;
    }
  
    // 常に減速させる
    gltfScene.position.x *= 1 - acceleration;
    gltfScene.position.z *= 1 - acceleration;
}


      // gltfSceneがXZ平面において半径5の円より外に出たら画像を表示するための処理
      function checkBoundary() {
        camera.position.set(0,16, 12);
        camera.lookAt(lx, ly, lz);
          lx = (gltfScene.position.x+gltfScene2.position.x)/2;
          ly = (gltfScene.position.y+gltfScene2.position.y)/2;
          lz = (gltfScene.position.z+gltfScene2.position.z)/2;

          const radius = 15; // 半径
        const distance = Math.sqrt(
          Math.pow(gltfScene.position.x, 2) + Math.pow(gltfScene.position.z, 2)
          
        );
        const distance2 = Math.sqrt(
          Math.pow(gltfScene2.position.x, 2) + Math.pow(gltfScene2.position.z, 2)
          
        );
        const imageContainer = document.getElementById("image-container");

          let cc = false;
        
          if (distance > radius) {
            if(TIMEOUT==true){
            gltfScene.position.x =0;
            
            gltfScene.position.z =0;
            }}
        if (bb==false&&distance > radius) {
          cc= true;
          aa= true;
          bb=false;
          if(bb==false&&TIMEOUT==false){
          meme=20;
          lx=gltfScene2.position.x;
          ly=gltfScene2.position.y;
          lz=gltfScene2.position.z;
          GOLD = true;

          }if (bb==true){
            lx=gltfScene.position.x;
            ly=gltfScene.position.y;
            lz=gltfScene.position.z;
          }

          //imageContainer.style.display = "block";
        }        
        if (distance2 > radius) {
          if(TIMEOUT==true){
          gltfScene2.position.x =0;
          gltfScene2.position.z =0;
          }}
        if (aa==false&&distance2 > radius) {

          bb= true;aa=false;cc=true;
          if(aa==false&&TIMEOUT==false){
          meme=20;
          lx=gltfScene.position.x;
          ly=gltfScene.position.y;
          lz=gltfScene.position.z;
          BLUE = true;

          }
          if (aa==true){
            lx=gltfScene2.position.x;
            ly=gltfScene2.position.y;
            lz=gltfScene2.position.z;
          }


          

          //imageContainer.style.display = "block";
        } else {
          imageContainer.style.display = "none";
        }if(cc==true){
          //audio1.pause();
          //playMP3_2();
        }
      }

function animate() {

  // world.step(timeStep);
  requestAnimationFrame(animate);
  extractSecondHandIndexFingerTip();
  extractIndexFingerTip();
  //bounceDistance=bounceDistance/(Math.sqrt(gltfScene.position.x**2+gltfScene.position.z**2)+1);


   // gltfScene.position.z = indexFingerTipY/1000;
  //gltfScene.position.x = indexFingerTipX/1000;
  if(abs(indexFingerTipY)<350&&abs(indexFingerTipX)<350){
  gltfScene.position.z += indexFingerTipY / 1000;
  gltfScene.position.x += indexFingerTipX / 1000;}
  gltfScene.rotation.y += 50;

  gltfScene.position.y=Math.sqrt(gltfScene.position.x**2+gltfScene.position.z**2)**2/45;
  gltfScene.rotation.z=gltfScene.position.x**2/150


    //gltfScene2.position.z =secondHandIndexFingerTipY/1000;
    //gltfScene2.position.x =secondHandIndexFingerTipX/1000;
    if(abs(secondHandIndexFingerTipY)<350&&abs(secondHandIndexFingerTipX)<350){
  gltfScene2.position.z +=secondHandIndexFingerTipY/1000;
  gltfScene2.position.x +=secondHandIndexFingerTipX/1000;}
  gltfScene2.rotation.y += 50;
  gltfScene2.rotation.z=gltfScene2.position.x**2/150

  gltfScene2.position.y=Math.sqrt(gltfScene2.position.x**2+gltfScene2.position.z**2)**2/45;
 

  // obj.rotation.x += indexFingerTipY / 5000;
  // obj.rotation.y += indexFingerTipX / 2000;
  

  // if (objLoader.load) {
  //   renderer.render(scene, camera);
  // }

  if (gestures_results && gestures_results.gestures.length > 0) {
    name2 = gestures_results.gestures[0][0].categoryName;
  }

  // if (
  //   name2 === "Closed_Fist" &&
  //   Math.abs(gltfScene.position.y + indexFingerTipY / 200) < 0.4 &&
  //   Math.abs(gltfScene.position.x - indexFingerTipX / 200) < 0.4
  // ) {
  //   gltfScene.position.y = -indexFingerTipY / 200;
  //   gltfScene.position.x = indexFingerTipX / 200;
  //   gltfScene.position.z = (indexFingerTipZ * -70)-3;
  // }
      // Generate random values for z and x coordinates



       gltfScene3.rotation.y += 0.01;
  
  // // Reflect if out of bounds
  // const centerX = 0; // 中心のX座標
  // const centerZ = 0; // 中心のZ座標
  // const radius = 4; // 半径

  // if (gltfScene2.position.x > centerX + radius) {
  //   gltfScene2.position.x = centerX + radius - (gltfScene2.position.x - (centerX + radius));
  // } else if (gltfScene2.position.x < centerX - radius) {
  //   gltfScene2.position.x = centerX - radius - (gltfScene2.position.x - (centerX - radius));
  // }

  // if (gltfScene2.position.z > centerZ + radius) {
  //   gltfScene2.position.z = centerZ + radius - (gltfScene2.position.z - (centerZ + radius));
  // } else if (gltfScene2.position.z < centerZ - radius) {
  //   gltfScene2.position.z = centerZ - radius - (gltfScene2.position.z - (centerZ - radius));
  // }

  //敵AI＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

  const initialY = gltfScene.position.y;
  if (name2 === "Closed_Fist") {
    let bounceDuration = 0; // 跳ねるアニメーションの時間（秒）


    let elapsedTime = 100; // アニメーションの開始からの経過時間

  
    while(bounceDuration<elapsedTime){
      bounceDuration+=0.01;
      gltfScene.position.y-=1;
    }
    while(bounceDuration>0){
      bounceDuration-=0.01;
      gltfScene.position.y+=1;
    }
    function animateBounce() {

    }
  
    animateBounce();
  }
  
  animateInteraction();

  checkBoundary(); // バウンダリーチェック

  renderer.render(scene, camera);
}





animate();
console.log(`Index Finger Tip: (${indexFingerTipX}, ${indexFingerTipY})`);

function extractIndexFingerTip() {
  if (gestures_results && gestures_results.landmarks) {
    const landmarks = gestures_results.landmarks[0]; // 最初の手のランドマークデータを取得
    const indexFingerTip = landmarks[8]; // 人差し指の先のランドマークのインデックスは8
    indexFingerTipX = (width - indexFingerTip.x * width) - centerX-(width/4);
    indexFingerTipY = indexFingerTip.y * height - centerY;
    indexFingerTipZ = indexFingerTip.z; // 奥行きの値を保存
    //X = indexFingerTipX;
    //Y = indexFingerTipY;
  }
}
function extractSecondHandIndexFingerTip() {
  if (gestures_results && gestures_results.landmarks && gestures_results.landmarks.length > 1) {
    const landmarks = gestures_results.landmarks[1]; // 二番目の手のランドマークデータを取得
    const indexFingerTip = landmarks[8]; // 人差し指の先のランドマークのインデックスは8
    secondHandIndexFingerTipX = (width - indexFingerTip.x * width) - centerX+(width/4);
    secondHandIndexFingerTipY = indexFingerTip.y * height - centerY;
    secondHandIndexFingerTipZ = indexFingerTip.z; // 奥行きの値を保存
  } else {
    // 二番目の手のランドマークが検出されていない場合は座標をリセット
    secondHandIndexFingerTipX = 0;
    secondHandIndexFingerTipY = 0;
    secondHandIndexFingerTipZ = 0;
  }
}

