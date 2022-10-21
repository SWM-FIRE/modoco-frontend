import styled from 'styled-components';
import Cosmos from '../../assets/theme/cosmos.png';
import Fire from '../../assets/theme/fire.png';
import Ocean from '../../assets/theme/ocean.png';
import Travel from '../../assets/theme/travel.png';
import Camping from '../../assets/theme/camp.png';
import { ReactComponent as Bar } from '../../assets/svg/Room/Bar.svg';

export default function ThemeImage({ theme, type }) {
  if (theme === 'cosmos') {
    return (
      <Component>
        <Img src={Cosmos} alt="cosmos" />
        {type === 'block' && (
          <>
            <Name>우주</Name>
            <Bar />
          </>
        )}
      </Component>
    );
  }
  if (theme === 'fire') {
    return (
      <Component>
        <Img src={Fire} alt="fire" />
        {type === 'block' && (
          <>
            <Name>모닥불</Name>
            <Bar />
          </>
        )}
      </Component>
    );
  }
  if (theme === 'ocean') {
    return (
      <Component>
        <Img src={Ocean} alt="ocean" />
        {type === 'block' && (
          <>
            <Name>바다</Name>
            <Bar />
          </>
        )}
      </Component>
    );
  }
  if (theme === 'travel') {
    return (
      <Component>
        <Img src={Travel} alt="travel" />
        {type === 'block' && (
          <>
            <Name>여행</Name>
            <Bar />
          </>
        )}
      </Component>
    );
  }
  if (theme === 'camping') {
    return (
      <Component>
        <Img src={Camping} alt="camping" />
        {type === 'block' && (
          <>
            <Name>캠핑</Name>
            <Bar />
          </>
        )}
      </Component>
    );
  }
}

const Img = styled.img`
  width: 2rem;
  height: 2rem;
`;

const Component = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
`;

const Name = styled.span`
  color: rgba(255, 255, 255, 0.8);
`;
