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
function bouncer(x, y, color, bwidth, bheight) {
    shape.call(this, x, y, color);
    this.bwidth = 200;
    this.bheight = 20;
}


/* ::::::::::::::: PROTOTYPES ::::::::::: */

Target.prototype.draw = function () {
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

bouncer.prototype.setControl = function () {
    var _this = this;
    window.onkeydown = function(e) {
        if (e.keyCode === 37) {
          _this.x -= 5;
        } else if (e.keyCode === 39) {
          _this.x += 5;
        }
      }
}

bouncer.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.bwidth, this.bheight);
}

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

// checkbounds to handle the ball hitting the bounderies. Change direction of the ball
Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

// collision detection on the ball
Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < targets.length; j++) {
      // find the vertical and horizontal distances between the circles center and the rectangles center
    /*
      var distX = (theBall.x + theBall.size) - (targets[j].x-(targets[j].width/2));
      var distY = (theBall.y+theBall.size) - (targets[j].y-(targets[j].height/2));
      
      //if distance is greater than halfBall+halfTarget then they are too far apart to be colliding
     // if (distX > (targets[j].width/2 + theBall.size)) { }
    //  if (distY > (targets[j].height/2 + theBall.size)) { }
      //if the distance is less than halfTarget they are definately colliding
      
      if (distX >= 0 && distY >= 0) { 
        // theBall.color = "green";
       // theBall.velX *= -1; 
          this.velY = -(this.velY);    }
      
      //test for collision at the corners using Pythagoras to compare distance between ball and target centers.
    //  var dx = distX-targets[j].width/2;
    //  var dy = distY-targets[j].height/2;
     // if ((dx*dx+dy-dy) <= (theBall.size*theBall.size)) { targets[j].exists = false; }
      */
  }
    
    //find the distances - vertical and horizontal - between the balls center and the bouncers center
      var distA = Math.abs((theBall.x + theBall.size) - (thebouncer.x-(thebouncer.bwidth/2)));
      var distB = Math.abs((theBall.y+theBall.size) - (thebouncer.y-(thebouncer.bheight/2)));
    // check for collision with thebouncer
    console.log(distA);
    if (distA == 0 && distB == 0) { 
        // theBall.color = "green";
       // theBall.velX *= -1; 
        theBall.velY *= -1;
    } 
}
      

// make sure the bouncer isn't going off the edge of the screen
bouncer.prototype.checkBounds = function() {
  if ((this.x + this.bwidth) >= width) {
      this.x -= 1;
  }

  if (this.x < 0) {
      this.x += 1;
  }
}


/* :::::::::::: THE ANIMATION LOOP ::::::::::: */

var targets = [];

var thebouncer = new bouncer(10, (height - 200), "magenta");
      thebouncer.setControl();
var theBall = new Ball(50, (height-230), "magenta", 2, 2, 20);

// var testTarget = new Target(10,10,true,'rgba(255, 0, 0, 1)',100,100);


function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
            
    

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
 }
    thebouncer.checkBounds();
        thebouncer.draw();
        theBall.collisionDetect();
        theBall.update();
        theBall.draw();

    
  requestAnimationFrame(loop); //requestAnimationFrame is a built in method, which runs the same method a set number of times per second to create a smooth animation.
}

// call the function once to get the enimation started.
loop();


/*
- targets could be random colors, each color representing a different amount of points.
- multiple levels to go through once completed - each level with different sized targets, faster/slower balls and more/less targets or even multiple balls
- "lives" counter until gameover
*/