const board = {
    squareWidth: 10,
    squareHeight: 10,
    widthUnits: 50,
    heightUnits: 50,
    // width: this.widthUnits * this.squareWidth,
    // height: this.heightUnits * this.squareHeight,

    draw() {
        // draw just an empty board;
        // data array check will be added afterwards.
        for (let y = 0; y < this.heightUnits; y++) {
            for (let x = 0; x < this.widthUnits; x++) {
                ctx.fillStyle = 'rgb(222, 222, 222)';
                ctx.fillRect(
                    x * this.squareWidth,
                    y * this.squareHeight,
                    this.squareWidth - 1,
                    this.squareHeight - 1
                );
            }
        }
    },

    toggleSquare(x, y) {
        x = Math.floor(x / this.squareHeight);
        y = Math.floor(y / this.squareWidth);

        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(
            x * this.squareWidth,
            y * this.squareHeight,
            this.squareWidth - 1,
            this.squareHeight - 1
        );
        console.log(`
            y: ${y}
            x: ${x}
        `);
    },
};

board.width = board.widthUnits * board.squareWidth;
board.height = board.heightUnits * board.squareHeight;

const domCanvasDiv = document.querySelector('#canvas');
domCanvasDiv.style.width = board.width + 'px';

const domCanvas = document.createElement('canvas');
domCanvas.setAttribute('width', board.width);
domCanvas.setAttribute('height', board.height);
domCanvas.classList.add('canvas');

domCanvasDiv.insertAdjacentElement('afterBegin', domCanvas);

const ctx = domCanvas.getContext('2d');

board.draw();

// boardIt.fillRect;
// boardIt.fillRect(0, 0, 9, 9);

const domShowCoords = document.createElement('div');

domCanvasDiv.insertAdjacentElement('afterEnd', domShowCoords);

domCanvas.addEventListener('click', (evt) => {
    domShowCoords.innerText = evt.offsetX + ' : ' + evt.offsetY;
    board.toggleSquare(evt.offsetX, evt.offsetY);
});
