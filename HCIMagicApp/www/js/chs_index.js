var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var counter = 0;

var p1 = {
   minute: 0,
   second: 0,
   millisecond: 0,
   count_down: false
};

var p2 = {
   minute: 0,
   second: 0,
   millisecond: 0,
   count_down: false
};

var chess_template = new Image();
var chess_template2 = new Image();
var chess_template3 = new Image();

chess_template.src = "img/chs_temp.png";
chess_template2.src = "img/chs_temp2.png";
chess_template3.src = "img/chs_temp3.png";

var mouse  = {
    x: 0,
    y: 0,
    down: false
};

canvas.width = $(window).width();
canvas.height = $(window).height();

document.addEventListener("touchend", function(e) {
    e.preventDefault();
});

canvas.addEventListener("touchstart", function(e)
        {
            //var touchEvent = e.originalEvent.changedTouches[0];
            
            ++counter;
            if(e.clientX != 0) update_turn();
            //update_turn();
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


var update = function() {
    if(mouse.down) {
        ++counter;
 
        //Updates on touch/mouse press
        update_turn();
        
    }
    update_time();
}


var render = function() {
    context.fillStyle = '#00E676';
    context.fillRect(0,0, canvas.width, canvas.height);
    context.fillStyle = 'WHITE';
    //context.font = '14pt Calibri';
    //context.fillText("Counter: " + counter, canvas.width/2+50, canvas.height/2+10);
    
    if(p1.count_down) {
        context.drawImage(chess_template, 
                        canvas.width/2 - chess_template.width/2, 
                        canvas.height/2- chess_template.height/2
                     );
    }
    
    else if (p2.count_down) {
        context.drawImage(chess_template2, 
                        canvas.width/2 - chess_template.width/2, 
                        canvas.height/2- chess_template.height/2
                     );
    
    }
    else {
    context.drawImage(chess_template3, 
                        canvas.width/2 - chess_template.width/2, 
                        canvas.height/2- chess_template.height/2
                     );
    }
    context.font = '60pt Calibri';
    print_time(p1.millisecond,p1.second,p1.minute, canvas.width/2-97, canvas.height/2+215);
    context.save();
    context.rotate(Math.PI);
    print_time(p2.millisecond,p2.second,p2.minute, canvas.width/2-460, canvas.height/2-350);
    context.restore()
}

function print_mouse() {
  console.log(canvas.width/2, canvas.height/2);
  console.log(mouse.x, mouse.y);
}

function print_time(ms,s,m, x, y) {
    if(m < 10 && s < 10) context.fillText("0"+m+":0"+s, x, y); 
    else if(m < 10 && s >= 10) context.fillText("0"+m+":"+s, x, y);    
    else if(m >= 10 && s < 10) context.fillText(m+":0" + s, x, y);
    else if(m >= 10 && s >= 10) context.fillText(m+":" + s, x, y);
}

function update_turn(){
   if(p1.count_down == false && p2.count_down == false)
   {
        p1.count_down = true;
        return;
   }
   if(p1.count_down) 
   {
       p2.count_down = true;
       p1.count_down = false;
   }
   else if(p2.count_down) 
   {
      p1.count_down = true;
      p2.count_down = false;
   }
}

function update_time() {
   if(p1.count_down){
        ++p1.millisecond;
    }
    else if(p2.count_down)
        ++p2.millisecond;
    
    
    if(p1.millisecond == 60){
        p1.millisecond = 0;
        ++p1.second;
    }
    
    if(p1.second == 60){
        p1.second = 0;
        ++p1.minute; 
    }
    
    if(p2.millisecond == 60){
        p2.millisecond = 0;
        ++p2.second;
    }
    
    if(p2.second == 60){
        p2.second = 0;
        ++p2.minute; 
    }
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