import create from "zustand";
import { ProductsTypes, ProductTypes } from "@/types/filtering-types";

// Define the store's type
interface FilterState {
  paramTags: Map<string, string[]>;
  filteredProducts: ProductTypes[];
  initializeParamTags: (params: string, slug: string) => void;
  filterProducts: (products: ProductTypes[]) => void;
}

// Create the store
export const useFilterStore = create<FilterState>((set, get) => ({
  paramTags: new Map<string, string[]>(),
  filteredProducts: [],

  initializeParamTags: (params, slug) => {
    const tagsMap = new Map<string, string[]>();

    params
      .replaceAll("+", " ")
      .replaceAll("%2C", ",")
      .split("&")
      .forEach((value) => {
        const [key, val] = value.split("=");
        if (key && val) {
          tagsMap.set(key, val.split(", "));
        }
      });

    let trueSlug =
      slug === "p zero" ||
      slug === "pzero" ||
      slug === "p-zero" ||
      slug === "P ZERO" ||
      slug === "PZERO" ||
      slug === "P-ZERO"
        ? "P ZERO"
        : slug === "all-season"
        ? "ALL SEASON"
        : slug === "vara"
        ? "SUMMER"
        : slug === "carrier"
        ? "CARRIER"
        : slug.toUpperCase();

    if (trueSlug[0] <= "9" && trueSlug[0] >= "0") trueSlug = "";
    else {
      tagsMap.set("slug", [
        trueSlug.replaceAll("%20", "").replaceAll("_", "/"),
      ]);
    }

    set({ paramTags: tagsMap });
  },

  filterProducts: (products) => {
    const paramTags = get().paramTags;

    // Create the tags Map once outside of the filter loop
    const filteredProducts = products.reduce((acc, product) => {
      if (product.productVariants.length > 0) {
        const validVariants = product.productVariants.filter(
          (productVariant) => {
            const variantTagsMap = new Map<string, boolean>(
              productVariant.variantTags.map((vtg) => [vtg.tag, true])
            );

            const isValid = Array.from(paramTags.values()).every((row) => {
              if (row[0][0] < "0" || row[0][0] > "9") {
                return row.some(
                  (ptag) =>
                    variantTagsMap.has(ptag === "CARZ" ? "CAR" : ptag) ||
                    (ptag === "Sport" &&
                      productVariant.fullSize.split(" ")[1].includes("W"))
                );
              }
              return true;
            });

            return (
              isValid &&
              (paramTags.get("slug") === undefined ||
                variantTagsMap.has(paramTags.get("slug")![0])) &&
              (acc.length === 0 || acc[acc.length - 1].id !== product.id)
            );
          }
        );

        if (validVariants.length > 0) {
          acc.push({
            ...product,
            productVariants: validVariants,
          });
        }
      }
      return acc;
    }, [] as ProductTypes[]);

    set({ filteredProducts: filteredProducts });
  },
}));
