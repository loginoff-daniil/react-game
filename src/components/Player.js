import React from "react";
import styled from "styled-components";

const Player = styled.div`
  position: absolute;
  height: 50px;
  width: 50px;
  background: red;
  top: ${({ y }) => `${y}px`};
  left: ${({ x }) => `${x}px`};
`;

export default ({ player }) => {
  return <Player x={player.x} y={player.y} />;
};
