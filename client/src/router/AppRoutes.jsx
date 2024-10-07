import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import RootLayout from "../pages/RootLayout";
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import SignUpPage from '../pages/SignUpPage';
import LogInPage from '../pages/LogInPage';
import ProfilePage from '../pages/ProfilePage';
import ShowProfilePage from '../pages/ShowProfilePage';
import EditProfilePage from '../pages/EditProfilePage';
import ProtectedRoute from '../components/ProtectedRoute';

import { userLoader } from '../api/loaders';
import AuthLayout from '../pages/AuthLayout';

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
  return <RouterProvider router={router} />;
};

export default AppRoutes;
