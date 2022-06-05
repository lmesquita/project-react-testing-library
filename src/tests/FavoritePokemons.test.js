import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente FavoritePokemons.js', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found,'
    + 'se a pessoa não tiver pokémons favoritos', () => {
    RenderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const favoriteMock = [
      {
        id: 4,
        name: 'Charmander',
        type: 'Fire',
        averageWeight: {
          value: '8.5',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Alola Route 3',
            map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
          },
          {
            location: 'Kanto Route 3',
            map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
          },
          {
            location: 'Kanto Route 4',
            map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
          },
          {
            location: 'Kanto Rock Tunnel',
            map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
          },
        ],
        summary: 'The flame on its tail shows the strength of its life force.'
        + 'If it is weak, the flame also burns weakly.',
      },
    ];

    RenderWithRouter(<FavoritePokemons pokemons={ favoriteMock } />);

    const getFavorites = screen.getAllByRole('link');
    expect(getFavorites).toHaveLength(1);
  });
});
