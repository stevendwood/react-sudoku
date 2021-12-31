import React, { useState } from "react";
import ReactDOM from "react-dom";
import Grid from "./grid.js";
import Solver from "./solver.js";

import "./index.css";

const Square = ({value, row, col, onCellValueChange}) => (
    <input
        type="text"
        value={value === 0 ? "" : value}
        maxLength="1"
        onChange={(evt) => {
            const cellValue = evt.target.value;
            if (parseInt(cellValue, 10) || cellValue === "") {
                onCellValueChange(row, col, cellValue);
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

function Sudoku({ puzzleString }) {
    const [puzzle, setPuzzle] = useState(new Grid(puzzleString));
    const [error, setError] = useState("");

    function solve() {
        try {
            new Solver(puzzle).solve();
            setPuzzle(new Grid(puzzle.toFlatString()));
            setError("");
        } catch (e) {
            console.debug("Couldn't solve the puzzle", e);
            setError("Couldn't solve it, invalid puzzle");
        }
    }

    function onCellValueEdited (row, col, value) {
        const newGrid = new Grid(puzzle.toFlatString());
        newGrid.rows[row][col].value = value;
        setPuzzle(newGrid);
    }

    return (
        <div className="game">
            <h1>Sudoku Solver</h1>
            <p>{error}</p>
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
    <Sudoku puzzleString="4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......" />,
    document.getElementById("root")
);
