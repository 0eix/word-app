import { useTranslation } from 'react-i18next';
import { getUsers  } from "../../api/users";
import { useAsync } from "react-async";
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FabContainer = styled.div`
  position:fixed;
  bottom:10px;
  right:10px;
`;

const UsersList = () => {
  const { t } = useTranslation('user');

  const { data } = useAsync({ promiseFn: getUsers});

  const users = data?.data || [];
  let navigate = useNavigate();
  return (
    <>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                  <TableRow>
                      <TableCell>{t('LOGIN')}</TableCell>
                      <TableCell>{t('EMAIL')}</TableCell>
                      <TableCell>{t('ACTIONS')}</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {users.map((user) => (
                      <TableRow
                          key={user.login}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                          <TableCell component="th" scope="row">
                            <a href={`/users/${user.id}/view`}>{user.login}</a>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                              <IconButton color="secondary">
                                <EditIcon />
                              </IconButton>
                              <IconButton color="secondary"onClick={async () => {}}>
                                <DeleteIcon />
                              </IconButton>
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </TableContainer>
      <FabContainer>
        <Fab color="primary" aria-label="add" onClick={() => {
          navigate(`/users/oldAdd`);
        }}>
          <AddIcon />
        </Fab>
      </FabContainer>
    </>
  );
};

export default UsersList;
