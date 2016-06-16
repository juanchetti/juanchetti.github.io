var body;
var i = 0;
var velocidad = 500;
var cambioDireccion = false;

// Properties __________________________________________________

var xMin = 0;
var xMax = 300;
var yMin = 0;
var yMax = 300;
// var speed = 10; 
var curva = new Array();
// var cambioDireccion = false;

//var fps = 60;
//var interval = 100000 / fps;
var direction = 39;   // direccion es la variable en donde se esta movinedo la tecla  
var ultimaDireccion = direction;

var key =
    {
        UP:38,  // usando el codigo ASCII del teclado 
        DOWN:40,
        LEFT:37,
        RIGHT:39
    }; 


// Logic _______________________________________________________


var nIntervID;
var cuenta = 0;

var contador = function()
{
    cuenta += 1;
    console.log(cuenta);
}


var SnakeGame = function(con){
    this.context = con;
   
    this.anchoMarco = 10;
    this.tablero = 
    {
        xMax:xMax - this.anchoMarco,
        xMin:xMin + this.anchoMarco,
        yMax:yMax - this.anchoMarco,
        yMin:yMin + this.anchoMarco,
    };

    console.log(this.tablero.xMax);
    console.log(this.tablero.xMin);
    console.log(this.tablero.yMax);
    console.log(this.tablero.xMin);

    this.longitude = 10;
    this.ancho = 10;
    this.paso = 10;
    this.vivo = true;
    this.haComido = false;
    this.estomago = 100; //pongo un limite de movimientos sin comer 
    this.score = 0;
    this.cabezaX = 100;
    this.cabezaY = 100;
    this.colaX = this.cabezaX - this.paso; 
    this.colaY = this.cabezaY;
    
    this.curvasX = new Array;
    this.curvasY = new Array;
    this.numeroCurvas = 0;
    
    this.comidaX = 200;
    this.comidaY = 200;
    this.anchoComida = 5;
    

    this.drawComida();
    // this.drawSnakeGame();
    
    // alert("a punto de iniciar setInterval al startGame");
    nIntervID = setInterval("body.drawSnakeGame()", velocidad);
}

