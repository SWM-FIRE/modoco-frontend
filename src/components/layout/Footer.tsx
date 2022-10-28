import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  const navigateTerms = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/support/terms');
  };
  const navigatePrivacy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/support/privacy');
  };
  const navigateFAQ = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.open(
      'https://coding-groot.notion.site/coding-groot/477c523b4a1240a68833086969c2d62f?v=364afbf38869452292a06fd672db4357',
      '_blank',
    );
  };
  const navigateGit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.open('https://github.com/SWM-FIRE', '_blank');
  };

  return (
    <Container data-cy="main-footer">
      <FooterWrapper>
        <Upper>
          <Title data-cy="footer-title">modoco</Title>
          <Company>(주)모도코 | Team : FIRE</Company>
          <Detail data-cy="footer-detail">
            {/* 사업자 등록번호 : 123-44-56789 | 대표 : 홍길동 <br /> */}
            서울특별시 강남구 테헤란로 311 59-12 아남타워 7층
            <br />
            Contact : 010-6449-3924 | yeonggi@kakao.com
          </Detail>
        </Upper>
        <Lower>
          <Copyright data-cy="footer-copyright">
            &copy; {new Date().getFullYear()} All rights reserved
          </Copyright>
          <Other>
            <OtherButton onClick={navigateGit}>Github</OtherButton>|
            <OtherButton onClick={navigateFAQ}>FAQ</OtherButton>|
            <OtherButton
              data-cy="footer-privacy-policy"
              style={{ fontWeight: 600 }}
              onClick={navigatePrivacy}
            >
              Privacy Policy
            </OtherButton>
            |
            <OtherButton data-cy="footer-terms" onClick={navigateTerms}>
              Terms
            </OtherButton>
          </Other>
        </Lower>
      </FooterWrapper>
    </Container>
  );
}

const OtherButton = styled.button`
  color: #93989a;
  &:hover {
    cursor: pointer;
  }
`;

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
