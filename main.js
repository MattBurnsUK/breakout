// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

/* ::::::::: ALL CONSTRUCTORS ::::::::::: */

// the basic "shape" constructor
function shape(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
}

// the "target" constructor
function Target(x, y, color, exists, width, height) {
    shape.call(this, x, y, color);
    this.exists = true;
    this.width = width;
    this.height = height;
}

// the ball constructor
function Ball(x, y, color, velX, velY, size) {
    shape.call(this, x, y, color);
    this.velX = velX;
    this.velY = velY;
    this.size = size;
}

// the bouncer constructor
function bouncer(x, y, color, bwidth, bheight){
    shape.call(this, x, y, color);
    this.bwidth = 50;
    this.bheight = 20;
}


/* ::::::::::::::: PROTOTYPES ::::::::::: */

Target.prototype.draw = function() {
    var _this = this;
    ctx.fillRect(_this.x, _this.y, _this.width, _this.height)
}

bouncer.prototype.setControl = function() {
    var _this = this;
    window.onkeydown = function(e) {
        if (e.keyCode === 37) {
          _this.x -= _this.velX;
        } else if (e.keyCode === 39) {
          _this.x += _this.velX;
        }
      }
}

bouncer.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.bwidth, this.bheight)
}

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}


/* :::::::::::: THE ANIMATION LOOP ::::::::::: */

var targets = [];

// var testTarget = new Target(10,10,true,'rgba(255, 0, 0, 1)',100,100);

var thebouncer = new bouncer(10, 100, "magenta");
      thebouncer.setControl();


function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
            
    var theBall = new Ball(10, (height-30), "magenta", 2, 2, 20);
        theBall.draw();

    // Make the targets
    /* <-------NOTES --- this works and generates the targets correctly, BUT their coords are not updated if the screen is resized after they are generated */
    var xCoor = 10;
    var yCoor = 10;
  while (targets.length < 10) {
    var makeTarget = new Target(xCoor,yCoor,"magenta",true,40,10);  
    targets.push(makeTarget);
      xCoor += 60;
     if (xCoor > width) {
          xCoor = 10;
          yCoor += 50;
      }

     // increaseScore();
  }

    // Draw all of the targets that still exist
  for (var i = 0; i < targets.length; i++) {
      if (targets[i].exists === true) {
        ctx.fillStyle = targets[i].color;
        targets[i].draw(); }
      
        thebouncer.draw();
 }    

    
  requestAnimationFrame(loop); //requestAnimationFrame is a built in method, which runs the same method a set number of times per second to create a smooth animation.
}

// call the function once to get the enimation started.
loop();


/*
- targets could be random colors, each color representing a different amount of points.
- multiple levels to go through once completed - each level with different sized targets, faster/slower balls and more/less targets or even multiple balls
- "lives" counter until gameover
*/