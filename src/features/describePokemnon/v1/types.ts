export type SpriteKind =
  | "back_default"
  | "back_female"
  | "back_shiny"
  | "back_shiny_female"
  | "front_default"
  | "front_female"
  | "front_shiny"
  | "front_shiny_female";

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonStats = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonDescribeResultV1 = {
  sprites: Record<SpriteKind, string | null>;
  order: number;
  species: { name: string; url: string };
  id: number;
  base_experience: number;
  types: PokemonType[];
  height: number;
  weight: number;
  stats: PokemonStats[];
  cries: {
    latest: string;
    legacy: string;
  };
};
