const findStream = ({ sid, connectedUsers, userStream }) => {
  const user = connectedUsers.find((user) => user.socketId === sid);
  if (user) {
    return userStream[user.socketId];
  }
  return null;
};

export default findStream;
