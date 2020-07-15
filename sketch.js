var pointArray = [];
var pointer;
var corner, cornerW, cornerH;

let cosiAzure;
let alteha_regular;
let alteha_bold;
let tenorSans

var detection;

function preload() {
  cosiAzure = loadFont('assets/CosiAzure-Bold.otf');
  
  tenorSans = loadFont('assets/TenorSans-Regular.otf');

}

var posScritte;

function setup() {
  createCanvas(video.width, video.height);

  pointer = new Point(0, 0);
  corner = new Point(0, 0);
  cornerW = new Point(0, 0);
  cornerH = new Point(0, 0);

  posScritte = height - 300;
}

function draw() {
  clear();
  background(0, 0, 0, 150);
  stat = 2;

  if (stat == 0) {
    stat0();
  } else if (stat == 1) {
    stat1();
  } else if (stat == 2) {
    stat2();
  } else if (stat == 3) {
    stat3();
  } else if (stat == 4) {
    stat4();
  }else if (stat == 5) {
    stat5();
  }


  textSize(10)
  noCursor()
  noFill()
  strokeWeight(1)
  stroke("white")

  //MOUSE pointer
  // ellipse(mouseX, mouseY, 30)
  // pointer.update(mouseX, mouseY);
  // pointer.display();

  //CHECK IF AGE REMAIN THE SAME FOR A WHILE
  var average = getAvg(ageArray);

  if (stat != 3 && stat != 4) {

    if (detection == undefined) {
      trigger--;
      if (trigger <= 0) {
        stat = 0;
        trigger = 0;
      }
    } else {
      trigger++;
      if (trigger >= 300) {
        trigger = 300;
      }
    }
  }
}

//OBJECTS AND FUNCTIONS

function getAvg(grades) {
  const total = grades.reduce((acc, c) => acc + c, 0);
  return total / grades.length;
}

function windowResized() {
  resizeCanvas(video.width, video.height);
}


//________________________________________________POINT OBJECT
function Point(_x, _y) {
  this.x = _x;
  this.y = _y;
  this.speed = 5;
  this.directionX = 1;
  this.directionY = 1;

  this.noiseSeed = random();
  this.noise;
  this.s = random();
  this.n;

  this.update = function(_targetX, _targetY) {

    this.noise = 50 * noise(millis() / 10000 + this.noiseSeed);
    this.n = 3 * noise(millis() / 10000 + this.s);

    this.x = this.x + cos(this.noise / 3) * 2 * this.n
    this.y = this.y + sin(this.noise / 3) * 2 * this.n

    var deltaX = this.x - _targetX;
    var deltaY = this.y - _targetY;

    if (deltaX >= 0) {
      this.directionX = -1;
    } else {
      this.directionX = 1;
    }
    if (deltaY >= 0) {
      this.directionY = -1;
    } else {
      this.directionY = 1;
    }
    this.x = this.x + (this.speed * this.directionX * abs(deltaX) / 20);
    this.y = this.y + (this.speed * this.directionY * abs(deltaY) / 20);
  }

  this.display = function() {
    noStroke();
    fill(255, 255, 255, 20)
    ellipse(this.x, this.y, 15)
    ellipse(this.x, this.y, 12)
    ellipse(this.x, this.y, 9)
    ellipse(this.x, this.y, 9)
    ellipse(this.x, this.y, 7)
    ellipse(this.x, this.y, 6)
    ellipse(this.x, this.y, 5)
    fill(255, 255, 255)
    ellipse(this.x, this.y, 5)
  }
}

