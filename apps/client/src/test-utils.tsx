import { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';

const AllTheProviders: FC = ({ children }) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

const renderWithRouter = (ui: ReactElement, { path = '/', route = '/' }) => {
  return {
    ...customRender(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path={path} element={ui} />
        </Routes>
      </MemoryRouter>
    ),
  };
};

export * from '@testing-library/react';
export { customRender as render, renderWithRouter };
