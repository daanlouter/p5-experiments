var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var r = 2;
var k = 5;
var grid = [];
var active = [];
var w = r / Math.sqrt(2);
var cols = Math.floor(windowWidth / w);
var rows = Math.floor(windowHeight / w);
var ordered = [];

function setup(){
	createCanvas(windowWidth,windowHeight);
	background(0);

	strokeWeight(4);
	for(var i=0; i<cols*rows; i++){
		grid[i] = false;
	}

	var startPos = createVector(width/2,height/2);
	var i = floor(startPos.x/w)
	var j = floor(startPos.y/w);

	grid[i+j*cols] = startPos;
	active.push(startPos);
	// frameRate(1	60);

}

function draw(){
	background(255);
	var counter = 0;
	
	for(var z = 0; z<30; z++){
	if(active.length > 0 ){
		counter++;
		var index = floor(random(active.length));
		var pos = active[index];
		var found = false;
		for(var n = 0; n < k; n++){
			var sample = p5.Vector.random2D();
			var m = random(r,r*2);
			sample.setMag(m);
			sample.add(pos);

			var colPos = floor(sample.x/w);
			var rowPos = floor(sample.y/w);
			var ok = true;

			for(var x = -1; x <=1;x++){
				for(var y = -1; y <= 1; y++){
					if(colPos + x < 0 || colPos + x > cols){
						ok = false
					}
					if(rowPos + y < 0 || rowPos + y > rows){
						ok = false
					}
					var neighbour = grid[(colPos + x) + (rowPos + y) * cols];
					if(neighbour){
						var d = p5.Vector.dist(neighbour,sample);
						if(d < r){
							ok = false;
						}
					}
				}
			}
			if(ok){
				found = true;
				grid[colPos + rowPos*cols] = sample;
				active.push(sample);
				ordered.push(sample);
				
				break;
			}else{}
		}
		if(!found){
			active.splice(index,1);
		}
	}
	}
	
	// var i = frameCount;
	for(var i = 0; i < ordered.length; i++){
		fill(1,200);
		strokeWeight(1);
		stroke(2,10)
		// noStroke();
		ellipse(ordered[i].x,ordered[i].y,1);				
	}
}