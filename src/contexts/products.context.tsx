import { createContext, FC, PropsWithChildren, useState } from "react";
import PRODUCTS from "../shop-data.json";

export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

type Products = {
  products: Product[];
};

export const ProductContext = createContext<Products>({
  products: [],
});

export const ProductProvider: FC<PropsWithChildren> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const value = { products, setProducts };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
