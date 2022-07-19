import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import mockPeople from '../../mockPoeple.json';
import SingleScreen from './SingleScreen';

export default function ScreenShare() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('uid') || !localStorage.getItem('nickname')) {
      alert('로그인 후 이용해주세요');
      navigate('/main');
    }
  }, []);
  return (
    <Container>
      <ScreenWrapper>
        <SingleScreen
          nickname={localStorage.getItem('nickname')}
          avatar={localStorage.getItem('avatar')}
        />
        {mockPeople.people.map((person) => (
          <SingleScreen
            key={person.nickname}
            nickname={person.nickname}
            avatar={person.avatar}
          />
        ))}
      </ScreenWrapper>
    </Container>
  );
}

const ScreenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow: auto;
  @media (max-width: 900px) {
    flex-direction: column;
    flex-wrap: unset;
    gap: 10%;
  }
  gap: 0 8%;
  height: 100%;
`;

const Container = styled.div`
  margin: 3rem 0 0 1.6rem;
  width: calc(100% - 46.5rem);
  height: calc(100% - 5rem);
`;
