let rectWidth;
stepSize = 1;
let imageWidth = 512;
let imageHeight = 384;

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
  img = loadImage('assets/01.jpg');
  imgRecyclable = false;
  // img2 = loadImage('assets/02.jpg');
  // img3 = loadImage('assets/03.jpg');
  // images = [img1, img2, img3];
  // columns = [width/4, width/2, 3*width/4]
  // fr = 5;
  // frameRate(fr);
  // img = 
  lives = 3;
}

function setStage() {
  background(230);
  // getImage();
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
  console.log('assets/'+tn+'/'+tn+number+'.jpg');
  
  img = loadImage('assets/'+tn+'/'+tn+number+'.jpg');
}

function draw() {
  setStage();
  // keep draw() here to continue looping while waiting for keys
  stroke(0);
  // index = 0; index < 200; index++) {
  if (imgRecyclable) {
    fill(0,255,0)
  } else {
    fill(0,0,0)
  }
  ellipse(imageWidth+80,0, 80, 80);
  // index=index+stepSize;
  // if (index > 600) {
  //   index = 0;
  //   imgSelect++;
  //   if (imgSelect > 2 ){
  //     imgSelect = 0;
  //   }
  //   // fr = fr+1;
  //   // if(fr>60) {
  //   //   fr = 60;
  //   // }
  //   stepSize++;
  //   // frameRate(fr);
  // }
  image(img, 0, 0, imageWidth, imageHeight);
  // image(images[imgSelect], columns[currentColumn]-51, index,102,76);
  // image(img2, columnS-51, index,102,76);
  // image(img3, columnD-51, index-100,102,76);
  

}

function keyPressed() {
  let keyIndex = -1;
  // let pressed = key.charCodeAt(0);
  // console.log(key.charCodeAt(0));
  guessRecyclable = false;
  guessLock = false;
  if (key == 'r') {
    keyIndex = key.charCodeAt(0) - 'a'.charCodeAt(0);
    console.log('recycle?');
    guessRecyclable = true;
    guessLock = true;
  } else if (key == 't') {
    console.log('trash?');
    guessRecyclable = false;
    guessLock = true;
  }

  if(guessLock) {
    if (guessRecyclable === imgRecyclable) {
      console.log('Correct!');
      getImage();
    } else {
      console.log('Wrong!');
      getImage();
    }
  }
  // if (keyIndex === -1) {
  //   // If it's not a letter key, clear the screen
  //   background(230);
  //   getImage();
  // } else {
  //   // It's a letter key, fill a rectangle
  //   randFill_r = Math.floor(Math.random() * 255 + 1);
  //   randFill_g = Math.floor(Math.random() * 255 + 1);
  //   randFill_b = Math.floor(Math.random() * 255 + 1);
  //   fill(randFill_r, randFill_g, randFill_b);
  //   let x = map(keyIndex, 0, 25, 0, width - rectWidth);
  //   // rect(x, 0, rectWidth, height);
  // }
}