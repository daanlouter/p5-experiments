var d;
var done = 0;
var circles = [];

function setup(){
	createCanvas(620,480);
	background(51);
	d = pixelDensity();
	var pink = color(244,255,0);
	for(var i=0; i<5; i++){
		circles[i] = new Blob(width/2,height/2)
	}
}


function draw(){
	loadPixels();

	for (var x = 0; x < width*d; x++) {
	  for (var y = 0; y < height*d; y++) {
	    // var idx = (4 * y)  * (y * width * 2 + x);
	    var idx = (x + y * (width*d))*4;
	    var col = 0;
	    for(var j=0;j<circles.length;j++){
	    	var e = dist(x,y,circles[j].pos.x,circles[j].pos.y);
	    	var multiplier = 10;
	    	var result = multiplier * circles[j].r / e;

	
	    	
	    	col += result;
	    	// console.
	    }

	    var mappedCol = map(col,40,1000,0,255);
	    col = mappedCol*2;

	    
	    // if(col < 10){
	    // 	console.log(col)
	    // }
	    pixels[idx] = col;
	    pixels[idx+1] = col;
	    pixels[idx+2] = col;
	    pixels[idx+3] = 255;
	    
	  }
	}

	updatePixels();

	for(var j=0;j<circles.length;j++){
		circles[j].move();
		circles[j].show();
	};
	done++;
}


function Blob(x,y){
	this.pos = createVector(x,y);
	this.r = random(80,120);
	this.vel = createVector(random(),random());
	this.vel.mult(random(4,8))

	this.move = function(){
		this.pos.add(this.vel);
		if(this.pos.x > width || this.pos.x < 0){
			this.vel.x *= -1;
		}
		if(this.pos.y > height || this.pos.y < 0){
			this.vel.y *= -1;
		}
	}
	this.show = function(){
		stroke(255);
		strokeWeight(4)
		noFill();
		ellipse(this.pos.x,this.pos.y,this.r,this.r);
	}
}