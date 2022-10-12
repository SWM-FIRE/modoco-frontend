import React from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';

export default function MyEmptyBlock() {
  return (
    <Container>
      <Name />
      <Desc />
      <Tags>
        <Tag />
        <Tag />
        <Tag />
      </Tags>
      <Detail />
      <Enter />
    </Container>
  );
}

const Name = styled.div`
  width: 60%;
  height: 4rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  ${media.small} {
    height: 2rem;
  }
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  ${media.small} {
    display: none;
  }
`;

const Tag = styled.div`
  width: 20%;
  height: 3rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
`;

const Desc = styled.div`
  width: 50%;
  height: 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  ${media.small} {
    display: none;
  }
`;

const Detail = styled.div`
  width: 80%;
  height: 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  ${media.small} {
    width: 50%;
    margin-top: 3rem;
  }
`;

const Enter = styled.button`
  width: 12.6rem;
  height: 4.8rem;
  border-radius: 9rem;
  background-color: rgba(255, 255, 255, 0.1);
  ${media.small} {
    width: 8.6rem;
    height: 3.2rem;
    font-size: 1.2rem;
    margin: 0.3rem 0rem;
  }
`;

const Container = styled.div`
  background-color: #23262f;
  border-radius: 2rem;
  width: 29.4rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 4.3rem 1rem;
  box-sizing: border-box;
  ${media.xlarge} {
    width: 29.4rem;
  }
  ${media.medium} {
    width: 29.4rem;
  }
  ${media.small} {
    height: 18rem;
    width: 17rem;
    padding: 3rem 0.7rem;
  }
  ${media.xsmall} {
    height: 13rem;
    width: 12rem;
    padding: 2rem 0.7rem;
  }
  ${media.xxsmall} {
    width: 11rem;
  }
`;
