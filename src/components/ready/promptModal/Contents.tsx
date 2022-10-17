import styled from 'styled-components';

export default function Contents() {
  return (
    <Component>
      <Title>modoco에서 마이크를 사용하도록 허용</Title>
      다른 참가자들이 내 음성을 들으려면 mocodo에서 마이크에 엑세스할 수 있어야
      합니다. 사용하는 각 브라우저와 컴퓨터에서 사용 권한을 확인할 것을 요청하는
      modoco의 메세지가 표시됩니다.
      <br />
      만약 메세지가 표시되지 않을 경우 브라우저의 주소 표시줄에서 마이크
      아이콘을 클릭하여 직접 허용할 수 있습니다.
    </Component>
  );
}

const Component = styled.div`
  font-size: 1.4rem;
  padding: 3rem 4rem 6rem 4rem;
  color: lightGray;
`;

const Title = styled.div`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: white;
`;
