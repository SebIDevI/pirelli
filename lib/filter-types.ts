export type FiltersType = {
  active: boolean;
  family: string | undefined;
  features: FeaturesType | undefined;
  season: string | undefined;
  size: string | undefined;
  type: string | undefined;
};

type FeaturesType = {
  iv: string | undefined;
  rr: string | undefined;
  wg: string | undefined;
  fullSize: string | undefined;
};

export type techType =
  | "All"
  | "r-f"
  | "ncs"
  | "CYBER"
  | "elt"
  | "s-i"
  | "RUNFORWARD";
export type utilType =
  | "All"
  | "Turism"
  | "Sport"
  | "Controlul puterii"
  | "Urban"
  | "EV";

export type famType =
  | "All"
  | "POWERGY"
  | "P ZERO"
  | "PZERO"
  | "CINTURATO"
  | "SCORPION"
  | "CARRIER";

export type typeType = "CAR" | "VAN" | "All" | "SUV";

export type seasonType =
  | "All"
  | "All Season"
  | "Vară"
  | "Iarnă"
  | "VARĂ"
  | "IARNĂ"
  | "ALL-SEASON"
  | "ALL SEASON"
  | "all-season"
  | "all season"
  | "ALL";
export type sizeType = string;
