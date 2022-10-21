import styled from 'styled-components';

export default function YoutubeModalPlaying() {
  return (
    <Playing>
      <Video />
    </Playing>
  );
}
const Playing = styled.div`
  width: 100%;
  height: 30rem;
  border-top: 1px solid rgba(55, 65, 81, 1);
  padding-top: 1rem;
`;

const Video = styled.video`
  background-color: lightGray;
  width: 100%;
  height: 100%;
`;
