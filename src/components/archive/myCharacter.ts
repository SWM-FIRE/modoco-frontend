import React from 'react';

const WIDTH = 20;
const HEIGHT = 20;

export default class Character {
  img = new Image();

  uid: number;

  positionX: number;

  positionY: number;

  canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(
    uid: number,
    canvasRef: React.MutableRefObject<HTMLCanvasElement>,
  ) {
    this.img.src = 'https://static.modocode.com/svg/dummyAvatar.svg';
    this.uid = uid;
    this.positionX = 0;
    this.positionY = 0;
    this.canvasRef = canvasRef;
  }

  setCharacterPosition(positionX: number, positionY: number) {
    this.positionX = positionX;
    this.positionY = positionY;
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

  get myPositions() {
    return {
      positionX: this.positionX,
      positionY: this.positionY,
    };
  }

  get myImage() {
    return this.img;
  }
}
