it('should clear rows from the grid when full', function() {
  var field = new Field(2, 1);
  assert.deepEqual(field.grid, [[0],[0]]);
  field.grid[1][0] = 1;
  assert.deepEqual(field.grid, [[0],[1]]);
  field.clearRows();
  assert.deepEqual(field.grid, [[0],[0]]);
  assert.equal(field.grid.length, 2);
})
