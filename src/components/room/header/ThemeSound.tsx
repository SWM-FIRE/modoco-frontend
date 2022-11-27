export default function ThemeSound({ theme, volumeRef }) {
  let myTheme: string;
  switch (theme) {
    case 'fire':
      myTheme = 'https://s3.modocode.com/fire.mp3';
      break;
    case 'ocean':
      myTheme = 'https://s3.modocode.com/ocean.mp3';
      break;
    case 'camping':
      myTheme = 'https://s3.modocode.com/camping.mp3';
      break;
    case 'cosmos':
      myTheme = 'https://s3.modocode.com/cosmos.mp3';
      break;
    case 'travel':
      myTheme = 'https://s3.modocode.com/travel.mp3';
      break;
    default:
      myTheme = 'https://s3.modocode.com/fire.mp3';
      break;
  }

  return (
    <audio ref={volumeRef} src={myTheme} autoPlay loop>
      <track kind="captions" />
    </audio>
  );
}
