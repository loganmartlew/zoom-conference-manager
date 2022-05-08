import { FC } from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavItem } from './NavItem';

interface Props {
  item: NavItem;
  // eslint-disable-next-line react/require-default-props
  collapsable?: boolean;
  open: boolean;
}

const NavListItem: FC<Props> = ({ item, collapsable, open }) => {
  return (
    <ListItemButton
      key={item.text}
      sx={{
        minHeight: 48,
        justifyContent: open || !collapsable ? 'initial' : 'center',
        px: 2.5,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open || !collapsable ? 3 : 'auto',
          justifyContent: 'center',
        }}
      >
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={item.text}
        sx={{ opacity: open || !collapsable ? 1 : 0 }}
      />
    </ListItemButton>
  );
};

export default NavListItem;
