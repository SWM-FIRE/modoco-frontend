import styled from 'styled-components';
import React from 'react';
import { ReactComponent as DeleteTag } from '../../../assets/svg/deleteTag.svg';
import { ReactComponent as Up } from '../../../assets/svg/up.svg';
import { ReactComponent as Down } from '../../../assets/svg/down.svg';
import Theme from '../../../theme.json';
import useCreateRoom from '../../../hooks/useCreateRoom';

export default function CreateRoomForm() {
  const { inputs, onChange, onKeyPress, onDeleteTag, onSubmit } =
    useCreateRoom();
  const { title, details, total, theme, newTag, tags } = inputs;

  return (
    <Form>
      <Section>
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
      </Section>
      <Section>
        <Label htmlFor="details">설명</Label>
        <Input
          id="details"
          name="details"
          type="text"
          value={details}
          onChange={onChange}
          placeholder="설명을 입력해주세요."
        />
      </Section>
      <Section>
        <Label htmlFor="tag">태그</Label>
        <Input
          id="tag"
          name="newTag"
          type="text"
          value={newTag}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder="태그 입력후 Enter를 눌러주세요."
        />
        <Tags>
          {tags.map((myTag, index) => (
            <TagComponent key={myTag.concat(`${index}`)}>
              <Tag key={myTag}>#{myTag}</Tag>
              <TagButton type="button" onClick={(e) => onDeleteTag(e, index)}>
                <DeleteTag />
              </TagButton>
            </TagComponent>
          ))}
        </Tags>
      </Section>
      <Section>
        <Label htmlFor="total">최대 인원 수 *</Label>
        <div style={{ width: '100%', display: 'flex' }}>
          <Select
            id="total"
            name="total"
            placeholder="최대 인원 수를 선택해주세요."
            required
            value={total}
            onChange={onChange}
          >
            <option value="" disabled selected>
              최대 인원 수를 선택해주세요.
            </option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </Select>
          <SelectIcon>
            <Up />
            <Down />
          </SelectIcon>
        </div>
      </Section>
      <Section>
        <Label htmlFor="theme">테마 *</Label>
        <div style={{ width: '100%', display: 'flex' }}>
          <Select
            id="theme"
            name="theme"
            placeholder="테마를 선택해주세요."
            required
            value={theme}
            onChange={onChange}
          >
            <option value="" disabled selected>
              원하는 방 테마를 선택해주세요.
            </option>
            {Theme.map((theme) => (
              <option value={theme.value} key={theme.value}>
                {theme.name}
              </option>
            ))}
          </Select>
          <SelectIcon>
            <Up />
            <Down />
          </SelectIcon>
        </div>
      </Section>
      <Submit onClick={onSubmit}>방 생성하기</Submit>
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
  overflow-y: auto;
`;

const Section = styled.div`
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

const Tags = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-top: 1.65rem;
`;

const TagComponent = styled.div`
  display: flex;
  align-items: center;
  border-radius: 0.6rem;
  background-color: rgba(69, 178, 107, 0.1);
  padding: 0.5rem 1rem;
`;

const TagButton = styled.button`
  cursor: pointer;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Tag = styled.div`
  color: rgba(69, 178, 107, 1);
  font-family: IBMPlexSansKRRegular, Arial;
`;

const Select = styled.select`
  width: 95%;
  height: 4.9rem;
  margin-top: 0.25rem;
  background: transparent;
  outline: none;
  border: none;
  color: #f9fafb;
  font-size: 1.5rem;
  background-color: #080909;
  border-top-left-radius: 0.6rem;
  border-bottom-left-radius: 0.6rem;
  padding: 0 1.6rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  :required:invalid {
    color: #909090;
  }
  option[value=''][disabled] {
    display: none;
  }
`;

const SelectIcon = styled.div`
  width: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.9rem;
  margin-top: 0.25rem;
  background: transparent;
  outline: none;
  border: none;
  color: #f9fafb;
  font-size: 1.5rem;
  background-color: #080909;
  border-top-right-radius: 0.6rem;
  border-bottom-right-radius: 0.6rem;
  gap: 0.6rem;
  flex-direction: column;
`;

const Submit = styled.button`
  color: #111827;
  border-radius: 1rem;
  min-height: 5.5rem;
  width: 100%;
  font-size: 1.5rem;
  font-family: IBMPlexSansKRRegular, Arial;
  background-color: #f3f4f6;
  margin-top: 7.85rem;
  cursor: pointer;
`;
