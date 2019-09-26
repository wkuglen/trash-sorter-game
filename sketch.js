let rectWidth;
stepSize = 1;

let typeName = [
  'glass',
  'paper',
  'cardboard',
  'plastic',
  'metal',
  'trash'
]
let typeSize = [
  501, //glass
  594, // paper
  403, // Cardboard
  482, //plastic
  410, // metal
  137, // trash
]


function setup() {
  createCanvas(720, 600);
  noStroke();
  background(230);
  rectWidth = width / 4;
  index = 0;
  imgSelect = 0;
  columnA_key = 'a'.charCodeAt(0);
  columnA = width / 4;
  columnS_key = 's'.charCodeAt(0);
  columnS = width / 2;
  columnD_key = 'd'.charCodeAt(0);
  columnD = 3*width / 4;
  currentColumn = 0;//columnA;
  img1 = loadImage('assets/01.jpg');
  img2 = loadImage('assets/02.jpg');
  img3 = loadImage('assets/03.jpg');
  images = [img1, img2, img3];
  columns = [width/4, width/2, 3*width/4]
  fr = 5;
  // frameRate(fr);
}

function setStage() {
  background(230);
}

function draw() {
  setStage();
  // keep draw() here to continue looping while waiting for keys
  stroke(0);
  // index = 0; index < 200; index++) {
  ellipse(columns[currentColumn], index, 80, 80);
  index=index+stepSize;
  if (index > 600) {
    index = 0;
    imgSelect++;
    if (imgSelect > 2 ){
      imgSelect = 0;
    }
    // fr = fr+1;
    // if(fr>60) {
    //   fr = 60;
    // }
    stepSize++;
    // frameRate(fr);
  }
  image(images[imgSelect], columns[currentColumn]-51, index,102,76);
  // image(img2, columnS-51, index,102,76);
  // image(img3, columnD-51, index-100,102,76);
  

}

function keyPressed() {
  let keyIndex = -1;
  let pressed = key.charCodeAt(0);
  // console.log(key.charCodeAt(0));
  if (key >= 'a' && key <= 'z') {
    keyIndex = key.charCodeAt(0) - 'a'.charCodeAt(0);
  }
  if (keyIndex === -1) {
    // If it's not a letter key, clear the screen
    background(230);
  } else {
    // It's a letter key, fill a rectangle
    randFill_r = Math.floor(Math.random() * 255 + 1);
    randFill_g = Math.floor(Math.random() * 255 + 1);
    randFill_b = Math.floor(Math.random() * 255 + 1);
    fill(randFill_r, randFill_g, randFill_b);
    let x = map(keyIndex, 0, 25, 0, width - rectWidth);
    // rect(x, 0, rectWidth, height);
  }
  if (pressed === columnA_key) {
    currentColumn--;
  } 
  if (pressed === columnS_key) {
    currentColumn = columnS;
  }
  if (pressed === columnD_key) {
    currentColumn++;
  }
  if(currentColumn < 0) {
    currentColumn = 2;
  } else if(currentColumn > 2) {
    currentColumn = 0;
  }
}