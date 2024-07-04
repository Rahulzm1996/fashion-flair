import { IProduct } from "../types";

export interface ICartProps {
  product: IProduct;
  incrementalProductUpdate?: boolean;
  handleDeleteProduct: (id: string, name: string | undefined) => void;
  addProductToCart: ({
    id,
    quantity,
  }: {
    id: number | string;
    quantity: number;
  }) => Promise<void>;
}
