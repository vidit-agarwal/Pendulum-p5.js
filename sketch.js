var p;

A {

  set : function setup()
  {
    
      //here i am creating a canvas the pendulum will be displayed
      createCanvas(1000,1000);
      // Make a new Pendulum with an origin position and armlength
      p = new Pendulum(createVector(width/2,0), document.getElementById("length").value);
    
    
  }
} ;
//setup the requirements for the drawing of the pendulum



function draw() {
  background(88);
  
  p.go();
}

function Pendulum(origin_, r_) {
  // Fill all variables
  this.origin = origin_.copy();
  this.position = createVector();
  this.r = r_;
  this.angle = PI/4;

  this.aVelocity = 0.0;
  this.aAcceleration = 0.0;
  this.damping = "0.995";   
  this.ballr = 48.0;      // ball radius 

  this.go = function() {
    this.update();
    this.display();
  };

  // Function to update position
  this.update = function() {
    var gravity = document.getElementById("gravity").value ;                                               // Arbitrary constant
    this.aAcceleration = (-1 * gravity / this.r) * sin(this.angle);  // Calculate acceleration (see: http://www.myphysicslab.com/pendulum1.html)
    this.aVelocity += this.aAcceleration;                            // Increment velocity
    this.aVelocity *= this.damping;                                  // Arbitrary damping
    this.angle += this.aVelocity;                                    // Increment angle
  };

  this.display = function() {
    this.position.set(this.r*sin(this.angle), this.r*cos(this.angle), 0);         // Polar to cartesian conversion
    this.position.add(this.origin);                                              
    stroke(355);
    strokeWeight(3);
    // Draw the arm
    line(this.origin.x, this.origin.y, this.position.x, this.position.y);
    ellipseMode(CENTER);
    fill(120);
    // Draw the ball
    ellipse(this.position.x, this.position.y, this.ballr, this.ballr);
  };
}