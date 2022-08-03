// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import GlobalStyle from './styles/global';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);
root.render(
  // <StrictMode>
  <>
    <GlobalStyle />
    <App />
  </>,
  // </StrictMode>,
);
