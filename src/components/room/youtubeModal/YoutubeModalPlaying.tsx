import styled from 'styled-components';
import youtubeSearch from '../../../interface/youtubeSearch.interface';

export default function YoutubeModalPlaying({
  playlist,
}: {
  playlist: youtubeSearch[];
}) {
  console.log(playlist);
  const list = playlist.map((item) => item.id.videoId);
  return (
    <Playing>
      <Video
        allowFullScreen
        src={
          `https://www.youtube.com/embed/${list[0]}?controls=1&autoplay=1&disablekb=1` +
          `&playlist=${list.join(',')}`
        }
      />
    </Playing>
  );
}
const Playing = styled.div`
  width: 100%;
  height: 30rem;
  border-top: 1px solid rgba(55, 65, 81, 1);
  padding-top: 1rem;
`;

const Video = styled.iframe`
  background-color: lightGray;
  width: 100%;
  height: 100%;
`;
