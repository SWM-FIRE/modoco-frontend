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

  // margin
  margin: 1.4rem 0;

  ${media.small} {
    margin: 0.7rem 0;
    width: 6rem;
    height: 26rem;
  }
  ${media.xsmall} {
    height: 20rem;
    width: 6.8rem;
  }
`;

const Button = styled.button<Props>`
  cursor: pointer;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  user-select: none;
  width: 10rem;
  position: absolute;
  z-index: 998;
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

  // margin
  margin: 1.4rem 1rem 1.4rem 0;
  ${media.small} {
    margin: 0.7rem 0;
    width: 6rem;
    height: 26rem;
  }
  ${media.xsmall} {
    height: 20rem;
    width: 6.8rem;
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
