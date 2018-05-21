import React from "react";
import ReactDOM from "react-dom";
import Grid from "./grid.js";
import Solver from "./solver.js";

import "./index.css";

class Square extends React.Component {
    fireOnChange(evt) {
        const value = evt.target.value;
        if (parseInt(value, 10) || value === "") {
            this.props.onCellValueChange(this.props.row, this.props.col, evt.target.value);
        }
    }

    render() {
        const value = this.props.value;
        return (
            <input
                type="text"
                value={value === 0 ? "" : value}
                maxLength="1"
                onChange={this.fireOnChange.bind(this)}
            />
        );
    }
}

class SudukoBoard extends React.Component {
    render() {
        const grid = new Grid(this.props.puzzle);
        const rows = grid.rows.map((row, idx) => {
            return (
                <tr key={"row" + idx}>
                    {row.map(cell => (
                        <td key={cell.col}>
                            <Square
                                value={cell.value}
                                row={cell.row}
                                col={cell.col}
                                onCellValueChange={this.props.onCellValueChange}
                            />
                        </td>
                    ))}
                </tr>
            );
        });

        return (
            <table className="sudoku">
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SudokuGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = { puzzle: this.props.puzzle };
    }

    solve() {
        const { puzzle } = this.state,
            grid = new Grid(puzzle);

        new Solver(grid).solve();
        this.setState({ puzzle: grid.toFlatString() });
    }

    onCellValueEdited(row, col, value) {
        const grid = new Grid(this.state.puzzle);

        grid.rows[row][col].value = value;
        // update the state with the new puzzle string
        this.setState({ puzzle: grid.toFlatString() });
    }

    clearAll() {
        this.setState({ puzzle: new Grid().toFlatString() });
    }

    render() {
        return (
            <div className="game">
                <h1>Sudoku Solver</h1>
                <div className="game-board">
                    <SudukoBoard
                        puzzle={this.state.puzzle}
                        onCellValueChange={this.onCellValueEdited.bind(this)}
                    />
                </div>
                <div className="buttons">
                    <button onClick={() => this.solve()}>Solve It!</button>
                    <button onClick={() => this.clearAll()}>Clear All</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <SudokuGame puzzle="4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......" />,
    document.getElementById("root")
);
