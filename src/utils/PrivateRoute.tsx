import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from './authUtils'; // authUtils.js 파일에서 isLoggedIn 함수 import

export default function PrivateRoute({
  userAuthentication,
}: {
  userAuthentication?: boolean;
}) {
  const isLogin = isLoggedIn();

  if (userAuthentication) {
    // 사용자 인증이 필요한 페이지일 경우
    if (!isLogin) return <Navigate to="/login" />;
    return <Outlet />;
  } else {
    // 사용자 인증이 필요하지 않은 페이지일 경우
    if (isLogin) return <Outlet />;
    return <Navigate to="/login" />;
  }
}
