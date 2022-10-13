import { useState } from 'react';
import styled from 'styled-components';

export default function Contents() {
  const [isNotice, setIsNotice] = useState(true);

  const onChange = (e) => {
    setIsNotice(!isNotice);
    localStorage.setItem('isNotice', e.target.checked ? 'false' : 'true');
  };

  return (
    <Component>
      <Title>공지사항✨</Title>
      <Content>
        안녕하세요 모도코입니다. 방문해주셔서 감사드립니다.
        <br /> <br />
        버그 신고는 왼쪽 아래 채널톡으로 해주시면 감사드리겠습니다 :)
      </Content>
      <ShowComponent>
        <CheckBox
          type="checkbox"
          id="show"
          onClick={(e) => onChange(e)}
          checked={!isNotice}
        />
        <Show htmlFor="show">다시 보지 않기</Show>
      </ShowComponent>
    </Component>
  );
}

const Component = styled.div`
  color: white;
  padding: 0 4rem 4rem;
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

const ShowComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const CheckBox = styled.input`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;

const Show = styled.label`
  cursor: pointer;
  font-size: 1.3rem;
`;
