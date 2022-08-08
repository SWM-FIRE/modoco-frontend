import styled from 'styled-components';
import { ReactComponent as DeleteTag } from '../../../assets/svg/deleteTag.svg';

export default function TagsComponent({
  newTag,
  tags,
  onChange,
  onKeyPress,
  onDeleteTag,
}) {
  return (
    <>
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
