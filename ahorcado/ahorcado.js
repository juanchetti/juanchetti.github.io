

//TAREA: Elijan de un array de palabras aleatorias
var palabras = new Array();                                                                 //
palabras = ["amor","piñata","forma","pelota","hueso","gente","amigo","ordenador","calle"];  //
                                                                                            //
function palabraAleatoria(minimo,maximo)                                                    //
{                                                                                           //
    var numero = Math.floor( Math.random() * (maximo - minimo) + minimo)                    //
    palabra = palabras[numero];                                                             //
    console.log(palabra);                                                                   //
}                                                                                           //
palabraAleatoria(0,palabras.length);                                                        //

var hombre, l, espacio;


//Declaración de la clase Ahorcado
var Ahorcado = function (con)
{
    //this es las variables locales de la clase, accesibles en toda la clase
    //this.contexto es el context de dibujo del canvas, que llega por parametro
    //desde la variable con
    this.contexto = con;
    this.maximo = 5;
    this.intentos = 0;
    this.vivo = true;

    //this.mostrarPist();
   
    this.dibujar();
}
Ahorcado.prototype.dibujar = function ()
{
    var dibujo = this.contexto;

    //Dibujando el poste
    dibujo.beginPath();
    dibujo.moveTo(150,100);
    dibujo.lineTo(150,50);
    dibujo.lineTo(400,50);
    dibujo.lineTo(400,350);
    dibujo.lineWidth = 15;
    dibujo.strokeStyle = "#000";
    dibujo.stroke();
    dibujo.closePath();

    if(this.intentos > 0)
    {
        // intentos = 1 --> rostro
        dibujo.beginPath();
        dibujo.arc(150, 140, 40, 0, Math.PI * 2, false);
        dibujo.strokeStyle = "red";
        dibujo.lineWidth = 5;
        dibujo.stroke();
        dibujo.closePath();

        if(this.intentos > 1)
        {
            // intentos = 2 --> torso
            dibujo.beginPath();
            dibujo.moveTo(150,180);
            dibujo.lineTo(150,250);
            dibujo.strokeStyle = "red";
            dibujo.lineWidth = 5;
            dibujo.stroke();
            dibujo.closePath();

            if(this.intentos > 2)
            {
                // intentos = 3 --> brazos
                dibujo.beginPath();
                dibujo.moveTo(120,220);
                dibujo.lineTo(150,180);
                dibujo.lineTo(180,220);
                dibujo.strokeStyle = "red";
                dibujo.lineWidth = 5;
                dibujo.stroke();
                dibujo.closePath();

                if(this.intentos > 3)
                {
                    // intentos = 4 --> piernas
                    dibujo.beginPath();
                    dibujo.moveTo(120,290);
                    dibujo.lineTo(150,250);
                    dibujo.lineTo(180,290);
                    dibujo.strokeStyle = "red";
                    dibujo.lineWidth = 5;
                    dibujo.stroke();
                    dibujo.closePath();

                    if(this.intentos > 4)
                    {
                        // intentos = 5 --> ojos muertos
                        dibujo.beginPath();
                        //Ojo izquierdo
                        dibujo.moveTo(125,120);
                        dibujo.lineTo(145,145);
                        dibujo.moveTo(145,120);
                        dibujo.lineTo(125,145);

                        //Ojo derecho
                        dibujo.moveTo(155,120);
                        dibujo.lineTo(175,145);
                        dibujo.moveTo(175,120);
                        dibujo.lineTo(155,145);

                        dibujo.strokeStyle = "blue";
                        dibujo.lineWidth = 5;
                        dibujo.stroke();
                        dibujo.closePath();
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

    //Convierte el texto a mayúscula
    palabra = palabra.toUpperCase();
    
    //declaro un Array de n espacios segun el largo de la palabra
    espacio = new Array(palabra.length);
    

    b.addEventListener("click", agregarLetra);
    document.getElementById("letra").focus();
    //disparo la funcion para que al inicio se cargen los caracteres que componen la palabra
    mostrarPista(espacio);  
}

function agregarLetra()
{
    var letra = l.value;
    l.value ="";    // boro la caja de texto 
    // TAREA: como vulevo el foco a la caja de texto, con: element.focus()
    document.getElementById("letra").focus();
    
    mostrarPalabra(palabra, hombre, letra);
}

function mostrarPalabra(palabra,ahorcado,letra)
{
    var encontrado = false;
    letra = letra.toUpperCase();  
    for (p in palabra) //es lo mismo que decir (var p=0; p<palabra.length; p++) {} 
    {
        if (letra == palabra[p]) 
        {
            espacio[p] = letra;
            encontrado = true;
        }
    }
    mostrarPista(espacio);

    // SI NO LO ENCONTRE, !NIEGA LA VARIABLE
    if (!encontrado) 
    {
        hombre.trazar();
    }

    if (!ahorcado.vivo) // si NO esta vivo
    {
        // TAREA: Mostrar la palabra entera
        for (var i = 0; i < palabra.length; i++)    // TAREA
        {                                           // TAREA
            espacio[i] = palabra[i];                // TAREA
        };                                          // TAREA
        mostrarPista(espacio);                      // TAREA
    }

}
function mostrarPista(espacio)
{
    // me traigo el contenido de la etiqueta h2 "pista"
    var pista = document.getElementById("pista"); 

    //es donde vamso a almacenar la pista entera _ _ _ _ _ _ _
    var texto = ""; 
    var i;
    var largo = espacio.length;

    for (var i = 0; i < largo; i++) 
    {
        if (espacio[i] != undefined)
        {
            // si la posicion i en espacio tiene algo cargado 
            //entoces carga el contenido de espacio en la posicion i
            texto += espacio[i] + " ";
        }
        else
        {
              //si la posicion i no tiene nada entoces agrega un "_ " a texto
              texto += "_ ";
        }
    }

    // 
    pista.innerText = texto;
    
    var textoSinEspacios = "";
    for (var i = 0; i < texto.length; i++) 
    {
        if (texto[i] != " ") 
        {
            textoSinEspacios[i] += texto[i];
        }
        
    }
    if (textoSinEspacios == palabra) 
    {
        alert("¡¡¡ ENORABUENA , HAS GANADO !!!")
        palabraAleatoria(0,palabras.length); 
        inicio();
    }
}

