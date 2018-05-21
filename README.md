Learning some React by writing a UI wrapper for the JS version of [sudoku solver](https://github.com/stevendwood/sudoku-solver)

There are 3 components, SudokuGame, SudokuBoard and Square.

SudukoGame is the parent component and it holds the state.  The state is a string representation of a puzzle e.g.
```js
<SudokuGame
   puzzle="4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......"
/>
```
When the user edits a cell (in component Square) fire an onChange function provided in the props from the SudukoGame.
```js
// from SudokuGame.render
<SudukoBoard
    puzzle={this.state.puzzle}
    onCellValueChange={this.onCellValueEdited.bind(this)}
/>
```
When a cells value is edited, we want update the correct index in the puzzle string and set the state to the new string triggering a re-render.  Make use of the Grid class for ease...
```js
onCellValueEdited(row, col, value) {
    const grid = new Grid(this.state.puzzle);
    grid.rows[row][col].value = value;
    // update the state with the new puzzle string
    this.setState({ puzzle: grid.toFlatString() });
}
```
When the user hits solve, solve the puzzle using the grid and solver classes and grab the 81 char string which forms the new state.
```js
solve() {
    const { puzzle } = this.state,
    grid = new Grid(puzzle);

    new Solver(grid).solve();
    this.setState({ puzzle: grid.toFlatString() });
}
```
