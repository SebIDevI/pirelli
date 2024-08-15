import checkDate from "./check-date";

export const weeklyChart = (chartItems: { date: Date; revenue: number }[]) => {
  return [
    {
      date: "Acum 6 zile",
      revenue: chartItems
        .filter((order) => checkDate(order.date, 6))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
    {
      date: "Acum 5 zile",
      revenue: chartItems
        .filter((order) => checkDate(order.date, 5))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
    {
      date: "Acum 4 zile",
      revenue: chartItems
        .filter((order) => checkDate(order.date, 4))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
    {
      date: "Acum 3 zile",
      revenue: chartItems
        .filter((order) => checkDate(order.date, 3))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
    {
      date: "Acum 2 zile",
      revenue: chartItems
        .filter((order) => checkDate(order.date, 2))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
    {
      date: "Acum o zi",
      revenue: chartItems
        .filter((order) => checkDate(order.date, 1))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
    {
      date: "Azi",
      revenue: chartItems
        .filter((order) => checkDate(order.date, 0))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
  ];
};
