import React, { useState } from 'react';
import styled from 'styled-components';
import MyAvatar from '../../atoms/Avatar';
import connectedLobbyUsers from '../../../stores/connectedLobbyUsers';

export default function LobbyCanvas({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const { connectedUsers } = connectedLobbyUsers();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  console.log(width, height);

  const onKeyDown = (e: React.KeyboardEvent) => {
    // 오른쪽
    if (e.keyCode === 39) {
      setPosition((prev) => {
        return { x: prev.x + 1, y: prev.y };
      });
    } else if (e.keyCode === 37) {
      setPosition((prev) => {
        return { x: prev.x - 1, y: prev.y };
      });
    } else if (e.keyCode === 38) {
      setPosition((prev) => {
        return { x: prev.x, y: prev.y - 1 };
      });
    } else if (e.keyCode === 40) {
      setPosition((prev) => {
        return { x: prev.x, y: prev.y + 1 };
      });
    }
  };

  return (
    <>
      {connectedUsers.map((user) => {
        return (
          <Component
            key={user.uid}
            x={position.x}
            y={position.y}
            onKeyDown={onKeyDown}
            autoFocus
            type="button"
          >
            <MyAvatar avatar={user.avatar} size={5} />
          </Component>
        );
      })}
    </>
  );
}

const Component = styled.button<{ x: number; y: number }>`
  position: absolute;
  top: ${({ y }) => y}rem;
  left: ${({ x }) => x}rem;
  &:focus {
    outline: none;
  }
`;
