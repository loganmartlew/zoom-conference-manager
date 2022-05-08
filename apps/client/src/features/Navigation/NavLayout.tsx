import { useState, FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { Mail } from '@mui/icons-material';
import TopBar from './TopBar';
import SideNavigation, { DrawerHeader } from './SideNavigation';
import { NavItem } from './NavItem';
import NavList from './NavList';

const items: NavItem[] = [{ text: 'Inbox', path: '/', icon: <Mail /> }];

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
    <Box sx={{ display: 'flex' }}>
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
        <Outlet />
      </Box>
    </Box>
  );
};

export default NavLayout;
