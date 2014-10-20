var RightL = function(x, y, size, grid){
  Tetromino.apply(this, arguments);
};

RightL.prototype = Object.create(Tetromino.prototype);
RightL.prototype.constructor = RightL;

RightL.prototype.position = function(orientation) {
  orientation = orientation || this.orientation;
  if (orientation === 0) {
    return [{x: this.x, y: this.y},
            {x: (this.x-1), y: this.y},
            {x: this.x-1, y: (this.y+1)},
            {x: (this.x+1), y: this.y}];
  }
  if (orientation === 1) {
    return [{x: this.x, y: this.y},
            {x: (this.x-1), y: this.y-1},
            {x: this.x, y: (this.y+1)},
            {x: (this.x), y: this.y-1}];
  }
  if (orientation === 2) {
    return [{x: this.x, y: this.y},
            {x: (this.x-1), y: this.y},
            {x: this.x+1, y: (this.y-1)},
            {x: (this.x+1), y: this.y}];
  }
  if (orientation === 3) {
    return [{x: this.x, y: this.y},
            {x: (this.x), y: this.y-1},
            {x: this.x, y: (this.y+1)},
            {x: (this.x+1), y: this.y+1}];
  }
};
