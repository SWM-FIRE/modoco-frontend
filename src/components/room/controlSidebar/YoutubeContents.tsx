import styled from 'styled-components';
import { ReactComponent as RightTwoArrows } from '../../../assets/svg/Room/RightTwoArrows.svg';
import { ReactComponent as WhiteYoutube } from '../../../assets/svg/WhiteYoutube.svg';

export default function YoutubeContents() {
  return (
    <>
      <SvgComponent>
        <WhiteYoutube />
      </SvgComponent>
      <RightTwoArrows />
    </>
  );
}

const SvgComponent = styled.div`
  width: 3.4rem;
  height: 2.8rem;
  svg {
    width: 100%;
    height: 100%;
  }
`;
