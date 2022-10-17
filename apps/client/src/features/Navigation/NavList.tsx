import { FC } from 'react';
import { List } from '@mui/material';
import NavListItem from './NavListItem';
import { NavItem } from './NavItem';

interface Props {
  items: NavItem[];
  // eslint-disable-next-line react/require-default-props
  collapsable?: boolean;
  open: boolean;
}

const NavList: FC<Props> = ({ items, collapsable, open }) => {
  return (
    <List>
      {items.map((item) => (
        <NavListItem
          key={item.text}
          item={item}
          collapsable={collapsable}
          open={open}
        />
      ))}
    </List>
  );
};

export default NavList;
