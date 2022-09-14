import { useSearchParams } from 'react-router-dom';

export default function Auth() {
  const [token] = useSearchParams();
  const accessToken = token.get('access_token');
  if (accessToken) {
    localStorage.setItem('access_token', accessToken);
    console.log(accessToken);
    window.location.href = '/main';
  }
  return <div>waiting for OAuth login</div>;
}
