let gestures_results;
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
let indexFingerTipX = 0;
let indexFingerTipY = 0;
let indexFingerTipZ = 0;
let secondHandIndexFingerTipX = 0;
let secondHandIndexFingerTipY = 0;
let secondHandIndexFingerTipZ = 0;
let TIMEOUT = true;
let TIMEOUT2=true;
let TIMEOUT3=true;
let tuto=true;

let displayA = false;
let GOLD = false;
let BLUE = false;

let audio5;
let audio6;
let audio7;
let audio8;
let audio9;


function drawA() {
    
    if (displayA) {
      textSize(360);
      textAlign(CENTER, CENTER);
      fill(255, 255, 255);
      stroke(0); // 線の色を黒に設定
      text("GOGOGO!",centerX, centerY);
    }
}

document.addEventListener('keydown', function(event) {
  // Aキーが押されたらテキストを表示し、1秒後に非表示にする
  if (event.key === 'a'&&TIMEOUT==true) {
    playMP3_8();
      clearTimeout(TIMEOUT); // Clear any previous timeouts to avoid conflicting delays
      
      TIMEOUT = setTimeout(function() {
          displayA = true;
          drawA();
          setTimeout(function() {
              displayA = false;
              drawA();
          }, 1000);
      }, 3000);
      TIMEOUT=false;
  }
});


function playMP3_5() {

  const audio5 = new Audio('./sound/e.mp3');
  
  audio5.play();
    // 再生が終了した時のイベントハンドラ
    audio5.addEventListener('ended', function() {
      // 再生が終了したら再生をリセット
      TIMEOUT2 = true;
    });
}
function playMP3_6() {
  audio6 = new Audio('./sound/e.mp3');
  audio6.play();
  audio6.addEventListener('ended', function() {
   
  });
}

function playMP3_7() {

  const audio7 = new Audio('./sound/f.mp3');
  audio7.loop = true; // 音を繰り返し再生する
  audio7.volume = 0.05; // 音量を0.5（50%）に設定
  audio7.play();
  

}
function playMP3_8() {

   audio8 = new Audio('./sound/d.mp3');
  //audio8.volume = 0.05; // 音量を0.5（50%）に設定
  audio8.play();
  

}
function playMP3_9() {

  const audio9 = new Audio('./sound/g.mp3');
  //audio8.volume = 0.05; // 音量を0.5（50%）に設定
  audio9.play();
  

}



function setup() {
  let p5canvas = createCanvas(400, 400);
  setInterval(tutorial, 500); // 0.5秒ごとにtoggleTimeout関数を呼び出す
  p5canvas.parent('#canvas');

  // お手々が見つかると以下の関数が呼び出される．resultsに検出結果が入っている．
  gotGestures = function (results) {
    gestures_results = results;

    adjustCanvas();
  }
}
function tutorial() {
  tuto = !tuto;
}


