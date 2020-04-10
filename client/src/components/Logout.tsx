import React from 'react';
import styled from 'styled-components';
import STYLES from '../styles/const';

const Logout = () => {
  return (
    <StyledContainer>
      <Title>Log out of twitter？</Title>
      <ButtonContainer>
        <CancelButton>Cancel</CancelButton>
        <LogoutButton>Log out</LogoutButton>
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

const CancelButton = styled.button`
  padding: 5px 20px;
  color: ${STYLES.COLOR.BLACK};
  background-color: ${STYLES.COLOR.LIGHT_GRAY};
  border-radius: 25px;
`;

const LogoutButton = styled.button`
  padding: 5px 20px;
  color: ${STYLES.COLOR.WHITE};
  background-color: ${STYLES.COLOR.PRIMARY};
  border-radius: 25px;
`;

export default Logout;
