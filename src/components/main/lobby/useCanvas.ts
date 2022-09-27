import React from 'react';
import myCharacter from '../../../assets/icon.png';

export const useCanvas = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement>,
) => {
  const img = new Image();
  const MOVEMENT_SPEED = 0.5;
  const WIDTH = 20;
  const HEIGHT = 20;
  const keyPresses = { w: false, a: false, s: false, d: false };
  let positionX = 0;
  let positionY = 0;

  const keyDownListener = (event: KeyboardEvent) => {
    keyPresses[event.key] = true;
  };

  const keyUpListener = (event: KeyboardEvent) => {
    keyPresses[event.key] = false;
  };

  const addListeners = () => {
    window.addEventListener('keydown', keyDownListener);
    window.addEventListener('keyup', keyUpListener);
  };

  const removeListeners = () => {
    window.removeEventListener('keydown', keyDownListener);
    window.removeEventListener('keyup', keyUpListener);
  };

  const loadImage = () => {
    img.src = myCharacter;
    img.onload = () => {
      requestAnimationFrame(gameLoop);
    };
  };

  const drawFrame = (canvasX: number, canvasY: number) => {
    if (!canvasRef.current) {
      return;
    }
    const context = canvasRef.current?.getContext('2d');
    context?.drawImage(img, canvasX, canvasY, WIDTH, HEIGHT);
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
      moveCharacter(0, -MOVEMENT_SPEED);
    } else if (keyPresses.s) {
      moveCharacter(0, MOVEMENT_SPEED);
    }

    if (keyPresses.a) {
      moveCharacter(-MOVEMENT_SPEED, 0);
    } else if (keyPresses.d) {
      moveCharacter(MOVEMENT_SPEED, 0);
    }

    drawFrame(positionX, positionY);
    requestAnimationFrame(gameLoop);
  };

  const moveCharacter = (deltaX: number, deltaY: number) => {
    if (
      positionX + deltaX > 0 &&
      positionX + WIDTH + deltaX < canvasRef.current?.width
    ) {
      positionX += deltaX;
    }
    if (
      positionY + deltaY > 0 &&
      positionY + HEIGHT + deltaY < canvasRef.current?.height
    ) {
      positionY += deltaY;
    }
  };

  return {
    addListeners,
    loadImage,
    removeListeners,
    gameLoop,
    drawFrame,
  };
};
