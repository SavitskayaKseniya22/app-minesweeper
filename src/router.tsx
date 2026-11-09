import React from 'react';
import { Route, Outlet, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import MainPage from '@/routes/main/MainPage';
import Header from '@/components/Header';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <>
          <Header />
          <Outlet />
        </>
      }
    >
      <Route path="/" element={<Outlet />}>
        <Route index element={<MainPage />} />
        <Route
          path="game-board"
          lazy={async () => ({ Component: (await import('@/routes/board/GameBoard')).default })}
        />
        <Route
          path="stats"
          lazy={async () => ({ Component: (await import('@/routes/stats/Stats')).default })}
        />
        <Route
          path="*"
          lazy={async () => ({ Component: (await import('@/routes/not-found/NotFound')).default })}
        />
      </Route>
    </Route>
  )
);

export default router;
