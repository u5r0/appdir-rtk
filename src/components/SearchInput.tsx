"use client";

import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import { RootState } from "@/store";

import PokemonTable from "./PokemonTable";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const SearchInput = () => {
  // get server initial pokemons state --empty--
  const startupPokemon = useAppSelector((state) => state.search.startupPokemon);

  return (
    <div>
      <PokemonTable pokemons={startupPokemon} />
    </div>
  );
};

export default SearchInput;
