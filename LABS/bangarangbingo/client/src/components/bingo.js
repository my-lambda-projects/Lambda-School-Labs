/* eslint-disable no-alert */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { downloadCards } from '../actions';
import './bingo.css';

function generateCell(x, y, content, cell) {
  return (
    <g key={cell}>
      <rect
        x={x}
        y={y}
        width="194"
        height="194"
        fill="#fff"
        stroke="#000"
        strokeWidth="3"
      />
      <text
        x={x + 96}
        y={y + 124}
        fontSize="64"
        textAnchor="middle"
        alignmentBaseline="central"
      >
        {content}
      </text>
    </g>);
}

function generateCard(w, h) {
  const freeSpace = Math.round((w * h) / 2 + h - 1);
  h += h;
  const cells = [];
  const totalCells = w * h;
  let data;
  let x = 0;
  let y = 0;
  let bingoStr = 'BINGO';
  let cell = 0;
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (cell < 5) {
        data = bingoStr[cell];
      } else {
        data = cell === freeSpace ? 'FREE' : Math.floor(Math.random() * 100);
      }
      if (data < 10) {
        data = '0' + data;
      }
      x = ((j + 1) * 200);
      y = 200 * (i + 1);
      cells.push(generateCell(x, y, data, cell));
      cell++;
    }
  }
  return <svg id="preview" className="preview" viewBox="0 0 1400 1400">{cells}</svg>;
}
class Bingo extends Component {
  constructor() {
    super();
    this.grid = 5;
  }

  handleClick(e) {
    e.preventDefault();
    this.props.downloadCards();
  }
  render() {
    return (
      <section>
        {generateCard(this.grid, this.grid)}
        <button className="generateButton" 
                onClick={e => this.handleClick(e)}>Generate Cards</button>
      </section>
    );
  }
}

export default connect(null, { downloadCards })(Bingo);
