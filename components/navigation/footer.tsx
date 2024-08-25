"use client";

import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Footer() {
  return (
    <div className="w-full h-auto font-gotham bg-secondary-foreground text-primary-foreground min-h-40 pt-6">
      <div className="container">
        <header className="md:flex w-full items-center justify-between">
          <p className="">
            <b>Pirelli</b>
          </p>
          <div className="flex gap-4 items-center">
            <p className="font-gothamBook">Urmăriți-ne</p>
            <div className="flex gap-4 items-center text-2xl">
              <Link
                href="https://www.facebook.com/Racebox.ro/?locale=ro_RO"
                target="_blank"
              >
                <FaFacebook />
              </Link>
              <Link
                href="https://www.tiktok.com/@racebox?is_from_webapp=1&sender_device=pc"
                target="_blank"
              >
                <FaTiktok />
              </Link>
              <Link
                href="https://www.youtube.com/c/RaceboxRomania"
                target="_blank"
              >
                <FaYoutube />
              </Link>
              <Link
                href="https://www.instagram.com/racebox.ro/"
                target="_blank"
              >
                <FaInstagram />
              </Link>
            </div>
          </div>
        </header>
        <Separator className="mt-4 md:my-4 bg-primary-foreground/20" />
        <div className="md:flex hidden items-start justify-center gap-8 pt-4">
          <div className="uppercase">
            <p className="pb-3 font-gotham">
              <b>Catalog anvelope</b>
            </p>
            <ul className="text-primary-foreground/70 flex flex-col gap-2 font-gothamBook">
              <li>
                <Link href={"/catalog/"}>Toate anvelopele</Link>
              </li>
              <li>
                <Link href={"/catalog/marime"}>Caută după mărime</Link>
              </li>
              <li>
                <Link href={"/catalog/sezon/vara"}>Anvelope de vară</Link>
              </li>
              <li>
                <Link href={"/catalog/sezon/iarna"}>Anvelope de iarnă</Link>
              </li>
              <li>
                <Link href={"/catalog/sezon/all-season"}>
                  Anvelope all season
                </Link>
              </li>
              <li>
                <Link href={"/catalog/"}>Caută după familie</Link>
              </li>
            </ul>
          </div>
          <div className="uppercase">
            <p className="pb-3 font-gotham">
              <b>INFORMATII DESPRE COMPANIE</b>
            </p>
            <ul className="text-primary-foreground/70 flex flex-col gap-2 font-gothamBook">
              <li>
                <Link
                  href={
                    "https://www.pirelli.com/tyres/ro-ro/vehicule/about/de-ce-pirelli"
                  }
                  target="_blank"
                >
                  De ce pirelli
                </Link>
              </li>
              <li>
                <Link href={"https://www.racebox.ro"} target="_blank">
                  Companie
                </Link>
              </li>
              <li>
                <Link href={"/contact"}>Contactați-ne</Link>
              </li>
            </ul>
          </div>
        </div>
        <Accordion type="multiple" className="mb-6 md:hidden">
          <AccordionItem
            value="item-1"
            className="border-b-primary-foreground/20"
          >
            <AccordionTrigger className="font-gotham uppercase">
              Catalog anvelope
            </AccordionTrigger>
            <AccordionContent>
              <ul className="text-primary-foreground/70 flex flex-col gap-4 font-gothamBook mt-3 uppercase">
                <li>
                  <Link href={"/catalog/"}>Toate anvelopele</Link>
                </li>
                <li>
                  <Link href={"/catalog/marime"}>Caută după mărime</Link>
                </li>
                <li>
                  <Link href={"/catalog/sezon/vara"}>Anvelope de vară</Link>
                </li>
                <li>
                  <Link href={"/catalog/sezon/iarna"}>Anvelope de iarnă</Link>
                </li>
                <li>
                  <Link href={"/catalog/sezon/all-season"}>
                    Anvelope all season
                  </Link>
                </li>
                <li>
                  <Link href={"/catalog/"}>Caută după familie</Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className="border-b-primary-foreground/20"
          >
            <AccordionTrigger className="font-gotham uppercase">
              Informații despre companie
            </AccordionTrigger>
            <AccordionContent>
              <ul className="text-primary-foreground/70 flex flex-col gap-4 font-gothamBook mt-1 uppercase">
                <li>
                  <Link
                    href={
                      "https://www.pirelli.com/tyres/ro-ro/vehicule/about/de-ce-pirelli"
                    }
                    target="_blank"
                  >
                    De ce pirelli
                  </Link>
                </li>
                <li>
                  <Link href={"https://www.racebox.ro"} target="_blank">
                    Companie
                  </Link>
                </li>
                <li>
                  <Link href={"/contact"}>Contactați-ne</Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator className="md:block hidden my-6 bg-primary-foreground/20" />
        <p className="md:text-center font-gotham font-bold">
          Copyright © 2024 Pirelli & C. S.p.A. - Pirelli Tyre S.p.A
        </p>
        <div className="uppercase md:flex justify-center flex-wrap gap-8 gap-y-2 items-center w-full text-primary-foreground/70 font-gothamBook py-5 pb-7">
          <Link
            href="/legal/Informare-publica.pdf"
            target="_blank"
            className="block"
          >
            Informare publica
          </Link>
          <Link href="/legal/PPR-2021.pdf" target="_blank" className="block">
            PPR 2022
          </Link>
          <Link href="/legal/informatii-juridice" className="block">
            Informatii legale
          </Link>
          <Link href="/legal/politica-de-confidentialitate" className="block">
            Politica de date personale
          </Link>
          <Link href="/legal/politica-cookie" className="block">
            Politica cookie
          </Link>
          <Link
            href="/legal/ro_13-04-2021-EULabel.pdf"
            target="_blank"
            className="block"
          >
            Eticheta europeana
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
