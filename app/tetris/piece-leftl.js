var Tetromino = require('./tetromino');

var LeftL = function(x, y, size, grid){
  Tetromino.apply(this, arguments);
};

LeftL.prototype = Object.create(Tetromino.prototype);
LeftL.prototype.constructor = LeftL;

LeftL.prototype.position = function(orientation) {
  orientation = orientation || this.orientation;
  if (orientation === 0) {
    /*
      000
        0
     */
    return [{x: this.x, y: this.y},
            {x: (this.x-1), y: this.y},
            {x: this.x+1, y: (this.y+1)},
            {x: (this.x+1), y: this.y}];
  }
  if (orientation === 1) {
    /*
      0
      0
     00
     */
    return [{x: this.x, y: this.y},
            {x: (this.x-1), y: this.y+1},
            {x: this.x, y: (this.y+1)},
            {x: (this.x), y: this.y-1}];
  }
  if (orientation === 2) {
    /*
      0
      000
     */
    return [{x: this.x, y: this.y},
            {x: (this.x-1), y: this.y},
            {x: this.x-1, y: (this.y-1)},
            {x: (this.x+1), y: this.y}];
  }
  if (orientation === 3) {
    /*
      00
      0
      0
      */
    return [{x: this.x, y: this.y},
            {x: (this.x), y: this.y-1},
            {x: this.x, y: (this.y+1)},
            {x: (this.x+1), y: this.y-1}];
  }
};

module.exports = LeftL;
