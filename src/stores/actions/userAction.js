const updateUser = user => {
  console.log('userrrrrrrrrrrrrr', user);
  return {
    type: 'UPDATE_USER',
    user,
  };
};

const setAllTeachers = res => {
  // console.log('setAllTeachers', res);
  return {
    type: 'ALL_TEACHINGS',
    res,
  };
};

const removeUser = remove => {
  return {
    type: 'REMOVE_USER',
    user: '',
  };
};

export { updateUser, setAllTeachers, removeUser };
