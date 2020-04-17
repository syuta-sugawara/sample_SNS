import React from 'react';
import styled from 'styled-components';

import Button, { Variant } from '../components/Button';
import STYLES from '../styles/const';

type Props = {
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Logout: React.FC<Props> = props => {
  const handleLogout = () => {
    // TODO: ログアウト処理
  };

  return (
    <StyledContainer>
      <Title>
        <span>ログアウトしますか？</span>
      </Title>
      <ButtonContainer>
        <ButtonWrapper>
          <Button
            text="いいえ"
            variant={Variant.OUTLINED}
            onClick={props.onClose}
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            text="はい"
            variant={Variant.CONTAINED}
            onClick={handleLogout}
          />
        </ButtonWrapper>
      </ButtonContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 300px;
  padding: 20px 5px;
  background-color: ${STYLES.COLOR.WHITE};
  border-radius: 12px;
  transition: 0.3s;
`;

const Title = styled.div`
  margin-bottom: 15px;
  color: ${STYLES.COLOR.BLACK};
  text-align: center;
  span {
    font-size: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px;
`;

const ButtonWrapper = styled.div`
  width: 120px;
  height: 37px;
`;

export default Logout;
