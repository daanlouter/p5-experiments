var img;
var grid = [];
// var url = "http://manolyaisik.com/imgs/londoncakes.jpg";
var url = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Claude_Monet%2C_Impression%2C_soleil_levant.jpg/1280px-Claude_Monet%2C_Impression%2C_soleil_levant.jpg"
// var url = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Coral_Outcrop_Flynn_Reef.jpg/1280px-Coral_Outcrop_Flynn_Reef.jpg";
// var url = "https://pbs.twimg.com/profile_images/475742844578066432/laEW8gHN.jpeg"

function preload(){
  img = loadImage(url)
}

function setup(){
  createCanvas(1000,1000);
  background(0);
  image(img,0,0)
  console.log('hoi');
  
  var pink = color(255, 102, 204);
  loadPixels();
  var d = pixelDensity();
  // var halfImage = 4 * (width * d) * (height * d);
  for(var y=0; y< height * 4 * d; y+=4){
    var rowList = [];
      for(var x=0; x<width * 4 * d; x+=4){
        var currentPixel = (y * width) + x;
        var rgbValue = [pixels[currentPixel],pixels[currentPixel+1],pixels[currentPixel+2]];
        rowList.push(rgbValue);
      }
    grid.push(rowList);
  }
  var ngrams = {};
  
  grid.forEach(function(y,yi){
    y.forEach(function(x,xi){
      var left;
      if(xi>0){
        left = grid[yi][xi-1]
      }else{
        left = null
      }
      if(left){
        left = left.toString();
      }

      if(!ngrams[left]){
        ngrams[left] = [x]
      }else{
        ngrams[left].push(x)
      }
    })
  })


  var newGrid = [];
  for(var y=0; y< height * 4 * d; y+=4){
      for(var x=0; x<width * 4 * d; x+=4){
        var currentPixel = (y * width * d) + x;
        if(y===0 || true){
          if((x/4) === 0){
            // pixels[currentPixel] = pixels[0];
            // pixels[currentPixel + 1] = pixels[1];
            // pixels[currentPixel + 2] =pixels[2];
          }else{
            var leftValue = [pixels[currentPixel - 4],pixels[currentPixel-3],pixels[currentPixel-2]];
            var possibilities = ngrams[leftValue.toString()];

            var upValue = null;
            if(y > 0){
              var previousPixel = currentPixel - width;
              // upValue = [pixels[previousPixel],pixels[previousPixel+1],pixels[previousPixel-2]];
              // console.log(upValue)
            }
            

            if(possibilities){
              if(!upValue){
                var newColor = random(possibilities);
                pixels[currentPixel] = newColor[0];
                pixels[currentPixel + 1] = newColor[1];
                pixels[currentPixel + 2] = newColor[2];
                // pixels[currentPixel + 3] = 100;
              }
              
            }

          }
        }else{
          pixels[currentPixel] = pixels[x];
          pixels[currentPixel + 1] = pixels[x+1];
          pixels[currentPixel + 2] = pixels[x+2];
        }
        
      }
  }
  updatePixels();

}
