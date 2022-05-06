const board = {
    squareWidth: 10,
    squareHeight: 10,
    widthUnits: 20,
    heightUnits: 20,

    squareColor: 'rgb(237, 245, 245)',
    cellColor: 'rgb(227, 227, 70)',
    // width: this.widthUnits * this.squareWidth,
    // height: this.heightUnits * this.squareHeight,

    state: [],
    calc: [],

    initState(w, h) {
        for (let y = 0; y < w; y++) {
            this.state.push([]);
            for (let x = 0; x < h; x++) {
                this.state[y].push(0);
            }
        }
        // console.log(this.state);
    },

    draw() {
        for (let y = 0; y < this.state.length; y++) {
            // this.state.push([]);
            for (let x = 0; x < this.state[y].length; x++) {
                // this.state[y].push(0);
                ctx.fillStyle = this.squareColor;
                ctx.fillRect(
                    x * this.squareWidth,
                    y * this.squareHeight,
                    this.squareWidth - 1,
                    this.squareHeight - 1
                );
                // console.log(
                //     `y: ${y},\t x: ${x},\t value: ${this.state[y][x]} `
                // );
            }
        }
        // --------------------------------------------------------------------
        // draw just an empty board;
        // data array check will be added afterwards.
        // for (let y = 0; y < this.heightUnits; y++) {
        //     for (let x = 0; x < this.widthUnits; x++) {
        //         ctx.fillStyle = 'rgb(222, 222, 222)';
        //         ctx.fillRect(
        //             x * this.squareWidth,
        //             y * this.squareHeight,
        //             this.squareWidth - 1,
        //             this.squareHeight - 1
        //         );
        //     }
        // }
        // --------------------------------------------------------------------
    },

    toggleSquare(x, y) {
        // calculate position of a square in the state array
        x = Math.floor(x / this.squareHeight);
        y = Math.floor(y / this.squareWidth);

        if (board.state[x][y] === 0) {
            board.state[x][y] = 1;
            ctx.fillStyle = this.cellColor;
        } else {
            board.state[x][y] = 0;
            ctx.fillStyle = this.squareColor;
        }

        ctx.fillRect(
            x * this.squareWidth,
            y * this.squareHeight,
            this.squareWidth - 1,
            this.squareHeight - 1
        );
        // console.log(`
        //     y: ${y}
        //     x: ${x}
        //     state: ${this.state[y][x]}
        // `);
    },
};

// board size in px
board.width = board.widthUnits * board.squareWidth;
board.height = board.heightUnits * board.squareHeight;

// div wrapper
const domCanvasDiv = document.querySelector('#canvas');
domCanvasDiv.style.width = board.width + 'px';

// create canvas and style it
const domCanvas = document.createElement('canvas');
domCanvas.setAttribute('width', board.width);
domCanvas.setAttribute('height', board.height);
domCanvas.classList.add('canvas');
// insert canvas in the document
domCanvasDiv.insertAdjacentElement('afterBegin', domCanvas);

// getting context
const ctx = domCanvas.getContext('2d');

// fill the board data array
board.initState(board.widthUnits, board.heightUnits);
// console.log(board.state);

// drawing first board
board.draw();

// just a little debugging
const domShowCoords = document.createElement('div');
domCanvasDiv.insertAdjacentElement('afterEnd', domShowCoords);

// listen to clicks on the board to make square toggle
domCanvas.addEventListener('click', (evt) => {
    domShowCoords.innerText = evt.offsetX + ' : ' + evt.offsetY;
    board.toggleSquare(evt.offsetX, evt.offsetY);
});
