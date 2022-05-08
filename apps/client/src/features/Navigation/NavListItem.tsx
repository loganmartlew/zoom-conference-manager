import { FC } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import {
  ListItemButton as MuiListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavItem } from './NavItem';

interface ButtonProps {
  active?: boolean;
}

const ListItemButton = styled(MuiListItemButton)<ButtonProps>(
  ({ theme, active }) => {
    if (!active) return {};

    return {
      position: 'relative',

      '&::after': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '3px',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.palette.primary.main,
      },
    };
  }
);

interface Props {
  item: NavItem;
  // eslint-disable-next-line react/require-default-props
  collapsable?: boolean;
  open: boolean;
}

const NavListItem: FC<Props> = ({ item, collapsable, open }) => {
  const active = useMatch(item.path);

  return (
    <NavLink to={item.path}>
      <ListItemButton
        key={item.text}
        active={!!active}
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
    </NavLink>
  );
};

export default NavListItem;
