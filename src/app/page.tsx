"use client";

import { useEffect } from "react";
import { useListPokemonsV1 } from "../features/listPokemons/v1/context";
import { StatusActionKind } from "../shared/types/api.status.enum";
import { PokemonCard } from "../customComponents/pokemonCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { PaginationStrip } from "../customComponents/paginationStrip";

export default function Home() {
  const {
    listPokemons,
    listPokemonsStatus,
    pokemons,
    totalPages,
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
  } = useListPokemonsV1();

  useEffect(() => {
    listPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    listPokemonsStatus === StatusActionKind.LOADING ||
    listPokemonsStatus === StatusActionKind.INITIAL
  ) {
    return <p>loading</p>;
  }

  if (
    listPokemonsStatus === StatusActionKind.ERROR ||
    !pokemons ||
    !pokemons.results?.length
  ) {
    return <p>something went wrong</p>;
  }

  return (
    <div className="mb-24">
      <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2 xsm:grid-cols-1 lg:grid-cols-4">
        {pokemons.results.map((pokemon) => (
          <PokemonCard
            name={pokemon.name}
            url={pokemon.url}
            key={pokemon.url}
          />
        ))}
      </div>
      <PaginationStrip
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalPages={totalPages}
        limit={limit}
        onLimitChange={setLimit}
      />
    </div>
  );
}
