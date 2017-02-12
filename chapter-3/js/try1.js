var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var vehicle;

function setup(){
	createCanvas(windowWidth,windowHeight);
	background(0);
	vehicle = new Vehicle(width/2,height/2);
}

function draw(){
	background(0);

	var target = createVector(mouseX,mouseY);

	vehicle.seek(target);

	vehicle.update();
	vehicle.display();
}

function Vehicle(x,y){
	this.pos = createVector(x,y);
	this.vel = createVector(0,0);
	this.acc = createVector(0,0);
	this.size = 48;
	this.maxSpeed = 10;
	this.maxForce = 2;

	this.applyForce = function(force){
		this.acc.add(force);
	}

	this.seek = function(t){
		var desired = p5.Vector.sub(t,this.pos);
			desired.setMag(this.maxSpeed);

		var steering = p5.Vector.sub(desired,this.vel);
			steering.limit(this.maxForce);

		this.applyForce(steering);
	}

	this.update = function(){
		this.vel.add(this.acc);
		this.vel.limit(this.maxForce)
		this.pos.add(this.vel);
		this.acc.set(0,0)
	}

	this.display = function(){
		fill(255);
		noStroke();
		ellipse(this.pos.x,this.pos.y,this.size,this.size)

	}
}