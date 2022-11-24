import { useTranslation } from 'react-i18next';
import { useAsync } from 'react-async';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import { getUser } from '../../api/users';
import AddWord from 'components/Words/AddWord';
import ListWords from 'components/Words/ListWords';

const FieldContainer = styled.div`
  margin-bottom: 15px;
`;

function ViewUser() {
  const { t } = useTranslation('user');
  const { userId } = useParams();
  const { data } = useAsync({ promiseFn: getUser, userId });
  const user = data?.data;
  return (
    <Container>
      <Box>
        <FieldContainer>
          <div>
            {t('LOGIN')} :{user?.login}
          </div>
        </FieldContainer>

        <FieldContainer>
          <div>
            {t('EMAIL')} :{user?.email}
          </div>
        </FieldContainer>

        <FieldContainer>
          <div>
            {t('PASSWORD')} :{user?.password}
          </div>
        </FieldContainer>
      </Box>
      <Box>
        <AddWord userId={userId} />
      </Box>
      <Box>
        <ListWords userId={userId} />
      </Box>
    </Container>
  );
}

export default ViewUser;
