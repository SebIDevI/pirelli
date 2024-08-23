"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import { Suspense, useState } from "react";
import { LogOut, Moon, Settings, Sun, TruckIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "../ui/switch";
import { useRouter } from "next/navigation";

export const UserButton = ({ user }: Session) => {
  const { setTheme, theme } = useTheme();
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  function switchState() {
    switch (theme) {
      case "dark":
        return setChecked(true);
      case "light":
        return setChecked(false);
      case "system":
        return setChecked(false);
    }
  }

  if (user)
    return (
      <div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
            <Avatar className="w-8 h-8">
              <Suspense
                fallback={
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                }
              >
                {user?.image && (
                  <Image
                    src={user.image}
                    alt={user.name!}
                    fill={true}
                    className="rounded-full"
                  />
                )}
                {!user?.image && (
                  <AvatarFallback className="bg-primary/25">
                    <div className="font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  </AvatarFallback>
                )}
              </Suspense>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-6" align="end">
            <div className="mb-4 p-4 flex flex-col items-center rounded-lg bg-primary/10">
              {user?.image && (
                <Image
                  src={user.image}
                  alt={user.name!}
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              )}
              {!user?.image && (
                <Avatar>
                  <AvatarFallback className="bg-primary/25">
                    <div className="font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  </AvatarFallback>
                </Avatar>
              )}
              <p className="font-bold text-xs pt-2 pb-1">{user?.name}</p>
              <span className="text-xs font-medium text-secondary-foreground">
                {user?.email}
              </span>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push("/dashboard/orders")}
              className="group py-2 font-medium cursor-pointer"
            >
              <TruckIcon
                size={14}
                className="mr-3 group-hover:translate-x-1 transition-all duration-300 ease-in-out"
              />{" "}
              Comenzile mele
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/dashboard/settings")}
              className="group py-2 font-medium cursor-pointer"
            >
              <Settings
                size={14}
                className="mr-3 group-hover:rotate-180 transition-all duration-500 ease-in-out"
              />{" "}
              Setări
            </DropdownMenuItem>
            {theme && (
              <DropdownMenuItem className="py-2 font-medium cursor-pointer transition-all duration-500">
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center group"
                >
                  <div className="relative flex mr-3">
                    <Sun
                      className="group-hover:text-yellow-600 group-hover:rotate-180 dark:scale-0 dark:-rotate-180 transition-all duration-500 ease-in-out absolute"
                      size={14}
                    />
                    <Moon
                      className="group-hover:text-blue-400 dark:scale-100 scale-0 transition-all duration-500"
                      size={14}
                    />
                  </div>
                  <p className="dark:text-blue-400 text-secondary-foreground/75  text-yellow-600">
                    {theme[0].toUpperCase() + theme?.slice(1)} Mode
                  </p>
                  <Switch
                    className="scale-75 ml-2"
                    checked={checked}
                    onCheckedChange={(e) => {
                      setChecked((prev) => !prev);
                      if (e) setTheme("dark");
                      if (!e) setTheme("light");
                    }}
                  />
                </div>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => signOut()}
              className="group focus:bg-destructive/30 py-2 font-medium cursor-pointer"
            >
              <LogOut
                size={14}
                className="mr-3 group-hover:scale-75 transition-all duration-500 ease-in-out"
              />{" "}
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
};
