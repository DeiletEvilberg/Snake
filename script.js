const SIZE = 21;


const gameDiv = document.querySelector('.game');

let temp = '';
for (let i = 0; i < SIZE * SIZE; i++) {
  temp += '<div class="cell"></div>';
}
gameDiv.innerHTML = temp;

let cells = [];
for (let i = 0; i < SIZE; i++) {
  let temp = [];
  for (let j = 0; j < SIZE; j++) {
    temp.push(gameDiv.children[SIZE * i + j]);
  }
  cells.push(temp);
}
let field = new Field(SIZE, cells);
setInterval(() => {
  field.do();
}, 100);