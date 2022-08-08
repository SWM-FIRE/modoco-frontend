import styled from 'styled-components';

export default function Title({ title, onChange }) {
  return (
    <Container>
      <Label htmlFor="title">방 이름 *</Label>
      <Input
        id="title"
        name="title"
        type="text"
        value={title}
        onChange={onChange}
        placeholder="방 이름을 입력해주세요."
        required
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.9rem;
  width: 100%;
`;

const Label = styled.label`
  width: 100%;
  line-height: 2.9rem;
`;

const Input = styled.input`
  height: 4.9rem;
  width: 100%;
  margin-top: 0.25rem;
  background: transparent;
  outline: none;
  color: #f9fafb;
  font-size: 1.5rem;
  background-color: #080909;
  border-radius: 0.6rem;
  padding: 0 1.6rem;
`;
