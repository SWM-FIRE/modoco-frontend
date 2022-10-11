/* eslint-disable camelcase */
import styled from 'styled-components';
import media from 'src/styles/media';
import { ReactComponent as Github } from '../../../assets/svg/Github.svg';
import { ReactComponent as Mail } from '../../../assets/svg/Mail.svg';
import { ReactComponent as Globe } from '../../../assets/svg/Globe.svg';

export default function EditLinks({
  email,
  github_link,
  blog_link,
  onChange,
}: {
  email: string;
  github_link: string;
  blog_link: string;
  onChange: (_e: any) => void;
}) {
  return (
    <Links>
      <LinkItem>
        <IconSize>
          <Mail />
        </IconSize>
        <Inputs
          style={{ width: '25rem' }}
          id="email"
          type="text"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="이메일을 입력해주세요"
        />
      </LinkItem>
      <LinkItem>
        <IconSize>
          <Github style={{ width: '90%', height: '90%' }} />
        </IconSize>
        <Text>https://github.com/</Text>
        <Inputs
          style={{ width: '12rem' }}
          id="github_link"
          type="text"
          name="github_link"
          value={github_link}
          onChange={onChange}
          placeholder="깃허브 계정을 입력해주세요"
        />
      </LinkItem>
      <LinkItem>
        <IconSize>
          <Globe />
        </IconSize>
        <Inputs
          style={{ width: '25rem' }}
          id="blog_link"
          type="text"
          name="blog_link"
          value={blog_link}
          onChange={onChange}
          placeholder="블로그 주소를 입력해주세요"
        />
      </LinkItem>
    </Links>
  );
}

const Inputs = styled.input`
  width: 100%;
  border: none;
  background-color: rgba(0, 0, 0, 0.4);
  color: #f9fafb;
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.4rem 1.2rem;
  border-radius: 0.5rem;
  &:focus {
    outline: none;
  }
`;

const Text = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: #f9fafb;
  margin-left: 0.5rem;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.6rem;
  margin-top: 0.4rem;
  ${media.small} {
    margin-top: 0.2rem;
    gap: 0.8rem;
  }
`;

const LinkItem = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;

const IconSize = styled.div`
  color: black;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.3);
  }
  border-radius: 0.5rem;
  svg {
    width: 100%;
    height: 100%;
  }
`;
