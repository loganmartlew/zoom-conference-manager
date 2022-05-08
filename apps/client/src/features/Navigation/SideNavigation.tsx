import { FC } from 'react';
import {
  Drawer as MuiDrawer,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
} from '@mui/material';
import { ChevronLeft, ChevronRight, Inbox, Mail } from '@mui/icons-material';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { drawerWidth } from './drawerWidth';

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface Props {
  // eslint-disable-next-line react/require-default-props
  collapsable?: boolean;
  open: boolean;
  handleDrawerClose: () => void;
}

const SideNavigation: FC<Props> = ({
  collapsable,
  open,
  handleDrawerClose,
}) => {
  const theme = useTheme();

  return (
    <Drawer variant='permanent' open={collapsable ? open : true}>
      <DrawerHeader>
        {collapsable && (
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        )}
      </DrawerHeader>
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItemButton
            key={text}
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
              {index % 2 === 0 ? <Inbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText
              primary={text}
              sx={{ opacity: open || !collapsable ? 1 : 0 }}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default SideNavigation;
