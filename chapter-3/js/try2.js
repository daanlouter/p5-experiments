var lines = [];
var rows = 15;
var columns = 15;
var col =0;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

function setup(){
	createCanvas(windowWidth,windowHeight);
	background(255);

	var marginHorizontal = (width-100) / columns;
	var marginVertical = (height-100) / rows;

	for(var x = 0; x<columns; x++){
		for(var y = 0; y<rows; y++){
			var xPos = x * marginHorizontal + 75;
			var yPos = y * marginVertical + 75;
			lines.push(new Line(xPos,yPos,x,y))
		}
	}
}

function draw(){
	var opacity = map(mouseX,0,width,0,255);
	background(255,opacity)
	for(var i = 0; i<lines.length; i++){
		lines[i].display();
	}

}

function Line(x,y,countX,countY){
	this.length = (width-100) / columns;
	this.pos = createVector(x,y);
	this.val = random() > 0.5 ? 0.01 : -0.01;
	this.c = color('hsb(255,100%,100%)');
	this.hue = Math.round(random(200,255));

	// this.speed = this.val * random(-2,2);
	// this.speed = this.val;
	this.speed = this.val * 4;
	this.speed = map(countX*countY,0,400,0.01,0.4);


	this.display = function(){
		var saturation = Math.round(map(mouseY,0,height,0,100));
		if(this.hue <255){
			this.hue++;
		}else{
			this.hue = 0;
		}
		this.c = color('hsb(' + this.hue + ',100%,' + (saturation) +'%)');
		stroke(this.c);
		strokeWeight(1);
		push();
		translate(this.pos.x,this.pos.y)
		rotate(frameCount * this.speed);
		line(0,-this.length/2,0,this.length/2)
		pop();
	}
}