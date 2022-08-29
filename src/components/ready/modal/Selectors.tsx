import styled from 'styled-components';
import { ReactComponent as CameraSetting } from '../../../assets/svg/videoSetting.svg';
import { ReactComponent as MicSetting } from '../../../assets/svg/micSetting.svg';
import { ReactComponent as SpeakerSetting } from '../../../assets/svg/headphoneSetting.svg';
import { ReactComponent as BottomArrow } from '../../../assets/svg/bottomArrowSetting.svg';

export default function Selectors() {
  return (
    <Container>
      <SelectorContainer>
        <Selector>
          <SelectorTitle>
            <CameraSetting />
            카메라
          </SelectorTitle>
          <CameraDropDown>
            TEST
            <BottomArrow />
          </CameraDropDown>
        </Selector>
        <Selector>
          <SelectorTitle>
            <MicSetting />
            마이크
          </SelectorTitle>
          <CameraDropDown>
            TEST
            <BottomArrow />
          </CameraDropDown>
        </Selector>
        <Selector>
          <SelectorTitle>
            <SpeakerSetting />
            스피커
          </SelectorTitle>
          <CameraDropDown>
            TEST
            <BottomArrow />
          </CameraDropDown>
        </Selector>
      </SelectorContainer>
    </Container>
  );
}

const SelectorTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.9rem;
  line-height: 2.9rem;
  font-size: 1.4rem;
  color: #d1d5d8;
  font-family: IBMPlexSansKRRegular;
`;

const Selector = styled.div``;

const SelectorContainer = styled.div`
  height: 100%;
  width: 26.5rem;
  @media (max-width: 1080px) {
    width: 41.9rem;
  }
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const CameraDropDown = styled.div`
  width: 100%;
  padding: 1.3rem 1.6rem;
  height: 4.9rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: IBMPlexSansKRRegular;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 2.9rem;
  color: #ffffff;
  cursor: pointer;
`;

const Container = styled.div`
  width: calc(100% - 56.8rem);
  height: 36.8rem;
  @media (max-width: 1080px) {
    width: 100%;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;
