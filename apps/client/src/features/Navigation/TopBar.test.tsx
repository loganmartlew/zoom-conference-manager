import { render } from '../../test-utils';
import TopBar from './TopBar';

describe('Test TopBar component', () => {
  const component = render(<TopBar open handleDrawerOpen={() => {}} />);

  test('has ZCM heading', () => {
    expect(component.getByRole('heading').textContent).toBe(
      'Zoom Conference Manager'
    );
  });
});
