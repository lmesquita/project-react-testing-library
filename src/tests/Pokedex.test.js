import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Teste o componente <Pokedex.js', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons',
    () => {
      RenderWithRouter(<App />);
      const getHeading = screen.getByRole('heading',
        { level: 2, name: /Encountered pokémons/i });
      expect(getHeading).toBeInTheDocument();
    });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é'
    + 'clicado', () => {
    RenderWithRouter(<App />);
    const getPokemonName = screen.getByTestId('pokemon-name');
    const getButton = screen.getByTestId('next-pokemon', { name: /Próximo pokémon/i });
    expect(getButton).toBeInTheDocument();
    expect(getPokemonName).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      expect(getPokemonName).toHaveTextContent(pokemon.name);
      userEvent.click(getButton);
    });

    /* Verifica se após clicar no botão "Próximo Pokemon" na última posição do array de pokemons é retornado o primeiro pokemon novamente */
    expect(getPokemonName).toHaveTextContent(pokemons[0].name);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    RenderWithRouter(<App />);

    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição
    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();

    // O texto do botão deve corresponder ao nome do tipo
    const getTypeBtn = screen.getAllByTestId('pokemon-type-button')
      .map((type) => type.textContent);
    const types = pokemons.map((pokemon) => pokemon.type);
    getTypeBtn.forEach((btn) => {
      const btnTypes = screen.getByRole('button', { name: btn });
      expect(btnTypes).toBeInTheDocument();
      expect(types.includes(btn)).toBe(true);
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    RenderWithRouter(<App />);
    // Teste se é mostrado apenas um Pokémon por vez
    const cardPokemon = screen.getAllByTestId('pokemon-name');
    expect(cardPokemon.length).toBe(1);

    const getBtn = screen.getByRole('button', { name: 'All' });
    userEvent.click(getBtn);
    expect(cardPokemon[0].textContent).toEqual(pokemons[0].name);
  });
});
