

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = $(window).width();
canvas.height = $(window).height();

var die = {
    value: 0
};

var mouse  = {
    x: 0,
    y: 0,
    down: false
};


/* EVENT LISTENERS */
document.addEventListener("touchend", function(e) {
    e.preventDefault();
});

canvas.addEventListener("touchstart", function(e)
{
   //When the user taps the screen
   if(e.clientX != 0) 
      //Roll the die
      die.value = rollDie(6);
      // Alternatively: rollDice(number of dice, number of sides)
      // Alternatively: rollDie(number of sides);
   e.preventDefault();
}, false);

window.addEventListener('mousedown', function (e) {
    mouse.down = true;
});

window.addEventListener('mouseup', function (e) {
    mouse.down = false;
});

window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX - canvas.offsetLeft;
    mouse.y = e.clientY - canvas.offsetTop;
});

function rollDie(sides){
    if(!sides) sides = 6;
    with(Math) return 1 + floor(random() * sides);
 }

function rollDice(number, sides){
   var total = 0;
   while(number-- > 0) total += rollDie(sides);
   return total;
 }
 
 
var update = function() {
    if(mouse.down) {
        die.value = rollDie(6);
    }
}

var render = function() {
    context.fillStyle = '#2196F3';
    context.fillRect(0,0, canvas.width, canvas.height);
    context.fillStyle = 'WHITE';
    
    context.font = '60pt Calibri';
    context.fillText(die.value, canvas.width/2, canvas.height/2);
}


// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	then = now;
    update();
    render();
	requestAnimationFrame(main);
};

var then = Date.now();
main();