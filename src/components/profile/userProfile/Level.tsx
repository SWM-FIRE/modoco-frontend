import styled from 'styled-components';
import { ReactComponent as Level1 } from '../../../assets/svg/Level/Level1.svg';
import { ReactComponent as Level2 } from '../../../assets/svg/Level/Level2.svg';
import { ReactComponent as Level3 } from '../../../assets/svg/Level/Level3.svg';
import { ReactComponent as Level4 } from '../../../assets/svg/Level/Level4.svg';
import { ReactComponent as Level5 } from '../../../assets/svg/Level/Level5.svg';

export default function Level({ level, lowerLevel }) {
  let levelComponent;
  switch (level) {
    case 1:
      levelComponent = <Level1 />;
      break;
    case 2:
      levelComponent = <Level2 />;
      break;
    case 3:
      levelComponent = <Level3 />;
      break;
    case 4:
      levelComponent = <Level4 />;
      break;
    case 5:
      levelComponent = <Level5 />;
      break;
    default:
      levelComponent = <Level1 />;
      break;
  }
  return (
    <Component>
      {levelComponent}
      <LowerLevel>{lowerLevel}</LowerLevel>
    </Component>
  );
}

const Component = styled.div`
  position: relative;
`;

const LowerLevel = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  background-color: rgba(255, 192, 31, 0.2);
  border-radius: 5rem;
  position: absolute;
  right: -1rem;
  top: -0.3rem;
  color: #ffc01f;
  font-family: IBMPlexSansKRRegular;
  display: flex;
  align-items: center;
  justify-content: center;
`;
