export interface IProductData {
  total: number;
  count: number;
  resources: Array<IProduct>;
}

export interface IProduct {
  id: number | string;
  title: string;
  price: number;
  description: string;
  stock: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  product: IProduct;
  quantity: number;
}

export interface ICartItem extends IProduct {}

export interface IAppProvider {
  cartItemList: Array<ICartItem>;
  setCartItemList: React.Dispatch<React.SetStateAction<ICartItem[]>>;
}

export interface ISearchBarProps {
  products: Array<IProduct>;
}
