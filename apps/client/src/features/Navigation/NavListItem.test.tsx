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

  const component = renderWithRouter(
    <NavListItem {...props} />,
    props.item.path
  );

  test('renders item text', () => {
    console.log(component);
    expect(() => component.getByText(props.item.text)).not.toThrow();
  });

  test.todo('has correct link path');
  test.todo('hides text when closed');
  test.todo('non collapsable always renders text');
});
