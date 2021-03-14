import React from "react";
import styled from "styled-components";

const Block = styled.div`
  position: absolute;
  height: 50px;
  width: 50px;
  background: ${props => (props.color ? props.color : "brown")};
  top: ${({ y }) => `${y}px`};
  left: ${({ x }) => `${x}px`};
`;

export default ({ block, color }) => (
  <Block x={block.x} y={block.y} color={color} />
);
