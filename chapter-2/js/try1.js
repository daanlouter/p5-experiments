var particles = [];
var attractor;
var particleAmount = 800;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var hueVal;
var opacity = 0;

function setup(){
	createCanvas(windowWidth,windowHeight);
	background(0);
	hueVal = Math.round(random(255));
	attractor = new Attractor(width/2,height/2);

	for(var i = 0; i<particleAmount; i++){
		var dist = 100;
		var xDist = random(-dist,dist);
		var xPos = (width/2) + xDist;

		var yDist = Math.sqrt((dist * dist) - (xDist * xDist));
		var yPos = (height/2) + yDist;

		if(random()>0.5){
			yPos = (height/2) - yDist;
		}


		particles.push(new Particle((width/2) + random(-dist,dist),(height/2) + random(-dist,dist),1))
	}
	
	console.log(hueVal);
}

function draw(){
	background(0,200)


	for(var i=0; i<particleAmount; i++){
		var gravity = attractor.calculateAttraction(particles[i]);
		particles[i].applyForce(gravity);
		
		particles[i].update();
		particles[i].draw();
		
		attractor.display();
	}
}

function mousePressed(){
	var randomX = random(50,width-50);
	var randomY = random(50,height-50);

	attractor.pos.set(randomX,randomY);
}

function Attractor(x,y){
	this.pos = createVector(x,y);
	this.mass = 20;
	this.G = 5;

	this.calculateAttraction = function(p){
		var force = p5.Vector.sub(this.pos,p.pos);
		var distance = force.mag();
			distance = constrain(distance,1,20);

		force.normalize();
		var strength = (this.G * this.mass * p.mass) / (distance * distance);
		force.mult(strength);

		return force
	}

	this.display = function(){
		fill(color('hsb(' + hueVal + ', 80%, 100%)'));
		ellipse(this.pos.x,this.pos.y,100);
	}
}

function Particle(x,y,m){
	this.pos = createVector(x,y);
	this.vel = createVector(2,0);
	this.acc = createVector(0,0);
	this.size=random(1,6);
	this.mass = m;
	this.s = Math.round(random(40,100));
	this.b = 40;

	this.hueVal = Math.round(random(255));
	hueVal = 249;

	this.c = color('hsb(' + hueVal + ', ' + this.s + '%, ' + this.b + '%)');

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
		fill(this.c);
		noStroke();
		// filter(BLUR,3);
		ellipse(this.pos.x,this.pos.y,this.size,this.size)

	}
}