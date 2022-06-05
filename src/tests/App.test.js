import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';

describe('Teste o componente App.js', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    RenderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /Home/i });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAbout).toBeInTheDocument();

    const linkFavorite = screen.getByRole('link', { name: /Favorite/i });
    expect(linkFavorite).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para sua respectiva URL ao clicar no link',
    () => {
      const customHistory = RenderWithRouter(<App />);

      const urlHome = screen.getByRole('link', { name: /Home/i });
      userEvent.click(urlHome);
      expect(customHistory.location.pathname).toEqual('/');

      const urlAbout = screen.getByRole('link', { name: /About/i });
      userEvent.click(urlAbout);
      expect(customHistory.location.pathname).toEqual('/about');

      const urlFavorite = screen.getByRole('link', { name: /Favorite/i });
      userEvent.click(urlFavorite);
      expect(customHistory.location.pathname).toEqual('/favorites');

      customHistory.push('/xablau');
      expect(customHistory.location.pathname).toEqual('/xablau');
    });
});
