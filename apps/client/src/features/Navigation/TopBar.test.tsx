/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-shadow */
import { render } from '../../test-utils';
import TopBar from './TopBar';

describe('Test TopBar component', () => {
  const props = {
    collapsable: true,
    open: true,
    handleDrawerOpen: () => {},
  };

  const component = render(<TopBar {...props} />);

  test('has ZCM heading', () => {
    expect(component.getByRole('heading').textContent).toBe(
      'Zoom Conference Manager'
    );
  });

  test('has button when closed', () => {
    const component = render(<TopBar {...props} open={false} />);

    const menuButton = component.getByRole('button');
    expect(menuButton).toBeDefined();
  });

  test('has no button when open', () => {
    const component = render(<TopBar {...props} open />);

    expect(() => component.getByRole('button')).toThrow();
  });

  test('opens drawer on click', () => {
    let state = false;

    const handleDrawerOpen = () => {
      state = true;
    };

    const component = render(
      <TopBar {...props} open={state} handleDrawerOpen={handleDrawerOpen} />
    );

    const menuButton = component.getByRole('button');

    expect(state).toBe(false);
    menuButton.click();
    expect(state).toBe(true);
  });

  test('non collapsable has no button in any state', () => {
    const openComponent = render(
      <TopBar {...props} collapsable={false} open />
    );
    const closedComponent = render(
      <TopBar {...props} collapsable={false} open={false} />
    );

    expect(() => openComponent.getByRole('button')).toThrow();
    expect(() => closedComponent.getByRole('button')).toThrow();
  });
});
