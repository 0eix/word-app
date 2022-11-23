import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FieldContainer = styled.div`
  margin-bottom: 15px;
`;

function UserEditForm({ formik }) {
  const { t } = useTranslation('user');

  return (
    <form onSubmit={formik.handleSubmit}>
      <FieldContainer>
        <TextField
          id="login"
          name="login"
          label={t('LOGIN')}
          variant="standard"
          value={formik.values.login}
          onChange={formik.handleChange}
          error={formik.touched.login && Boolean(formik.errors.login)}
          helperText={formik.touched.login && formik.errors.login}
        />
      </FieldContainer>

      <FieldContainer>
        <TextField
          id="email"
          name="email"
          type="email"
          label={t('EMAIL')}
          variant="standard"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
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
}

UserEditForm.propTypes = {
  formik: PropTypes.shape({
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    values: PropTypes.shape({
      login: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }).isRequired,
    touched: PropTypes.shape({
      login: PropTypes.bool,
      email: PropTypes.bool,
      password: PropTypes.bool,
    }).isRequired,
    errors: PropTypes.shape({
      login: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default UserEditForm;
