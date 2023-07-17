const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  const userExists = users.find((e) => e.room === room && e.name === name);
  if (userExists) {
    return { error: `Username is taken !` };
  }
  const user = { id, name, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((e) => e.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => {
  users.find((e) => e.id === id);
};

const getUsersInRoom = (room) => {
  users.filter((e) => e.room === room);
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
