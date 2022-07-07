import { useState, FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { Home, Dashboard, Event, AddBox } from '@mui/icons-material';
import TopBar from './TopBar';
import SideNavigation, { DrawerHeader } from './SideNavigation';
import { NavItem } from './NavItem';
import NavList from './NavList';

const items: NavItem[] = [
  { text: 'Home', path: '/', icon: <Home /> },
  { text: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
  { text: 'Events', path: '/events', icon: <Event /> },
  { text: 'New Event', path: '/new-event', icon: <AddBox /> },
  { text: 'New Meeting', path: '/new-meeting', icon: <AddBox /> },
];

interface Props {
  // eslint-disable-next-line react/require-default-props
  collapsable?: boolean;
}

const NavLayout: FC<Props> = ({ collapsable }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <TopBar
        collapsable={collapsable}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />
      <SideNavigation
        collapsable={collapsable}
        open={open}
        handleDrawerClose={handleDrawerClose}
      >
        <NavList items={items} collapsable={collapsable} open={open} />
      </SideNavigation>
      <Box sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        <Container sx={{ minHeight: 'calc(100vh - 4em)', py: 3 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default NavLayout;
