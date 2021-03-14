import React, { Fragment } from "react";
import styled from "styled-components";
import Player from "../components/Player";
import Block from "../components/Block";
import { getBlocks } from "../maper";

const Apple = styled(Block)`
  background: blue;
`;

const Area = styled.div`
  position: relative;
  width: ${({ width }) => width + "px"};
  height: ${({ height }) => height + "px"};
  background: rgba(0, 0, 0, 0.05);
`;

export default ({ player, width, height, apple, children }) => {
  return (
    <Area width={width} height={height}>
      {children || (
        <Fragment>
          <Player player={player} />
          <Apple block={apple} color="green" />
          {getBlocks()}
        </Fragment>
      )}
    </Area>
  );
};
