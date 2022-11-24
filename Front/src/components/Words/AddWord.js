import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { addUserFavoriteWord } from '../../api/words';

const FieldContainer = styled.div`
  margin-bottom: 15px;
`;

function AddWord({ userId }) {
  const { t } = useTranslation('word');

  const queryClient = useQueryClient();

  const mutation = useMutation(addUserFavoriteWord, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['userFavoriteWords', userId]);
    },
  });

  const favoriteWord = { word: '', userId: Number.parseInt(userId) };
  const formik = useFormik({
    initialValues: favoriteWord,
    enableReinitialize: true,
    onSubmit: async (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FieldContainer>
        <TextField
          id="word"
          name="word"
          label={t('WORD')}
          variant="standard"
          value={formik.values.word}
          onChange={formik.handleChange}
          error={formik.touched.word && Boolean(formik.errors.word)}
          helperText={formik.touched.word && formik.errors.word}
        />
      </FieldContainer>
      <button type="submit">{t('SUBMIT')}</button>
    </form>
  );
}

export default AddWord;

AddWord.propTypes = {
  userId: PropTypes.string.isRequired,
};
