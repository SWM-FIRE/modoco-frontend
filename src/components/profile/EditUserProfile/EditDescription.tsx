/* eslint-disable camelcase */
import styled from 'styled-components';
import media from 'src/styles/media';

export default function EditDescription({ status_quo, onChange }) {
  return (
    <Section>
      <Input
        id="status_quo"
        type="text"
        name="status_quo"
        value={status_quo || ''}
        onChange={onChange}
        placeholder="자기소개를 입력해주세요."
      />
    </Section>
  );
}

const Section = styled.p`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 2rem;
  ${media.small} {
    width: 100%;
  }
`;

const Input = styled.input`
  height: 4.9rem;
  padding: 1.2rem 0.8rem;
  color: #e2e8f0;
  background-color: rgba(0, 0, 0, 0.4);
  font-size: 1.4rem;
  font-family: IBMPlexMonoRegular;
  border-radius: 0.6rem;
`;
