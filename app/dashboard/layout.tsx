import { auth } from "@/server/auth";
import { BarChart, Package, PenSquare, Settings, Truck } from "lucide-react";
import DashboardNav from "@/components/navigation/dashboard-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const userLinks = [
    {
      label: "Comenzi",
      path: "/dashboard/orders",
      icon: <Truck size={16} />,
    },
    {
      label: "Setări",
      path: "/dashboard/settings",
      icon: <Settings size={16} />,
    },
  ] as const;

  const adminLinks =
    session?.user.role === "admin"
      ? [
          {
            label: "Analytics",
            path: "/dashboard/analytics",
            icon: <BarChart size={16} />,
          },
          {
            label: "Create",
            path: "/dashboard/add-product",
            icon: <PenSquare size={16} />,
          },
          {
            label: "Products",
            path: "/dashboard/products",
            icon: <Package size={16} />,
          },
        ]
      : [];

  const allLinks = [...adminLinks, ...userLinks];

  return (
    <div className="mt-32 container mb-10 min-h-screen">
      <DashboardNav allLinks={allLinks} />
      {children}
    </div>
  );
}
