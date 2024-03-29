import React from 'react';
import styles from 'App.module.scss';
import { Routes, Route } from 'react-router-dom';
import { Header } from 'components/header/Header';
import { Footer } from 'components/footer/Footer';
import { LoginPage } from 'components/login/LoginPage';
import { StatusPage } from 'components/statusPage/StatusPage';
import { NotFoundPage } from 'components/notFoundPage/NotFoundPage';
import { LogsPage } from 'components/logsPage/LogsPage';

function App() {
  const isLogenIn = localStorage.AuthToken !== undefined;
  return (
    <div className={styles.App}>
      {isLogenIn && <Header />}

      <Routes>
        <Route path="/" element={isLogenIn ? <StatusPage /> : <LoginPage />} />
        <Route path="/logs" element={isLogenIn ? <LogsPage /> : <LoginPage />} />
        <Route path={'*'} element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
