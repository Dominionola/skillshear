"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768 && menuOpen) {
        // 768px is the 'md' breakpoint in Tailwind
        setMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  return (
    <nav className="font-poppins fixed w-full shadow-md bg-white flex items-center justify-between h-16 z-50 ">
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <div className=" flex px-5">
          <Link className="flex items-center " href="/">
            <Image src="/logo.png" alt="Logo" width={50} height={100} />
            <h2 className="text-2xl font-bold text-black">SkillShare</h2>
          </Link>
        </div>

        <div className="hidden md:flex gap-4 lg:gap-5 px-5">
          <Link
            href="/"
            className={`text-gray-600 hover:text-blue-600 hover:underline hover:font-medium transition-colors ${
              pathname === "/"
                ? "text-black font-medium underline decoration-2 decoration-blue-600"
                : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`text-gray-600 hover:text-blue-600 hover:underline hover:font-medium transition-colors ${
              pathname === "/about"
                ? "text-black font-medium underline decoration-2 decoration-blue-600"
                : ""
            }`}
          >
            About
          </Link>
          <Link
            href="/post"
            className={`text-gray-600 hover:text-blue-600 hover:underline hover:font-medium transition-colors ${
              pathname === "/post"
                ? "text-black font-medium underline decoration-2 decoration-blue-600"
                : ""
            }`}
          >
            Posts
          </Link>
        </div>

        <div className="hidden md:flex items-center px-6 lg:gap-2">
          <Link className="text-gray-600" href="/auth/login">
            Login
          </Link>
          <Link
            className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-3xl"
            href="/auth/signup"
          >
            Sign Up
          </Link>
        </div>

        <button
          ref={buttonRef}
          className="lg:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Image
            className="md:hidden mr-4"
            src="/icons/list.svg"
            alt="Menu"
            width={24}
            height={24}
          />
        </button>
      </div>

      <div
        className={`fixed flex flex-col justify-between top-0 bottom-0 right-0 w-[70vw] bg-white text-black transition-transform duration-500 px-10
          gap-6 py-16 h-screen z-50 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <ul ref={menuRef} className="flex flex-col gap-4">
          <div
            className="absolute top-6 right-10"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/icons/close.svg"
              width={20}
              height={20}
              className="cursor-pointer"
              alt="Close Menu"
            />
          </div>

          <li>
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className=" font-medium"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className=" font-medium"
            >
              About Us
            </Link>
          </li>

          <li>
            <Link
              href="/post"
              onClick={() => setMenuOpen(false)}
              className=" font-medium"
            >
              Post
            </Link>
          </li>
        </ul>

        <div className="flex flex-col justify-center gap-4 ">
          <Link
            href="/auth/signup"
            onClick={() => setMenuOpen(false)}
            className="ml-4 bg-blue-600 text-white text-center px-4 py-2 rounded-3xl"
          >
            Sign Up
          </Link>

          <Link
            href="/auth/login"
            onClick={() => setMenuOpen(false)}
            className=" ml-4 border-1 border-gray-300 text-blue-600 text-center px-4 py-2 rounded-3xl"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
