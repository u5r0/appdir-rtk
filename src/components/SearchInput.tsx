"use client";

import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import { RootState, AppDispatch } from "@/store";
import { setSearch } from "@/store/searchSlice";
import { pokemonApi } from "@/store/pokemonApi";

import PokemonTable from "./PokemonTable";
import { Pokemon } from "@/types";
import { useEffect } from "react";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const SearchInput = () => {
  // set new state on the store
  const dispatch = useAppDispatch();

  // get server initial state 
  const search = useAppSelector((state) => state.search.search);
  const startupPokemon = useAppSelector((state) => state.search.startupPokemon);

  // get result of the query form the cached pokemonApi queries
  const data = useAppSelector(
    (state) =>
      state.pokemonApi.queries[`search("${search}")`]?.data as Pokemon[]
  );

  // initiate search on search state change
  useEffect(() => {
    dispatch(pokemonApi.endpoints.search.initiate(search))
  }, [dispatch, search])

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      
      {/* render nothing if data is still inflight/intransit */}
      <PokemonTable pokemons={search.length ? data ?? [] : startupPokemon} />
    </div>
  );
};

export default SearchInput;
