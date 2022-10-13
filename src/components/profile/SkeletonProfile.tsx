import styled from 'styled-components';
import media from 'src/styles/media';
import openColor from 'src/styles/openColor';

export default function SkeletonProfile() {
  return (
    <Container>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <AvatarContainer />
          <Contents>
            <Nickname />
            <Links>
              <MyLink />
              <MyLink />
            </Links>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                gap: '0.5rem',
                marginTop: '0.5rem',
              }}
            >
              <Group />
              <Group />
              <Group />
            </div>
            <Description />
          </Contents>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '1rem',
            marginTop: '2rem',
          }}
        >
          <Badge />
          <Badge />
          <Badge />
          <Badge />
        </div>
        <Button />
      </div>
    </Container>
  );
}

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 12rem;
  width: 12rem;
  min-width: 12rem;
  background-color: ${openColor.gray7};
  border-radius: 10rem;
  ${media.small} {
    width: 8rem;
    height: 8rem;
    min-height: 8rem;
    min-width: 8rem;
  }
`;

const Description = styled.div`
  width: 80%;
  height: 2rem;
  border-radius: 0.4rem;
  margin-top: 2rem;
  background-color: ${openColor.gray7};
`;

const Badge = styled.div`
  margin-top: 1rem;
  width: 4rem;
  height: 4rem;
  background-color: ${openColor.gray7};
  border-radius: 1rem;
`;

const Group = styled.div`
  width: 5rem;
  height: 2rem;
  border-radius: 0.5rem;
  margin-top: 0.3rem;
  background-color: ${openColor.gray7};
`;

const Contents = styled.div`
  margin-left: 4rem;
  width: 100%;
  ${media.small} {
    margin-left: 1rem;
  }
`;

const Nickname = styled.div`
  background-color: ${openColor.gray7};
  width: 8rem;
  height: 4rem;
  border-radius: 0.5rem;
`;

const Container = styled.div`
  background-color: #23262f;
  width: 70%;
  border-radius: 2rem;
  position: relative;
  display: flex;
  justify-content: flex-start;
  padding: 3.2rem;
  gap: 5.6rem;
  @media (max-width: 1020px) {
    width: 100%;
  }
  ${media.small} {
    padding: 1.6rem;
  }
`;

const Button = styled.div`
  border-radius: 5rem;
  margin-top: 2rem;
  height: 4rem;
  width: 8.6rem;
  background-color: ${openColor.gray7};
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  margin-top: 1rem;
  ${media.small} {
    margin-top: 0.2rem;
    gap: 0.8rem;
  }
`;

const MyLink = styled.div`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  background-color: ${openColor.gray7};
  border-radius: 0.5rem;
  svg {
    width: 100%;
    height: 100%;
  }
`;
