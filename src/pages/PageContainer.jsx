import React from 'react';
import { useRoutes } from 'react-router-dom';

import Login from './login/Login'
import Sign from './sign/Sign';
import NoPermission from './nopermission/NoPermission';

/**
 * 路由配置
 */
export default function PageContainer () {

  const routes = useRoutes([
    { path: "/login", element: <Login />},
    { path: "/sign", element: <Sign />},
    { path: "*", element: <NoPermission />}
  ]);

  return routes;
}