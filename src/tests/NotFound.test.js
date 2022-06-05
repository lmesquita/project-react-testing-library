import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import RenderWithRouter from './RenderWithRouter';

describe('Teste o componente NotFound.js', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found 😭',
    () => {
      RenderWithRouter(<NotFound />);
      const getHeader = screen.getByRole('heading',
        { level: 2, name: /Page requested not found/i });
      expect(getHeader).toBeInTheDocument();
    });
  it('Teste se página mostra a imagem', () => {
    RenderWithRouter(<NotFound />);
    const getImg = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(getImg.src).toEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
