import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './grid.js';
import Solver from './solver.js';

import './index.css';

class Square extends React.Component {

  constructor(props) {
      super(props);
      this.cell = props.cell;
  }

  fireOnChange(evt) {
    this.props.onCellValueChange(this.cell, evt.target.value);
  }

  render() {
    const value = this.cell.value;
    return (
      <input type="text"
             value={(value === 0 ? "" : value)}
             maxLength="1"
             onChange={this.fireOnChange.bind(this)}/>
    );
  }
}

class Board extends React.Component {

  render() {
    const rows = this.props.grid.rows.map((row, idx) => {
        return (
          <tr key={"row"+idx}>
            { row.map(c => <td key={c.row + c.col}><Square cell={c} onCellValueChange={this.props.onCellValueChange}/></td>) }
          </tr>
        );
    });

    return (
      <table className="sudoku">
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.grid = new Grid(props.puzzle.trim());
    this.state = { solved: false };
  }

  solve() {
      try {
        const solver = new Solver(this.grid);
        solver.solve();
        this.setState({ solved: true });
      } catch (err) {
        // TODO: update state to indicate solve failed
      }
  }

  onCellValueEdited(cell, value) {
    let newValue = value;
    newValue = newValue ? parseInt(newValue, 10) || 0 : 0;
    cell.value = newValue;
    this.setState({}); // trigger re render by creating a new state...
  }

  clearAll() {
    this.grid.rows.forEach(row => {
      row.forEach(c => c.value = 0);
    });
    this.setState({ solved: false });
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board grid={this.grid} onCellValueChange={this.onCellValueEdited.bind(this)}/>
        </div>
        <button onClick={() => this.solve()}>Solve It!</button>
        <button onClick={() => this.clearAll()}>Clear All</button>
      </div>
    );
  }
}

ReactDOM.render(

  <Game puzzle="4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......"/>,
  document.getElementById('root')
);
