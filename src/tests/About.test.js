import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import About from '../components/About';

describe('Teste o componente About.js', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex',
    () => {
      RenderWithRouter(<About />);
      const headingText = screen.getByRole('heading',
        { level: 2, name: /About Pokédex/i });
      expect(headingText).toBeInTheDocument();
    });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex',
    () => {
      RenderWithRouter(<About />);

      const paragraph1 = screen.getByText('This application simulates a Pokédex,'
      + ' a digital encyclopedia containing all Pokémons');
      expect(paragraph1).toBeInTheDocument();

      const paragraph2 = screen.getByText('One can filter Pokémons by type,'
      + ' and see more details for each one of them');
      expect(paragraph2).toBeInTheDocument();
    });

  it('Teste se a página contém a imagem de uma Pokédex',
    () => {
      RenderWithRouter(<About />);

      const imagePokedex = screen.getByRole('img');
      expect(imagePokedex.src).toEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    });
});
