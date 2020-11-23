import React, { useState } from "react";
import ReactDOM from "react-dom";
import Grid from "./grid.js";
import Solver from "./solver.js";

import "./index.css";

const Square =({value, row, col, onCellValueChange}) => (
    <input
        type="text"
        value={value === 0 ? "" : value}
        maxLength="1"
        onChange={(evt) => {
            const value = evt.target.value;
            if (parseInt(value, 10) || value === "") {
                onCellValueChange(row, col, value);
            }
        }}
    />
);

const SudukoBoard = ({ puzzleGrid, onCellValueChange }) => (
    <table className="sudoku">
        <tbody>
        { puzzleGrid.rows.map((row, idx) => (
            <tr key={idx}>
                { row.map(cell => (
                    <td key={cell.col}>
                        <Square
                            value={cell.value}
                            row={cell.row}
                            col={cell.col}
                            onCellValueChange={onCellValueChange}
                        />
                    </td>
                )) }
            </tr>
        )) }
        </tbody>
    </table>
);

function SudokuGame({ board }) {
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

    return (
        <div className="game">
            <h1>Sudoku Solver</h1>
            <SudukoBoard
                puzzleGrid={puzzle}
                onCellValueChange={onCellValueEdited}
            />
            <div className="buttons">
                <button onClick={solve}>Solve It!</button>
                <button onClick={() => setPuzzle(new Grid())}>Clear All</button>
            </div>
        </div>
    );
}

ReactDOM.render(
    <SudokuGame board="4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......" />,
    document.getElementById("root")
);
