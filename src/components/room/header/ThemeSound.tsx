import campingOST from '../../../assets/sound/camping.mp3';
import cosmosOST from '../../../assets/sound/cosmos.mp3';
import fireOST from '../../../assets/sound/fire.mp3';
import oceanOST from '../../../assets/sound/ocean.mp3';
import travelOST from '../../../assets/sound/travel.mp3';

export default function ThemeSound({ theme, volumeRef }) {
  console.log('sound theme', theme);

  let myTheme;
  switch (theme) {
    case 'fire':
      myTheme = fireOST;
      break;
    case 'ocean':
      myTheme = oceanOST;
      break;
    case 'camping':
      myTheme = campingOST;
      break;
    case 'cosmos':
      myTheme = cosmosOST;
      break;
    case 'travel':
      myTheme = travelOST;
      break;
    default:
      myTheme = fireOST;
      break;
  }

  return (
    <audio ref={volumeRef} src={myTheme} autoPlay loop>
      <track kind="captions" />
    </audio>
  );
}
