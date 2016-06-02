
// Properties __________________________________________________

var body;
var xMin = 0;
var xMax = 500;
var yMin = 0;
var yMax = 500;
var speed = 1;
var fps = 60;
var interval = 1000 / fps;
var direction =  38   // direccion es la variable en donde se esta movinedo la tecla  
    
var key =
    {
        UP:38,  // usando el codigo ASCII del teclado 
        DOWN:40,
        LEFT:37,
        RIGHT:39
    }; 


// Logic _______________________________________________________

var Snake = function(con){
    this.context = con;
    
    this.longitude = 50;
    this.x = 100;
    this.y = 100;
    this.vivo = true;
    
}

function start () 
{
    var canvas = document.getElementById("canvas");
    canvas.width = 500;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");
    body = new Snake(ctx);
}

