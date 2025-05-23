let facemesh;
let video;
let predictions = [];
const indices = [409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291];

function setup() {
  let cnv = createCanvas(640, 480);
  cnv.style('display', 'block');
  cnv.parent(document.body);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.faceMesh(video, modelReady);
  facemesh.on('predict', gotResults);
}

function modelReady() {
}

function gotResults(results) {
  predictions = results;
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  drawFacemeshLines();
}

function drawFacemeshLines() {
  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;
    stroke('#ff006e');
    strokeWeight(15);
    noFill();
    beginShape();
    for (let i = 0; i < indices.length; i++) {
      const idx = indices[i];
      const [x, y] = keypoints[idx];
      vertex(x, y);
    }
    endShape();
  }
}
