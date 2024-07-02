export interface IProductData {
  total: number;
  count: number;
  resources: Array<IProduct>;
}

export interface IProduct {
  id: number;
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
}

export interface ICartItem {
  id: number;
  qty: number;
  total: number;
  product: Partial<IProduct>;
}

export interface IAppProvider {
  cartItemList: Array<ICartItem>;
  setCartItemList: React.Dispatch<React.SetStateAction<ICartItem[]>>;
}
