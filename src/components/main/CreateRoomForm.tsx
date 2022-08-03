import styled from 'styled-components';

export default function CreateRoomForm() {
  return (
    <Form>
      <Section>
        <Label htmlFor="name">방 이름*</Label>
        <Input id="name" type="text" placeholder="방 이름을 입력해주세요." />
      </Section>
      <Section>
        <Label htmlFor="description">설명*</Label>
        <Input
          id="description"
          type="text"
          placeholder="설명을 입력해주세요."
        />
      </Section>
      <Section>
        <Label htmlFor="tag">태그*</Label>
        <Input
          id="tag"
          type="text"
          placeholder="태그 입력후 Enter를 눌러주세요."
        />
        <Tags />
      </Section>
      <Section>
        <Label htmlFor="max">최대 인원 수*</Label>
        <Select id="max" placeholder="최대 인원 수를 선택해주세요.">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </Select>
      </Section>
      <Section>
        <Label htmlFor="theme">테마*</Label>
        <Select id="theme" placeholder="테마를 선택해주세요.">
          <option value="theme1">모닥불</option>
          <option value="theme2">바다</option>
          <option value="theme3">캠핑</option>
          <option value="theme4">여행</option>
          <option value="theme5">우주인</option>
        </Select>
      </Section>
      <Submit>방 생성하기</Submit>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 1.5rem;
  color: #b0b8c1;
  font-size: 1.4rem;
  font-family: IBMPlexSansKRRegular, Arial;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
  width: 100%;
`;

const Label = styled.label`
  width: 100%;
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

const Tags = styled.div``;

const Select = styled.select`
  width: 100%;
  height: 4.9rem;
  margin-top: 0.25rem;
  background: transparent;
  outline: none;
  border: none;
  color: #f9fafb;
  font-size: 1.5rem;
  background-color: #080909;
  border-radius: 0.6rem;
  padding: 0 1.6rem;
`;

const Submit = styled.button`
  color: #111827;
  border-radius: 1rem;
  height: 5.5rem;
  width: 100%;
  font-size: 1.5rem;
  font-family: IBMPlexSansKRRegular, Arial;
  background-color: #f3f4f6;
  margin-top: 7.85rem;
  cursor: pointer;
`;
