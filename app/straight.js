var Straight = function(x, y, size, grid){
  Tetromino.apply(this, arguments);
};

Straight.prototype = Object.create(Tetromino.prototype);
Straight.prototype.constructor = Straight;

Straight.prototype.position = function(orientation) {
  orientation = orientation || this.orientation;
  if (orientation === 0 || orientation === 2) {
    /*
       0x00
        
     */
    return [{x: this.x, y: this.y},
            {x: (this.x-1), y: this.y},
            {x: this.x+1, y: (this.y)},
            {x: (this.x+2), y: this.y}];
  }
  if (orientation === 1 || orientation === 3) {
    /*
     0
     x
     0
     0
     */
    return [{x: this.x, y: this.y},
            {x: (this.x), y: this.y+1},
            {x: this.x, y: (this.y+2)},
            {x: (this.x), y: this.y-1}];
  }
};
