var Field = function(height, width) {
  // instantiate grid
  this.grid = makeGrid(height, width);

  this.height = height;
  this.width = width;
  // active piece
  this.active = null;

  // dead piece flag (placing)
  this.placing = false;

  // piece constructors
  this.pieces = [Straight, ZBlock, SBlock, LeftL, TBlock, RightL];

  this.score = 0;

  this.speed = 300;
}


Field.prototype.newActive = function() {
  var pieceType = this.pieces[Math.floor(Math.random() * this.pieces.length)];
  //var pieceType = this.pieces[0];
  this.active = new pieceType(5,1,30,this);
  
  // _.each(this.active.position(), function(pos) {
  //   console.log(pos.x + ', ' + pos.y);
  //   this.grid[pos.y][pos.x] = 1;
  // });
  
  var positions = this.active.position();

  for (var i = 0; i < positions.length; i++) {
    var pos = positions[i];
    this.grid[pos.y][pos.x] = 1;
  }
  //displayGrid(this.grid);

  return this.active;
}

Field.prototype.isClear = function(dest) {
  //debugger;
  for (var i = 0; i < dest.length; i++) {
    var pos = dest[i];
    if (this.grid[pos.y] === undefined || this.grid[pos.y][pos.x] === undefined || this.grid[pos.y][pos.x] === 1) {
      return false;
    }
  }
  return true;
}

Field.prototype.clearRows = function() {
  var toClear = [];
  
  for (var i = 0; i < this.grid.length; i++) {
    if (isFull(this.grid[i])) {
      toClear.push(i);
    }
  }

  console.log(toClear);
  //if (toClear.length > 0) debugger;
  for (var i = 0; i < toClear.length; i++) {
    var index = toClear[i];
    this.grid.splice(index, 1);
  }

  var newRows = makeGrid(toClear.length, this.width); 
  console.log('clearing ' + toClear.length + ' rows');
  this.grid = newRows.concat(this.grid);

  this.score += toClear.length;
  if (toClear.length > 0) {
    console.log(this.score);
  }

  // ugly hack to render score
  document.querySelector('.score').innerHTML = this.score;

  return toClear.length;
}

var isFull = function(row) {
  for (var i = 0; i < row.length; i++) {
    if (row[i] === 0) {
      return false;
    }
  }
  return true;
}

var makeGrid= function(height, width) {
  // represent grid as 2d array of 0s/1s
  var row = new Int8Array(width);
  var grid = [];
  for (var i = 0; i < height; i++) {
    grid.push(Array.prototype.slice.call(row));
  }

  return grid;
};


// Return list of positions to display - look through grid for coordinates
Field.prototype.displayPositions = function() {
  var positions = [];

  for (var y = 0; y < this.grid.length; y++) {
    for (var x = 0; x < this.grid[y].length; x++) {
      if (this.grid[y][x] === 1) {
        positions.push({x: x * 30, y: y * 30});
      }
    }
  }
  return positions;
}
