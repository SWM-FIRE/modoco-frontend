import styled from 'styled-components';

export default function Group({ groups }: { groups: string[] }) {
  return (
    <Components>
      {groups.map((group, index) => (
        <GroupItem key={Symbol(index).toString()}>{group}</GroupItem>
      ))}
    </Components>
  );
}

const Components = styled.div`
  margin-top: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #f9fafb;
  flex-wrap: wrap;
`;

const GroupItem = styled.span`
  background-color: rgba(248, 250, 252, 0.1);
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.4rem 1.2rem;
  height: 2.6rem;
`;
