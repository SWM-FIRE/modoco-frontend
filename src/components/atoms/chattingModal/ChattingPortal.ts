import ReactDOM from 'react-dom';

const ChattingPortal = ({ children }) => {
  const el = document.getElementById('chatting-modal');
  return ReactDOM.createPortal(children, el);
};

export default ChattingPortal;
