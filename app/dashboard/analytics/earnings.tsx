"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TotalOrders } from "@/lib/infer-type";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { weeklyChart } from "./weekly-chart";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { monthlyChart } from "./monthly-chart";

export default function Earnings({
  totalOrders,
}: {
  totalOrders: TotalOrders[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "week";

  const chartItems = totalOrders.map((order) => ({
    date: order.order.created!,
    revenue: order.order.total,
  }));

  const activeChart = useMemo(() => {
    const weekly = weeklyChart(chartItems);
    const monthly = monthlyChart(chartItems);
    if (filter === "week") {
      return weekly;
    }
    if (filter === "month") {
      return monthly;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const activeTotal = useMemo(() => {
    if (filter === "month") {
      return monthlyChart(chartItems).reduce(
        (acc, item) => acc + item.revenue,
        0
      );
    }
    return weeklyChart(chartItems).reduce((acc, item) => acc + item.revenue, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <Card className="flex-1 shrink-0 min-w-80">
      <CardHeader>
        <CardTitle>
          Veniturile dvs.: {(activeTotal as number).toFixed(2)} RON
        </CardTitle>
        <CardDescription>Aici sunt câștigurile recente</CardDescription>
        <div className="flex items-center gap-2">
          <Badge
            className={cn(
              "cursor-pointer hover:bg-primary",
              filter === "week" ? "bg-primary" : "bg-primary/25"
            )}
            onClick={() =>
              router.push("/dashboard/analytics/?filter=week", {
                scroll: false,
              })
            }
          >
            Pe săptămână
          </Badge>
          <Badge
            className={cn(
              "cursor-pointer hover:bg-primary",
              filter === "month" ? "bg-primary" : "bg-primary/25"
            )}
            onClick={() =>
              router.push("/dashboard/analytics/?filter=month", {
                scroll: false,
              })
            }
          >
            Pe lună
          </Badge>
        </div>
        <CardContent className="h-96">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <AreaChart data={activeChart}>
              <Tooltip
                content={(props) => (
                  <div>
                    {props.payload?.map((item) => {
                      // console.log(item);
                      return (
                        <div
                          className="bg-secondary py-2 px-4 rounded-md shadow-lg"
                          key={item.payload.date}
                        >
                          <p>
                            Venituri: {(item.value! as number).toFixed(2)} RON
                          </p>
                          <p>Dată: {item.payload.date}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              />
              <Area
                className="text-secondary"
                type={"monotone"}
                dataKey="revenue"
                stroke="yellow"
                fill="yellow"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
