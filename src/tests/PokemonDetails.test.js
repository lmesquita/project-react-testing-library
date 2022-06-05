import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Teste o componente PokemonDetails.js', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela',
    () => {
      RenderWithRouter(<App />);

      const getMoreDetails = screen.getByText('More details');

      userEvent.click(getMoreDetails);

      // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon
      // const linkMoreDetails = screen.getByText('More details');
      const headingDetails = screen.getByRole('heading',
        { level: 2, name: `${pokemons[0].name} Details` });
      expect(headingDetails).toBeInTheDocument();
      // Não deve existir o link de navegação para os detalhes do Pokémon selecionado
      // A seção de detalhes deve conter um heading h2 com o texto Summary
      const headingSummary = screen.getByRole('heading', { level: 2, name: 'Summary' });
      expect(headingSummary).toBeInTheDocument();
      // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado
      const getSummary = screen.getByText(pokemons[0].summary);
      expect(getSummary).toBeInTheDocument();
    });

  it(`Teste se existe na página uma seção com os mapas contendo as localizações do
    pokémon`, () => {
    RenderWithRouter(<App />);
    const getMoreDetails = screen.getByText('More details');

    userEvent.click(getMoreDetails);
    // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido
    const getHeadingLocation = screen.getByRole('heading',
      { level: 2, name: `Game Locations of ${pokemons[0].name}` });
    expect(getHeadingLocation).toBeInTheDocument();
    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes
    pokemons[0].foundAt.forEach((location) => {
      const getLocation = screen.getByText(location.location);
      expect(getLocation).toBeInTheDocument();
    });
    const getMap = screen.getAllByAltText(`${pokemons[0].name} location`);
    getMap.forEach((map, index) => {
      expect(map.src).toEqual(pokemons[0].foundAt[index].map);
    });
    // Teste se o usuário pode favoritar um pokémon através da página de detalhes
    const getCheckbox = screen.getByRole('checkbox');
    expect(getCheckbox).toBeInTheDocument();

    const getLabelCheckbox = screen.getByText('Pokémon favoritado?');
    expect(getLabelCheckbox).toBeInTheDocument();
  });
});
