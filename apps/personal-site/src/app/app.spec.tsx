import { render, screen } from '@testing-library/react';
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
    render(
      <MemoryRouter initialEntries={['/character']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Character Sheet' })).toBeTruthy();
  });

  it('should render quests page by route', () => {
    render(
      <MemoryRouter initialEntries={['/quests']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: 'Quest Board' })).toBeTruthy();
  });
});
