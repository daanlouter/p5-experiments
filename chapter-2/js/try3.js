var particles = [];
var liquid;
var attractor;
var particleAmount = 1;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var opacity = 0;

function setup(){
	createCanvas(windowWidth,windowHeight);
	background(0);

	for(var i = 0; i<particleAmount; i++){
		particles.push(new Particle(width/2,40,1))
	}

	liquid = new Liquid();
}

function draw(){
	background(0,200)
	liquid.display();
	for(var i=0; i<particleAmount; i++){
		var force = createVector(0,.1 * particles[i].mass);
		particles[i].applyForce(force)
		if(liquid.contains(particles[i])){
			var dragForce = liquid.calculateDrag(particles[i]);
			particles[i].applyForce(dragForce)
		}
		particles[i].edges();	
		particles[i].update();
		particles[i].draw();


	}
}

function Liquid(){
	this.x = 0;
	this.y = height/2;
	this.h = 200;
	this.w = width;
	this.c = 0.1;

	this.contains = function(m){
		var l = m.pos;
		return l.x > this.x && l.x < this.x + this.w &&
				l.y > this.y && l.y < this.y + this.h
	}

	this.calculateDrag = function(m){
		var speed = m.vel.mag();
		var dragMagnitude = this.c * speed * speed;

		var dragForce = m.vel.copy();
		dragForce.mult(-1);
		dragForce.normalize();
		dragForce.mult(dragMagnitude);

		return dragForce
	}
	this.display = function(){
		noStroke();
		fill(255,0,255);
		rect(this.x,this.y,this.w,this.h)
	}
}

function Particle(x,y,m){
	this.pos = createVector(x,y);
	this.vel = createVector(0,0);
	this.acc = createVector(0,0);
	this.size= 40;
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
		fill(255);
		noStroke();
		ellipse(this.pos.x,this.pos.y,this.size,this.size)

	}
}