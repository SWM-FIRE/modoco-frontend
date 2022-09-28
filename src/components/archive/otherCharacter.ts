import React from 'react';

const WIDTH = 20;
const HEIGHT = 20;

export default class Character {
  uid: string;

  positionX: number;

  positionY: number;

  canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(
    uid: string,
    positionX: number,
    positionY: number,
    canvasRef: React.MutableRefObject<HTMLCanvasElement>,
  ) {
    this.uid = uid;
    this.positionX = positionX;
    this.positionY = positionY;
    this.canvasRef = canvasRef;
  }

  moveCharacter(deltaX: number, deltaY: number) {
    if (
      this.positionX + deltaX > 0 &&
      this.positionX + WIDTH + deltaX < this.canvasRef.current?.width
    ) {
      this.positionX += deltaX;
    }
    if (
      this.positionY + deltaY > 0 &&
      this.positionY + HEIGHT + deltaY < this.canvasRef.current?.height
    ) {
      this.positionY += deltaY;
    }
  }
}
