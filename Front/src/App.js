import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import {Navigate} from "react-router";

const Users = lazy(() => import('containers/Users'));

const App = () => {
  return (
      <Routes>
        <Route path="users/*" element={<Users />} />
        <Route path="*" element={<Navigate to="/users" replace />} />
      </Routes>
  );
};

export default App;
