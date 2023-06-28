let hor = 0;
let vert = -1;
let WIDTH = 21
let HEIGHT = 21
let add = false;
let isDead = false
let level = document.querySelector("#level") 
const scorespan = document.querySelector(".score") 
const scorespan_g=document.querySelector(".score_g")
let score = 0
const gameov = document.querySelector('.game_over')
const win= document.querySelector('.win')
const game_wind = document.querySelector(".wind")
const restart = document.querySelector('#restart')
const win_restart = document.querySelector('.restart')
const start = document.querySelector('.start')
const stop = document.querySelector('.stop')

window.addEventListener('keydown', e => {
  if (e.code === 'KeyW' && vert === 0) { vert = -1; hor = 0; }
  if (e.code === 'KeyS' && vert === 0) { vert = 1; hor = 0; }

  if (e.code === 'KeyA' && hor === 0) { hor = -1; vert = 0; }
  if (e.code === 'KeyD' && hor === 0) { hor = 1; vert = 0; }


});

restart.addEventListener('click', (e) =>{
	location.reload();
})
stop.addEventListener('click', (e) =>{
	location.reload();
})
win_restart.addEventListener('click', (e) =>{
	location.reload();
})
class BodyPart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lx = x;
    this.ly = y;
  }
}

class Snake {
  constructor(x, y, size) {
    this.parts = [new BodyPart(x, y)];
    this.head = this.parts[0];
    this.tail = this.parts[0];
    this.size = size;
  }
  
  move() {
    let newX = this.head.x + hor;
    let newY = this.head.y + vert;

    if (newX === this.size) newX = 0;
    else if (newX === -1) newX = this.size - 1;
    else if (newY === this.size) newY = 0;
    else if (newY === -1) newY = this.size - 1;

    for (let part of this.parts) {
      part.lx = part.x;
      part.ly = part.y;

      part.x = newX;
      part.y = newY;

      newX = part.lx;
      newY = part.ly;
    }
  }

  addPart() {
    let t = new BodyPart(this.tail.lx, this.tail.ly);
    this.tail = t;
    this.parts.push(t);
  }

 
}

class Field {

  constructor(size, cells, score) {
    this.size = size;
    this.snake = new Snake(Math.floor(size / 2), Math.floor(size / 2), size);
    this.cells = cells;
    this.apple = new Apple(Math.round(Math.random() * WIDTH), Math.round((Math.random() * HEIGHT), size))
    this.apples = [];
    this.score = score
    setInterval(this.createApple.bind(this), 3000);
    this.draw();
    
  }

  
  createApple() {
  	
    // случайные координаты
    this.x = Math.round(Math.random() * WIDTH)
    this.y = Math.round(Math.random() * WIDTH)
    // создаешь яблоко 
    this.apples.push(new ApplePart(this.x,  this.y)) 
  }  
  

  update() {
    this.snake.move();
    // for apples {if apple...}
    for (let i = 0; i < this.apples.length; i += 1){
    	if(this.apples[i].x === this.snake.head.x && this.apples[i].y === this.snake.head.y){
      	add = true;    
        this.snake.addPart();
        score +=1;
        scorespan.innerHTML = score ;
        scorespan_g.innerHTML = score ;
       /* document.getElementById("#score").innerText = `$${score}`;*/
      //  delete this.apples[i].x 
      //  delete this.apples[i].y
        this.apples.splice(i, 1)
     
       
       
      }
      
      }
    for(let i = 1; i < this.snake.parts.length; i += 1){
    	if(this.snake.parts[0].x === this.snake.parts[i].x && this.snake.parts[0].y=== this.snake.parts[i].y){
      	
        gameov.classList.remove("hidden")
        
        
        
      }
    
    }
    
    if(score === 10){
    	win.classList.remove("hidden")
    }
    
    // если столкнулся с яблоком:
    //                удаляешь яблоко
    //                увеличиваешь змейку

   
  }

  draw() {
    // for apples draw apple
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.cells[i][j].className ='cell';
      }
    }
    this.snake.parts.forEach(part => {
      this.cells[part.y][part.x].classList.add('cell-body');
    });
   for (let i = 0; i < this.apples.length; i += 1) {
  	const apple = this.apples[i];
   
    if (this.cells[apple.y] && this.cells[apple.y][apple.x] && this.cells[apple.y][apple.x] != this.snake.parts ){
    		this.cells[apple.y][apple.x].classList.add('cell-apple');
      	
    }}

    
  	
      
  }


  do() {
    this.update();
    this.draw()
  }
}

class Apple{
  constructor(x, y) {
    this.apples = [new ApplePart(x, y)];
    this.apple = this.apples[0]
   
  }
 

}



class ApplePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}