//________________________________________________SQUARE DETECTION
function displaySquare() {
  if (via > 0) {
    noFill();
    strokeWeight(3);
    stroke("white")
    var adjustY = (windowHeight - video.height) / 2

    var cornerposY = sqY + adjustY
    var d = (height / 2 - cornerposY) * 0.5;

    corner.update(width - sqX, sqY - 80);
    cornerW.update(sqW, sqX);
    cornerH.update(sqX, sqH);

    // stroke("red");
    // rect(corner.x, corner.y, -cornerW.x, cornerH.y);

    var lunghezza = 60;

    stroke("white");
    // punto in alto a destra
    line(corner.x, corner.y, corner.x - lunghezza, corner.y);
    line(corner.x, corner.y, corner.x, corner.y + lunghezza);
    // punto in alto a sinistra
    line(corner.x - cornerW.x, corner.y, corner.x - cornerW.x + lunghezza, corner.y);
    line(corner.x - cornerW.x, corner.y, corner.x - cornerW.x, corner.y + lunghezza);
    // punto in basso a destra
    line(corner.x, corner.y + cornerH.y, corner.x - lunghezza, corner.y + cornerH.y);
    line(corner.x, corner.y + cornerH.y, corner.x, corner.y + cornerH.y - lunghezza);
    // punto in basso a sinistra
    line(corner.x - cornerW.x, corner.y + cornerH.y, corner.x - cornerW.x + lunghezza, corner.y + cornerH.y);
    line(corner.x - cornerW.x, corner.y + cornerH.y, corner.x - cornerW.x, corner.y + cornerH.y - lunghezza);
  }
}

//________________________________________________AGE CALCULATION
var ageCounter = -1;
var ageArray = [0]

function ageCalibration(_ageArray) {

  if (ageCounter >= 100) {
    ageCounter = -1;
  }

  ageCounter++;
  _ageArray[ageCounter] = age;

  var sum = 0;

  for (var i = 0; i < _ageArray.length; i++) {
    sum = sum + ageArray[i]
  }
  var average = sum / _ageArray.length;
  return round(average);
}

//START///////////////////////////////////////////////////////////////////////////
//STATES STATES STATES STATES STATES///////////////////////////////////////////

var stat = 0;

var trigger = 0;

function stat0() {
  // background("#FFDEED");
  var opacity = (-200 + trigger) * 6
  if (opacity <= 0) {
    opacity2=opacity;
    opacity = 0;
  }
  background(255,255,255,150 - opacity);

  noStroke();
  fill(0,0,0,-opacity2)
  textSize(130)
  textFont(cosiAzure)
  textAlign(CENTER)
  text("MIRAMI", width / 2, windowHeight / 2 - 50)


  //DETECTION TRIGGER ---> START STAT 1
  var average = getAvg(ageArray);

  if (detection != undefined) {
    trigger++;
    if (trigger >= 300) {
      stat++;
      frameCount = 0;
    }
  }
}

function stat1() {
  textAlign(CENTER);
  textSize(40);
  textFont(tenorSans)
  textDisplay(width / 2, posScritte, "Be yourself\ndiscover your age", 0, 110)


  if (frameCount >= 150) {
    stat++;
    frameCount = 0;
  }
}

var finalAge;
var finalPage;

function stat2() {
  var durata = 600;
  fill("white");
  noStroke();
  textAlign(CENTER);
  textFont(tenorSans);
  textSize(40);
  text("age: " + ageCalibration(ageArray), corner.x - cornerW.x / 2, corner.y + cornerH.y + 40);

  displaySquare();

  if (frameCount >= durata) {
    stat++;
    frameCount = 0;
    finalAge = ageCalibration(ageArray);
    if (finalAge <= 30) {
      finalPage = round(random(2, 61));
    } else if (finalAge >= 30 && finalAge <= 50) {
      finalPage = round(random(62, 89));
    } else {
      finalPage = round(random(90, 123));
    }

  }

  // var stop = (360 / durata * frameCount) - 90;
  // angleMode(DEGREES);
  // noFill();
  // stroke(20);
  // arc(width / 2, height - 200, 30, 30, -90, 270);
  // stroke("white");
  // arc(width / 2, height - 200, 30, 30, -90, stop);
}

