import { Button } from '../../atoms/Button';

export function VideoControls(isScreenShared: any, onScreenShare: any) {
  const handleScreenShare = () => {
    onScreenShare(!isScreenShared);
  };

  return (
    // replace with styled component
    <div
      style={{
        position: 'absolute',
        bottom: '24px',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <div>
        <Button onClick={handleScreenShare}>
          {isScreenShared ? 'Cancel Sharing' : 'Share Screen'}
        </Button>
      </div>
    </div>
  );
}
