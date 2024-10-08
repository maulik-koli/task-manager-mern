import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import RootLayout from "../pages/RootLayout";
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import ShowProfilePage from '../pages/ShowProfilePage';
import EditProfilePage from '../pages/EditProfilePage';
import ProtectedRoute from '../components/ProtectedRoute';
import AuthLayout from '../pages/AuthLayout';
import SignUpPage from '../pages/SignUpPage';
import LogInPage from '../pages/LogInPage';

import { userLoader } from '../api/loaders';
import { setCookie, getCookie, deleteCookie } from '../utils/fuctions'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    loader: async () => {
      const result = await userLoader();
      console.log(result)
      if (result.redirect) {
        return <Navigate to={result.redirect} replace />;
      }
      return result;
    },
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <ShowProfilePage /> },
          { path: 'edit-profile', element: <EditProfilePage /> },
        ],
      },
    ],
  },
  { 
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'signup', element: <SignUpPage /> },
      { path: 'login', element: <LogInPage /> },
    ]
  },
  { path: '*', element: <ErrorPage /> },
]);

const AppRoutes = () => {
  // setCookie('authToken', "333333333333333333eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzA0MWEyZTgyMmZkYTQwYTUwMjljNTUiLCJpYXQiOjE3MjgzNTMwNzIsImV4cCI6MTcyODUyNTg3Mn0.hezFCj2-HWZFzb1tf_xwfH2m04qeeFnxUWo378Q6NAE", 2)
  // const token = getCookie('authToken')
  // console.log(token)
  // deleteCookie('authToken')
  // const token1 = getCookie('authToken')
  // console.log(token1)
  return <RouterProvider router={router} />
};

export default AppRoutes;
