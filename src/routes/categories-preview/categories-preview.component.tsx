import { useSelector } from "react-redux";
import { CategoryPreview } from "../../components/category-preview/category-preview.component";
import { selectCategoriesMap } from "../../store/category/category.selector";

export const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  return (
    <>
      {categoriesMap &&
        Object.keys(categoriesMap).map((title) => {
          return (
            <CategoryPreview
              key={title}
              title={title}
              products={categoriesMap[title]}
            />
          );
        })}
    </>
  );
};
