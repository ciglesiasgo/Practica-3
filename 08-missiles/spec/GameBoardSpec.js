describe("Clase GameBoardSpec", function(){

    var canvas, ctx;

    beforeEach(function(){
	loadFixtures('index.html');
	
	canvas = $('#game')[0];
	expect(canvas).toExist();

	ctx = canvas.getContext('2d');
	expect(ctx).toBeDefined();

    });

    it("GameBoard.add()", function(){

	var board = new GameBoard();
	spyOn(board, "add");

	obj=board.add(new PlayerShip());

	expect(board.add).toHaveBeenCalled();
	expect(board.objects[0]).toEqual(obj);
	//expect(board.objects.length).toBe(1);
	
    });

    it("GameBoard.finalizeRemoved()", function(){

	var board = new GameBoard();
	spyOn(board, "add");

	obj=board.add(new PlayerShip());

	spyOn(board, "remove");
	spyOn(board, "resetRemoved");
	spyOn(board, "finalizeRemoved");
	
	board.remove(board);
	board.resetRemoved();
	board.finalizeRemoved();

	expect(board.remove).toHaveBeenCalled();
	expect(board.resetRemoved).toHaveBeenCalled();
	expect(board.finalizeRemoved).toHaveBeenCalled();

	expect(board.objects[0]).toEqual(undefined);
	
	
    });

   it("GameBoard.step()", function(){

	var board = new GameBoard();

	spyOn(board, "step");
	
	board.step();

	expect(board.step).toHaveBeenCalled();

    });

    it("GameBoard.draw()", function(){

	var board = new GameBoard();

	spyOn(board, "draw");

	board.draw();
	
	expect(board.draw).toHaveBeenCalled();

    });

    it("GameBoard.overlap()", function(){
	var board= new GameBoard();

	var obj1=new function(){ 
	    this.w=1;
	    this.h=1;
	    this.x=1;
	    this.y=1;
	}

	var obj2=new function(){ 
	    this.w=1;
	    this.h=1;
	    this.x=1;
	    this.y=1;
	}

	var obj3=new function(){ 
	    this.w=2;
	    this.h=2;
	    this.x=200;
	    this.y=200;
	}

	board.add(obj1);
	board.add(obj2);
	board.add(obj3);

	overlap1=board.overlap(obj1,obj2);
	overlap2=board.overlap(obj1,obj3);

	expect(overlap1).toEqual(true);
	expect(overlap2).toEqual(false);
    });

    it("GameBoard.collide()", function(){

	var board= new GameBoard();

	var obj1=new function(){ 
	    this.w=1;
	    this.h=1;
	    this.x=1;
	    this.y=1;
	}

	var obj2=new function(){ 
	    this.w=1;
	    this.h=1;
	    this.x=1;
	    this.y=1;
	}

	board.add(obj1);
	board.add(obj2);

	collide1=board.collide(obj1);

	expect(collide1).toBe(obj2);

    });

});









































/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colecci�n de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se a�aden como tableros independientes para que Game pueda
  ejecutar sus m�todos step() y draw() peri�dicamente desde su m�todo
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre s�. Aunque se a�adiesen nuevos tableros para los
  misiles y para los enemigos, resulta dif�cil con esta arquitectura
  pensar en c�mo podr�a por ejemplo detectarse la colisi�n de una nave
  enemiga con la nave del jugador, o c�mo podr�a detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.


  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: dise�ar e implementar un mecanismo que permita gestionar
  la interacci�n entre los elementos del juego. Para ello se dise�ar�
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego ser�n las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard ser� un board m�s, por lo que deber� ofrecer los
  m�todos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos m�todos.

  Este prototipo no a�ade funcionalidad nueva a la que ofrec�a el
  prototipo 06.


  Especificaci�n: GameBoard debe

  - mantener una colecci�n a la que se pueden a�adir y de la que se
    pueden eliminar sprites como nave enemiga, misil, nave del
    jugador, explosi�n, etc.

  - interacci�n con Game: cuando Game llame a los m�todos step() y
    draw() de un GameBoard que haya sido a�adido como un board a Game,
    GameBoard debe ocuparse de que se ejecuten los m�todos step() y
    draw() de todos los objetos que contenga

  - debe ofrecer la posibilidad de detectar la colisi�n entre
    objetos. Un objeto sprite almacenado en GameBoard debe poder
    detectar si ha colisionado con otro objeto del mismo
    GameBoard. Los misiles disparados por la nave del jugador deber�n
    poder detectar gracias a esta funcionalidad ofrecida por GameBoard
    cu�ndo han colisionado con una nave enemiga; una nave enemiga debe
    poder detectar si ha colisionado con la nave del jugador; un misil
    disparado por la nave enemiga debe poder detectar si ha
    colisionado con la nave del jugador. Para ello es necesario que se
    pueda identificar de qu� tipo es cada objeto sprite almacenado en
    el tablero de juegos, pues cada objeto s�lo quiere comprobar si ha
    colisionado con objetos de cierto tipo, no con todos los objetos.

*/
