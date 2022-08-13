import styled from 'styled-components';

export default function Footer() {
  return (
    <Container>
      <FooterWrapper>
        <Upper>
          <Title>Modoco</Title>
          <Company>(주)모도코 | Team : FIRE</Company>
          <Detail>
            {/* 사업자 등록번호 : 123-44-56789 | 대표 : 홍길동 <br /> */}
            서울특별시 강남구 테헤란로 311 59-12 아남타워 7층
            <br />
            Contact : 010-6449-3924 | yeonggi@kakao.com
          </Detail>
        </Upper>
        <Lower>
          <Copyright>
            &copy; {new Date().getFullYear()} All rights reserved
          </Copyright>
          <Other>
            <OtherButton>Terms</OtherButton>
            <OtherButton>Privacy Policy</OtherButton>
          </Other>
        </Lower>
      </FooterWrapper>
    </Container>
  );
}

const OtherButton = styled.div``;

const Other = styled.div`
  gap: 5rem;
  display: flex;
  position: absolute;
  right: 0;
  font-family: IBMPlexSansKRRegular;
  font-size: 1.7rem;
  font-weight: 500;
  color: #93989a;
`;

const Copyright = styled.div`
  font-family: IBMPlexSansKRRegular;
  font-size: 1.7rem;
  font-weight: 500;
  color: #93989a;
`;

const Detail = styled.div`
  margin-top: 0.7rem;
  font-family: PretendardRegular;
  font-weight: 400;
  font-size: 1.2rem;
  color: #93989a;
  line-height: 1.92rem;
`;

const Company = styled.div`
  margin-top: 3.2rem;
  font-family: PretendardRegular;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.92rem;
  color: #93989a;
`;

const Title = styled.div`
  font-family: IBMPlexSansKRRegular;
  font-weight: 700;
  font-size: 2.4rem;
  color: #ffffff;
`;

const Upper = styled.div`
  border-bottom: 0.1rem solid #2b2e41;
  padding-bottom: 4rem;
`;

const Container = styled.footer`
  width: 100%;
  bottom: 0;
  background-color: #18181b;
  height: 34rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterWrapper = styled.div`
  width: 80%;
  height: 22rem;
`;

const Lower = styled.div`
  position: relative;
  margin-top: 4rem;
  display: flex;
`;
