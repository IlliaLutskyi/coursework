"use client";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

type link = {
  href: string;
  title: string;
};
type links = link[];
const links: links = [
  { href: "/", title: "Home" },
  { href: "/aboutProject", title: "About Project" },
];
const Menu = () => {
  const [open, setOpen] = useState(false);
  return (
    <DrawerRoot
      placement="end"
      size="xs"
      open={open}
      onOpenChange={() => setOpen((prev) => !prev)}
    >
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <CiMenuBurger size="1.2rem" />
      </DrawerTrigger>
      <DrawerContent className="h-screen absolute top-0 right-0">
        <DrawerHeader>
          <IoCloseOutline
            onClick={() => setOpen((prev) => !prev)}
            color="white"
            size="1.5rem"
            className="ml-auto hover:bg-white hover:bg-opacity-20 rounded-sm "
          />
        </DrawerHeader>
        <DrawerBody className="flex flex-col items-center  gap-4 ">
          {links.map((link, index) => {
            return (
              <Link
                key={index}
                className="text-white hover:underline"
                href={link.href}
              >
                {link.title}
              </Link>
            );
          })}
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default Menu;
