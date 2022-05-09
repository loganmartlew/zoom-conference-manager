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

  test('toggles drawer state', () => {
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
});
