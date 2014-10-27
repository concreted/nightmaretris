var Tetromino = function(x, y, size, grid) {
  this.size = size;
  this.grid = grid;
  this.x = x;
  this.y = y;
  this.orientation = 0;
};

Tetromino.prototype.positionDisplay = function() {
  var currentPositions = this.position();
  var displayPositions = [];

  for (var i = 0; i < currentPositions.length; i++) {
    var currentPos = currentPositions[i];
    var pos = {};
    pos.x = currentPos.x * this.size;
    pos.y = currentPos.y * this.size;
    displayPositions.push(pos);
  }

  return displayPositions;
};

// checks grid, clears old active piece location, draws new active piece location
Tetromino.prototype.move = function(direction) {
  var moved = false;

  this.removeFromGrid();

  //debugger;
  if (direction === 'down' && this.grid.isClear(this.checkDown())) {
    this.y++;
    //console.log('droppin');
    moved = true;
  }

  if (direction === 'left' && this.grid.isClear(this.checkLeft())) {
    this.x--;
    //console.log('gon left');
    moved = true;
  }

  if (direction === 'right' && this.grid.isClear(this.checkRight())) {
    this.x++;
    //console.log('gon right');
    moved = true;
  }

  if (direction === 'rotateRight' && this.grid.isClear(this.checkRotateRight())) {
    this.orientation = (this.orientation + 1) % 4;
    //console.log('tatin right');
    moved = true;
  }

  this.addToGrid();

  return moved;
};

Tetromino.prototype.addToGrid = function() {
  var  positions = this.position();
  for (var i = 0; i < positions.length; i++) {
    var pos = positions[i];
    this.grid.grid[pos.y][pos.x] = 1;
  }
}

Tetromino.prototype.removeFromGrid = function() {
  var positions = this.position();
  for (var i = 0; i < positions.length; i++) {
    //debugger;
    var pos = positions[i];
    this.grid.grid[pos.y][pos.x] = 0;
  }

}

Tetromino.prototype.checkRight = function() {
  var currentPositions = this.position();
  var positions = [];

  for (var i = 0; i < currentPositions.length; i++) {
    var currentPos = currentPositions[i];
    var pos = {};
    pos.x = currentPos.x + 1;
    pos.y = currentPos.y;
    positions.push(pos);
  }

  return positions;
}

Tetromino.prototype.checkLeft = function() {
  var currentPositions = this.position();
  var positions = [];

  for (var i = 0; i < currentPositions.length; i++) {
    var currentPos = currentPositions[i];
    var pos = {};
    pos.x = currentPos.x - 1;
    pos.y = currentPos.y;
    positions.push(pos);
  }

  return positions;
}

Tetromino.prototype.checkDown = function() {
  var positions = this.position();
  var toCheck = [];
  _.each(positions, function(position) {
    toCheck.push({x: position.x, y: position.y + 1});
  });
  return toCheck;
}


Tetromino.prototype.checkRotateRight = function() {
  var newOrientation = (this.orientation + 1) % 4;
  var positions = this.position(newOrientation);
  var toCheck = [];
  _.each(positions, function(position) {
    toCheck.push({x: position.x, y: position.y + 1});
  });
  return toCheck;
}
