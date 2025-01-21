export interface IFoodCatalog {
  id: number;
  productName: string;
  productPrice: string;
  productPhoto: string;
  category: {
    id: number;
    categoryName: string;
  };
}
