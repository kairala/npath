"use client";

import * as React from "react";
import { StatusActionKind } from "../../../shared/types/api.status.enum";
import { PaginationResponse } from "../../../shared/types/pagination.type";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { PokemonDescribeResultV1 } from "./types";
import { useDescribePokemonApiV1 } from "./api";

export interface DescribePokemonContextValueV1 {
  describePokemon: () => void;
  describePokemonStatus: StatusActionKind;
  pokemonDescription: PokemonDescribeResultV1 | undefined;
}

export const DescribePokemonContextV1 = React.createContext<
  DescribePokemonContextValueV1 | undefined
>(undefined);

export interface DescribePokemonProviderV1Props {
  children: React.ReactNode;
}

export function DescribePokemonV1Provider({
  children,
}: Readonly<DescribePokemonProviderV1Props>): React.JSX.Element {
  const { name } = useParams<{ name: string }>();

  const {
    send: describePokemon,
    status: describePokemonStatus,
    data: pokemonDescription,
  } = useDescribePokemonApiV1({
    pathVariables: { name },
  });

  React.useEffect(() => {
    if (!name) {
      return;
    }

    describePokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const value = React.useMemo(() => {
    return {
      describePokemon,
      describePokemonStatus,
      pokemonDescription,
    };
  }, [describePokemon, describePokemonStatus, pokemonDescription]);

  return (
    <DescribePokemonContextV1.Provider value={value}>
      {children}
    </DescribePokemonContextV1.Provider>
  );
}

export const DescribePokemonV1Consumer = DescribePokemonContextV1.Consumer;

export function useDescribePokemonV1(): DescribePokemonContextValueV1 {
  const context = React.useContext(DescribePokemonContextV1);

  if (!context) {
    throw new Error(
      "useDescribePokemonV1 must be used within a DescribePokemonV1Provider"
    );
  }

  return context;
}
