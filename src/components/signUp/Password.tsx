import styled from 'styled-components';

export default function Password() {
  return (
    <>
      <Section>
        <Label htmlFor="password">비밀번호 *</Label>
        <Input
          type="password"
          id="password"
          placeholder="8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
        />
        <Error>8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</Error>
      </Section>
      <Section>
        <Label htmlFor="passwordCheck">비밀번호 확인 *</Label>
        <Input
          type="password"
          id="passwordCheck"
          placeholder="비밀번호를 다시 입력해주세요."
        />
        <Error>필수 정보 입니다.</Error>
        <Error>비밀번호가 일치하지 않습니다.</Error>
      </Section>
    </>
  );
}

const Section = styled.p`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 3rem;
`;

const Label = styled.label`
  color: #b0b8c1;
  font-size: 1.4rem;
`;

const Input = styled.input`
  margin-top: 1.2rem;
  height: 4.9rem;
  padding-left: 1.6rem;
  color: #f9fafb;
  background-color: #191f28;
  font-size: 1.5rem;
  font-family: IBMPlexSansKRRegular;
  border-radius: 0.6rem;
`;

const Error = styled.span`
  color: #ed8e8e;
  margin-top: 0.5rem;
`;
