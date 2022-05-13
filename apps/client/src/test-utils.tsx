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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderWithRouter = ({ children }: any, path: string) =>
  customRender(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path={path} element={children} />
      </Routes>
    </MemoryRouter>
  );

export * from '@testing-library/react';
export { customRender as render, renderWithRouter };
