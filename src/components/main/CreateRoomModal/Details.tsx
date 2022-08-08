import styled from 'styled-components';

export default function Details({ details, onChange }) {
  return (
    <>
      <Label htmlFor="details">설명</Label>
      <Input
        id="details"
        name="details"
        type="text"
        value={details}
        onChange={onChange}
        placeholder="설명을 입력해주세요."
      />
    </>
  );
}

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
