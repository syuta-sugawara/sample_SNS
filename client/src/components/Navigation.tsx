import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button, { Variant } from './Button';

const Navigation: React.FC = () => {
  return (
    <List>
      <ListItem button>
        <ListItemText>ホーム</ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText>プロフィール</ListItemText>
      </ListItem>
      <ListItem button>
        <Button text="ツイートする" variant={Variant.CONTAINED} disabled />
      </ListItem>
    </List>
  );
};

export default Navigation;
