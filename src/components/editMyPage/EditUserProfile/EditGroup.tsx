import styled from 'styled-components';
import { ReactComponent as CompanyImage } from '../../../assets/svg/Company.svg';

export default function Group() {
  return (
    <Components>
      <Company>
        <CompanyImage />
        회사
      </Company>
      <GroupItem>그룹</GroupItem>
    </Components>
  );
}

const Components = styled.div`
  margin-top: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #f9fafb;
`;

const Company = styled.span`
  background-color: rgba(248, 250, 252, 0.1);
  font-size: 1.4rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 0.4rem 1.2rem;
  gap: 0.5rem;
  height: 2.6rem;
`;

const GroupItem = styled.span`
  background-color: rgba(248, 250, 252, 0.1);
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.4rem 1.2rem;
  height: 2.6rem;
`;
