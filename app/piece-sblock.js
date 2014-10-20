var SBlock = function(x, y, size, grid){
  Tetromino.apply(this, arguments);
};

SBlock.prototype = Object.create(Tetromino.prototype);
SBlock.prototype.constructor = SBlock;

SBlock.prototype.position = function(orientation) {
  orientation = orientation || this.orientation;
  if (orientation === 0 || orientation === 2) {
    /*
       x0
      00
     */
    return [{x: this.x, y: this.y},
            {x: (this.x-1), y: this.y+1},
            {x: this.x+1, y: (this.y)},
            {x: (this.x), y: this.y+1}];
  }
  if (orientation === 1 || orientation === 3) {
    /*
      0
      0x
       0
     */
    return [{x: this.x, y: this.y},
            {x: (this.x-1), y: this.y-1},
            {x: this.x-1, y: (this.y)},
            {x: (this.x), y: this.y+1}];
  }
};
