import styled from 'styled-components';
import { ReactComponent as X } from '../../../assets/svg/X.svg';

export default function Header({ toggle }: { toggle: (_type) => void }) {
  return (
    <ModalTitle>
      <ExitButton onClick={toggle}>
        <X />
      </ExitButton>
    </ModalTitle>
  );
}

const ExitButton = styled.button`
  cursor: pointer;
`;

const ModalTitle = styled.div`
  display: flex;
  color: #f9fafb;
  margin: 3rem 3rem 0 0;
  font-size: 2rem;
  line-height: 3rem;
  font-family: IBMPlexSansKRRegular;
  align-items: center;
  justify-content: flex-end;
`;
