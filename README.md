Learning some React by writing a UI wrapper for the JS version of [sudoku solver](https://github.com/stevendwood/sudoku-solver)

[Run it here](https://codepen.io/stevendwood/full/meEyyZ/)

There are 3 components, SudokuGame, SudokuBoard and Square.

SudukoGame is the parent component, it holds the state which is a "Grid", initialised by a string property.
```js
<SudokuGame
   board="4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......"
/>
```

When a cells value is edited, or when the user clicks on solve or clear - the state of the component changes. The function `onCellValueEdited` is passed as a property down to the Square component.

```js
const [puzzle, setPuzzle] = useState(new Grid(board));

function solve() {
    new Solver(puzzle).solve();
    setPuzzle(new Grid(puzzle.toFlatString()));
}

function onCellValueEdited (row, col, value) {
    const newGrid = new Grid(puzzle.toFlatString());
    newGrid.rows[row][col].value = value;
    setPuzzle(newGrid);
}
```
