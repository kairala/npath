"use client";

import { useReducer, useState } from "react";
import { type AxiosRequestConfig } from "axios";
import { StatusActionKind } from "../../shared/types/api.status.enum";
import { env } from "next-runtime-env";
import { mainInstance } from "../../adapters/request";

interface StatusAction {
  type: StatusActionKind;
}

const reducer = (_: unknown, action: StatusAction) => action.type;

export function useIntegration<IntegrationResult>({
  method = "get",
  route,
  onSuccess = () => {},
  onError = () => {},
  onStart = () => {},
  config = {},
  pathVariables = {},
}: {
  method: "post" | "get" | "put" | "patch" | "delete";
  route: string;
  onSuccess?: (data: Record<string, unknown>) => void | Promise<void>;
  onError?: (error: Error) => void | Promise<void>;
  onStart?: (body: Record<string, unknown>) => void | Promise<void>;
  config?: AxiosRequestConfig;
  pathVariables?: Record<string, unknown>;
}) {
  const [data, setData] = useState<IntegrationResult>();
  const [status, dispatch] = useReducer(reducer, StatusActionKind.INITIAL);

  const buildFetchUrl = () => {
    let builtRoute = route;

    const variablesKeys = Object.keys(pathVariables);

    variablesKeys.forEach((variable) => {
      builtRoute = builtRoute.replace(
        `{${variable}}`,
        pathVariables[variable] as string
      );
    });

    return `${env("NEXT_PUBLIC_API_HOST")}${builtRoute}`;
  };

  const send = async (body: Record<string, unknown> = {}) => {
    onStart(body);
    dispatch({ type: StatusActionKind.LOADING });

    try {
      const fetchUrl = buildFetchUrl();
      const requestParams: (string | object)[] = [fetchUrl];
      const requestConfig = {
        ...config,
        headers: {
          ...config.headers,
        },
        params: { ...config.params },
      };

      if (method === "post" || method === "put" || method === "patch") {
        if (body) {
          requestParams.push(body);
        }
        requestParams.push(requestConfig);
      } else {
        requestParams.push(requestConfig);
      }

      const resp = await mainInstance[method](
        requestParams[0] as string,
        requestParams[1] as object,
        requestParams[2] as object
      );

      dispatch({ type: StatusActionKind.SUCCESS });
      onSuccess(resp?.data);
      setData(resp?.data);
      return resp;
    } catch (err) {
      dispatch({ type: StatusActionKind.ERROR });
      onError(err as Error);
      return err;
    }
  };

  return {
    data,
    send,
    status,
    onStart,
    onSuccess,
    onError,
  };
}

export default useIntegration;
