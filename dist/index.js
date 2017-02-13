

var WIDTH = document.body.clientWidth,
	HEIGHT = document.body.clientHeight,
	RADIUS = Math.floor(WIDTH * 4 / 5 /108) -1,
	TOP = Math.floor(WIDTH / 10),
	LEFT = Math.floor(WIDTH / 10),
	cvs = document.getElementById("canvas"),
	ctx = cvs.getContext("2d"),
	allSeconds = 0,
	seconds = 0,
	minutes = 0,
	hours = 0,
	
	balls = [];
	cvs.width = WIDTH;
	cvs.height = HEIGHT;

function setDate(date){
	return (date.hours.toString().length == 1 ? '0' + hours : date.hours) + ':' +
		   (date.minutes.toString().length == 1 ? '0' + minutes : date.minutes) + ':' +
		   (date.seconds.toString().length == 1 ? '0' + seconds : date.seconds);
}

function getDate(date){

	seconds = date.getSeconds();
	minutes = date.getMinutes();
	hours = date.getHours();
		
	return (hours.toString().length == 1 ? '0' + hours : hours) + ':' +
		   (minutes.toString().length == 1 ? '0' + minutes : minutes) + ':' +
		   (seconds.toString().length == 1 ? '0' + seconds : seconds);
}

function getColor(){
	return '#' + Math.floor(Math.random() * 16581375).toString(16);
}



function renderDigit(x, y, num){
	ctx.fillStyle = 'blue';

	digit[num].forEach(function(value, i){
		value.forEach(function(val, j){
			if(val == 1){
				ctx.beginPath();
				ctx.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
				ctx.closePath();
				ctx.fill();
			}

		})
	})
}

function addballs(x, y, num){

	digit[num].forEach(function(value, i){
		value.forEach(function(val, j){
			if(val == 1){
				balls.push({
					x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
					y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
					g: 1.5 + Math.floor(Math.random() * 10) / 10,
					vx: Math.pow(-1, Math.ceil(Math.random() * 10)) * 4,
					vy: -5,
					color: getColor()
				})
			}

		})
	})
}


function updateBalls(){
	balls.forEach(function(value){
		value.x -= value.vx;
		value.y += value.vy;
		value.vy += value.g;

		if(value.y > HEIGHT){
			value.y = HEIGHT - RADIUS;
			value.vy = - value.vy * 0.75;

		}
		ctx.fillStyle = value.color;
		ctx.beginPath();
		ctx.arc(value.x, value.y, RADIUS, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();
	});

	var cnt = 0;
	for(var i = 0,len = balls.length; i < len; i++){
		if(balls[i].x + RADIUS > 0 &&  balls[i].x -RADIUS < canvas.width){
			balls[cnt++] = balls[i];
		}
	}
	while(balls.length > cnt){
		balls.pop();
	}
}

function render(date){

	ctx.clearRect(0, 0, cvs.width, cvs.height);
	var num = 0;
	for(var i = 0, len = date.length; i < len; i ++){

		var numStr = date[i] == ':' ? 10 : date[i];
		renderDigit(LEFT + num * (RADIUS + 1), TOP, numStr);
		num = date[i] == ':' ? num + 9 : num + 15; 
	}

	// renderDigit(LEFT, TOP, date[0], ctx);
	// renderDigit(LEFT + 15 * (RADIUS + 1), TOP,date[1]);
	// renderDigit(LEFT + 30 * (RADIUS + 1), TOP, 10, ctx);
	// renderDigit(LEFT + 39 * (RADIUS + 1), TOP, date[3]);
	// renderDigit(LEFT + 54 * (RADIUS + 1), TOP,date[4]);
	// renderDigit(LEFT + 69 * (RADIUS + 1), TOP, 10);
	// renderDigit(LEFT + 78 * (RADIUS + 1), TOP, date[6]);
	// renderDigit(LEFT + 93 * (RADIUS + 1), TOP,date[7]);
}

setInterval(function(){

	var currentTime = new Date(),
		currentTimeNum = getDate(currentTime),
		nextTimeNum = getDate(new Date(currentTime.getTime() + 100)),
		num = 0;
		// console.log(currentTimeNum,nextTimeNum)


	
	render(currentTimeNum);
	updateBalls();
	for(var i = 0, len = currentTimeNum.length; i < len; i++){
		if(currentTimeNum[i] != nextTimeNum[i]){
			addballs(LEFT + num * (RADIUS + 1), TOP, currentTimeNum[i]);
		}
		num = currentTimeNum[i] == ':' ? num + 9 : num + 15; 
	}


},50)