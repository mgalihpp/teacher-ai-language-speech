"use client";

import Logo from "@/components/logo";
import React, { Suspense, memo, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import ThemeToggle from "../theme-toggle";
import { useScroll } from "@/hooks/use-scroll";

const UserDropDown = React.lazy(() => import("@/components/user-dropdown"));

const navLinks = [
  {
    label: "Chat",
    path: "/chat",
  },
  {
    label: "credits",
    path: "/buy-credits",
  },
];

const Navbar = () => {
  const scrollActive = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  const pathnames = ["/buy-credits", "terms-of-service", "privacy-policy"];
  const excludePage = pathnames.some((route) => pathname.includes(route));

  return (
    <header
      className={
        "fixed top-0 z-30 w-full transition-all duration-500 ease-in-out " +
        (scrollActive
          ? "bg-background pt-0 shadow-md"
          : `pt-0 ${excludePage ? "text-primary" : "text-white"}`)
      }
    >
      <nav
        className="relative mx-auto flex max-w-screen-2xl 
      gap-4 px-6 py-3.5 sm:grid sm:px-8 lg:px-16"
      >
        <Link
          href="/#hero"
          prefetch={false}
          className="col-start-1 flex w-full items-center gap-2"
        >
          <Logo />
          <h1 className="text-xl font-bold max-sm:hidden">Guru AI</h1>
        </Link>

        <div className="flex items-center justify-end gap-x-4 sm:hidden">
          <Suspense fallback={<Skeleton className="size-8 rounded-full" />}>
            <UserDropDown />
          </Suspense>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                name="mobile-nav"
                className="col-end-1 hidden max-sm:block"
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="size-6" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <ul className="mt-4 flex h-auto flex-col items-start justify-center space-y-3">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    aria-current="page"
                    aria-label={link.label}
                    href={`${link.path}`}
                    onClick={() => setMenuOpen(false)}
                    className="relative mx-2 inline-block 
                  cursor-pointer px-4 py-2 text-xl font-medium capitalize text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>

        <ul className="col-start-11 col-end-11 hidden items-center sm:flex">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={`${link.path}`}
                aria-current="page"
                aria-label={link.label}
                className={
                  "relative mx-2 inline-block cursor-pointer rounded-md px-4 py-2 font-medium capitalize transition-colors hover:bg-black/10  " +
                  (scrollActive
                    ? "text-primary hover:dark:bg-stone-950"
                    : `${excludePage ? "text-primary" : "text-white"}`)
                }
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li>
            <ThemeToggle />
          </li>
          <li className="flex w-full justify-end">
            <Suspense fallback={<Skeleton className="size-8 rounded-full" />}>
              <UserDropDown />
            </Suspense>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default memo(Navbar);
