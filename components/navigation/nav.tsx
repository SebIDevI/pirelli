import { auth } from "@/server/auth";
import { UserButton } from "./user-button";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/navigation/logo";
import CartDrawer from "../cart/cart-drawer";
import { NavWrapper } from "./nav-wrapper";
import Marimi from "./marimi";
import { IoMenuOutline } from "react-icons/io5";
import PhoneSideNav from "./phone-side-nav";

export default async function Nav() {
  const session = await auth();
  return (
    <NavWrapper className="fixed top-0 left-0 w-full z-50 transition-all">
      <nav className="container font-gothamXLight">
        <ul className="flex justify-between items-center md:gap-8 gap-4 md:flex-row">
          <li className="flex md830:hidden items-center justify-center text-secondary-foreground hover:text-primary transition cursor-pointer">
            <PhoneSideNav />
          </li>
          <li className="flex flex-1 items-center justify-start">
            <Link href={"/"} aria-label="Pirelli Logo">
              <Logo />
            </Link>
          </li>
          <li className="relative hidden md830:flex items-center text-secondary-foreground hover:text-primary transition">
            <Link href={"/catalog"}>Catalog</Link>
          </li>
          <li className="relative hidden md830:flex items-center text-secondary-foreground hover:text-primary transition">
            <Marimi />
          </li>
          <li className="relative hidden md830:flex items-center text-secondary-foreground hover:text-primary transition">
            <Link href={"/contact"}>Contact</Link>
          </li>
          <li className="relative flex items-center">
            <CartDrawer />
          </li>
          {!session ? (
            <li className="flex items-center justify-center">
              <Button asChild>
                <Link className="flex gap-2" href={"/auth/login"}>
                  <LogIn size={16} />
                  <span>Login</span>
                </Link>
              </Button>
            </li>
          ) : (
            <li className="flex items-center justify-center">
              <UserButton user={session?.user} expires={session?.expires} />
            </li>
          )}
        </ul>
      </nav>
    </NavWrapper>
  );
}
