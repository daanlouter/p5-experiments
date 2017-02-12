var particles = [];
var attractor;
var attractor2;
var particleAmount = 4;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var hueVal;
var opacity = 0;

function setup(){
	createCanvas(windowWidth,windowHeight);
	background(0);
	hueVal = Math.round(random(255));
	attractor = new Attractor((width/2),(height/2));
	// attractor2 = new Attractor((width/2) - 20,(height/2) - 20);
	var positions = [
		createVector((width/2) - 50, (height/2) - 50),
		createVector((width/2) + 50, (height/2) - 50),
		createVector((width/2) - 50, (height/2) + 50),
		createVector((width/2) + 50, (height/2) + 50),
	]

	for(var i = 0; i<particleAmount; i++){
		var dist = 200;
		particles.push(new Particle(positions[i].x,positions[i].y,1))
	}
}

function draw(){
	background(0,10)


	for(var i=0; i<particleAmount; i++){
		var gravity = attractor.calculateAttraction(particles[i]);
		// var gravity2 = attractor2.calculateAttraction(particles[i]);
		
		particles[i].applyForce(gravity);
		// particles[i].applyForce(gravity2);
		
		particles[i].update();
		particles[i].draw();
		
		attractor.display();
		// attractor2.display();
	}
}

function Attractor(x,y){
	this.pos = createVector(x,y);
	this.mass = 20;
	this.G = 5;

	this.calculateAttraction = function(p){
		var force = p5.Vector.sub(this.pos,p.pos);
		var distance = force.mag();
			distance = constrain(distance,15,40);

		force.normalize();
		var strength = (this.G * this.mass * p.mass) / (distance * distance);
		force.mult(strength);

		return force
	}

	this.display = function(){
		fill(color('hsb(' + hueVal + ', 80%, 100%)'));
		ellipse(this.pos.x,this.pos.y,10);
	}
}

function Particle(x,y,m){
	this.pos = createVector(x,y);
	this.vel = createVector(2,0);
	this.acc = createVector(0,0);
	this.size=5;
	this.mass = m;

	this.applyForce = function(force){
		var f = p5.Vector.div(force,this.mass);
		this.acc.add(f);
	}

	this.edges = function(){
		if(this.pos.y > height){
			this.vel.y *= -1;
			this.pos.y = height;
		}
		if(this.pos.x > width){
			this.vel.x *= -1;
			this.pos.x = width;
		}else if(this.pos.x < 0){
			this.vel.x *= -1;
			this.pos.x = 0;
		}
	}

	this.update = function(){
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.set(0,0)
	}

	this.draw = function(){
		fill(255,50);
		noStroke();
		ellipse(this.pos.x,this.pos.y,this.size,this.size)
	}
}