import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { ReactComponent as SettingIcon } from '../../assets/svg/settings.svg';

export default function Settings({
  setSetting,
}: {
  setSetting: Dispatch<SetStateAction<boolean>>;
}) {
  const openSetting = (element: React.MouseEvent<HTMLButtonElement>) => {
    element.preventDefault();
    setSetting(true);
  };
  return (
    <SettingContainer data-cy="ready-setting-container">
      <Message>코딩방 입장 전 화면과 오디오 상태를 체크하는 곳입니다</Message>
      <Setting onClick={openSetting} data-cy="ready-setting-button">
        <SettingIcon />
        기기 설정
      </Setting>
    </SettingContainer>
  );
}
const Message = styled.div`
  font-family: IBMPlexSansKRRegular;
  line-height: 2.4rem;
  color: #9ca3af;
  font-weight: 400;
  font-size: 1.6rem;
`;

const SettingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Setting = styled.button`
  background-color: white;
  width: 10.9rem;
  height: 4.8rem;
  border-radius: 5rem;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  gap: 0.4rem;
  line-height: 2.4rem;
  font-family: IBMPlexSansKRRegular;
  font-size: 1.6rem;
  cursor: pointer;
`;
