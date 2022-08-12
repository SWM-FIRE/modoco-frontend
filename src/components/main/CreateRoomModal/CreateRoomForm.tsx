import styled from 'styled-components';
import React from 'react';
import Title from './Title';
import Details from './Details';
import TagsComponent from './Tag';
import Theme from './Theme';
import Total from './Total';

export default function CreateRoomForm({
  inputs,
  onChange,
  onKeyPress,
  onDeleteTag,
  mutate,
}) {
  const { title, details, total, theme, newTag, tags } = inputs;

  return (
    <Form>
      <Section>
        <Title title={title} onChange={onChange} />
      </Section>
      <Section>
        <Details details={details} onChange={onChange} />
      </Section>
      <Section>
        <TagsComponent
          newTag={newTag}
          tags={tags}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onDeleteTag={onDeleteTag}
        />
      </Section>
      <Section>
        <Total total={total} onChange={onChange} />
      </Section>
      <Section>
        <Theme theme={theme} onChange={onChange} />
      </Section>
      <Submit
        onClick={() => {
          mutate();
        }}
      >
        방 생성하기
      </Submit>
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
