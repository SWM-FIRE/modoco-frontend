import styled from 'styled-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import roomInterface from '../../interface/room.interface';
import backgroundImgae from '../atoms/Image';

export default function RoomBlock({
  name,
  total,
  current,
  image,
  id,
  tags,
}: roomInterface) {
  /*
  socket.emit('ENTER_ROOM', payload, (confirmRoomId) => {
    navigate(`room/${confirmRoomId}`);
  });
  */
  const navigate = useNavigate();
  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('test');
    navigate(`/room/${id}`);
  };
  return (
    <Component onClick={onSubmit} src={backgroundImgae[image]}>
      <Information>
        <Top>
          <RoomName>{name}</RoomName>
          <UserNumber>
            {current} / {total}
          </UserNumber>
        </Top>
        <Tags>
          {tags.map((tag: string) => {
            return <Tag key={tag}>{tag}</Tag>;
          })}
        </Tags>
      </Information>
    </Component>
  );
}

const Information = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 100%;
  color: white;
  background-color: rgb(0, 0, 0, 28%);
  border-radius: 3rem;
  &:hover {
    background-color: rgb(0, 0, 0, 60%);
  }
  transition: all ease 0.5s;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const RoomName = styled.span`
  font-size: 4rem;
`;

const UserNumber = styled.span`
  font-size: 2rem;
  background-color: rgba(250, 250, 250, 60%);
  border-radius: 1rem;
  padding: 0.5rem;
  color: black;
`;

const Component = styled.button`
  text-align: center;
  width: 22vw;
  height: 22vw;
  background-image: url(${(props: { src: string }) => props.src});
  background-color: lightGray;
  background-position: center;
  cursor: pointer;
  margin-top: 5rem;
  border-radius: 3rem;
  @media screen and (max-width: 1200px) {
    width: 30vw;
    height: 30vw;
  }
  @media screen and (max-width: 900px) {
    width: 60vw;
    height: 60vw;
  }
`;

const Tags = styled.ul`
  width: 100%;
  display: felx;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;

const Tag = styled.li`
  margin-right: 1rem;
  font-size: 2rem;
  background-color: rgba(250, 250, 250, 60%);
  border-radius: 1rem;
  padding: 0.5rem;
  color: black;
  margin-top: 1rem;
`;
