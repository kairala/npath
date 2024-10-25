"use client";

import { AxiosRequestConfig } from "axios";
import useIntegration from "../../../hooks/api/useApi.hook";
import { PaginationResponse } from "../../../shared/types/pagination.type";
import { PokemonListResultV1 } from "./types";

export function useListPokemonsApiV1({
  config,
}: {
  config?: AxiosRequestConfig;
}) {
  const {
    send: integration,
    data,
    status,
  } = useIntegration<PaginationResponse<PokemonListResultV1>>({
    method: "get",
    route: "pokemon",
    config,
  });

  const send = async () => {
    return integration();
  };

  return {
    send,
    data,
    status,
  };
}
