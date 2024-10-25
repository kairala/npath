"use client";

import { useDescribePokemonV1 } from "../../features/describePokemnon/v1/context";
import { useMemo } from "react";
import { SpriteKind } from "../../features/describePokemnon/v1/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { Badge } from "../../components/ui/badge";
import { PokemonStatsChart } from "../../customComponents/pokemonStats";
import Link from "next/link";
import { PATHS } from "../../config/paths";

export default function DescribePokemon() {
  const { pokemonDescription } = useDescribePokemonV1();

  const sprites = useMemo(() => {
    if (!pokemonDescription) {
      return [];
    }

    return Object.keys(pokemonDescription.sprites).reduce(
      (result: string[], current: string) => {
        const currentSprite =
          pokemonDescription.sprites[
            current as keyof Record<SpriteKind, string | null>
          ];

        if (!currentSprite || typeof currentSprite !== "string") {
          return result;
        }

        return [...result, currentSprite];
      },
      []
    );
  }, [pokemonDescription]);

  const pokemonTypes = useMemo(() => {
    if (!pokemonDescription) {
      return [];
    }

    return pokemonDescription.types.map((type) => type.type.name);
  }, [pokemonDescription]);

  if (!pokemonDescription) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="w-full flex flex-col items-center">
      <Link href={PATHS.HOME()}>Back</Link>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {pokemonDescription.species.name}
      </h1>
      <div>
        <Carousel>
          <CarouselContent>
            {sprites.map((sprite) => (
              <CarouselItem
                key={sprite}
                className="flex items-center justify-center"
              >
                <img src={sprite} alt={sprite} className="w-64" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="h-auto w-full">
        <PokemonStatsChart stats={pokemonDescription.stats} />
      </div>

      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                Category
              </th>
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Pokemon Id
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {pokemonDescription.id}
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Height
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {pokemonDescription.height}
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Weight
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {pokemonDescription.weight}
              </td>
            </tr>

            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Base Experience
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {pokemonDescription.base_experience}
              </td>
            </tr>

            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Types
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right flex gap-1">
                {pokemonTypes.map((type) => (
                  <Badge key={type}>{type}</Badge>
                ))}
              </td>
            </tr>

            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                How it sounds?
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right flex gap-1">
                {pokemonDescription.cries.latest ? (
                  <audio controls>
                    <source
                      src={pokemonDescription.cries.latest}
                      type="audio/ogg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                ) : (
                  <Badge>Unavailable</Badge>
                )}
              </td>
            </tr>

            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                How it used to sound?
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right flex gap-1">
                {pokemonDescription.cries.legacy ? (
                  <audio controls>
                    <source
                      src={pokemonDescription.cries.legacy}
                      type="audio/ogg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                ) : (
                  <Badge>Unavailable</Badge>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
