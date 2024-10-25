"use client";

import { AxiosRequestConfig } from "axios";
import useIntegration from "../../../hooks/api/useApi.hook";
import { PokemonDescribeResultV1 } from "./types";

export function useDescribePokemonApiV1({
  config,
  pathVariables,
}: {
  config?: AxiosRequestConfig;
  pathVariables: { name: string };
}) {
  const {
    send: integration,
    data,
    status,
  } = useIntegration<PokemonDescribeResultV1>({
    method: "get",
    route: "pokemon/{name}",
    config,
    pathVariables,
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
