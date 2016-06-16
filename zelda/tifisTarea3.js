//Insertar imágenes sobre imagen en canvas y controlarla por eventos

var tablero, direccion;
// Dirección es la variable en donde se esta moviendo la tecla  

// Esto es la matriz de movimientos permitido según los obstáculos del mapa
		/*Eje y 		 0 1 2 3 4 5 6 7 8 9 */
	var campo = [/*0*/	[1,1,1,1,0,1,1,1,1,1],
				 /*1*/	[1,1,1,1,0,1,1,1,1,1],
				 /*2*/	[1,1,1,1,0,1,1,1,1,1],
				 /*3*/	[1,1,1,1,0,1,1,1,1,1],
		/*Eje x*//*4*/	[0,0,0,1,0,1,1,1,1,1],
				 /*5*/	[1,1,1,1,1,1,1,1,1,1],
				 /*6*/	[1,1,1,1,1,1,1,1,1,1],
				 /*7*/	[1,1,1,0,0,0,0,0,0,0],
				 /*8*/	[1,1,1,1,1,1,1,1,1,1],
				 /*9*/	[1,1,1,1,1,1,1,1,1,1]
				 ];

var teclas ={	// creo un objeto llamado tecla
	UP:38,	// usando el código ASCII del teclado 
	DOWN:40,
	LEFT:37,
	RIGHT:39
};	



var imagenes = {		
	x: [0,300,100,100,100,100],
	y: [0,300,100,100,100,100],
	URL:  ["fondo.png","liz.png","diana-frente.png","diana-atras.png","diana-der.png","diana-izq.png"],
	// Array de imágenes de fodo, diana y Tifis en sus distintos angulos
	//		0-FONDO 	1-LIZ	DIANA 2-FRENTE 			3-ATRAS			4-DERECHA		5-IZQUIERDA
		
	OK: [false,false,false,false,false,false],
	imagen: [0,0,0,0,0,0],
	velocidad: [0,0,50,50,50,50]
};


function inicio ()
{
	var canvas = document.getElementById("campo"); 
	tablero = canvas.getContext("2d");	
		
	for (var i = 0; i <= 5; i++) 
	{
		imagenes.imagen[i] = new Image();
		imagenes.imagen[i].src = imagenes.URL[i];
		imagenes.imagen[i].onload = confirmarImagenes(i); 
		// Uso una sola variable de confirmación de carga 
		// para las 4 imágenes de tifis
	};
	
	
	document.addEventListener("keydown", teclado);
	// a la función teclado le asigno los parámetros de


}

function confirmarImagenes(n)	
{
	imagenes.OK[n] = true;
	dibujar();
}

function teclado(datos)
{
	var codigo = datos.keyCode;	// guardo el numero de la tecla optrimida
	for (var i = 2; i <= 5; i++) {
		imagenes.OK[i] = false;
	};
	
		if (codigo == teclas.UP)
		{
			imagenes.OK[3] = true;
			if (imagenes.y[2] > 0 ) 
			{
				if (campo[(imagenes.y[2]-50)/50][(imagenes.x[2])/50]) 
				{
					imagenes.y -= imagenes.velocidad[2];
				};
			};
		};
		if (codigo == teclas.DOWN)
		{
			imagenes.OK[2] = true;
			if (imagenes.y[2] < 450) 
			{
				if (campo[(imagenes.y[2]+50)/50][(imagenes.x[2])/50]) 
				{
					imagenes.y[2] += imagenes.velocidad[2];
				};
			};
		};
		if (codigo == teclas.LEFT)
		{
			imagenes.OK[5] = true;
			if (imagenes.x[2]> 0) 
			{
				if (campo[(imagenes.y[2])/50][(imagenes.x[2]-50)/50]) 
				{
					imagenes.x[2] -= imagenes.velocidad[2];
				};
			};
		};
		if (codigo == teclas.RIGHT)
		{
			imagenes.OK[4] = true;
			if (imagenes.x[2] < 450) 
			{	
				if (campo[(imagenes.y[2])/50][(imagenes.x[2]+50)/50]) 
				{
					imagenes.x[2] += imagenes.velocidad[2];
				};
			};
		};

	direccion = codigo;
	dibujar();
}

function dibujar()	//aquí voy a guardar todas mis herramientas de dibujo
		// (el fondo, tifis y al enemigo)
{
	for (var i = 0; i <=5; i++) 
	{
		if (imagenes.OK[i])	// == true , esto es inplisito	
		{	
			tablero.drawImage( imagenes.imagen[i] , imagenes.imagen[i].x , imagenes.imagen[i].y );	
		}; 
	};

}