SnakeGame.prototype.drawSnakeGame = function()
{
    
    this.score += 1;    //suma puntos por movimiento

    this.estomago -= 1; //va consumiendo su energia 
    if (this.estomago == 0) {
        alert("PERDISTE, TE HAS MUERTO POR NO COMER");
        this.vivo = false;
        clearInterval(nIntervID);
        // stopGame();
    }


    // Pregunto si la serpiente ha tocado los limites del tablero de juego
    if (this.cabezaX < xMin + this.anchoMarco || 
        this.cabezaX > xMax - this.anchoMarco || 
        this.cabezaY < yMin + this.anchoMarco || 
        this.cabezaY > yMax - this.anchoMarco ) 
    {
        alert("PERDISTE, HAS CHOCADO");
        this.vivo = false;
        clearInterval(nIntervID);
        // stopGame();
    }
    else // como la serpiente no toco los limites del tablero de juego la puedo mover y dibujar
    {
        if (this.cabezaX == this.comidaX && 
            this.cabezaY == this.comidaY) 
        {
            // console.log("comio!!!!!")
            this.longitude += 10;
            this.haComido = true;
            this.estomago = 100; 
            this.score += 100; // suma punto por mantenerce con vida
            clearInterval(nIntervID);
            if (velocidad >= 100) //Limito la la maxima velocidad de la serpiente
                {
                velocidad = velocidad - 50;
                }
            console.log(velocidad);
            nIntervID = setInterval("body.drawSnakeGame()", velocidad);
        }
        
        if (cambioDireccion) 
            {
                //aca habria que meter el codigo para hacer crecer la serpiente y guardar las curvas en un array
                this.numeroCurvas += 1;
                this.curvasX[this.numeroCurvas] = this.cabezaX
                this.curvasY[this.numeroCurvas] = this.cabezaY
                console.log(this.numeroCurvas);
            }



        // con cada ciclo cambio la pocision de la serpiente en funcion de su direccion
        if (direction == key.UP)
        {
            this.cabezaY -= this.paso; 
            this.colaY -= this.paso;

            this.colaX = this.cabezaX;
            this.colaY = this.cabezaY + this.paso; 
        }
        if (direction == key.DOWN) 
        {
            this.cabezaY += this.paso; 
            this.colaY += this.paso;

            this.colaX = this.cabezaX;
            this.colaY = this.cabezaY - this.paso; 
        }
        if (direction == key.RIGHT) 
        {
            this.cabezaX += this.paso; 
            this.colaX += this.paso;

            this.colaX = this.cabezaX - this.paso; 
            this.colaY = this.cabezaY;
        }
        if (direction == key.LEFT) 
        {
            this.cabezaX -= this.paso; 
            this.colaX -= this.paso;

            this.colaX = this.cabezaX + this.paso; 
            this.colaY = this.cabezaY;
        }
        //body.drawSnakeGame(this.cabezaX,this.cabezaY,this.longitude);
    } 

    // alert("dibuja");
    
    draw = this.context;
        
    // dibujando un recuadro
    // draw.fillRect(0,0,xMax,yMax);
    // draw.clearRect(this.anchoMarco,this.anchoMarco,xMax - 2*this.anchoMarco,yMax - 2*this.anchoMarco); 
    //draw.strokeRect(0,0,50,50);

    //borro el camvas para refrescar la pantala
    draw.clearRect(this.anchoMarco,this.anchoMarco,xMax,yMax); 
    
    // drawSnake = function()
    // {
    //     contador();
    //     draw.beginPath();
    //     draw.moveTo(this.cabezaX,this.cabezaY);//cabeza de serpiente
    //     draw.lineTo(this.colaX,this.colaY);//cola de serpiente
    //     draw.lineWidth = this.ancho; 
    //     draw.strokeStyle = "#000";
    //     draw.stroke();
    //     draw.closePath();
    // }

    // // Dibujando la serpiente
    // if (direction == key.UP)
    // {
    //     this.colaX = this.cabezaX;
    //     this.colaY = this.cabezaY + this.paso; 
    //     // dibujo serpiente moviendose hacia ARRIBA
    //     // draw.beginPath();
    //     // draw.moveTo(this.cabezaX,this.cabezaY);//cabeza de serpiente
    //     // draw.lineTo(this.colaX,this.colaY);//cola de serpiente
    //     // draw.lineWidth = this.ancho; 
    //     // draw.strokeStyle = "#000";
    //     // draw.stroke();
    //     // draw.closePath();
    //     //this.drawSnake();
    // }
    // if (direction == key.DOWN) 
    // {
    //     this.colaX = this.cabezaX;
    //     this.colaY = this.cabezaY - this.paso; 
    //     // dibujo serpiente moviendose hacia ABAJO
    //     // draw.beginPath();
    //     // draw.moveTo(this.cabezaX,this.cabezaY);//cabeza de serpiente
    //     // draw.lineTo(this.colaX,this.colaY);//cola de serpiente
    //     // draw.lineWidth = this.ancho; 
    //     // draw.strokeStyle = "#000";
    //     // draw.stroke();
    //     // draw.closePath();
    //     //this.drawSnake();
    // }
    // if (direction == key.RIGHT) 
    // {          
    //     // i += 1;
    //     // console.log(i);
    //     this.colaX = this.cabezaX - this.paso; 
    //     this.colaY = this.cabezaY;
    //     // dibujo serpiente moviendose hacia DERECHA
    //     // draw.beginPath();
    //     // draw.moveTo(this.cabezaX,this.cabezaY);//cabeza de serpiente
    //     // draw.lineTo(this.colaX,this.colaY);//cola de serpiente
    //     // draw.lineWidth = this.ancho; 
    //     // draw.strokeStyle = "#000";
    //     // draw.stroke();
    //     // draw.closePath();
    //     //this.drawSnake();

    // }
    // if (direction == key.LEFT) 
    // {
    //     this.colaX = this.cabezaX + this.paso; 
    //     this.colaY = this.cabezaY;
    //     // dibujo serpiente moviendose hacia IZQUIERDA
    //     // draw.beginPath();
    //     // draw.moveTo(this.cabezaX,this.cabezaY);//cabeza de serpiente
    //     // draw.lineTo(this.colaX,this.colaY);//cola de serpiente
    //     // draw.lineWidth = this.ancho; 
    //     // draw.strokeStyle = "#000";
    //     // draw.stroke();
    //     // draw.closePath();
    //     //this.drawSnake();
        
    // }

    this.drawSnake();
    this.drawComida();
    // this.ciclo(this.cabezaX,this.cabezaY,direction);
    //alert("a punto de ir al moveSnake");
    //this.moveSnake();


    //alert("a punto de salir del moveSnake");
    cambioDireccion = false;
}




