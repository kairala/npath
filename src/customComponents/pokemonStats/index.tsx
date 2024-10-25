"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PokemonStats } from "../../features/describePokemnon/v1/types";
import { useMemo } from "react";

export const description = "A radar chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 273 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  status: {
    label: "Status",
    color: "green",
  },
} satisfies ChartConfig;

type Params = {
  stats: PokemonStats[];
};

export const PokemonStatsChart = ({ stats }: Params) => {
  const calculatedStats = useMemo(() => {
    return stats
      .map((status) => ({
        status: status.base_stat,
        name: status.stat.name,
      }))
      .sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }

        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
  }, [stats]);

  console.log(calculatedStats);
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <RadarChart data={calculatedStats}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="name" />
        <PolarGrid />
        <Radar dataKey="status" fill="var(--color-status)" fillOpacity={0.6} />
      </RadarChart>
    </ChartContainer>
  );
};
