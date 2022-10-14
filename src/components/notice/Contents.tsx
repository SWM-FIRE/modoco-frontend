import styled from 'styled-components';

export default function Contents() {
  return (
    <Component>
      <Title>공지사항✨</Title>
      <Content>
        안녕하세요 모도코입니다. 방문해주셔서 감사드립니다.
        <br /> <br />
        버그 신고는 왼쪽 아래 채널톡으로 해주시면 감사드리겠습니다 :)
      </Content>
    </Component>
  );
}

const Component = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 2.4rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  font-size: 1.6rem;
  margin: 4rem 0;
  flex-grow: 1;
`;
