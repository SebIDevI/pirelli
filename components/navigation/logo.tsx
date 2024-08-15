import Image from "next/image";

import pirelliLogo from "@/public/pirelliLogo.png";

export default function Logo() {
  return (
    <Image
      src={pirelliLogo}
      alt="Logo Pirelli"
      width={130}
      className="h-auto"
    />
  );
}
