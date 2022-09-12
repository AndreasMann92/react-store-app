import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { getCollectionAndDocuments } from "../utils/firebase.utils";

export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

type CategoriesMap = { [categorie: string]: Product[] };

type CategoriesType = {
  categoriesMap: CategoriesMap;
};

export const CategoriesContext = createContext<CategoriesType>({
  categoriesMap: {},
});

export const CategoriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState<CategoriesMap>({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCollectionAndDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap, setCategoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
