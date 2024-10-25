/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { useDescribePokemonApiV1 } from "../../features/describePokemnon/v1/api";
import { StatusActionKind } from "../../shared/types/api.status.enum";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { PATHS } from "../../config/paths";

type Props = {
  name: string;
  url: string;
};

export const PokemonCard = ({ name }: Props) => {
  const {
    data: pokemonDescription,
    send: describePokemon,
    status: describePokemnonStatus,
  } = useDescribePokemonApiV1({ pathVariables: { name } });

  useEffect(() => {
    if (!name) {
      return;
    }

    describePokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  if (describePokemnonStatus === StatusActionKind.LOADING) {
    return <p>Loading</p>;
  }

  if (
    describePokemnonStatus === StatusActionKind.ERROR ||
    !pokemonDescription
  ) {
    return <p>Something went wrong</p>;
  }

  return (
    <Card className={cn("w-[380px]")}>
      <CardHeader>
        <CardTitle>
          <p className={cn("uppercase")}>
            <small className="bg-gray-500">#{pokemonDescription.order} </small>
            {name}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <img
            src={pokemonDescription?.sprites.front_default || ""}
            alt={name}
          />
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button asChild>
          <Link href={PATHS.DESCRIBE_POKEMON(name)}>Know More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
