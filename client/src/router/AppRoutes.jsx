import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import RootLayout from "../pages/RootLayout";
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import ProfileLayout from '../pages/ProfileLayout';
import ProfilePage from '../pages/ProfilePage';
import EditProfilePage from '../pages/EditProfilePage';
import ProtectedRoute from '../components/ProtectedRoute';
import AuthLayout from '../pages/AuthLayout';
import SignUpPage from '../pages/SignUpPage';
import LogInPage from '../pages/LogInPage';

import { userLoader, dataLoader } from '../api/loaders';
import ProjectLayout from '../pages/ProjectLayout';
import ProjectPage from '../pages/ProjectPage';
import AddProjectPage from '../pages/AddProjectPage';
import ReadProjectPage from '../pages/ReadProjectPage';

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
            <ProfileLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <ProfilePage /> },
          { path: 'edit-profile', element: <EditProfilePage /> },
        ],
      },
      {
        path: 'project',
        element: (
          <ProtectedRoute>
            <ProjectLayout />
          </ProtectedRoute>
        ),
        children: [
          { 
            index: true,
            element: <ProjectPage />,
            loader: () => dataLoader('projects'),
          },
          { path: 'add-project' , element: <AddProjectPage /> },
          { 
            path: ':projectId/read-project',
            element: <ReadProjectPage />,
          },
        ]
      }
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
  return <RouterProvider router={router} />
};

export default AppRoutes;
