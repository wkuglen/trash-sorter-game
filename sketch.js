let rectWidth;
let imageWidth = 512;
let imageHeight = 384;
let roundLength;

wrongImages = [];
wrongTypes = [];

let typeName = [
  'glass',
  'paper',
  'cardboard',
  'plastic',
  'metal',
  'trash'
]
let typeSize = [
  501, // glass
  594, // paper
  403, // cardboard
  482, // plastic
  410, // metal
  137, // trash
]


function setup() {
  let params = getURLParams();
  if (params.rl) {
    roundLength = params.rl;
  } else {
    roundLength = 20;
  }
  var canvas = createCanvas(720, 600);
  canvas.parent('canvas-holder');
  console.log(windowWidth);
  console.log(width);
  noStroke();
  background(230);
  rectWidth = width / 4;
  index = 0;
  imgSelect = 0;
  numCorrect = 0;
  numGuessed = 0;
  
  getImage();

  hh = hour();
  mm = minute();
  ss = second();
  
  gameOver = false;
}

function setStage() {
  background(255);
  noStroke();
  textSize(12);
  text(`r (right) - recycle\nt (left) - trash`, (width-imageWidth)/2, (height-imageHeight)/2+imageHeight+15);
  textSize(36);
  text(`♻️`, (width-imageWidth)/2+imageWidth+4, (height-imageHeight)/2+imageHeight);
  text(`🗑`, (width-imageWidth)/2-40, (height-imageHeight)/2+imageHeight);
}

function getImage() {
  if(Math.round(Math.random())) {
    // Recyclable
    type = Math.round(Math.random() * 4);
    imgRecyclable = true;
  } else {
    // Trash
    type = 5;
    imgRecyclable = false;
  }
  number = Math.floor(Math.random() * typeSize[type]+1);
  tn = typeName[type];
  imgName = 'assets/'+tn+'/'+tn+number+'.jpg';
  console.log(imgName);
  
  img = loadImage(imgName);
}

function draw() {
  setStage();
  fill(0,0,0);
  td = timeDiff(hh,mm,ss, hour(), minute(), second());
  topLeftW = (width-imageWidth)/2;
  topLeftH = (height-imageHeight)/2;
  noStroke();
  score = numCorrect-(numGuessed-numCorrect);
  timeLeft = roundLength - td;
  if (timeLeft <= 0) {
    // GAME OVER
    textSize(24);
    text(`Accuracy: ${numCorrect/numGuessed}\nScore: ${score}`,topLeftW,topLeftH-40);
    text(`Scroll down to see incorrect items`, topLeftW, topLeftH+30);
    gameOver = true;
    // Draw a white box over image
    fill(255,255,255)
    // rect(topLeftW, topLeftH, imageWidth, imageHeight);
    // drawMissed(topLeftW, topLeftH);
    fill(0,0,0);
  } else {
    textSize(12);
    text(`Accuracy: ${accuracy(numCorrect,numGuessed)}\nScore: ${score} | Time Remaining: ${timeLeft}`,topLeftW,topLeftH-20);//imageHeight+100);
    image(img, topLeftW, topLeftH, imageWidth, imageHeight);  
  }
  // stroke(0);  
  // line(topLeftW, topLeftH, imageWidth+topLeftW, topLeftH);
}

function guess(guessRecyclable) {
  if (!gameOver) {
    numGuessed++;
    if (guessRecyclable === imgRecyclable) {
      console.log('Correct!');
      numCorrect++;
      getImage();
    } else {
      console.log('Wrong! '+imgName);
      wrongImages.push(img);
      wrongTypes.push(tn);
      divHTML = `<img src="${imgName}" alt="${tn}" height=${imageHeight/4}> This is actually ${tn}.<br>`;
      var divElement = createDiv(divHTML);
      divElement.parent('missedImages');
      getImage();
    }
  }
}

function keyPressed() {
  guessRecyclable = false;
  if (key == 'r' || key == 'R') {
    console.log('recycle?');
    guess(true);
  } else if (key == 't' || key == 'T') {
    console.log('trash?');
    guess(false);
  }
}

function mousePressed() {
  if (mouseX > width/2) {
    // Right
    guess(true);
  } else {
    // Left
    guess(false);
  }
}

function timeDiff(h1,m1,s1, h2,m2,s2) {
  hDiff = h2 -h1;
  mDiff = m2 - m1;
  sDiff = hDiff*3600 + mDiff*60 + s2 - s1;
  return sDiff;
}

function accuracy(numCorrect, numGuessed) {
  if (!(numGuessed)) {
    return 0;
  }
  return numCorrect/numGuessed;
}

