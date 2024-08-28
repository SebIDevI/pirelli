"use client";

import React, { useMemo, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ProductPick from "./product-pick";
import { VariantsWithImagesTags } from "@/lib/infer-type";
import Image from "next/image";
import size1 from "@/public/tyre-size/size1.svg";
import size2 from "@/public/tyre-size/size2.svg";
import size3 from "@/public/tyre-size/size3.svg";
import size4 from "@/public/tyre-size/size4.svg";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { transform } from "next/dist/build/swc";

interface TransformedRimsProps {
  transformedRims: Record<string, VariantsWithImagesTags[]>;
  title: string;
  imageUrl: string;
}

const TransformedRims: React.FC<TransformedRimsProps> = ({
  transformedRims,
  title,
  imageUrl,
}) => {
  const [defVal, setDefVal] = useState<string>();
  const [currSize, setCurrSize] = useState("size1");
  const [isOpen, setIsOpen] = useState(false);

  const MImage = useMemo(() => motion(Image), []);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {Object.keys(transformedRims).map((rim, i) => {
        return (
          <SheetTrigger key={i} onClick={() => setDefVal(rim)}>
            <div className="border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg p-2 px-3">
              {rim.replaceAll("R", "")}&quot;
            </div>
          </SheetTrigger>
        );
      })}
      <SheetContent className="lg:w-[600px] max-w-none bg-[#e0e0e0] dark:bg-[#1f1f1f] border-0 text-secondary-foreground px-0 h-screen sm:max-w-[500px]">
        <SheetHeader className="px-6 py-2">
          <SheetTitle className="uppercase font-gothamBlack text-2xl text-secondary-foreground">
            Selectează mărimea
          </SheetTitle>
        </SheetHeader>
        <Separator className="mt-4 bg-yellow-400" />
        <div className="px-6 py-6">
          <Sheet>
            <div className="text-lg">
              Alegeți mărimea pe care o căutați. <br />
              Nu știți cum să vă găsiți mărimea?{" "}
              <SheetTrigger className="underline font-gotham">
                Urmăriți instrucțiunile
              </SheetTrigger>
            </div>
            <SheetContent
              overlay={false}
              className="lg:w-[600px] max-w-none bg-[#e0e0e0] dark:bg-[#1f1f1f] border-0 text-secondary-foreground px-0 h-auto sm:max-w-[500px]"
            >
              <SheetHeader className="px-6 py-2">
                <SheetTitle className="uppercase font-gothamBlack text-2xl text-secondary-foreground">
                  Aprofundare
                </SheetTitle>
              </SheetHeader>
              <Separator className="mt-4 bg-yellow-400" />
              <div className="p-6">
                <h3 className="font-gothamBlack text-xl">
                  Cum să citești flancul anvelopei
                </h3>
                <p className="text-lg py-4">
                  Toate anvelopele au numere diferite pe flanc corespunzătoare
                  pentru: lățimea secțiunii, înălțime, cod de construcție și
                  diamentrul jantă, indice încărcare și de viteză.
                </p>
                <div className="flex justify-between items-center py-6">
                  <Button
                    variant={"outline"}
                    disabled={currSize === "size1"}
                    className="w-8 h-8 rounded-full p-0 transition-all"
                    onClick={() => {
                      if (currSize === "size4") setCurrSize("size3");
                      if (currSize === "size3") setCurrSize("size2");
                      if (currSize === "size2") setCurrSize("size1");
                    }}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div className="w-[70%] flex flex-col gap-4 relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="auto"
                      fill="none"
                      viewBox="0 0 216 108"
                      className="transition-all"
                    >
                      <path
                        className="fill-secondary-foreground"
                        d="M107.844 94.614c6.989 0 12.652 5.648 12.652 12.61h49.434c0-34.176-27.795-61.876-62.086-61.876-34.287 0-62.086 27.7-62.086 61.876h49.438c0-6.962 5.667-12.61 12.652-12.61h-.004Zm34.668-29.138c.129-.088.253-.177.382-.26 10.358 8.593 17.485 20.92 19.305 34.909a19.99 19.99 0 0 1-8.184 1.747c-6.332 0-12.568-2.981-16.469-8.55-6.341-9.053-4.122-21.521 4.966-27.841v-.005Zm-61.66 23.048c-3.28 7.54-10.664 12.048-18.421 12.048a20.02 20.02 0 0 1-8.72-2c2.218-13.887 9.683-26.028 20.307-34.343 7.611 5.343 10.686 15.445 6.839 24.29l-.005.005Zm7.017-31.916a3.797 3.797 0 0 1-.022-.26 54.772 54.772 0 0 1 19.997-3.756c7.06 0 13.806 1.332 20.001 3.751-.768 9.483-8.263 17.342-18.098 18.275-.647.062-1.291.093-1.926.093-10.224 0-18.963-7.753-19.952-18.103Z"
                      ></path>
                      <path
                        className="fill-secondary-foreground"
                        d="M38.914 106.861c0-37.94 30.861-68.696 68.93-68.696 38.068 0 68.929 30.757 68.929 68.696 0 .119 0 .239-.005.363h38.295c0-.12.004-.239.004-.363C215.067 47.842 167.058 0 107.844 0 48.629 0 .62 47.842.62 106.861c0 .119 0 .239.004.363H38.92c0-.12-.005-.239-.005-.363Z"
                      ></path>
                      <path
                        d="M65.386 21.331L68.311 19.868L68.688 38.568L65.763 40.031L65.386 21.331Z"
                        className="fill-secondary"
                      />{" "}
                      <path
                        className={`transition-all duration-500 ${
                          currSize === "size1"
                            ? "fill-[#FD0]"
                            : "fill-secondary"
                        }`}
                        d="m35.049 62.013.155-6.502c.031-.981-.177-1.525-.568-1.822-.439-.327-1.012-.234-1.45.345-.44.584-.485 1.393-.218 2.92l-3.608.804c-.568-2.278-.453-4.06 1.154-6.187 1.761-2.327 4.429-2.95 6.372-1.49l.031.021c1.563 1.172 1.78 2.64 1.647 4.454l-.209 2.698 3.005-3.972 2.671 2.008-6.497 8.585-2.48-1.866-.005.004ZM48.256 47.9l-4.43 4.268-2.582-1.668-.839-9.832 3.417-3.29 5.326 5.489 1.105-1.062 2.095 2.163-1.105 1.061 1.535 1.588-2.982 2.875-1.536-1.584-.004-.008Zm-2.06-2.123-2.365-2.437.404 4.325 1.957-1.888h.005Zm7.736-2.587.369-3.588c1.402.093 2.534-.07 3.39-.663.84-.584 1.017-1.349.622-1.92l-.023-.03c-.43-.615-1.193-.66-1.93-.146-.644.446-.923 1.039-1.145 1.773l-2.845.42-3.501-5.652 7.575-5.259 1.935 2.764-4.966 3.446.874 1.41c.316-.73.773-1.38 1.598-1.954 1.74-1.208 4.283-1.331 5.818.867l.022.03c1.691 2.424.657 5.184-2.01 7.037-2.042 1.416-3.874 1.69-5.778 1.456l-.005.008Z"
                      ></path>
                      <path
                        className={`transition-all duration-500 ${
                          currSize === "size2"
                            ? "fill-[#FD0]"
                            : "fill-secondary"
                        }`}
                        d="m74.737 30.708 1.58-3.277c1.185.544 2.299.694 3.302.358.9-.3 1.251-.863 1.06-1.429l-.013-.035c-.2-.588-.848-.796-1.921-.433l-1.718.575-1.14-1.62 1.961-2.998-4.509 1.504-1.056-3.145 9.328-3.114.937 2.782-2.037 2.95c1.984-.123 3.514.536 4.154 2.438l.013.035c.879 2.61-.923 4.825-3.612 5.723-2.5.832-4.54.61-6.333-.31l.004-.004ZM87.043 26.922l1.864-3.091c1.23.676 2.326 1.008 3.35.83 1.008-.172 1.496-.79 1.381-1.472v-.035c-.133-.734-.808-1.102-1.69-.951-.777.133-1.279.548-1.794 1.119l-2.756-.823-.763-6.599 9.098-1.552.572 3.321-5.964 1.018.19 1.65a4.414 4.414 0 0 1 2.281-1.093c2.09-.358 4.447.61 4.9 3.25v.036c.506 2.91-1.607 4.971-4.815 5.515-2.45.416-4.23-.11-5.85-1.127l-.004.004Z"
                      ></path>{" "}
                      <path
                        className={`transition-all duration-500 ${
                          currSize === "size3"
                            ? "fill-[#FD0]"
                            : "fill-secondary"
                        }`}
                        d="m107.95 13.618 6.24.42c2.263.15 3.666.814 4.5 1.765.714.814 1.052 1.787.963 3.096v.035c-.129 1.854-1.181 3.079-2.783 3.724l2.681 4.525-4.873-.327-2.161-3.8-.914-.062-.245 3.636-4.269-.287.861-12.73v.005Zm5.703 6.466c1.021.071 1.673-.345 1.726-1.128v-.035c.058-.818-.555-1.26-1.54-1.327l-1.859-.124-.169 2.49 1.842.124Zm11.658-.889-2.134.014-.098-3.242 3.954-.226 3.164.668-2.671 12.57-4.114-.867 1.895-8.912.004-.005Zm13.23 7.585c-1.163.531-2.21.465-3.071.155-2.046-.734-3.258-2.817-2.441-5.077l.013-.035c1.034-2.862 3.848-3.711 6.635-2.712 1.873.672 2.805 1.646 3.39 2.884.564 1.19.626 2.84-.119 4.896l-.014.036c-1.424 3.94-4.495 5.882-8.263 4.529-1.842-.66-3.058-1.699-3.945-3.008l2.671-1.964c.573.885 1.305 1.495 2.201 1.818 1.669.597 2.526-.641 2.938-1.521h.005Zm1.043-2.782.013-.035c.284-.787-.031-1.636-.821-1.92-.79-.282-1.535.164-1.82.956l-.013.035c-.279.77.062 1.553.852 1.836.79.283 1.522-.133 1.789-.867v-.005Z"
                      ></path>
                      <path
                        d="M157.086 36.4002C155.83 36.6435 154.832 36.3339 154.068 35.8341C152.253 34.6399 151.565 32.3356 152.897 30.3276L152.919 30.2967C154.601 27.7579 157.534 27.5899 160.006 29.2175C161.671 30.3099 162.345 31.4732 162.62 32.8133C162.886 34.1003 162.558 35.7191 161.351 37.5458L161.329 37.5767C159.012 41.0752 155.573 42.2384 152.231 40.0403C150.598 38.9655 149.657 37.674 149.102 36.1968L152.165 34.9142C152.515 35.9093 153.079 36.6745 153.873 37.1964C155.355 38.1694 156.478 37.1654 157.091 36.4091L157.086 36.4002ZM158.759 33.9411L158.777 33.9102C159.239 33.2113 159.136 32.3135 158.431 31.8491C157.725 31.3847 156.9 31.6501 156.434 32.3489L156.412 32.3798C155.959 33.0654 156.105 33.9013 156.807 34.3657C157.508 34.8257 158.32 34.5957 158.75 33.9411H158.759Z"
                        className={`transition-all duration-500 ${
                          currSize === "size4"
                            ? "fill-[#FD0]"
                            : "fill-secondary"
                        }`}
                      ></path>
                      <path
                        d="M160.055 42.5746L163.694 42.3357C163.801 43.6316 164.214 44.671 165.004 45.3787C165.709 46.0156 166.371 46.0465 166.774 45.5998L166.801 45.5733C167.218 45.1133 167.081 44.4499 166.237 43.6936L164.893 42.4861L165.745 40.6993L169.331 40.9293L165.802 37.7536L168.03 35.2901L175.331 41.8581L173.36 44.0341L169.783 43.7113C170.866 45.3698 171.039 47.0284 169.695 48.5145L169.668 48.541C167.817 50.5844 164.999 50.1067 162.896 48.2137C160.943 46.4534 160.131 44.5737 160.055 42.5657V42.5746Z"
                        className={`transition-all duration-500 ${
                          currSize === "size4"
                            ? "fill-[#FD0]"
                            : "fill-secondary"
                        }`}
                      ></path>
                      <path
                        d="M174.501 53.3089L177.954 44.4145L180.94 48.1474L179.019 52.4685L183.687 51.5795L186.639 55.2682L177.208 56.6083L173.618 59.4611L170.951 56.1262L174.497 53.3089H174.501Z"
                        className={`transition-all duration-500 ${
                          currSize === "size4"
                            ? "fill-[#FD0]"
                            : "fill-secondary"
                        }`}
                      ></path>
                    </svg>
                    <AnimatePresence>
                      {currSize === "size1" && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute -bottom-4 translate-y-full opacity-0 font-gotham text-center text-lg"
                        >
                          Numărul de trei cifre vă indică lățimea anvelopei.
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {currSize === "size2" && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute -bottom-4 translate-y-full opacity-0 font-gotham text-center text-lg"
                        >
                          Acest număr vă arată cât de înaltă este anvelopa.
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {currSize === "size3" && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute -bottom-4 translate-y-full opacity-0 font-gotham text-center text-lg"
                        >
                          Numărul din două cifre vă arată diametrul jantelor pe
                          care cauciucul trebuie montat, în inci.
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {currSize === "size4" && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute -bottom-4 translate-y-full opacity-0 font-gotham text-center text-lg"
                        >
                          Indicele de încărcare indică ce greutate poate suporta
                          anvelopa.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <Button
                    variant={"outline"}
                    disabled={currSize === "size4"}
                    className="w-8 h-8 rounded-full p-0 transition-all"
                    onClick={() => {
                      if (currSize === "size1") setCurrSize("size2");
                      if (currSize === "size2") setCurrSize("size3");
                      if (currSize === "size3") setCurrSize("size4");
                    }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <Tabs defaultValue={defVal} className="h-full">
          <div className="px-6">
            <TabsList className="w-full flex gap-3 flex-wrap sm:flex-nowrap justify-center">
              {Object.keys(transformedRims).map((rim2, k) => (
                <TabsTrigger value={rim2} key={k} className="sm:w-full">
                  {rim2.replaceAll("R", "")}&quot;
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {Object.keys(transformedRims).map((rim2, k) => {
            const aFost: string[] = [];

            return (
              <TabsContent
                value={rim2}
                key={k}
                className="h-full overflow-y-scroll"
                onClick={() => setIsOpen(false)}
              >
                {transformedRims[rim2].map((tr, l) => {
                  if (!aFost.includes(tr.size)) {
                    aFost.push(tr.size);
                    return (
                      <ProductPick
                        key={l}
                        id={tr.id}
                        size={tr.size}
                        productType={tr.productType}
                        title={title}
                        price={tr.price}
                        productID={tr.productID}
                        image={imageUrl}
                      />
                    );
                  }
                  aFost.push(tr.size);
                  return "";
                })}
              </TabsContent>
            );
          })}
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
export default TransformedRims;
