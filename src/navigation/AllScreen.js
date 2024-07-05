import React, { useState } from 'react';
import MainNavigation from './navigation';
import { useSelector } from 'react-redux';
import StudentNavigation from './StudentNavigation';
import Auth from './Auth';

const AllScreens = () => {
  const Role = 'Student';
  const token = false;

  return token ? (
    Role == 'Student' ? (
      <StudentNavigation />
    ) : (
      <MainNavigation />
    )
  ) : (
    <Auth />
  );
};

export default AllScreens;
