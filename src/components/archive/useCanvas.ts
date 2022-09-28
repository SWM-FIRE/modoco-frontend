import React from 'react';
import MyCharacter from './myCharacter';
// import myCharacter from '../../../assets/icon.png';
// import { ReactComponent as dummyAvatar } from '../../../assets/svg/dummyAvatar.svg';

export const useCanvas = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement>,
) => {
  const MOVEMENT_SPEED = 3;
  const keyPresses = { w: false, a: false, s: false, d: false };
  const me = new MyCharacter(1, canvasRef);

  const keyDownListener = (event: KeyboardEvent) => {
    keyPresses[event.key] = true;
  };

  const keyUpListener = (event: KeyboardEvent) => {
    keyPresses[event.key] = false;
  };

  const addListeners = () => {
    window.addEventListener('keydown', keyDownListener);
    window.addEventListener('keyup', keyUpListener);
    // me.setCharacterPosition(positionX, positionY);
  };

  const removeListeners = () => {
    window.removeEventListener('keydown', keyDownListener);
    window.removeEventListener('keyup', keyUpListener);
  };

  const loadImage = () => {
    // load for all players
    me.myImage.onload = () => {
      requestAnimationFrame(gameLoop);
    };
  };

  const fixDPI = () => {
    const dpi = window.devicePixelRatio;
    const StyleHeight = +getComputedStyle(canvasRef.current)
      .getPropertyValue('height')
      .slice(0, -2);

    const StyleWidth = +getComputedStyle(canvasRef.current)
      .getPropertyValue('width')
      .slice(0, -2);

    canvasRef.current?.setAttribute('height', (StyleWidth * dpi).toString());
    canvasRef.current?.setAttribute('width', (StyleHeight * dpi).toString());
  };

  const drawFrame = (canvasX: number, canvasY: number) => {
    if (!canvasRef.current) {
      return;
    }
    fixDPI();
    const context = canvasRef.current?.getContext('2d');
    // draw for all players
    context?.drawImage(me.myImage, canvasX, canvasY, 100, 100);
  };

  const gameLoop = () => {
    if (!canvasRef.current) {
      return;
    }
    const context = canvasRef.current?.getContext('2d');
    context?.clearRect(
      0,
      0,
      canvasRef.current?.width,
      canvasRef.current?.height,
    );

    if (keyPresses.w) {
      me.moveCharacter(0, -MOVEMENT_SPEED);
      // socket send
    } else if (keyPresses.s) {
      me.moveCharacter(0, MOVEMENT_SPEED);
      // socket send
    }

    if (keyPresses.a) {
      me.moveCharacter(-MOVEMENT_SPEED, 0);
      // socket send
    } else if (keyPresses.d) {
      me.moveCharacter(MOVEMENT_SPEED, 0);
      // socket send
    }

    drawFrame(me.myPositions.positionX, me.myPositions.positionY);
    requestAnimationFrame(gameLoop);
  };

  return {
    addListeners,
    loadImage,
    removeListeners,
    gameLoop,
    drawFrame,
  };
};
