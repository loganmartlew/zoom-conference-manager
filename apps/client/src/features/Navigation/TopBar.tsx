import { FC } from 'react';
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { drawerWidth } from './drawerWidth';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  borderBottom: `thin solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.common.white,
  color: theme.palette.getContrastText(theme.palette.common.white),
  boxShadow: 'none',

  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface Props {
  // eslint-disable-next-line react/require-default-props
  collapsable?: boolean;
  open: boolean;
  handleDrawerOpen: () => void;
}

const TopBar: FC<Props> = ({ collapsable, open, handleDrawerOpen }) => {
  return (
    <AppBar position='fixed' open={collapsable ? open : true}>
      <Toolbar sx={{ height: '4em' }}>
        {collapsable && (
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <Menu />
          </IconButton>
        )}
        <Typography variant='h4' noWrap component='h1'>
          Zoom Conference Manager
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
