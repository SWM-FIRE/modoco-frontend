import styled from 'styled-components';
import React from 'react';
import Title from './Title';
import Details from './Details';
import TagsComponent from './Tag';
import Theme from './Theme';
import Total from './Total';
import Private from './Private';

export default function CreateRoomForm({
  inputs,
  onChange,
  onKeyPress,
  onDeleteTag,
  mutate,
  onClickTheme,
  onClickTotal,
  isDisable,
  onAddTag,
}) {
  const { title, details, total, newTag, tags, isPublic, password } = inputs;

  return (
    <Form onSubmit={mutate}>
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
          onAddTag={onAddTag}
        />
      </Section>
      <Total total={total} onClickTotal={onClickTotal} />
      <Theme onClickTheme={onClickTheme} />
      <Private isPublic={isPublic} password={password} onChange={onChange} />
      <Submit data-cy="create-room-modal-create" disabled={isDisable()}>
        방 생성하기
      </Submit>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  color: #b0b8c1;
  font-size: 1.4rem;
  font-family: IBMPlexSansKRRegular, Arial;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
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
  margin-top: 4rem;
  cursor: pointer;
  :disabled {
    cursor: default;
    background-color: #a9afb8;
  }
`;
