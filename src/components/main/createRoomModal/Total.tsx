import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Up } from '../../../assets/svg/up.svg';
import { ReactComponent as Down } from '../../../assets/svg/down.svg';
import Error from './Error';

export default function Total({ total, onClickTotal }) {
  const [isDropDown, setIsDropDown] = useState(false);
  const [error, setError] = useState(false);

  const onClickOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClickTotal(e);
    setIsDropDown(false);
    setError(false);
  };

  const onClickSelect = () => {
    setIsDropDown(!isDropDown);
    if (!isDropDown) return;
    if (total === '') {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <Component>
      <Label>최대 인원 수 *</Label>
      <SelectButton type="button" onClick={onClickSelect}>
        <Select
          isTotalSelected={total !== ''}
          data-cy="create-room-modal-total"
        >
          {total === '' ? '방 인원수를 선택해주세요' : total}
        </Select>
        <SelectIcon>
          <Up />
          <Down />
        </SelectIcon>
      </SelectButton>
      {isDropDown && (
        <DropDownPosition>
          <DropDown data-cy="create-room-modal-total-dropdown">
            <Option onClick={onClickOption} type="button">
              2
            </Option>
            <Option onClick={onClickOption} type="button">
              3
            </Option>
            <Option onClick={onClickOption} type="button">
              4
            </Option>
          </DropDown>
        </DropDownPosition>
      )}
      {error && <Error />}
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.9rem;
  width: 100%;
  position: relative;
`;

const Label = styled.label`
  width: 100%;
  line-height: 2.9rem;
`;

const SelectButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  height: 4.9rem;
  margin-top: 0.25rem;
  background-color: #191f28;
  border-radius: 0.6rem;
  padding: 1.3rem 1.6rem;
  cursor: pointer;
`;

const Select = styled.div<{ isTotalSelected: boolean }>`
  width: 95%;
  outline: none;
  border: none;
  color: ${(props) => (props.isTotalSelected ? '#f9fafb' : 'gray')};
  font-size: 1.5rem;
  text-align: left;
`;

const SelectIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  width: 5%;
`;

const DropDownPosition = styled.div`
  position: absolute;
  top: 8.4rem;
  left: 0;
  width: 100%;
  overflow: hidden;
  z-index: 1;
`;

const DropDown = styled.div`
  background-color: #191f28;
  border-radius: 0.6rem;
  @keyframes dropdown {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  animation: dropdown 0.4s ease;
`;

const Option = styled.button`
  width: 100%;
  color: #f1f5f9;
  font-family: IBMPlexSansKRRegular;
  font-size: 1.5rem;
  height: 4.9rem;

  &:hover {
    border-radius: 0.6rem;
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
  }
`;
