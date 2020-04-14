import React from 'react';
import styled from 'styled-components';
import STYLES from '../styles/const';

const Logout: React.FC = () => {
  return (
    <StyledContainer>
      <Title>ログアウトしますか？</Title>
      <ButtonContainer>
        <CancelButton>いいえ</CancelButton>
        <LogoutButton>はい</LogoutButton>
      </ButtonContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 200px;
  padding: 5px;
  border-radius: 25px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
`;

const Title = styled.h4`
  color: ${STYLES.COLOR.BLACK};
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px;
`;

const Button = styled.button`
  padding: 5px 20px;
  border-radius: 25px;
`;

const CancelButton = styled(Button)`
  color: ${STYLES.COLOR.BLACK};
  background-color: ${STYLES.COLOR.GRAY_LIGHTER_10};
`;

const LogoutButton = styled(Button)`
  color: ${STYLES.COLOR.WHITE};
  background-color: ${STYLES.COLOR.PRIMARY};
`;

export default Logout;