function draw() {
  // 描画処理
  clear();  // これを入れないと下レイヤーにあるビデオが見えなくなる
  extractIndexFingerTip();
  extractSecondHandIndexFingerTip();
  drawA(); // この行を追加


  // 各頂点座標を表示する
  // 各頂点座標の位置と番号の対応は以下のURLを確認
  // https://developers.google.com/mediapipe/solutions/vision/hand_landmarker
  if (gestures_results) {
    if (gestures_results.landmarks) {
      for (const landmarks of gestures_results.landmarks) {
        for (let landmark of landmarks) {
          noStroke();
          fill(100, 150, 210);
                    // x座標を反転して描画
          let flippedX = width - (landmark.x * width);
          circle(flippedX, landmark.y * height, 10);
        }
      }
      //playMP3_7();
      fill(0, 0, 255);
      stroke(0); // 線の色を黒に設定
      strokeWeight(10); // 線の太さを2に設定
      line(centerX+(width/4), centerY, indexFingerTipX+centerX, indexFingerTipY+centerY);
      circle(indexFingerTipX+centerX , indexFingerTipY+centerY, 70);
      fill(0,0,0,0);
      stroke(0, 0, 255); // 線の色を黒に設定
      strokeWeight(2); // 線の太さを2に設定
      circle(centerX+(width/4), centerY,500);
      if(Math.sqrt((indexFingerTipX+centerX-centerX+(width/4))**2+(indexFingerTipY+centerY-centerY)**2)>400){
        if (TIMEOUT2) {
          //playMP3_5();
          TIMEOUT2 = false;
        }
      } 

      fill(255, 255, 0);
      stroke(0); // 線の色を黒に設定
      strokeWeight(10); // 線の太さを2に設定
      line(centerX-(width/4), centerY, secondHandIndexFingerTipX+centerX, secondHandIndexFingerTipY+centerY);
      circle(secondHandIndexFingerTipX+centerX , secondHandIndexFingerTipY+centerY, 70);
      fill(0,0,0,0);
      stroke(255, 255, 0); // 線の色を黒に設定
      strokeWeight(2); // 線の太さを2に設定
      circle(centerX-(width/4), centerY,500);
       if(Math.sqrt((secondHandIndexFingerTipX+centerX-centerX-(width/4))**2+(secondHandIndexFingerTipY-centerY)**2)>400){
        if (TIMEOUT3) {
          // playMP3_6();
          TIMEOUT3 = false;
        }
       }

      if(TIMEOUT==true){
        if(tuto==true){
        textSize(160);
        textAlign(CENTER, CENTER);
        stroke(255, 126, 0); // 線の色を黒に設定
        text("TUTORIAL",centerX, centerY-centerY/2);}
      }
      
    }
    
    
    
  
    // ジェスチャーの結果を表示する
    for (let i = 0; i < gestures_results.gestures.length; i++) {
      noStroke();
      fill(255, 0, 0);
      textSize(20);
      let name = gestures_results.gestures[i][0].categoryName;
      let score = gestures_results.gestures[i][0].score;
      let right_or_left = gestures_results.handednesses[i][0].hand;
      let pos = {
        x: gestures_results.landmarks[i][0].x * width,
        y: gestures_results.landmarks[i][0].y * height,
      };
      textSize(48);
      fill(0);
      stroke(255);
      textAlign(CENTER, CENTER);
      text("PLAYER"+name, width-pos.x, pos.y);
    }

  }
  if (GOLD==true) {
    textSize(300);
    textAlign(CENTER, CENTER);
    fill(255, 255, 255);
    stroke(0); // 線の色を黒に設定
    text("GOLD WIN",centerX, centerY);
    playMP3_9();
    audio6.pause();
    
      audio8.pause();
    
  }

  if (BLUE==true) {
    textSize(300);
    textAlign(CENTER, CENTER);
    fill(255, 255, 255);
    stroke(0); // 線の色を黒に設定
    text("BLUE WIN",centerX, centerY);
    playMP3_9();
    audio6.pause();
    
      audio8.pause();
    
  }


}

function windowResized() {
  adjustCanvas();
}

function adjustCanvas() {
  // Get an element by its ID
  var element_webcam = document.getElementById('webcam');
  resizeCanvas(element_webcam.clientWidth, element_webcam.clientHeight);
  //console.log(element_webcam.clientWidth);
}
function extractIndexFingerTip() {
  if (gestures_results && gestures_results.landmarks && gestures_results.landmarks.length > 0) {
    const landmarks = gestures_results.landmarks[0]; // 最初の手のランドマークデータを取得
    if (landmarks[8]) {
      const indexFingerTip = landmarks[8]; // 人差し指の先のランドマークのインデックスは8
      indexFingerTipX = (width - indexFingerTip.x * width) - centerX;
      indexFingerTipY = indexFingerTip.y * height - centerY;
      indexFingerTipZ = indexFingerTip.z; // 奥行きの値を保存
    } else {
      // 人差し指のランドマークが検出されていない場合は座標をリセット
      indexFingerTipX = 0;
      indexFingerTipY = 0;
      indexFingerTipZ = 0;
    }
  } else {
    // 手が検出されていない場合は座標をリセット
    indexFingerTipX = 0;
    indexFingerTipY = 0;
    indexFingerTipZ = 0;
  }
}

function extractSecondHandIndexFingerTip() {
  if (gestures_results && gestures_results.landmarks && gestures_results.landmarks.length > 1) {
    const landmarks = gestures_results.landmarks[1]; // 二番目の手のランドマークデータを取得
    const indexFingerTip = landmarks[8]; // 人差し指の先のランドマークのインデックスは8
    secondHandIndexFingerTipX = (width - indexFingerTip.x * width) - centerX;
    secondHandIndexFingerTipY = indexFingerTip.y * height - centerY;
    secondHandIndexFingerTipZ = indexFingerTip.z; // 奥行きの値を保存
  } else {
    // 二番目の手のランドマークが検出されていない場合は座標をリセット
    secondHandIndexFingerTipX = 0;
    secondHandIndexFingerTipY = 0;
    secondHandIndexFingerTipZ = 0;
  }
}