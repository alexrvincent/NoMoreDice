
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");


var loc = new drawLoc(0,0);

var numPlayers = 8;
var gridHolder = [];
var spacing = 20/Math.floor(numPlayers/2);

init();

function init(){

	//gridHolder.push(new grid(10,10, 100, 100));
	createGrid();

	ctx.moveTo(0,0);
	for(var i=0; i<10; i++){
		draw();	
	}
}

function drawLoc(x, y){
	this.x = x;
	this.y = y;
}

function draw(){
	for(var i = 0; i < gridHolder.length; i++){
		gridHolder[i].draw(ctx);
	}
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function grid(x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.draw = function(ctx){
		ctx.fillStyle = "#3D3D3D";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.beginPath();
	    ctx.lineWidth = 10/Math.floor(numPlayers/2);
	    ctx.lineCap = "round";
    	ctx.strokeStyle = "Grey";
	    ctx.moveTo(this.x, this.y);
    	ctx.lineTo(this.x+this.width, this.y);
    	ctx.moveTo(this.x+this.width, this.y);
    	ctx.lineTo(this.x+this.width, this.y+this.height);
    	ctx.moveTo(this.x+this.width, this.y+this.height);
    	ctx.lineTo(this.x, this.y+this.height);
    	ctx.moveTo(this.x, this.y+this.height);
    	ctx.lineTo(this.x, this.y);
    	ctx.stroke();
	}
}

function createGrid(){
	if(numPlayers < 4){
		for (var i = 0; i<numPlayers; i++){
				gridHolder.push(new grid(i*c.width/numPlayers + spacing/2, spacing/2, c.width/numPlayers-spacing, c.height-spacing));
			}
	}else if(numPlayers<9){
		for (var i = 0; i<Math.floor(numPlayers/2); i++){
			gridHolder.push(new grid(i*c.width/numPlayers*2 + spacing/2, spacing/2, c.width/numPlayers*2-spacing, c.height/2-spacing));
		}
		for (var i = Math.floor(numPlayers/2); i<numPlayers; i++){
			gridHolder.push(new grid((i-Math.floor(numPlayers/2))*c.width/numPlayers*2+ spacing/2, c.height/2 + spacing/2, c.width/numPlayers*2-spacing, c.height/2-spacing));
		}
	}
}
ctx.stroke();