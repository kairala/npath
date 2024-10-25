"use client";

import * as React from "react";
import { StatusActionKind } from "../../../shared/types/api.status.enum";
import { PaginationResponse } from "../../../shared/types/pagination.type";
import { PokemonListResultV1 } from "./types";
import { useListPokemonsApiV1 } from "./api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface ListPokemonContextValueV1 {
  listPokemons: () => void;
  listPokemonsStatus: StatusActionKind;
  currentPage: number;
  setCurrentPage: (newPage: number) => void;
  limit: number;
  setLimit: (newLimit: number) => void;
  pokemons: PaginationResponse<PokemonListResultV1> | undefined;
  totalPages: number;
}

export const ListPokemonContextV1 = React.createContext<
  ListPokemonContextValueV1 | undefined
>(undefined);

export interface ListPokemonsProviderV1Props {
  children: React.ReactNode;
}

export function ListPokemonV1Provider({
  children,
}: Readonly<ListPokemonsProviderV1Props>): React.JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const [page, setPage] = React.useState(Number(searchParams.get("page") || 0));
  const [limit, setLimit] = React.useState(
    Number(searchParams.get("limit") || 10)
  );

  const offset = React.useMemo(() => {
    return page * limit;
  }, [page, limit]);

  const {
    send: listPokemons,
    status: listPokemonsStatus,
    data: pokemons,
  } = useListPokemonsApiV1({
    config: {
      params: {
        offset,
        limit,
      },
    },
  });

  const totalPages = React.useMemo(() => {
    if (!pokemons) {
      return 0;
    }

    return Math.ceil(pokemons.count / limit);
  }, [pokemons, limit]);

  React.useEffect(() => {
    listPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  React.useEffect(() => {
    const newParams = new URLSearchParams();
    newParams.set("page", page.toString());
    newParams.set("limit", limit.toString());
    router.replace(`${pathName}?${newParams.toString()}`);
  }, [page, limit]);

  const value = React.useMemo(() => {
    return {
      listPokemons,
      listPokemonsStatus,
      limit,
      setLimit,
      pokemons,
      currentPage: page,
      setCurrentPage: setPage,
      totalPages,
    };
  }, [listPokemons, listPokemonsStatus, limit, pokemons, page, totalPages]);

  return (
    <ListPokemonContextV1.Provider value={value}>
      {children}
    </ListPokemonContextV1.Provider>
  );
}

export const ListPokemonV1Consumer = ListPokemonContextV1.Consumer;

export function useListPokemonsV1(): ListPokemonContextValueV1 {
  const context = React.useContext(ListPokemonContextV1);

  if (!context) {
    throw new Error(
      "useListPokemonsV1 must be used within a ListPokemonV1Provider"
    );
  }

  return context;
}
