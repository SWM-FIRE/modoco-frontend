import styled from 'styled-components';

export default function Email() {
  return (
    <Section>
      <Label htmlFor="email">이메일 *</Label>
      <Input type="text" id="email" placeholder="이메일을 입력해주세요." />
      <Error>필수 정보 입니다.</Error>
      <Error>이메일 형식을 확인해주세요.</Error>
    </Section>
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
