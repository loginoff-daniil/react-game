import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Area from "./Area";
import initialState from "../initialState";
import { UP, DOWN, LEFT, RIGHT } from "../constants";
import { getBlocks } from "../maper";
import { randomInteger } from "../helpers";

const Game = styled.div`
  position: relative;
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

const Score = styled.h1`
  position: absolute;
  top: 10%;
`;

export default function() {
  const [data, setData] = useState(initialState);
  const { player, width, height, apple, score } = data;
  const { x, y } = player;

  useEffect(() => {
    window.addEventListener("keyup", changePosition);

    return () => {
      window.removeEventListener("keyup", changePosition);
    };
  });

  const changePosition = ({ keyCode }) => {
    let newDirection;
    const blocks = getBlocks().map(block => block.props.block);

    switch (keyCode) {
      case UP:
        newDirection = { y: y - 50, x };
        break;
      case DOWN:
        newDirection = { y: y + 50, x };
        break;
      case LEFT:
        newDirection = { x: x - 50, y };
        break;
      case RIGHT:
        newDirection = { x: x + 50, y };
        break;
      default:
        return;
    }

    const isBlock = subject => {
      return (
        blocks.filter(block => block.x === subject.x && block.y === subject.y)
          .length > 0
      );
    };

    const isPlayer = subject =>
      subject.x === player.x && subject.y === player.y;

    const canEatApple =
      apple.x === newDirection.x && apple.y === newDirection.y;

    if (isBlock(newDirection)) return;
    if (newDirection.x < 0 || newDirection.x > width - 50) return;
    if (newDirection.y < 0 || newDirection.y > height - 50) return;

    if (canEatApple) {
      let x = randomInteger(0, width / 100) * 50;
      let y = randomInteger(0, height / 100) * 50;

      if (!isBlock({ x, y }) && !isPlayer({ x, y })) {
        data.apple = { x, y };
        setData({ ...initialState, ...data, score: score + 1 });
      }
    } else {
      setData({
        ...data,
        player: { ...player, ...newDirection }
      });
    }
  };

  return (
    <Game>
      <Score>Score: {data.score}</Score>
      <Area player={data.player} width={width} height={height} apple={apple} />
    </Game>
  );
}
