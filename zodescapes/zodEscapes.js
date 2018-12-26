//User escape generals Zod dimension by noding
let video;
let poseNet;
let noseX;
let noseY;
let pulsoEX = 0;
let pulsoEY = 0;
let pulsoDX = 0;
let pulsoDY = 0;
let free = false;
var noseYMax = -50.01;
var noseYMin = 1000.01;
let angle = 0.2;
let size=100;
let canvasx=600, canvasy=600;
let textBefore = 'Quer fugir das duas dimensoes?';
let textAfter = 'Parabens, vou liberta-lo!';


function setup() {
  createCanvas(canvasx,canvasy,WEBGL);
  video = createCapture(VIDEO);
  //video.size(100,100);
  video.hide();
  console.log(ml5);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", gotPoses);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pulsoEX = poses[0].pose.keypoints[9].position.x;
    pulsoEY = poses[0].pose.keypoints[9].position.y;
    pulsoDX = poses[0].pose.keypoints[10].position.x;
    pulsoDY = poses[0].pose.keypoints[10].position.y;
    noseX = poses[0].pose.keypoints[0].position.x;
    noseY = poses[0].pose.keypoints[0].position.y;
    
  }
}

function modelReady() {
}

function nymax(noseY) {
  if (noseY > noseYMax) {
    noseYmax = noseY;
  } else {
    noseYmax = noseYMax;
  }
  return noseYmax;
}

function nymin(noseY) {
  if (noseY < noseYMin) {
    noseYmin = noseY;
  } else {
    noseYmin = noseYMin
  }
  return noseYmin;
}


function draw() {
   
  background(151); 
  texture(video);
  if(!free){
  rotateY(angle);
  rotateX(angle + 0.2);
    rotateZ(angle-0.2);
  }else if(size<canvasx)
  {size +=5;  
  }
  //box(size);
  //noFill();
  plane(size,size);
  angle += 0.07;
  noseYMin = nymin(noseY);
  noseYMax = nymax(noseY);
  if ((noseYMax - noseYMin) > 70) {
    free = true;
  }

  //if (!free) {
    //image(video, 0, 0);
  //} else {
   // fill(0);
  //  rect(0, 0, 640, 480);
  //}
  //fill(0, 200, 0);
  //ellipse(pulsoEX, pulsoEY, 30);
  //fill(0, 0, 200);
  //ellipse(pulsoDX, pulsoDY, 30);

}
