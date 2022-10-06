import styled from 'styled-components';
import media from 'src/styles/media';
import MyAvatar from '../../../assets/avatar/MyAvatar';
import { ReactComponent as RefreshIcon } from '../../../assets/svg/RefreshIcon.svg';

export default function EditAvatar({ avatar, onChangeAvatar }) {
  return (
    <SetupButton type="button" onClick={onChangeAvatar}>
      <AvatarContainer>
        <Background id="backgroundContainer" />
        <MyAvatar num={avatar} />
        <IconContainer>
          <RefreshIcon />
        </IconContainer>
      </AvatarContainer>
    </SetupButton>
  );
}

const SetupButton = styled.button`
  position: relative;
  cursor: pointer;
  width: 12rem;
  height: 12rem;
  &:hover {
    #backgroundContainer {
      background-color: #00000080;
    }
  }
  min-width: 12rem;
  ${media.small} {
    width: 8rem;
    min-width: 8rem;
  }
`;

const AvatarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: fit-content;
  width: fit-content;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  /* height: 100%; */
  min-width: 12rem;
  svg {
    height: 100%;
    width: 100%;
  }
  ${media.small} {
    width: 8rem;
    min-width: 8rem;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 100%;
`;
