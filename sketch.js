let facemesh;
let predictions = [];
const keypointsIdx = [409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291];
let video;

function setup() {
  // 建立640x480畫布並置中
  let cnv = createCanvas(640, 480);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);

  // 啟用視訊
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // 載入facemesh模型
  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model loaded!");
}

function draw() {
  background(220);

  // 畫出facemesh關鍵點連線
  drawFaceMeshLines();
}

function drawFaceMeshLines() {
  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;
    stroke('#ff006e');
    strokeWeight(15);
    noFill();
    for (let i = 0; i < keypointsIdx.length - 1; i++) {
      let idxA = keypointsIdx[i];
      let idxB = keypointsIdx[i + 1];
      let [x1, y1] = keypoints[idxA];
      let [x2, y2] = keypoints[idxB];
      line(x1, y1, x2, y2);
    }
  }
}
