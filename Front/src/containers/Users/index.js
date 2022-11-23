import { Route, Routes } from 'react-router-dom';
import UsersList from './UsersList';
import EditUser from './EditUser';
import ViewUser from './ViewUser';
import AddUser from './AddUser';

function Users() {
  return (
    <Routes>
      <Route path="/add" element={<AddUser />} />
      <Route path="/:userId/edit" element={<EditUser />} />
      <Route path="/:userId/view" element={<ViewUser />} />
      <Route path="/" element={<UsersList />} />
    </Routes>
  );
}

export default Users;
