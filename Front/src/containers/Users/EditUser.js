import { useTranslation } from 'react-i18next';
import { modifyUser, getUser } from "../../api/users";
import { useAsync } from "react-async";
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import {useParams} from "react-router";
import styled from 'styled-components';

const FieldContainer = styled.div`
  margin-bottom: 15px;
`;

const EditUser = () => {
  const { t } = useTranslation('user');
  const { userId } = useParams();
  const { data } = useAsync({ promiseFn: getUser, userId });
  const navigate = useNavigate();
  const user = data?.data || {login: '',
    email: '',password:''};
  const formik = useFormik({
    initialValues: user,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await modifyUser(user.id,values);
      navigate('/users');
    },
  });
  return (
        <form onSubmit={formik.handleSubmit}>
          <FieldContainer>
            <TextField id="login" name="login" label={t('LOGIN')} variant="standard"
                       value={formik.values.login}
                       onChange={formik.handleChange}
                       error={formik.touched.login && Boolean(formik.errors.login)}
                       helperText={formik.touched.login && formik.errors.login}
                       />
          </FieldContainer>

          <FieldContainer>
            <TextField id="email" name="email" type="email" label={t('EMAIL')} variant="standard"
                       value={formik.values.email}
                       onChange={formik.handleChange}
                       error={formik.touched.email && Boolean(formik.errors.email)}
                       helperText={formik.touched.email && formik.errors.email}/>
          </FieldContainer>

          <FieldContainer>
            <TextField
              id="password"
              name="password"
              label={t('PASSWORD')}
              variant="standard"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </FieldContainer>


          <button type="submit">{t('SUBMIT')}</button>
        </form>
  );
};

export default EditUser;