// SnakeGame.prototype.moveSnake = function()
// {
    
   
// }

SnakeGame.prototype.drawSnake = function()
    {
        // contador();
        draw.beginPath();
        draw.moveTo(this.cabezaX,this.cabezaY);//cabeza de serpiente
        
        for (var i = 1; i < this.numeroCurvas; i++) {
            draw.lineTo(this.curvasX[this.numeroCurvas],this.curvasY[[this.numeroCurvas]]);//cuerpo y curvas
        }
            
        
        draw.lineTo(this.colaX,this.colaY);//cola de serpiente
        draw.lineWidth = this.ancho; 
        draw.strokeStyle = "#000";
        draw.stroke();
        draw.closePath();
    }

SnakeGame.prototype.drawComida = function()
{   
    draw = this.context
    
    if (this.haComido) 
    {   
        this.comidaX = aleatorio(this.tablero.xMin,this.tablero.xMax/10);
        this.comidaY = aleatorio(this.tablero.yMin,this.tablero.yMax/10);
        this.haComido = false;
    }
    else
    {
        // console.log(" la serpiente esta en (" + this.cabezaX + " , " + this.cabezaY + " )" );
        // console.log(" la comida esta en (" + this.comidaX + " , " + this.comidaY + " )" );
        // contador();
        // de momento la comida es una cruz
        draw.beginPath();
        draw.moveTo(this.comidaX - this.anchoComida,this.comidaY);
        draw.lineTo(this.comidaX + this.anchoComida,this.comidaY);
        draw.moveTo(this.comidaX,this.comidaY - this.anchoComida);
        draw.lineTo(this.comidaX,this.comidaY + this.anchoComida);
        draw.lineWidth = this.anchoComida; 
        draw.strokeStyle = "#000";
        draw.stroke();
        draw.closePath();
    }    
        
}

 
function aleatorio(minimo, maximo)
    {
        var numero = Math.floor( Math.random() * (maximo - minimo +1) + minimo)
        numero = numero *10;
        return numero;
    }

SnakeGame.prototype.startGame = function() {
    alert("a punto de iniciar setInterval al drawSnakeGame");
    this.drawSnakeGame();

}    

SnakeGame.prototype.stopGame = function() {
    
}
    
   



function start () 
{
    var canvas = document.getElementById("canvas");
    canvas.width = xMax;
    canvas.height = yMax;
    var ctx = canvas.getContext("2d");
    body = new SnakeGame(ctx);

    document.addEventListener("keydown", changeDirection);

        
}

function changeDirection(data) 
{
    direction = data.keyCode;   // guardo el numero de la tecla optrimida
    // console.log(direction);
    if (direction == key.UP || direction == key.DOWN || direction == key.LEFT || direction == key.RIGHT)
    {
        //quiero saber si intenta ir hacia atras
        var opuestos = Math.abs(ultimaDireccion - direction);
        console.log (opuestos);

        // es para saber si intenta continuar con la misma direccion  ultimaDireccion != direction ||  
         if ( opuestos = 2)  
        {
            cambioDireccion = true;
        }
        
        // body.moveSnake();
    }
    else
    {
        // error solo se pueden usar las flechas del teclado.
        alert("ERROR: solo puedes usar las flechas del teclado.");
    }
}

