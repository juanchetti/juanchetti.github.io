//Insertar imágenes sobre imagen en canvas y controlarla por eventos

var tablero, direccion; 
// direccion es la variable en donde se esta movinedo la tecla  

var teclas ={
	UP:38,	// usando el codigo ASCII del teclado 
	DOWN:40,
	LEFT:37,
	RIGHT:39
}	

var fondo = {
	imagenURL: "fondo.png",
	// Separo con, porque son ítems dentro del objeto fondo
	imagenOK: false

};	

var tifis = {
	x: 100,
	y: 100,
	frenteURL: "diana-frente.png",
	frenteOK: false,
	atrasURL: "diana-atras.png",
	atrasOK: false,
	derURL: "diana-der.png",
	derOK: false,
	izqURL: "diana-izq.png",
	izqOK: false,
	// esta variable o METODO(dentro de objetos) 
	//nos permite controlar que se muestre la imagen una vez cargada.
	velocidad: 50
};

var liz = {
	lizURL: "liz.png",
	lizOK: false,
	x: 300,
	y: 300
}

function inicio ()
{
	var canvas = document.getElementById("campo"); 
	tablero = canvas.getContext("2d");	
	
	fondo.imagen = new Image();
	fondo.imagen.src = fondo.imagenURL;
	fondo.imagen.onload = confirmarFondo; 
	// Cuando cargue la imagen ejecute función confirmarFondo
	
	tifis.frente = new Image();
	tifis.frente.src = tifis.frenteURL;
	tifis.frente.onload = confirmarFrente; 

	tifis.atras = new Image();
	tifis.atras.src = tifis.atrasURL;
	tifis.atras.onload = confirmarAtras; 

	tifis.der = new Image();
	tifis.der.src = tifis.derURL;
	tifis.der.onload = confirmarDer; 

	tifis.izq = new Image();
	tifis.izq.src = tifis.izqURL;
	tifis.izq.onload = confirmarIzq; 

	liz.lizI = new Image();
	liz.lizI.src = liz.lizURL;
	liz.lizI.onload = confirmarLiz;

	document.addEventListener("keydown", teclado);
	// a la funcion teclado le asigno los parametros de
}


function teclado(datos)
{
	var codigo = datos.keyCode;	// guardo el numero de la tecla optrimida
	if (codigo == teclas.UP)
	{
		if (tifis.y > 0 ) 
		{
			tifis.y -= tifis.velocidad;
		};
	};
	if (codigo == teclas.DOWN)
	{
		if (tifis.y < 300) 
		{
			tifis.y += tifis.velocidad;
		};
	};
	if (codigo == teclas.LEFT)
	{
		if (tifis.x > 0) 
		{
			tifis.x -= tifis.velocidad;
		};
	};
	if (codigo == teclas.RIGHT)
	{
		if (tifis.x < 450) 
		{
			tifis.x += tifis.velocidad;
		};
	};

	direccion = codigo;
	dibujar();
}


function confirmarFondo()	
{
	fondo.imagenOK = true;
	dibujar();
}

function confirmarFrente()	
{
	tifis.frenteOK = true;
	dibujar();
}

function confirmarAtras()	
{
	tifis.atrasOK = true;
	dibujar();
}

function confirmarDer()	
{
	tifis.DerOK = true;
	dibujar();
}

function confirmarIzq()	
{
	tifis.IzqOK = true;
	dibujar();
}

function confirmarLiz()	
{
	liz.lizOK = true;
	dibujar();
}

function dibujar()	//aquí voy a guardar todas mis herramientas de dibujo
		// (el fondo, tifis y al enemigo)
{
	

	// Capa 1: Fondo
	if (fondo.imagenOK == true)
	{
		tablero.drawImage(fondo.imagen, 0, 0)
	}; 



	// Capa 2: Liz (Enemigo)
	if (liz.lizOK) 	// no necesito comparar si == true
					// tan solo con poner la variable 
					// si es booleana nos dice si es TRUE O FALSE
	{
		tablero.drawImage( liz.lizI, liz.x, liz.y )
	};
	
	// Capa 3: Tifis
	var tifiDibujo = tifis.frente; 	
	// cuando arranca la tifis la mostramos de frente
	if (tifis.frenteOK && tifis.atrasOK && tifis.der && tifis.izq) 
	// si alguna de las variables es true ya que usamso un And (y)
	{
		if (direccion == teclas.UP)
		{
			tifiDibujo = tifis.atras;
		};
		if (direccion == teclas.DOWN)
		{
			tifiDibujo = tifis.frente;
		};
		if (direccion == teclas.RIGHT)
		{
			tifiDibujo = tifis.der;
		};
		if (direccion == teclas.LEFT)
		{
			tifiDibujo = tifis.izq;
	};
		

		tablero.drawImage( tifiDibujo, tifis.x, tifis.y )
	};

	

}

