import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { getUserFavoriteWords, playWordAudio } from '../../api/words';
import DataLoading from '../../components/shared/DataLoading';
import PropTypes from 'prop-types';

function ListWords({ userId }) {
  const { t } = useTranslation('word');

  const { data, isLoading } = useQuery(['userFavoriteWords', userId], () =>
    getUserFavoriteWords(userId),
  );

  const userFavoriteWords = data?.data || [];

  return (
    <>
      {isLoading ? (
        <DataLoading />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{t('WORD')}</TableCell>
                <TableCell>{t('ACTIONS')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userFavoriteWords.map((word) => (
                <TableRow
                  key={word.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{word.word}</TableCell>
                  <TableCell>
                    <IconButton
                      color="secondary"
                      onClick={async () => {
                        await playWordAudio(word.word);
                      }}
                    >
                      <VolumeUpIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default ListWords;

ListWords.propTypes = {
  userId: PropTypes.string.isRequired,
};
