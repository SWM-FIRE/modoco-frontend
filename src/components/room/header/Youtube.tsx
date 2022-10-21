import styled from 'styled-components';
import { ReactComponent as WhiteYoutube } from '../../../assets/svg/WhiteYoutube.svg';
import { ReactComponent as GrayYoutube } from '../../../assets/svg/GrayYoutube.svg';

export default function Youtube({ type, setType }) {
  const onClickYoutubeButton = () => {
    setType(type === 'youtube' ? 'theme' : 'youtube');
  };
  return (
    <YoutubeButton onClick={onClickYoutubeButton}>
      {type === 'youtube' ? <WhiteYoutube /> : <GrayYoutube />}
    </YoutubeButton>
  );
}

const YoutubeButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.8rem;
  svg {
    width: 100%;
    height: 100%;
  }
`;