function stat3() {

  textAlign(CENTER);
  textSize(40);
  textFont(tenorSans)

  textDisplay(width / 2, posScritte, "You can be young forever", 30, 100);
  textDisplay(width / 2, posScritte + 50, "I'll show you how", 70, 100);
  textDisplay(width / 2, posScritte, "Go to page " + finalPage, 190, 100);
  textDisplay(width / 2, posScritte + 50, "to find your youth secret", 230, 100);

  if (frameCount >= 330) {
    stat++;
    frameCount = 0;
  }

  var opacity = (-1200 + frameCount) * 6
  fill(255, 255, 255, opacity)
  rect(0, 0, width, height)

  if (frameCount >= 1280) {
    stat++;
    frameCount = 0;
    trigger = 0;
  }
}

function stat4() {
  textAlign(CENTER);
  textSize(40);
  textFont(tenorSans)
  textDisplay(width / 2, height / 2 - 350, "You look", 30, Infinity);

  textSize(50);
  textDisplay(width / 2, height / 2 - 290, finalAge, 60, Infinity);

  textSize(40);
  textDisplay(width / 2, posScritte + 50, "Your page is " + finalPage, 90, Infinity);

  //questa variabile è per far tornare gradualmente lo sfondo bianco ed introdurre poi il logo mirami
  var opacity = (-900 + frameCount) * 6
  fill(255, 255, 255, opacity)
  rect(0, 0, width, height)

  if (frameCount >= 1000) {
    stat++;
    frameCount = 0;
    trigger = 0;
  }

}

//ho creato uno stato 5 con la comparsa del logo mirami che si ricollega poi all'inizio
function stat5() {
  var opacity = frameCount * 6;
  background(255,255,255, opacity);

  noStroke();
  fill(0, 0, 0, opacity);
  textSize(130)
  textFont(cosiAzure);
  textAlign(CENTER);
  text("MIRAMI", width / 2, windowHeight / 2 - 50)

  if (frameCount >= 400) {
    stat = 0;
    frameCount = 0;
    trigger = 0;
  }
}

//DETECTION TRIGGER ---> START STAT 1
var average = getAvg(ageArray);

if (detection != undefined) {
  trigger++;
  if (trigger >= 300) {
    stat++;
    frameCount = 0;
  }
}

//END///////////////////////////////////////////////////////////////////////////
//STATES STATES STATES STATES STATES///////////////////////////////////////////

//TEXT DISPLAY AND DISAPPEAR
var textOpacity = 0; //ora usa solo textOpacity2

// ho sistemato la funzione del testo in modo da averne solo una, aggiungengo "_align,_size,_font"
function textDisplay(_x, _y, _text, _startTime, _time) {

  var inout = 15;
  var speed = 255 / 15;
  var timeTot = _startTime + _time;
  var textOpacity2 = 255;
  if (frameCount <= timeTot && frameCount >= _startTime) {
    if (frameCount <= _startTime + inout) {
      textOpacity = textOpacity + speed;
      var tempOpacity = frameCount - _startTime;
      textOpacity2 = map(tempOpacity, 0, inout, 0, 255)
    } else if (frameCount >= timeTot - inout) {
      textOpacity = textOpacity - speed;
      var tempOpacity = timeTot - frameCount;
      textOpacity2 = map(tempOpacity, 0, inout, 0, 255)
    }

    if (textOpacity <= 0) {
      textOpacity = 0;
    } else if (textOpacity >= 255) {
      textOpacity = 255;
    }

    if (frameCount <= _startTime + inout * 2) {
      var textMov = (30 + frameCount - _startTime) / 2;
    } else {
      var textMov = (30 + (_startTime + inout * 2) - _startTime) / 2;
    }

    noStroke();
    fill(255, 255, 255, textOpacity2);
    var posY = _y + 10000 / sq(textMov);
    text(_text, _x, posY);
  }
}
