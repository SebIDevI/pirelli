import betweenWeeks from "./between-weeks";
import checkDate from "./check-date";

export const monthlyChart = (chartItems: { date: Date; revenue: number }[]) => {
  return [
    {
      date: "Acum 3 săptămâni",
      revenue: chartItems
        .filter((order) => betweenWeeks(order.date, 28, 21))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
    {
      date: "Acum 2 săptămâni",
      revenue: chartItems
        .filter((order) => betweenWeeks(order.date, 21, 14))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
    {
      date: "Acum o săptămână",
      revenue: chartItems
        .filter((order) => betweenWeeks(order.date, 14, 7))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
    {
      date: "Săptămâna aceasta",
      revenue: chartItems
        .filter((order) => betweenWeeks(order.date, 7, 0))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
  ];
};
