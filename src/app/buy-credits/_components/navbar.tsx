"use client";

import Logo from "./logo";
import { memo, useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  {
    label: "Chat",
    path: "/",
  },
  {
    label: "credits",
    path: "/buy-credits",
  },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("");
  const [scrollActive, setScrollActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });
  });

  return (
    <header
      className={
        "fixed top-0 z-30 w-full text-primary transition-all duration-500 ease-in-out " +
        (scrollActive ? " bg-white pt-0 shadow-md" : " pt-0")
      }
    >
      <nav className="relative mx-auto grid max-w-screen-2xl grid-flow-col px-6 py-3.5 sm:px-8 lg:px-16">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <button
              name="mobile-nav"
              className="col-start-1 hidden max-sm:block"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="size-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left">
            <ul className="mt-4 flex h-auto flex-col items-center space-y-3">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={`${link.path}`}
                  onClick={() => setMenuOpen(false)}
                  className={
                    "relative mx-2 inline-block cursor-pointer px-4 py-2 text-xl font-medium capitalize text-black " +
                    (activeLink === link.label
                      ? "text-primary"
                      : "text-primary")
                  }
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="https://wa.me/6281218967346"
                className={
                  "group relative mx-auto inline-flex h-10 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200"
                }
              >
                <span>Contact Us</span>
                <div className="absolute inset-0 flex size-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                  <div className="relative h-full w-8 bg-white/20"></div>
                </div>
              </Link>
            </ul>
          </SheetContent>
        </Sheet>

        <Link
          href="#hero"
          prefetch={false}
          className="col-start-1 col-end-2 flex items-center gap-2 max-sm:col-start-13 max-sm:col-end-13"
        >
          <Logo />
          <h1 className="text-xl font-bold max-sm:hidden">
            Ai Language Teacher
          </h1>
        </Link>

        <ul className="col-start-11 col-end-11 hidden items-center lg:flex">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={`${link.path}`}
              prefetch={false}
              className={
                "relative mx-2 inline-block cursor-pointer px-4 py-2 font-medium capitalize " +
                (activeLink === link.label
                  ? scrollActive
                    ? "text-primary"
                    : "text-primary"
                  : scrollActive
                    ? "text-primary hover:text-primary"
                    : "text-primary")
              }
            >
              {link.label}
            </Link>
          ))}
        </ul>
        {/* <div className="col-start-12 col-end-12 flex items-center justify-end font-medium max-sm:hidden">
          <Link
            href="https://wa.me/6281218967346"
            target="_blank"
            className={
              "group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md px-6 font-medium text-neutral-200 " +
              (scrollActive ? "bg-neutral-950" : "border bg-transparent")
            }
          >
            <span>Contact Us</span>
            <div className="absolute inset-0 flex size-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20"></div>
            </div>
          </Link>
        </div> */}

        {/* mobile nav */}
      </nav>
    </header>
  );
};

export default memo(Navbar);
