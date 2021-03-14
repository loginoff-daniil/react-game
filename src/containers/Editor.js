import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import initialState from '../initialState';
import Area from '../containers/Area';
import Block from '../components/Block';

const Game = styled.div`
  font-family: 'Arial', sans-serif;
  position: relative;
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const Empty = styled.div`
  position: absolute;
  outline: 1px solid rgba(0, 0, 0, 0.5);
  top: ${({ y }) => `${y}px`};
  left: ${({ x }) => `${x}px`};
  height: 50px;
  width: 50px;
`;

const Info = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 20px;
`;

const Textarea = styled.textarea`
  margin-top: 10px;
`;

const createGrid = (click, map) => {
  const { width, height } = initialState;
  const row = width;
  const column = height;
  const grids = [];

  for (let x = 0; x < row; x += 50) {
    for (let y = 0; y < column; y += 50) {
      const isBlock = map.filter(([itemX, itemY]) => itemX === x && itemY === y).length > 0;

      if (isBlock) {
        grids.push(
          <Block block={{ x, y }} key={row * column * Math.random()} onClick={() => click(x, y)} />
        );
      } else {
        grids.push(
          <Empty x={x} y={y} key={row * column * Math.random()} onClick={() => click(x, y)} />
        );
      }
    }
  }

  return grids;
};

export default () => {
  const { width, height } = initialState;
  const [map, setMap] = useState([]);

  const fillCell = (x, y) => {
    setMap([...map, [x, y]]);
  };

  const removeCell = e => {
    e.preventDefault();
    let blockX = +e.target.getAttribute('x');
    let blockY = +e.target.getAttribute('y');

    console.log('1 ', blockX, blockY);

    map.forEach(([x, y]) => {
      console.log(x, y);
    });
  };

  const getJSON = () => {
    return JSON.stringify({ blocks: map });
  };

  return (
    <Game onContextMenu={removeCell}>
      <Area width={width} height={height}>
        {createGrid(fillCell, map)}
      </Area>
      <Info>
        <Textarea rows="10" cols="60" value={getJSON()} readOnly />
      </Info>
    </Game>
  );
};
