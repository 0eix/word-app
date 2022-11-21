import { useTranslation } from 'react-i18next';
import { getUser } from "../../api/users";
import { useAsync } from "react-async";
import {useParams} from "react-router";
import styled from 'styled-components';

const FieldContainer = styled.div`
  margin-bottom: 15px;
`;

const ViewUser = () => {
  const { t } = useTranslation('user');
  const { userId } = useParams();
  const { data } = useAsync({ promiseFn: getUser, userId });
  const user = data?.data;
  return (
        <>
          <FieldContainer>
            <div>
              {t('LOGIN')} : {user?.login}
            </div>
          </FieldContainer>

          <FieldContainer>
            <div>
              {t('EMAIL')} : {user?.email}
            </div>
          </FieldContainer>

          <FieldContainer>
            <div>
              {t('PASSWORD')} : {user?.password}
            </div>
          </FieldContainer>
        </>
  );
};

export default ViewUser;
