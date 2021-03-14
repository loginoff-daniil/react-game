import React from "react";
import { blocks } from "./map.json";
import Block from "./components/Block";

export const getBlocks = () =>
  blocks.map(([x, y], index) => <Block block={{ x, y }} key={index} />);
