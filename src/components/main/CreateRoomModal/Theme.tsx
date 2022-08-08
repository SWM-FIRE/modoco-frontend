import styled from 'styled-components';
import themeJson from '../../../theme.json';
import { ReactComponent as Up } from '../../../assets/svg/up.svg';
import { ReactComponent as Down } from '../../../assets/svg/down.svg';

export default function Theme({ theme, onChange }) {
  return (
    <>
      <Label htmlFor="theme">테마 *</Label>
      <div style={{ width: '100%', display: 'flex' }}>
        <Select
          id="theme"
          name="theme"
          placeholder="테마를 선택해주세요."
          required
          value={theme}
          onChange={onChange}
        >
          <option value="" disabled selected>
            원하는 방 테마를 선택해주세요.
          </option>
          {themeJson.map((theme) => (
            <option value={theme.value} key={theme.value}>
              {theme.name}
            </option>
          ))}
        </Select>
        <SelectIcon>
          <Up />
          <Down />
        </SelectIcon>
      </div>
    </>
  );
}

const Label = styled.label`
  width: 100%;
  line-height: 2.9rem;
`;

const Select = styled.select`
  width: 95%;
  height: 4.9rem;
  margin-top: 0.25rem;
  background: transparent;
  outline: none;
  border: none;
  color: #f9fafb;
  font-size: 1.5rem;
  background-color: #080909;
  border-top-left-radius: 0.6rem;
  border-bottom-left-radius: 0.6rem;
  padding: 0 1.6rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  :required:invalid {
    color: #909090;
  }
  option[value=''][disabled] {
    display: none;
  }
`;

const SelectIcon = styled.div`
  width: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.9rem;
  margin-top: 0.25rem;
  background: transparent;
  outline: none;
  border: none;
  color: #f9fafb;
  font-size: 1.5rem;
  background-color: #080909;
  border-top-right-radius: 0.6rem;
  border-bottom-right-radius: 0.6rem;
  gap: 0.6rem;
  flex-direction: column;
`;
