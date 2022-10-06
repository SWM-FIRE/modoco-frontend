import styled from 'styled-components';

export default function Error() {
  return <Message>필수 입력 정보입니다.</Message>;
}

const Message = styled.span`
  color: #ed8e8e;
  margin: 0.5rem 0 0 0.2rem;
  position: absolute;
  bottom: -2rem;
  font-size: 1.2rem;
`;
