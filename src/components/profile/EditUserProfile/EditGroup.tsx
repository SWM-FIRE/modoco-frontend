import React from 'react';
import styled from 'styled-components';
import { ReactComponent as X } from '../../../assets/svg/X.svg';

export default function EditGroup({
  group,
  onChange,
  onEnterGroup,
  newGroup,
}: {
  group: string[];
  onChange: (_e: any) => void;
  onEnterGroup: (_e: React.KeyboardEvent<HTMLElement>) => void;
  newGroup: string;
}) {
  console.log(group);

  const onRemoveGroup = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log('remove group');
  };

  return (
    <Components>
      {group.map((item, index) => (
        <GroupItem key={Symbol(index).toString()} onClick={onRemoveGroup}>
          {item}
          <X />
        </GroupItem>
      ))}
      <AddGroup
        style={{ width: '25rem' }}
        id="newGroup"
        type="text"
        name="newGroup"
        value={newGroup}
        onChange={onChange}
        onKeyPress={onEnterGroup}
        placeholder="그룹 입력 후 엔터"
      />
    </Components>
  );
}

const Components = styled.div`
  margin-top: 0.8rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  color: #f9fafb;
`;

const GroupItem = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(248, 250, 252, 0.1);
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.4rem 1.2rem;
  height: 2.6rem;
  svg {
    margin-left: 0.4rem;
    width: 1.6rem;
    height: 1.6rem;
    &:hover {
      cursor: pointer;
    }
  }
`;

const AddGroup = styled.input`
  background-color: rgba(248, 250, 252, 0.1);
  min-width: 5rem;
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.4rem 1.2rem;
  height: 2.6rem;
  border: none;
  outline: none;
  color: #f9fafb;
  &:hover {
    cursor: pointer;
  }
`;
