/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-shadow */
import { Home } from '@mui/icons-material';
import { renderWithRouter } from '../../test-utils';
import NavListItem from './NavListItem';

describe('Test NavListItem component', () => {
  const props = {
    item: {
      text: 'Link text',
      path: '/linkpath',
      icon: <Home />,
    },
    collapsable: true,
    open: true,
  };

  const component = renderWithRouter(<NavListItem {...props} />, {
    route: props.item.path,
    path: props.item.path,
  });

  test('renders item text', () => {
    expect(() => component.getByText(props.item.text)).not.toThrow();
  });

  test('has correct link path', () => {
    const component = renderWithRouter(<NavListItem {...props} />, {
      route: props.item.path,
      path: props.item.path,
    });

    const link = component.getByRole('link');
    expect(link.getAttribute('href')).toBe(props.item.path);
  });
});
