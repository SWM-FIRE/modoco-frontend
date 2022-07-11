import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import UserStore from '../../stores/userStore';
import vectors from '../atoms/Vectors';

export default function InputNickname() {
  const navigate = useNavigate();
  const { nickname, uid, setNickname, setUid } = UserStore();
  useEffect(() => {
    if (localStorage.getItem('uid')) {
      console.log('existing user');
      setUid(localStorage.getItem('uid'));
      setNickname(localStorage.getItem('nickname'));
    } else {
      console.log('new user');
      const newUID = uuidv4();
      setUid(newUID);
      localStorage.setItem('uid', newUID);
      console.log('uid는 ', newUID);
    }
  }, []);

  const sendData = async () => {
    const API_URL: string = process.env
      .REACT_APP_SEND_USER_INFORMATION_URL as string;
    await axios
      .post(API_URL, {
        uid,
        nickname,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // socket connection
    const payload = { nickname, uid };
    localStorage.setItem('nickname', nickname);
    console.log('payload: ', payload);
    sendData();
    // socket.emit('ENTER_ROOM', payload, (confirmRoomId) => {
    //   navigate(`screens`);
    // });
    navigate(`/`);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  return (
    <>
      <Vector src={vectors.Lamp} left={0} top={0} size={40} />
      <Vector src={vectors.Book} left={28.7} top={14.4} size={60} />
      <Message>
        <TitleLogo>
          모여서 도란도란 코딩,<span>Modoco</span>
        </TitleLogo>
        <TitleStart>시작하기</TitleStart>
      </Message>
      <Form onSubmit={onSubmit}>
        <Input
          autoComplete="off"
          value={nickname}
          onChange={onChange}
          placeholder="Enter Nickname"
          id="nickname"
        />
        <Button disabled={nickname === null || !nickname.length}>Enter</Button>
        {/* <Button>GitHub 계정</Button> */}
      </Form>
    </>
  );
}

interface Position {
  size?: number;
  left?: number;
  top: number;
  right?: number;
}

const Vector = styled.img<Position>`
  position: absolute;
  width: ${(props) => props.size}rem;
  left: ${(props) => props.left}%;
  top: ${(props) => props.top}%;
  opacity: 0.5;
  z-index: 1000;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100%;
  z-index: 1001;
`;

const TitleLogo = styled.div`
  font-size: 18px;
  font-family: IBMPlexMonoRegular;
`;

const TitleStart = styled.div`
  font-family: PretendardRegular;
  font-weight: 500;
  font-size: 4rem;
  margin-top: 2rem;
`;

const Form = styled.form`
  margin-top: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  button,
  input {
    font-family: PretendardRegular;
    font-weight: 600;
    height: 6rem;
    width: 40rem;
    border-radius: 0.8rem;
  }
`;

const Button = styled.button`
  font-size: 1.5rem;
  background-color: white;
  margin-top: 2rem;
  cursor: pointer;
`;

const Input = styled.input`
  background-color: rgb(30, 41, 75);
  color: white;
  font-size: 1.7rem;
  text-justify: center;
  padding-left: 1rem;
`;
