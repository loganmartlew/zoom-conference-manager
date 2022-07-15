/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-shadow */
import { render } from '../../test-utils';
import SideNavigation from './SideNavigation';

describe('Test SideNavigation component', () => {
  const props = {
    collapsable: true,
    open: true,
    handleDrawerClose: () => {},
  };

  test('has button when open', () => {
    const component = render(<SideNavigation {...props} open />);

    const menuButton = component.getByRole('button');
    expect(menuButton).toBeDefined();
  });

  test('closes drawer on click', () => {
    let state = true;

    const handleDrawerOpen = () => {
      state = false;
    };

    const component = render(
      <SideNavigation
        {...props}
        open={state}
        handleDrawerClose={handleDrawerOpen}
      />
    );

    const menuButton = component.getByRole('button');

    expect(state).toBe(true);
    menuButton.click();
    expect(state).toBe(false);
  });

  test('non collapsable has no button in any state', () => {
    const openComponent = render(
      <SideNavigation {...props} collapsable={false} open />
    );
    const closedComponent = render(
      <SideNavigation {...props} collapsable={false} open={false} />
    );

    expect(() => openComponent.getByRole('button')).toThrow();
    expect(() => closedComponent.getByRole('button')).toThrow();
  });
});
