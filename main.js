// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

/* ::::::::: ALL CONSTRUCTORS ::::::::::: */

// the basic "shape" constructor
function shape(x, y, exists, color) {
    this.x = x;
    this.y = y;
    this.exists = true;
    this.color = color;
}

// the "target" constructor
function Target(x, y, exists, color, width, height) {
    shape.call(this, x, y, exists, color);
    this.width = width;
    this.height = height;
}

// the ball constructor
function Ball(x, y, velX, velY, color, size) {
    shape.call(this, x, y, color);
    this.velX = velX;
    this.velY = velY;
    this.size = size;
}

/* ::::::::::::::: PROTOTYPES ::::::::::: */

Target.prototype.draw = function() {
    _this = this;
    ctx.fillRect(_this.x, _this.y, _this.width, _this.height)
}


/* :::::::::::: THE ANIMATION LOOP ::::::::::: */

var targets = [];

// var testTarget = new Target(10,10,true,'rgba(255, 0, 0, 1)',100,100);



function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

    // Make the targets
    /* <-------NOTES --- need to change so x and y coords update themselves so targets aren't drawn on top of each other -----------> */
  while (targets.length < 10) {
    var makeTarget = new Target(10,10,true,"magenta",10,10);  
    targets.push(makeTarget);

     // increaseScore();
  }

    // Draw all of the targets that still exist
  for (var i = 0; i < targets.length; i++) {
      if (targets[i].exists === true) {
        ctx.fillStyle = targets[i].color;
        targets[i].draw(); }
    
    
    // targets[i].update();
    // targets[i].collisionDetect();  }

      /*
      theEvilCircle.draw();
      theEvilCircle.checkBounds();
      theEvilCircle.collisionDetect();
      */
 }

  requestAnimationFrame(loop); //requestAnimationFrame is a built in method, which runs the same method a set number of times per second to create a smooth animation.
}

// call the function once to get the enimation started.
loop();