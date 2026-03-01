import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter initialEntries={['/character']}>
        <App />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render character page by route', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/character']}>
        <App />
      </MemoryRouter>
    );
    expect(getByRole('heading', { name: 'Character' })).toBeTruthy();
  });

  it('should render quests page by route', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/quests']}>
        <App />
      </MemoryRouter>
    );
    expect(getByRole('heading', { name: 'Quests' })).toBeTruthy();
  });
});
