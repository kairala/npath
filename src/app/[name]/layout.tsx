"use client";

import { DescribePokemonV1Provider } from "../../features/describePokemnon/v1/context";

export default function DescribePokemonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DescribePokemonV1Provider>
      <div>{children}</div>
    </DescribePokemonV1Provider>
  );
}
