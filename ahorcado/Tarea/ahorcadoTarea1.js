//Elijan de un array de palabras aleatorio(Tarea)
var palabra = "Accesibilidad";
var hombre, l;
var imagenes = 
{   // creo el objeto imagenes para poder cargar los archivos, su ubicacion y si ya cargo.
    imagen: [0,0,0,0,0,0],
    x: [0,157,165,125,139,157],
    y: [0,123,178,173,242,123],
    url: [
        "imagenesAhorcado/fondo.png",
        "imagenesAhorcado/cabezaViva.png",
        "imagenesAhorcado/Tronco.png",
        "imagenesAhorcado/Brazos.png",
        "imagenesAhorcado/Piernas.png",
        "imagenesAhorcado/muerto.png"],
    ok: [false,false,false,false,false,false]

};




//Declaración de la clase Ahorcado
var Ahorcado = function (con)
{
    //this es las variables locales de la clase, accesibles en toda la clase
    //this.contexto es el context de dibujo del canvas, que llega por parametro
    //desde la variable con
    this.contexto = con;
    this.maximo = 5; // maximo intentos 
    this.intentos = 0;
    this.vivo = true;
     
};

Ahorcado.prototype.dibujar = function ()
{
    alert("carga el prototipe de dibujo");
    var dibujo = this.contexto;
    if (imagenes.ok[0]){
    //Dibujando el fondo
    alert("dubujo el fondo");
    dibujo.drawImage( imagenes.imagen[0] , imagenes.x[0] , imagenes.y[0] ); 
    
    }
    
    if(this.intentos > 1)
    {
        // intentos = 1 --> cabeza viva
        alert("dubujo el cabeza");
        dibujo.drawImage( imagenes.imagen[1] , imagenes.x[1] , imagenes.y[1] ); 

        if(this.intentos > 2)
        {
            // intentos = 2 -->  tronco
            alert("dubujo el tronco");
            dibujo.drawImage( imagenes.imagen[2] , imagenes.x[2] , imagenes.y[2] ); 

            
        
            if(this.intentos > 3)
            {
                // intentos = 3 --> brazos
                alert("dubujo el brazos");
                dibujo.drawImage( imagenes.imagen[3] , imagenes.x[3] , imagenes.y[3] ); 


                if(this.intentos > 4)
                {
                    // intentos = 4 --> piernas
                    alert("dubujo el piernas");
                    dibujo.drawImage( imagenes.imagen[4] , imagenes.x[4] , imagenes.y[4] ); 
    
                
                     if(this.intentos > 5)
                    {
                        // intentos = 5 --> muerto
                        alert("dubujo el muerto");
                        dibujo.drawImage( imagenes.imagen[5] , imagenes.x[5] , imagenes.y[5] ); 

                    }
                }
            }
        }
    }
}

Ahorcado.prototype.trazar = function ()
{
    this.intentos++;
    if(this.intentos >= this.maximo)
    {
        this.vivo = false;
        alert("¡Estás muerto!");
    }
    this.dibujar();
}


function iniciar () 
{
    l = document.getElementById("letra");
    var b = document.getElementById("boton");
    var canvas = document.getElementById("c");
    canvas.width = 500;
    canvas.height = 400;
    var contexto = canvas.getContext("2d");
    hombre = new Ahorcado(contexto);
        
    for (var i = 0; i < 6 ; i++) 
    {
        imagenes.imagen[i] = new Image();
        imagenes.imagen[i].src = imagenes.url[i];
        imagenes.imagen[i].onload = confirmarImagenes(i); 
    };
    
}

confirmarImagenes = function(n)   
{
    imagenes.ok[n] = true;
    hombre.dibujar(); // ESTO NO FUNCIONA : no dibuja nada , por qué? POR QUÉ?!!!!!!
}    
