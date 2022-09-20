import React, { useState } from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

function Left({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  const [show, setShow] = useState(false);
  return show ? (
    <Button
      margin={10}
      border={[2, 0, 0, 2]}
      left
      onClick={onClick}
      onMouseLeave={() => {
        setShow(false);
      }}
      data-cy="left-arrow-button"
    >
      {children}
    </Button>
  ) : (
    <Transparent
      margin={10}
      border={[2, 0, 0, 2]}
      left
      onMouseEnter={() => {
        setShow(true);
      }}
      data-cy="left-arrow-transparent"
    />
  );
}
function Right({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  const [show, setShow] = useState(false);
  return show ? (
    <Button
      margin={0}
      border={[0, 2, 2, 0]}
      left={false}
      onClick={onClick}
      onMouseLeave={() => {
        setShow(false);
      }}
      data-cy="right-arrow-button"
    >
      {children}
    </Button>
  ) : (
    <Transparent
      margin={0}
      border={[0, 2, 2, 0]}
      left={false}
      onMouseEnter={() => {
        setShow(true);
      }}
      data-cy="right-arrow-transparent"
    />
  );
}

interface Props {
  margin: number;
  border: number[];
  left?: boolean;
}

const Transparent = styled.div<Props>`
  background-color: transparent;
  ${(props) => props.color}
  width: 10rem;
  position: absolute;
  z-index: 999;
  height: 50rem;
  ${(props) => {
    if (props.left) {
      return `left: 0;`;
    }
    return `right: 0;`;
  }}
  border-radius: ${(props) => props.border[0]}rem
    ${(props) => props.border[1]}rem ${(props) => props.border[2]}rem
    ${(props) => props.border[3]}rem;
  margin-left: ${(props) => props.margin}rem;
`;

const Button = styled.button<Props>`
  cursor: pointer;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  user-select: none;
  width: 10rem;
  position: absolute;
  z-index: 999;
  height: 50rem;
  ${(props) => {
    if (props.left) {
      return `left: 0;`;
    }
    return `right: 0;`;
  }}
  border-radius: ${(props) => props.border[0]}rem
    ${(props) => props.border[1]}rem ${(props) => props.border[2]}rem
    ${(props) => props.border[3]}rem;
  margin-left: ${(props) => props.margin}rem;
  ${media.xlarge} {
    ${(props) => (props.margin ? 'margin-left: 5rem' : null)};
  }
  ${media.small} {
    ${(props) => (props.margin ? 'margin-left: 1rem' : null)};
  }
`;

export function LeftArrow() {
  const { scrollPrev } = React.useContext(VisibilityContext);
  return <Left onClick={() => scrollPrev()}>←</Left>;
}

export function RightArrow() {
  const { scrollNext } = React.useContext(VisibilityContext);
  return <Right onClick={() => scrollNext()}>→</Right>;
}
