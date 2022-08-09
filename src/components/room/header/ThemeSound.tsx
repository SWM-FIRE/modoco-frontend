export default function ThemeSound({ theme, volumeRef }) {
  console.log('sound theme', theme);

  let myTheme: string;
  switch (theme) {
    case 'fire':
      myTheme = 'https://static.modocode.com/fire.mp3';
      break;
    case 'ocean':
      myTheme = 'https://static.modocode.com/ocean.mp3';
      break;
    case 'camping':
      myTheme = 'https://static.modocode.com/camping.mp3';
      break;
    case 'cosmos':
      myTheme = 'https://static.modocode.com/cosmos.mp3';
      break;
    case 'travel':
      myTheme = 'https://static.modocode.com/travel.mp3';
      break;
    default:
      myTheme = 'https://static.modocode.com/fire.mp3';
      break;
  }

  return (
    <audio ref={volumeRef} src={myTheme} autoPlay loop>
      <track kind="captions" />
    </audio>
  );
}
