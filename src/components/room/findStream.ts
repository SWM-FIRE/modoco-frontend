const findStream = ({ sid, connectedUsers, userStream }) => {
  const user = connectedUsers.find((user) => user?.sid === sid);
  if (user) {
    return userStream[user?.sid];
  }
  return null;
};

export default findStream;
