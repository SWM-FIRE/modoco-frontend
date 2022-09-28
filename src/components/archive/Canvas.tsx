import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { useCanvas } from './useCanvas';

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { addListeners, loadImage, drawFrame, removeListeners } =
    useCanvas(canvasRef);

  useEffect(() => {
    addListeners();
    loadImage();

    return () => removeListeners();
  }, [drawFrame, loadImage, removeListeners, addListeners]);

  return <CanvasArea ref={canvasRef} />;
}

const CanvasArea = styled.canvas`
  position: relative;
  width: 75rem;
  height: 75rem;
  aspect-ratio: 1;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.2);
`;
