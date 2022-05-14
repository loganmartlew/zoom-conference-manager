/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-shadow */
import { Home } from '@mui/icons-material';
import { renderWithRouter, cleanup } from '../../test-utils';
import NavList from './NavList';

describe('Test NavList component', () => {
  test('renders correct amount of children', async () => {
    const baseProps = {
      collapsable: true,
      open: true,
    };

    const item = (num: number) => ({
      text: `Link text ${num}`,
      path: `/linkpath${num}`,
      icon: <Home />,
    });

    const props1 = { ...baseProps, items: [item(1), item(2), item(3)] };
    const component1 = renderWithRouter(<NavList {...props1} />, {});
    const links1 = component1.getAllByRole('link');
    expect(links1.length).toBe(props1.items.length);
    cleanup();

    const props2 = { ...baseProps, items: [item(1)] };
    const component2 = renderWithRouter(<NavList {...props2} />, {});
    const links2 = component2.getAllByRole('link');
    expect(links2.length).toBe(props2.items.length);
    cleanup();

    const props3 = {
      ...baseProps,
      items: [item(1), item(2), item(3), item(4), item(5), item(6)],
    };
    const component3 = renderWithRouter(<NavList {...props3} />, {});
    const links3 = component3.getAllByRole('link');
    expect(links3.length).toBe(props3.items.length);
    cleanup();
  });
});
