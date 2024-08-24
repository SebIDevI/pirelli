"use client";

import { InferResultType } from "@/lib/infer-type";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Technology({
  variantWID,
}: {
  variantWID: InferResultType<
    "productVariants",
    {
      variantTags: true;
      product: {
        with: {
          productVariants: { with: { variantTags: true } };
        };
      };
    }
  >;
}) {
  const [techs, setTechs] = useState({
    rf: false,
    pncs: false,
    cyber: false,
    elect: false,
    si: false,
    rfd: false,
  });

  useEffect(() => {
    setTechs({
      rf: variantWID.variantTags.some((tag) => tag.tag === "r-f")
        ? true
        : false,
      pncs: variantWID.variantTags.some((tag) => tag.tag === "ncs")
        ? true
        : false,
      cyber: variantWID.variantTags.some((tag) => tag.tag === "cyber")
        ? true
        : false,
      elect: variantWID.variantTags.some((tag) => tag.tag === "elect")
        ? true
        : false,
      si: variantWID.variantTags.some((tag) => tag.tag === "s-i")
        ? true
        : false,
      rfd: variantWID.variantTags.some((tag) => tag.tag === "rfd")
        ? true
        : false,
    });
  }, [variantWID]);
  if (
    !techs.rf &&
    !techs.pncs &&
    !techs.cyber &&
    !techs.elect &&
    !techs.si &&
    !techs.rfd
  )
    return "";
  return (
    <>
      <p className="text-5xl font-gothamBlack uppercase pb-10">Tehnologii</p>
      <Tabs
        defaultValue={
          techs.elect
            ? "elect"
            : techs.rf
            ? "rf"
            : techs.pncs
            ? "ncs"
            : techs.si
            ? "si"
            : ""
        }
        className="pb-10"
      >
        <TabsList className="bg-transparent rounded-none p-0 gap-0 my-2">
          {techs.elect && (
            <TabsTrigger
              className="bg-transparent data-[state=active]:bg-secondary/80 rounded-none p-5 py-2 data-[state=active]:text-primary text-secondary-foreground text-xl hover:bg-secondary/80 border-b border-secondary-foreground data-[state=active]:border-primary"
              value="elect"
            >
              ELECT™
            </TabsTrigger>
          )}
          {techs.rf && (
            <TabsTrigger
              className="bg-transparent data-[state=active]:bg-secondary/80 rounded-none p-5 py-2 data-[state=active]:text-primary text-secondary-foreground text-xl hover:bg-secondary/80 border-b border-secondary-foreground data-[state=active]:border-primary"
              value="rf"
            >
              RUN FLAT
            </TabsTrigger>
          )}
          {techs.pncs && (
            <TabsTrigger
              className="bg-transparent data-[state=active]:bg-secondary/80 rounded-none p-5 py-2 data-[state=active]:text-primary text-secondary-foreground text-xl hover:bg-secondary/80 border-b border-secondary-foreground data-[state=active]:border-primary"
              value="ncs"
            >
              PNCS™
            </TabsTrigger>
          )}
          {techs.si && (
            <TabsTrigger
              className="bg-transparent data-[state=active]:bg-secondary/80 rounded-none p-5 py-2 data-[state=active]:text-primary text-secondary-foreground text-xl hover:bg-secondary/80 border-b border-secondary-foreground data-[state=active]:border-primary"
              value="si"
            >
              SEAL INSIDE™
            </TabsTrigger>
          )}
        </TabsList>
        {techs.elect && (
          <TabsContent value="elect" className="font-gothamXLight">
            <div className="uppercase text-2xl pb-8">
              <p className="font-gothamBlack">Elect™</p>
              <p className="text-xl text-gray-400">Condus electric</p>
            </div>
            <p>
              Marcajul ELECT™ de pe flanc identifică anvelopele Pirelli,
              dezvoltate special pentru automobilele electrice și plug-in de
              înaltă performanță, în conformitate cu strategia Perfect Fit.
            </p>
          </TabsContent>
        )}
        {techs.rf && (
          <TabsContent value="rf" className="font-gothamXLight">
            <div className="uppercase text-2xl pb-8">
              <p className="font-gothamBlack">Run flat</p>
              <p className="text-xl text-gray-400">CONDU FĂRĂ PRESIUNE</p>
            </div>
            <p>
              Anvelopele RUN FLAT înseamnă siguranță. Oferă un control mai mare
              asupra automobilului în condiții de urgență și îți permit să
              continui călătoria în siguranță, chiar și în timpul unei pierderi
              rapide a presiunii. <br />
              <br />
              Disponibile doar în anumite dimensiuni.
            </p>
          </TabsContent>
        )}
        {techs.pncs && (
          <TabsContent value="ncs" className="font-gothamXLight">
            <div className="uppercase text-2xl pb-8">
              <p className="font-gothamBlack">PNCS™</p>
              <p className="text-xl text-gray-400">CONDUS CONFORTABIL</p>
            </div>
            <p>
              PIRELLI NOISE CANCELING SYSTEM™ (PNCS) este o tehnologie capabilă
              să reducă zgomotul din interiorul automobilului datorită unui
              dispozitiv de absorbție a sunetului aplicat pe peretele
              circumferențial interior al anvelopei, reducând zgomotul la
              jumătate. <br />
              <br />
              Disponibil numai la anumite dimensiuni.
            </p>
          </TabsContent>
        )}
        {techs.si && (
          <TabsContent value="si" className="font-gothamXLight">
            <div className="uppercase text-2xl pb-8">
              <p className="font-gothamBlack">Seal inside™</p>
              <p className="text-xl text-gray-400">SCAPĂ DE PENE</p>
            </div>
            <p>
              SEAL INSIDE™ este o nouă tehnologie de construcție a anvelopelor
              care permite conducătorilor să-și continue călătoria fără a pierde
              presiunea aerului, chiar și după ce anvelopa a fost perforată de
              un obiect extern. Aceasta acoperă aproape 85% din posibilele cauze
              accidentale ale pierderii de presiune.
              <br />
              <br />
              Disponibil numai la anumite dimensiuni.
            </p>
          </TabsContent>
        )}
      </Tabs>
    </>
  );
}
