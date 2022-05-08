const board = {
    squareWidth: 10,
    squareHeight: 10,
    widthUnits: 80,
    heightUnits: 80,

    squareColor: 'rgb(208, 236, 253)',
    cellColor: 'rgb(194, 44, 22)',
    // width: this.widthUnits * this.squareWidth,
    // height: this.heightUnits * this.squareHeight,

    state: [],
    stateNext: [],

    rules: {
        born: [3],
        lives: [2, 3],
        dies: [0, 1, 4, 5, 6, 7, 8],
        check(cell, neighbours) {
            const isBorn = this.born.includes(neighbours);
            const doesLive = this.lives.includes(neighbours);
            // const doesDie = this.dies.Includes(neighbours);
            // if (!cell && born) {
            //     return 1;
            // }
            // if (cell && lives) {
            //     return 1;
            // }
            return +((!cell && isBorn) || (cell && doesLive)) || 0;
        },
    },

    initState(w, h) {
        for (let y = 0; y < w; y++) {
            this.state.push([]);
            for (let x = 0; x < h; x++) {
                this.state[y].push(0);
            }
        }
        // console.log(this.state);
    },

    initArray(w, h) {
        const array = [];
        for (let y = 0; y < w; y++) {
            const tempArray = [];
            for (let x = 0; x < h; x++) {
                tempArray.push(0);
            }
            array.push(tempArray);
        }
        return array;
        // console.log(this.state);
    },

    copyArray(array) {
        // console.table(array);
        const result = [];
        // array.forEach((el, index) => {
        //     console.log(el);
        //     // result.push(el);
        // });
        // console.table(result);
        for (let i = 0; i < array.length; i++) {
            result[i] = array[i].slice();
        }
        return result;
    },

    drawArray(array) {
        for (let y = 0; y < array.length; y++) {
            // this.state.push([]);
            for (let x = 0; x < array[y].length; x++) {
                // this.state[y].push(0);

                if (array[y][x] === 0) {
                    // this.state[y][x] = 1;
                    ctx.fillStyle = this.squareColor;
                } else {
                    // this.state[y][x] = 0;
                    ctx.fillStyle = this.cellColor;
                }

                ctx.fillRect(
                    x * this.squareWidth,
                    y * this.squareHeight,
                    this.squareWidth - 1,
                    this.squareHeight - 1
                );

                // from toggleRect

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
        x = Math.floor(x / this.squareWidth);
        y = Math.floor(y / this.squareHeight);

        if (this.state[y][x] === 0) {
            this.state[y][x] = 1;
            ctx.fillStyle = this.cellColor;
        } else {
            this.state[y][x] = 0;
            ctx.fillStyle = this.squareColor;
        }

        ctx.fillRect(
            x * this.squareWidth,
            y * this.squareHeight,
            this.squareWidth - 1,
            this.squareHeight - 1
        );
        // this.countNeighbours(x, y);
        // console.log(`
        //     y: ${y}
        //     x: ${x}
        //     state: ${this.state[y][x]}
        // `);
    },

    countNeighbours(cellX, cellY) {
        // cellX -= 1;
        // cellY -= 1;
        let result = -this.state[cellY][cellX];
        // console.log(`neighbours result before: ${result}`);
        // console.log('this: ', this);
        // console.log(`countNeighbours:\t cellY: ${cellY}, cellX: ${cellX}`);
        let tY, tX;
        for (let y = cellY - 1; y <= cellY + 1; y++) {
            tY = y;
            if (y === -1) {
                tY = this.state.length - 1;
            } else if (y === this.state.length) {
                tY = 0;
            }
            for (let x = cellX - 1; x <= cellX + 1; x++) {
                tX = x;
                if (x === -1) {
                    tX = this.state[tY].length - 1;
                } else if (x === this.state[tY].length) {
                    tX = 0;
                }
                // console.log(`\t tY: ${tY}, tX: ${tX}:\t ${this.state[tY][tX]}`);
                if (this.state[tY][tX]) {
                    result++;
                }
            }
            // console.log('\n');
        }
        // console.log(`\r result: ${result} \n\t------------------`);
        // console.log(`neighbours result final: ${result}`);
        return result;
    },

    nextStep(evt) {
        this.stateNext = this.initArray(board.widthUnits, board.heightUnits);

        for (let idY = 0; idY < this.state.length; idY++) {
            // console.log(`idY: ${idY}, this.state[idY]: ${this.state[idY]}`);
            for (let idX = 0; idX < this.state[idY].length; idX++) {
                // console.log(
                //     `\t idX: ${idX}, this.state[idY][idX]: ${this.state[idY][idX]}`
                // );
                // console.log(`${this.state[idY][idX]}`);
                // console.log(
                //     `el [${idY}][${idX}] neighbours: ${this.countNeighbours(
                //         idX,
                //         idY
                //     )}`
                // );
                // if (countNeighbours(idX, idY  ) {
                //     this.stateNext[idX][idY] === 2
                // }
                // console.log(
                //     `[${idY}][${idX}]: ${
                //         this.state[idY][idX]
                //     } has ${this.countNeighbours(idX, idY)} neighbours`
                // );
                //
                console.log(
                    `rules for cell [${idY}][${idX}]:\t state: ${
                        this.state[idY][idX]
                    },\t neighbs: ${this.countNeighbours(
                        idX,
                        idY
                    )},\t next: ${this.rules.check(
                        this.state[idY][idX],
                        this.countNeighbours(idX, idY)
                    )}`
                );

                this.stateNext[idY][idX] = this.rules.check(
                    this.state[idY][idX],
                    this.countNeighbours(idX, idY)
                );
            }
        }

        // console.table('copied array', this.copyArray(...this.stateNext));
        // this.state = this.stateNext
        this.state = this.copyArray(this.stateNext);
        // console.table('this.state: ', this.state);
        this.drawArray(this.state);
        // console.table(this.stateNext);
        // console.table
        // this.drawArray(this.state);

        // console.log(evt);
        // console.log('this: ', this);
        // console.log(this.state);
        // this.state.forEach((elY, idxY) => {
        //     console.log(this.state);
        //     this.state[elY].forEach((elX, idxX) => {
        //         console.log(
        //             `\t\t state[${index}][${ind}] value is: ${this.state[index][ind]}`
        //         );
        //     });
        // });
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

domButtonNext = document.querySelector('#next');
domButtonNext.addEventListener('click', () => board.nextStep());
