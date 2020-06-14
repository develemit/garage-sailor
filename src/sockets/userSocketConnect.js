/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { baseURL } from '../global';

const socket = socketIOClient(baseURL, {
  transports: ['websocket'],
  jsonp: false,
  rejectUnauthorized: false,
});

function useEffectAsync(effect, inputs) {
  useEffect(() => {
    effect();
  }, inputs);
}

export const connectedUsers = (setCount) => {
  useEffectAsync(async () => {
    await socket.on('connectedUsers', (count) => {
      console.log('recieved countUser request!', count);
      setCount(count);
    });
    return () => socket.disconnect();
  }, []);
};

// ** Connects user to Socket ** \\
export const userSocketConnect = (setUsers) => useEffectAsync(async () => {
  socket.on('usersSocket', (users) => {
    console.log('got the users!', users);
    setUsers(users);
  });
  socket.emit('usersSocket', (users) => {
    console.log('getting Initial Users!', users);
    setUsers(users);
  });
  socket.on('connect_error', (error) => {
    console.error('API Error:', error);
    socket.disconnect();
  });

  // setInterval(() => {
  //   postNewUser({ first_name: 'Random Add', last_name: `${Math.random(1, 9999)}` });
  // }, 5000);

  return () => socket.disconnect();
}, []);

export const requestUser = async (user) => {
  const response = await socket.emit('requestUser', user);
  // console.log('user from the other side', res);
  return response;
};

export const getUser = (setUser) => {
  useEffectAsync(async () => {
    socket.on('getUser', (user) => {
      console.log('heard getUser on Client!', user);
      setUser(user);
    });
    return () => socket.disconnect();
  }, []);
};

export const postNewUser = (user) => {
  socket.emit('postNewUser', user);
};

export const deleteUser = (id) => {
  console.log('recieved delete request!', id);
  socket.emit('deleteUser', id);
};

export const editUser = (id, newValue) => {
  console.log('recieved delete request!', id);
  socket.emit('editUser', { id, newValue });
};
