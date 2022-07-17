import styled from 'styled-components';
// import { ReactComponent as MicOff } from '../../assets/svg/SmallMicOff.svg';
// import { ReactComponent as MicOn } from '../../assets/svg/SmallMicOn.svg';

export default function Participants() {
  return (
    <Component>
      <Title>참여자 목록</Title>
      <UserList>
        <User />
      </UserList>
    </Component>
  );
}

const Component = styled.div`
  font-family: IBMPlexSansKRRegular;
  font-size: 1.3rem;
  color: #6b7280;
  /* border-bottom: 1px solid #374151; */
  border-bottom: 1px solid rgba(55, 65, 81, 1);
`;

const Title = styled.div``;

const UserList = styled.div``;

const User = styled.div`
  width: 6.8rem;
`;
