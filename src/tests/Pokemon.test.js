import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import pokemons from '../data';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon',
    () => {
      RenderWithRouter(<App />);
      pokemons.forEach((pokemon) => {
        const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });
        // O nome correto do Pokémon deve ser mostrado na tela
        const name = screen.getByTestId('pokemon-name', { name: pokemon.name });
        expect(name).toBeInTheDocument();
        // O tipo correto do pokémon deve ser mostrado na tela
        const type = screen.getByTestId('pokemon-type');
        expect(type.textContent).toEqual(pokemon.type);
        // O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>
        const weight = screen.getByTestId('pokemon-weight');
        const textWeight = `Average weight: ${pokemon.averageWeight.value
        } ${pokemon.averageWeight.measurementUnit}`;
        expect(weight.textContent).toEqual(textWeight);
        // A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt
        const img = screen.getByAltText(`${pokemon.name} sprite`);
        expect(img.src).toEqual(pokemon.image);

        userEvent.click(btnNext);
      });
    });

  it(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação
  para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>`, () => {
    RenderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });
      const moreDetails = screen.getByText('More details',
        { href: `/pokemons/${pokemon.id}` });
      expect(moreDetails).toBeInTheDocument();

      userEvent.click(btnNext);
    });
  });

  it(`Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da
  aplicação para a página de detalhes de Pokémon`, () => {
    const customHistory = RenderWithRouter(<App />);

    const moreDetails = screen.getByText('More details');
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);

    const pokemonDetails = screen.getByText('Pikachu Details');
    expect(pokemonDetails).toBeInTheDocument();
    // Teste também se a URL exibida no navegador muda para /pokemon/<id>
    expect(customHistory.location.pathname).toEqual('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const charmander = [{
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
    }];

    RenderWithRouter(<FavoritePokemons pokemons={ charmander } />);
    // O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg
    const getStar = screen.getByAltText(/Charmander is marked as favorite/i);
    expect(getStar).toBeInTheDocument();
    // O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg
    expect(getStar.src).toEqual('http://localhost/star-icon.svg');
    // A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do Pokémon exibido
    expect(getStar.alt).toEqual('Charmander is marked as favorite');
  });
});
