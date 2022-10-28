import styled from 'styled-components';
import { ReactComponent as Discord } from '../../assets/svg/Discord.svg';

export default function Contents() {
  const onClickDiscord = () => {
    window.open('https://discord.gg/RqYBHcJT4G', '_blank');
  };
  // const onClickNotion = () => {
  //   window.open(
  //     'https://fortune-innocent-45c.notion.site/513c922718904e2d9d558f39f9513649',
  //     '_blank',
  //   );
  // };
  return (
    <Component>
      <Title>공지사항✨</Title>
      <Content>
        <Text>안녕하세요.😊</Text>
        <br />
        <Text>모각코에 관심이 많은 대학생 3명이 모여</Text>
        <Text>
          온라인 모각코 플랫폼을 만들고 있는 소프트웨어 마에스트로 FIRE팀입니다.
        </Text>
        {/* <Text>
          사이트 오픈 기념으로
          <span
            style={{
              color: '#FEDF1A',
              marginLeft: '0.6rem',
            }}
          >
            코드 리뷰 이벤트
          </span>
          를 진행해보려 합니다.
        </Text>
        <Text>
          자세한 내용을 참고하시려면{' '}
          <Button onClick={onClickNotion} type="button">
            [여기]
          </Button>
          를 클릭해주세요!
        </Text> */}
        <br /> <br />
        버그 신고는 왼쪽 아래 채널톡으로 해주시면 감사드리겠습니다 :)
        <br />
        <br />
        <br />
        <SvgComponent onClick={onClickDiscord}>
          <Text>디스코드 채널 </Text>
          <Discord />
        </SvgComponent>
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
  margin: 4rem 0 0 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SvgComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 2rem;
  color: white;
  gap: 1rem;
  svg {
    width: 2rem;
    height: 100%;
  }
  &:hover {
    text-decoration: underline;
  }
`;

const Text = styled.span``;

// const Button = styled.button`
//   color: white;
//   cursor: pointer;
//   font-size: 1.6rem;

//   &:hover {
//     text-decoration: underline;
//   }
// `;
