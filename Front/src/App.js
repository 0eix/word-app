import { lazy } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router';

const Users = lazy(() => import('containers/Users'));
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="users/*" element={<Users />} />
        <Route path="*" element={<Navigate to="/users" replace />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
