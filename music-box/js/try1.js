var particles = [];
var cols = 7;
var colWidth;
var osc;	
var synth;

function setup(){
	createCanvas(windowWidth,windowHeight);
	background(0);
	colWidth = width/7;

	synth = new Tone.FMSynth(4, Tone.Synth).toMaster();
	//play a chord
}

function draw(){
	background(0)
	for(var i = 0; i<cols; i++){
		fill(100+10*i);
		noStroke();
		rect(colWidth * i,0,colWidth,height);
	}
	var counter = 0;

	if(random()>0.98){
		particles.push(new Particle(random(width),random(height)))
	}

	particles.forEach(function(particle){
		if(!particle.dead){
			particle.show();
		}
	})	
}

function mousePressed(){
	
}



function Particle(x,y){
	this.pos = createVector(x,y)
	this.lifeSpan = 0;
	this.maxAge = Math.round(random(35,45));
	this.step = 255 / this.maxAge;
	this.dead = false;

	this.show = function(){
		fill(255,255 - (this.step*this.lifeSpan));
		noStroke();
		ellipse(this.pos.x,this.pos.y,this.lifeSpan);

		if(this.lifeSpan == 0){
			this.play();
		}
		
		this.lifeSpan++;
		this.isDead();
	}

	this.play = function(){
		synth.triggerAttackRelease("C4", "5n");
	}

	this.isDead = function(){
		if(this.lifeSpan >= this.maxAge){
			// var index = particles.indexOf(this);
			this.dead = true;
		}
	}
}