import React from 'react';
import MainNavigation from './navigation';
import { useSelector } from 'react-redux';
import StudentNavigation from './StudentNavigation';
import Auth from './Auth';

const AllScreens = () => {
  const role = useSelector(state => state.userReducer?.user?.data?.role);
  const token = useSelector(state => state.userReducer?.user?.data?.token);

  return token ? (
    role == 'student' ? (
      <StudentNavigation />
    ) : (
      <MainNavigation />
    )
  ) : (
    <Auth />
  );
};

export default AllScreens;
