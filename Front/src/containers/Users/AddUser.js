import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import UserEditForm from '../../components/Users/UserEditForm';
import { addUser } from '../../api/users';

function AddUser() {
  const navigate = useNavigate();
  const user = { login: '', email: '', password: '' };
  const formik = useFormik({
    initialValues: user,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await addUser(values);
      navigate('/users');
    },
  });

  return <UserEditForm formik={formik} />;
}

export default AddUser;
