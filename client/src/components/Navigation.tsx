import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button, { Variant } from './Button';
import TwitterIcon from './icons/TwitterIcon';
import styled from 'styled-components';

const StyledNav = styled.div`
  max-width: 200px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  padding: 10px;
`;

const Icon = styled(TwitterIcon)`
  width: 50px;
  height: 50px;
  fill: #fff;
  stroke: #000;
`;

const Navigation: React.FC = () => {
  return (
    <StyledNav>
      <Icon />
      <List>
        <ListItem button>
          <ListItemText>ホーム</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText>プロフィール</ListItemText>
        </ListItem>
      </List>
      <ButtonContainer>
        <Button text="ツイートする" variant={Variant.CONTAINED} />
      </ButtonContainer>
    </StyledNav>
  );
};

export default Navigation;
