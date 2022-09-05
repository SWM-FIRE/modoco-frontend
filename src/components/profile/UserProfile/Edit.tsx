import styled from 'styled-components';
import { ReactComponent as EditProfile } from '../../../assets/svg/EditProfile.svg';

export default function Edit() {
  return (
    <Components>
      <EditProfile />
    </Components>
  );
}

const Components = styled.div`
  position: absolute;
  right: 3.2rem;
  top: 4.4rem;
  cursor: pointer;
`;
