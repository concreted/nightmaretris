it('should clear rows from the grid when full', function() {
  var field = new Field(1, 1);
  assert.deepEqual(field.grid, [[0]]);
  field.grid[0][0] = 1;
  assert.deepEqual(field.grid, [[1]]);
  field.clearRows();
  assert.deepEqual(field.grid, [[0]]);
  assert.equal(field.grid.length, 1);
})
