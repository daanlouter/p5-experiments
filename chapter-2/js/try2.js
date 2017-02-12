// Shooter
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var particle;
var timerStart;
var secondClick = false;


function setup(){
	createCanvas(windowWidth,windowHeight);
	background(0);

	particle = new Particle(width/2,height-50,1);
}

function draw(){
	background(0,100);
	particle.draw();
	if(particle.shot){
		particle.update();
	}

	if(mouseIsPressed){
		particle.size += 0.5;
	}

}

function mousePressed(){
	timerStart = millis();
	if(secondClick){
		particle.reset();
		secondClick = false;
	}
}

function mouseReleased(){
	if(!secondClick){
		var mouseVector = createVector(mouseX,mouseY);
		var distance = p5.Vector.sub(mouseVector,particle.pos);
		particle.acc.set(distance.normalize().x,distance.normalize().y)
		var timerEnd = millis();
		var totalTime = timerEnd - timerStart;
		

		var length = p5.Vector.dist(mouseVector,particle.pos);
		var power = map(length,0,1000,1,12);

		particle.shot = true;
		particle.acc.setMag(power);
		secondClick = true;
	}
	
}

function Particle(x,y,m){
	this.pos = createVector(x,y);
	this.vel = createVector(0,0);
	this.acc = createVector(random(-1,1),random(-1,0));
	this.size=10;
	this.mass = m;
	this.shot = false;

	this.applyForce = function(force){
		var f = p5.Vector.div(force,this.mass);
		this.acc.add(f);
	}

	this.update = function(){
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.set(0,0)
	}

	this.reset = function(){
		this.shot = false;
		this.pos.set(width/2,height-50);
		this.vel.set(0,0);
		// this.acc.set(random(-1,1),random(-1,0))
		this.size = 10;
	}

	this.draw = function(){
		fill(255);
		noStroke();
		ellipse(this.pos.x,this.pos.y,this.size,this.size)

	}
}