/* Programar es Dividir un problema en paqueños cachos o pasos para resolverlo
1. Dibujar poste
2. Determinar la palabra
3. Pasos para ahorcar:
    Cabeza
    Torso
    Brazos
    Pies
    Ojos muertos X X
4. Elegir las letras
    Si la letra existe:
        Pongo en la lista
    Si no existe:
        Agrego un trazo al ahorcado

    Si ya dibuje al ahorcado completo:
        Perdí

    Si adivine la palabra
        Gané
*/

/*
var palabra = "tamarindo";
var hombre;

var Ahorcado = function (con) // con es el contexto de canvas
{
    this.contexto = con;
    this.maximo = 5;
    this.intentos = 0;
}

function iniciar()
{
    var canvas = document.getElementById("c");
    canvas.width = 500;
    canvas.height = 400;
    var contexto = canvas.getContext("2d");
    var hombre = new Ahorcado(contexto);
}
*/














//Elijan de un array de palabras aleatorio(Tarea)
var palabra = "Accesibilidad";
var hombre, l;

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

    //this.dibujar();
   
};


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
alert("ya cargó el objeto imagenes");


Ahorcado.prototype.dibujar = function ()
{
    alert("carga el prototipe de dibujo");
    var dibujo = this.contexto;
    if (imagenes.ok[0]){
    //Dibujando el fondo
    alert("dubujo el fondo");
    dibujo.drawImage( imagenes.imagen[0] , imagenes.x[0] , imagenes.y[0] ); 
    console.log(imagenes);
    alert("muestro objeto imagenes")
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
    alert("entra en funcion trazar")
    this.intentos++;
    if(this.intentos >= this.maximo)
    {
        this.vivo = false;
        alert("¡Estás muerto!");
    }
    this.dibujar();
}

confirmarImagenes = function(n)   
{
    imagenes.ok[n] = true;
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
    alert("ya cargaron las imagenes")
    
    hombre.trazar();   
    //hombre.trazar();   
    //hombre.trazar();   
    //hombre.trazar();   
    //hombre.trazar();   
    
    //Convierte a mayúscula un texto
    palabra = palabra.toUpperCase();

    //Declaro un array con n espacios de acuerdo al largo de la plabara
    espacio = new Array(palabra.length);

    //Agregamos una función que se dispare al dar click al botón
    b.addEventListener("click", agregarLetra);

    mostrarPista(espacio);
    //mostrarPista(palabra, espacio);


}











function agregarLetra()
{
    var letra = l.value;
    l.value = "";
    mostrarPalabra(palabra, hombre, letra);
}

function mostrarPalabra(palabra, ahorcado, letra)
{
    var encontrado = false;
    var p;
    letra = letra.toUpperCase();
    for (p in palabra)
    {
        if (letra == palabra[p])
        {
            espacio[p] = letra;
            encontrado = true;
        }
    }
    mostrarPista(espacio);

    // Si NO lo encontré
    if(!encontrado)
    {
        ahorcado.trazar();
    }

    if(!ahorcado.vivo)
    {
        //Mostrar la palabra entera al morir(Tarea)
        for (var i = 0; i < palabra.length; i++) 
        {
            Things[i]
        };
    }
}

function mostrarPista(espacio)
{
    var pista = document.getElementById("pista");
    var texto = "";
    var i;
    var largo = espacio.length;

    for(i = 0; i<largo; i++)
    {
        if(espacio[i] != undefined)
        {
            texto = texto + espacio[i] + " ";
        }
        else
        {
            texto += "_ ";
        }
    }
    pista.innerText = texto;
}