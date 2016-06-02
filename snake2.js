var body, step;

// Properties __________________________________________________

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

Snake.prototype.drawSnake = function(x,y,long)
{

    var draw = this.context;
    
    //Dibujando la serpiente
    

    if (direction == key.UP)
    {
        // dibujo serpiente moviendose hacia ARRIBA
    }
    if (direction == key.DOWN) 
    {
        // dibujo serpiente moviendose hacia ABAJO
    }
    if (direction == key.RIGHT) 
    {
        // dibujo serpiente moviendose hacia DERECHA
        draw.beginPath();
        draw.moveTo(x,y);
        draw.lineTo(x-long,y);
        draw.lineWidth = 15;
        draw.strokeStyle = "#000";
        draw.stroke();
        draw.closePath();
    }
    if (direction == key.LEFT) 
    {
        // dibujo serpiente moviendose hacia IZQUIERDA
    }

}


Snake.prototype.ciclo = function()
{
    setTimeout  (
                    function() 
                    {
                        window.requestAnimationFrame(ciclo);
                        if (this.x < xMin || 
                        this.x > xMax ||
                        this.y < yMin ||
                        this.y > yMax ) 
                        {
                            alert("PERDISTE, HAS CHOCADO");
                            this.vivo = false;
                        }
                        else 
                                {
                                    // con cada ciclo cambio la pocision de la serpiente en funcion de su direccion
                                    if (direction == key.UP)
                                    {
                                        this.y -= speed;
                                    }
                                    if (direction == key.DOWN) 
                                    {
                                        this.y += speed;
                                    }
                                    if (direction == key.RIGHT) 
                                    {
                                        this.x += speed;
                                    }
                                    if (direction == key.LEFT) 
                                    {
                                        this.x -= speed;
                                    }
                                    body.Snake(this.x,this.y,this.longitude);
                            } 
} , interval);


}


function start () 
{
    var canvas = document.getElementById("canvas");
    canvas.width = 500;
    canvas.height = 500;
    var ctx = canvas.getContext("2d");
    body = new Snake(ctx);

    document.addEventListener("keydown", changeDirection);
}

function changeDirection(data) 
{
    var direction = data.keyCode;   // guardo el numero de la tecla optrimida
    console.log(direction);
    if (direction !== key.UP || direction !== key.DOWN || direction !== key.LEFT || direction !== key.RIGHT)
    {
        // error solo se pueden usar las flechas del teclado.
        alert("ERROR: solo puedes usar las flechas del teclado.");
    }
}