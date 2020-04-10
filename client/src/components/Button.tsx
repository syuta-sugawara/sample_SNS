import React from 'react';
import styled from 'styled-components';

import STYLES from '../styles/const';

type Props = {
  text: string;
  color: string;
};

const Button = (props: Props): React.ReactElement => {
  return <StyledButton color={props.color}>{props.text}</StyledButton>;
};

type StyledButtonProps = {
  color: string;
};

const StyledButton = styled.button`
  color: ${STYLES.COLOR.WHITE};
  background-color: ${(props: StyledButtonProps): string => props.color};
`;

export default Button;
