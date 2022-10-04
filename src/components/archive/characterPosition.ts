import create from 'zustand';

interface Position {
  positionX: number;
  positionY: number;
  setPositionX: (_x: number) => void;
  setPositionY: (_y: number) => void;
}

const characterPosition = create<Position>((set) => ({
  positionX: 400,
  positionY: 400,
  setPositionX: (x) => set(() => ({ positionX: x })),
  setPositionY: (y) => set(() => ({ positionY: y })),
}));

export default characterPosition;
