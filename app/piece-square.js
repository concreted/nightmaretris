var Tetromino = require('./tetromino');

var Square = function(x, y, size, grid){
  Tetromino.apply(this, arguments);

};

Square.prototype = Object.create(Tetromino.prototype);
Square.prototype.constructor = Square;

Square.prototype.position = function() {
  return [{x: this.x, y: this.y},
          {x: this.x+1, y: this.y},
          {x: this.x, y: this.y+1},
          {x: this.x+1, y: this.y+1}];
};
Square.prototype.positionDisplay = function() {
  return [{x: this.x * this.size, y: this.y * this.size},
          {x: (this.x+1) * this.size, y: this.y * this.size},
          {x: this.x * this.size, y: (this.y+1) * this.size},
          {x: (this.x+1) * this.size, y: (this.y+1) * this.size}];
};

Square.prototype.checkRight = function() {
  var position = this.position();
}

Square.prototype.checkDown = function() {
  var positions = this.position();
  var bottomPieces = [positions[2], positions[3]];
  var toCheck = [];
  _.each(bottomPieces, function(position) {
    toCheck.push({x: position.x, y: position.y + 1});
  });
  return toCheck;
}

Square.prototype.isClear = function() {
  var position = this.position();
  var bottomPieces = [position[2], position[3]];
  // check if underneath is clear
  //debugger;
  return _.every(bottomPieces, function(pos) {
    return (this.grid[pos.y+1] !== undefined && this.grid[pos.y+1][pos.x] === 0)
  });
};

module.exports = Square;
