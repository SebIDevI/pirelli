"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

import poza from "@/public/pirelli-wheel.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  function rim(size: string) {
    fetch("/api/filters/filterSize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        size: size,
      }),
    })
      .then((res) => {
        if (res.status === 403) {
          alert(
            "An error occurred, try again and if the errpr persists, contact us!"
          );
        }
      })
      .then((products) => {
        router.push("/catalog/marime/" + size);
      });
  }

  const sizes = [
    {
      size: "R14",
      types: ["165/70 R14", "175/65 R14", "175/70 R14", "185/65 R14"],
    },
    {
      size: "R15",
      types: [
        "165/60 R15",
        "175/65 R15",
        "185/55 R15",
        "185/60 R15",
        "185/65 R15",
        "185/70 R15",
        "195/50 R15",
        "195/55 R15",
        "195/60 R15",
        "195/65 R15",
        "195/70 R15",
        "205/60 R15",
        "205/65 R15",
        "215/60 R15",
        "215/65 R15",
        "215/70 R15",
        "225/50 R15",
        "225/70 R15",
        "345/35 R15",
      ],
    },
    {
      size: "R16",
      types: [
        "195/45 R16",
        "195/50 R16",
        "195/55 R16",
        "195/60 R16",
        "195/75 R16",
        "205/55 R16",
        "205/60 R16",
        "205/65 R16",
        "205/75 R16",
        "205/80 R16",
        "215/45 R16",
        "215/55 R16",
        "215/60 R16",
        "215/65 R16",
        "215/75 R16",
        "225/50 R16",
        "225/55 R16",
        "225/65 R16",
        "225/75 R16",
        "235/60 R16",
        "235/65 R16",
        "235/70 R16",
        "245/45 R16",
        "265/70 R16",
      ],
    },
    {
      size: "R14",
      types: [
        "205/40 R17",
        "205/45 R17",
        "205/50 R17",
        "205/55 R17",
        "215/40 R17",
        "215/45 R17",
        "215/50 R17",
        "215/55 R17",
        "215/60 R17",
        "215/65 R17",
        "225/45 R17",
        "225/50 R17",
        "225/55 R17",
        "225/60 R17",
        "225/65 R17",
        "235/40 R17",
        "235/45 R17",
        "235/55 R17",
        "235/60 R17",
        "235/65 R17",
        "245/40 R17",
        "245/45 R17",
        "245/65 R17",
        "255/40 R17",
        "255/45 R17",
        "265/65 R17",
        "285/40 R17",
        "335/35 R17",
      ],
    },
    {
      size: "R18",
      types: [
        "205/40 R18",
        "215/40 R18",
        "215/45 R18",
        "215/50 R18",
        "215/55 R18",
        "225/35 R18",
        "225/40 R18",
        "225/45 R18",
        "225/50 R18",
        "225/55 R18",
        "225/60 R18",
        "235/35 R18",
        "235/40 R18",
        "235/45 R18",
        "235/50 R18",
        "235/55 R18",
        "235/60 R18",
        "235/65 R18",
        "245/35 R18",
        "245/40 R18",
        "245/45 R18",
        "245/50 R18",
        "245/60 R18",
        "255/35 R18",
        "255/40 R18",
        "255/45 R18",
        "255/50 R18",
        "255/55 R18",
        "255/60 R18",
        "265/35 R18",
        "265/40 R18",
        "265/45 R18",
        "265/60 R18",
        "275/35 R18",
        "275/40 R18",
        "275/45 R18",
        "285/30 R18",
        "285/35 R18",
        "285/45 R18",
        "285/55 R18",
        "295/30 R18",
        "295/35 R18",
        "315/30 R18",
        "335/30 R18",
      ],
    },
    {
      size: "R19",
      types: [
        "205/55 R19",
        "215/50 R19",
        "225/35 R19",
        "225/40 R19",
        "225/45 R19",
        "225/55 R19",
        "235/35 R19",
        "235/40 R19",
        "235/45 R19",
        "235/50 R19",
        "235/55 R19",
        "235/65 R19",
        "245/30 R19",
        "245/35 R19",
        "245/40 R19",
        "245/45 R19",
        "245/50 R19",
        "255/30 R19",
        "255/35 R19",
        "255/40 R19",
        "255/45 R19",
        "255/50 R19",
        "255/55 R19",
        "255/60 R19",
        "255/65 R19",
        "265/30 R19",
        "265/35 R19",
        "265/40 R19",
        "265/45 R19",
        "265/50 R19",
        "265/55 R19",
        "275/30 R19",
        "275/35 R19",
        "275/40 R19",
        "275/45 R19",
        "275/50 R19",
        "275/55 R19",
        "285/30 R19",
        "285/35 R19",
        "285/40 R19",
        "285/45 R19",
        "295/30 R19",
        "295/40 R19",
        "295/45 R19",
        "305/30 R19",
        "305/35 R19",
      ],
    },
    {
      size: "R20",
      types: [
        "195/55 R20",
        "215/45 R20",
        "225/35 R20",
        "225/40 R20",
        "235/35 R20",
        "235/40 R20",
        "235/45 R20",
        "235/50 R20",
        "235/55 R20",
        "245/30 R20",
        "245/35 R20",
        "245/40 R20",
        "245/45 R20",
        "255/30 R20",
        "255/35 R20",
        "255/40 R20",
        "255/45 R20",
        "255/50 R20",
        "255/55 R20",
        "255/60 R20",
        "265/30 R20",
        "265/35 R20",
        "265/40 R20",
        "265/45 R20",
        "265/50 R20",
        "275/30 R20",
        "275/35 R20",
        "275/40 R20",
        "275/45 R20",
        "275/50 R20",
        "275/55 R20",
        "275/60 R20",
        "285/30 R20",
        "285/35 R20",
        "285/40 R20",
        "285/45 R20",
        "285/50 R20",
        "295/30 R20",
        "295/35 R20",
        "295/40 R20",
        "295/45 R20",
        "305/30 R20",
        "305/35 R20",
        "305/40 R20",
        "315/30 R20",
        "315/35 R20",
        "325/30 R20",
        "325/35 R20",
        "335/30 R20",
        "345/25 R20",
        "345/30 R20",
      ],
    },
    {
      size: "R21",
      types: [
        "235/45 R21",
        "245/35 R21",
        "245/40 R21",
        "245/45 R21",
        "255/30 R21",
        "255/35 R21",
        "255/40 R21",
        "255/50 R21",
        "265/30 R21",
        "265/35 R21",
        "265/40 R21",
        "265/45 R21",
        "275/30 R21",
        "275/35 R21",
        "275/40 R21",
        "285/30 R21",
        "285/35 R21",
        "285/40 R21",
        "285/45 R21",
        "295/30 R21",
        "295/35 R21",
        "295/40 R21",
        "305/30 R21",
        "305/35 R21",
        "315/30 R21",
        "315/35 R21",
        "315/40 R21",
        "325/25 R21",
        "325/30 R21",
        "335/30 R21",
        "345/30 R21",
        "355/25 R21",
      ],
    },
    {
      size: "R22",
      types: [
        "255/30 R22",
        "255/35 R22",
        "265/35 R22",
        "265/40 R22",
        "275/35 R22",
        "275/40 R22",
        "285/30 R22",
        "285/35 R22",
        "285/40 R22",
        "285/45 R22",
        "295/30 R22",
        "295/35 R22",
        "295/40 R22",
        "315/25 R22",
        "315/30 R22",
        "315/35 R22",
        "325/30 R22",
        "325/35 R22",
        "325/55 R22",
        "335/25 R22",
      ],
    },
    {
      size: "R23",
      types: [
        "275/35 R23",
        "275/40 R23",
        "285/35 R23",
        "285/40 R23",
        "295/35 R23",
        "315/30 R23",
        "325/30 R23",
        "325/35 R23",
      ],
    },
    {
      size: "R24",
      types: ["285/35 R24"],
    },
  ];

  return (
    <div className="bg-secondary font-gotham">
      <div className="w-full xs:h-[60vh] text-primary-foreground relative overflow-hidden py-6">
        {/* <div className="w-full h-full absolute top-0 left-0 scale-125">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=g0Oah5C5ppA"
            playing={true}
            loop={true}
            controls={false}
            volume={0}
            muted
            width={"100%"}
            height={"100%"}
            className="w-full h-full"
          />
        </div> */}
        <div className="w-full h-full absolute top-0 left-0 bg-black">
          <Image src={poza} alt="Tyre" className="absolute right-0 scale-90" />
        </div>
        <div className="w-full h-full relative mt-10 container">
          <div className="w-full h-full flex items-center py-14 gap-2">
            <div className="flex flex-col justify-between w-full h-full">
              <div className="lg:w-1/2">
                <p className="font-gothamLight uppercase text-sm">
                  <Link
                    href={"/"}
                    className="uppercase relative after:absolute after:w-0 after:h-px after:bottom-0 after:left-0 after:bg-secondary hover:after:w-full after:transition-all after:duration-500"
                  >
                    Homepage
                  </Link>
                  {" / "}
                  <Link
                    href={"/catalog"}
                    className="uppercase relative after:absolute after:w-0 after:h-px after:bottom-0 after:left-0 after:bg-secondary hover:after:w-full after:transition-all after:duration-500"
                  >
                    Catalog anvelope
                  </Link>{" "}
                  / <span className="font-gotham">Mărime</span>
                </p>
                <h1 className="text-5xl font-gothamBlack py-4">
                  ANVELOPE AUTO
                </h1>
                <p className="text-base">
                  Catalogul de anvelope Pirelli este rezultatul anilor de
                  investiții, cercetări și inovații și include o gamă largă de
                  modele de vară, iarnă și all-season concepute pentru
                  automobile, modele SUV și van.
                </p>
              </div>
              <div className="w-full">
                <h1 className="text-4xl font-gothamBlack uppercase py-4">
                  Anvelopele noastre
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full container py-10">
        {sizes.map((size, i) => (
          <div key={i}>
            <p className="py-6">{size.size[1] + size.size[2]} RIM</p>
            <div
              className="grid lg:grid-cols-8 md:grid-cols-5 xs:grid-cols-3 grid-cols-2 gap-4"
              key={i}
            >
              {size.types.map((type, index) => (
                <span
                  key={index}
                  className="font-gothamBook text-secondary-foreground/70 cursor-pointer hover:text-yellow-500 transition"
                  onClick={() => rim(type.replace(/\//g, "_"))}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        ))}
        <p className="max-w-[1200px] text-sm mx-auto font-gothamBook mt-20">
          WARNING! By selecting the dimensions, the interactive application will
          show the list of Pirelli tyres best suited to your vehicle according
          to its technical features and homologation.{" "}
          <b className="underline">Legal information</b> <br />
          <br />
          Each car is fitted with tyres of a specific size. That is why it is
          fundamental that you <b>
            choose the tyre with the right dimensions
          </b>{" "}
          for the vehicle, to minimize safety risks and achieve the best driving
          performance. <br />
          The Pirelli catalogue contains a wide range of tyres for every models
          and types of vehicle on the market, suitable for various driving
          contexts both in urban and rural areas, and for{" "}
          <b>all tyre dimensions</b>. <br />
          With the <b>search of tyre size</b> filter, you can quickly and easily
          identify the specific solution that best meets your requirements in
          just a few clicks: you can simply select the width and profile of your
          tyre and the diameter of the rim to be able to see the product data
          sheets of all the summer tyres, winter tyres and all season tyres
          Pirelli available. <br />
          By analyzing the specific features of each tyre offered, you can
          compare the various solutions available within Pirelli’s extensive
          catalogue and find the right tyre for your requirements. <br />
          Finally, once you have found the most suitable tyre, we recommend that
          you consult the list of nearest tyre shops and repair services Pirelli
          to obtain more details and complete the purchase in total safety.
        </p>
      </div>
    </div>
  );
}

export default Home;
