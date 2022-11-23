import { useAsync } from 'react-async';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

import UserEditForm from '../../components/Users/UserEditForm';
import { modifyUser, getUser } from '../../api/users';

function EditUser() {
  const { userId } = useParams();
  const { data } = useAsync({ promiseFn: getUser, userId });
  const navigate = useNavigate();
  const user = data?.data || {
    login: '',
    email: '',
    password: '',
  };
  const formik = useFormik({
    initialValues: user,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await modifyUser(user.id, values);
      navigate('/users');
    },
  });
  return <UserEditForm formik={formik} />;
}

export default EditUser;
