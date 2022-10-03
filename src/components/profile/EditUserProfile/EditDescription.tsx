import styled from 'styled-components';

export default function EditDescription({ description, onChange }) {
  return (
    <Section>
      <Input
        id="description"
        type="text"
        name="description"
        value={description}
        onChange={onChange}
        placeholder="자기소개를 입력해주세요."
      />
    </Section>
  );
}

const Section = styled.p`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding-top: 2rem;
`;

const Input = styled.input`
  height: 4.9rem;
  padding: 1.2rem 0.8rem;
  color: #e2e8f0;
  background-color: #191f28;
  font-size: 1.4rem;
  font-family: IBMPlexMonoRegular;
  border-radius: 0.6rem;
`;
