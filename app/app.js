var grid_height = 22;
var grid_width = 10;
var block_size = 30;

var invisible = false;

var inPlay = null;

var displayGrid = function(grid) {
  for (var i = 0; i < grid.length; i++) {
    console.log(JSON.stringify(grid[i]));
  }
};

var placePiece = function() {
  var svg = d3.select('svg');
  var active = svg.selectAll('.inplay');

  active//.transition()
    .classed({'inplay': false, 'placed': true});

};
// data is the whole grid: every turn it will be one row lower
var updateInPlay = function(piece) {
  //debugger;
  var svg = d3.select('svg');
  var active = svg.selectAll('.inplay').data(piece.positionDisplay());
  active.enter().append('rect');

  active//.transition()
    .attr('x', function(d, i) { return d.x; })
    .attr('y', function(d, i) { return d.y; })
    .attr('class', 'inplay')
    .attr('height', piece.size)
    .attr('width', piece.size)
    .attr('fill', 'black')
    .attr('stroke', 'red')
    .attr('stroke-width', 2)

  active.exit().remove();
};

var makeInvisible = function() {
  console.log('clicked!');
  invisible = !invisible;
}

var updateGrid = function(positions) {
 
  var svg = d3.select('svg');
  var placed = svg.selectAll('.placed').data(positions);
 
  placed.enter().append('rect');
  
  placed//.transition()
    .attr('x', function(d, i) { return d.x; })
    .attr('y', function(d, i) { return d.y; })
    .attr('class', 'placed')
    .attr('height', 30)
    .attr('width', 30)
    .attr('fill', 'black')
    .attr('stroke', 'red')
    .attr('stroke-width', 2)

  if (invisible) {
    placed
      .attr('fill', '#666666')
      .attr('stroke', 'white');
  }

  placed.exit().remove();
}

//update loop - based on speed
//update position of current piece
//check if piece is touching bottom - if so flag to end turn on next if in same position
//

var width = grid_width * 30,
height = grid_height * 30;

var field = new Field(grid_height, grid_width);
var grid = field.grid;

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
.append("g")
  .attr("transform", "translate(32," + (height / 2) + ")");

// make this depend on actual field grid rather than grid_height/width
for (var i = 0; i < grid_height; i++) {
  for (var j = 0; j < grid_width; j++) {
    d3.select('svg').append('rect')
      .attr('class', 'empty')
      .attr('fill', '#666666')
      .attr('height', block_size)
      .attr('width', block_size)
      .attr('x', block_size * j)
      .attr('y', block_size * i)
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
  }
}


var paused = false;

var handleKeys = function () {
  //console.log(event);
  if (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40 || event.keyCode === 32)
  d3.event.preventDefault();

  if (!paused) {
    if (event.keyCode === 37) {
      inPlay.move('left');
    }
    if (event.keyCode === 38) {
      inPlay.move('rotateRight');
    }
    if (event.keyCode === 39) {
      inPlay.move('right');
    }
    if (event.keyCode === 40) {
      inPlay.move('down');
    }
  }

  if (event.keyCode === 32) {
    console.log('space!');
    //placing = true;
    paused = !paused;
    if (!paused) {
      setTimeout(gameLoop, field.speed);
    }
  }

  updateInPlay(inPlay);
  updateGrid(field.displayPositions());

  // check if piece is sitting on anything
  // THIS DOESN'T WORK DUE TO PIECE COLLIDING
  // WITH ITSELF?????

  inPlay.removeFromGrid();
  //debugger;
  if (field.isClear(inPlay.checkDown())) {
    console.log('clear!');
    placing = false;
  }

  inPlay.addToGrid();
}



// Capture keydown
d3.select("body").on("keydown", handleKeys);

var placing = false;

console.log(grid);
inPlay = field.newActive();

console.log(inPlay.location);
console.log(inPlay.position());


// Needs to be in this order for some reason to apply
// correct CSS (grid first, then inplay)
// it works elsewhere with order flipped
updateGrid(field.displayPositions());
updateInPlay(inPlay);

var gameLoop = function() {
  // Put piece in final position--------------
  // ---------- this is d3 stuff--------------
  if (placing) {
    placePiece();

    field.clearRows();
    //debugger;
    console.log('updating positions');
    updateGrid(field.displayPositions());

    inPlay = field.newActive();
    //debugger;

    updateInPlay(inPlay);
    updateGrid(field.displayPositions());

    placing = false; // except this - should be part of TetrisField
  }

  else {
    if (inPlay.move('down')) {
      placing = false;
    }
    else {
      placing = true;
    }
  }

  // render in d3
  updateInPlay(inPlay);
  updateGrid(field.displayPositions());  


  if (!paused) {
    setTimeout(gameLoop, field.speed);
  }
}

setTimeout(function() { gameLoop() }, field.speed);
