//Insertar imágenes sobre imagen en canvas y controlarla por eventos

var tablero, direccion, contador=0;
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

var fondo = {		// creo un objeto llamado fondo
	imagenURL: "fondo.png",
	// Separo con, porque son ítems dentro del objeto
	imagenOK: false

};	

var tifis = {		// creo un objeto llamado tifis
	x: 100,
	y: 100,
	
	URL:  ["diana-frente.png","diana-atras.png","diana-der.png","diana-izq.png"],
	// Array de imágenes de Tifis
	//0-FRENTE	1-ATRAS	2-DERECHA	3-IZQUIERDA
	//OK: false,	
	OK: [false,false,false,false],

	// Uso una sola variable de confirmación de carga 
	// para las 4 imágenes de tifis
	imagen: [0,0,0,0],
	velocidad: 50
};

var liz = {		// creo un objeto llamado liz
	lizURL: "liz.png",
	lizOK: false,
	x: 300,
	y: 300
};



function inicio ()
{
	var canvas = document.getElementById("campo"); 
	tablero = canvas.getContext("2d");	
	
	fondo.imagen = new Image();
	fondo.imagen.src = fondo.imagenURL;
	fondo.imagen.onload = confirmarFondo; 
	// Cuando cargue la imagen ejecute función confirmar Fondo
	
	for (var i = 0; i <= 3; i++) 
	{
		tifis.imagen[i] = new Image();
		tifis.imagen[i].src = tifis.URL[i];
		tifis.imagen[i].onload = confirmarImagenesTifis(i); 
		// Uso una sola variable de confirmación de carga 
		// para las 4 imágenes de tifis
	};
	
	

	liz.lizI = new Image();
	liz.lizI.src = liz.lizURL;
	liz.lizI.onload = confirmarLiz;

	document.addEventListener("keydown", teclado);
	// a la función teclado le asigno los parámetros de


}

function confirmarImagenesTifis(n)	
{
	console.log("puede funcionar!!" , n);
	//contador++	// cuento las 4 imágenes que deben cargar 
	//para poder dar ok al control de carga de imágenes de tifis
	//if (contador == 3) {tifis.OK = true;};
	tifis.OK[n] = true;
	dibujar();
}


function confirmarFondo()	
{
	fondo.imagenOK = true;
	dibujar();
}

function confirmarLiz()	
{
	liz.lizOK = true;
	dibujar();
}

function teclado(datos)
{

	var codigo = datos.keyCode;	// guardo el numero de la tecla optrimida
	
		if (codigo == teclas.UP)
		{
			if (tifis.y > 0 ) 
			{
				if (campo[(tifis.y-50)/50][(tifis.x)/50]) 
				{
					tifis.y -= tifis.velocidad;
				};
			};
		};
		if (codigo == teclas.DOWN)
		{
			if (tifis.y < 450) 
			{
				if (campo[(tifis.y+50)/50][(tifis.x)/50]) 
				{
					tifis.y += tifis.velocidad;
				};
			};
		};
		if (codigo == teclas.LEFT)
		{
			if (tifis.x > 0) 
			{
				if (campo[(tifis.y)/50][(tifis.x-50)/50]) 
				{
					tifis.x -= tifis.velocidad;
				};
			};
		};
		if (codigo == teclas.RIGHT)
		{
			if (tifis.x < 450) 
			{	
				if (campo[(tifis.y)/50][(tifis.x+50)/50]) 
				{
					tifis.x += tifis.velocidad;
				};
			};
		};
	
	direccion = codigo;
	dibujar();
}

function dibujar()	//aquí voy a guardar todas mis herramientas de dibujo
		// (el fondo, tifis y al enemigo)
{
	// Capa 1: Fondo
	if (fondo.imagenOK)	{	tablero.drawImage(fondo.imagen, 0, 0)	}; 

	// Capa 2: Liz (Enemigo)
	if (liz.lizOK) 	{	tablero.drawImage( liz.lizI, liz.x, liz.y )	};
	
	// Capa 3: Tifis
	var tifiDibujo = tifis.imagen[0]; 	
	// cuando arranca la tifis la mostramos de frente
	if (tifis.OK[0] && tifis.OK[1] && tifis.OK[2] && tifis.OK[3]) 
	//si todoas las tifis son == true (no necesito expecificarlo, 
	//ya que esta implisito)
	{
		if (direccion == teclas.UP)		{	tifiDibujo = tifis.imagen[1];	};
		if (direccion == teclas.DOWN)	{	tifiDibujo = tifis.imagen[0];	};		
		if (direccion == teclas.RIGHT)	{	tifiDibujo = tifis.imagen[2];	};
		if (direccion == teclas.LEFT)	{	tifiDibujo = tifis.imagen[3];	};
		
		tablero.drawImage( tifiDibujo, tifis.x, tifis.y )
	};

}
