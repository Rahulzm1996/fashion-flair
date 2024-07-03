export const fetchTshirtsUrl =
  "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

export const getProductsUrl = "http://localhost:3000/products";
export const getProductDetailsUrl = (id: string) =>
  `http://localhost:3000/products/${id}`;

export const NO_PAGE_FOUND_IMAGE_URL =
  "https://img.freepik.com/free-vector/error-404-concept-landing-page_52683-12188.jpg?w=826&t=st=1683389953~exp=1683390553~hmac=32494fa48d9f20f4be46047feba3176869737515422c0bb058dd6de5d2f5b78d";
export const NO_PRODUCTS_IMAGE_URL =
  "https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527142.jpg?t=st=1720020862~exp=1720024462~hmac=727f34888b08b9d10c06bfb6e2cc7d882dca90b61820dcd28191b82a716cd272&w=740";
export const NO_SEARCH_RESULTS =
  "https://img.freepik.com/free-vector/search-concept-landing-page_52683-11001.jpg?t=st=1720021273~exp=1720024873~hmac=56a45c379a21c9c2507d1ba8bd70090aaf6d80d77f96fb3c8256fff5b03d479b&w=996";
export const NO_ITEM_IN_CART =
  "https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg?w=740";

export const NAVBAR_DRAWER_WIDTH = 240;

export const emptyProductDetails = {
  id: 0,
  title: "",
  price: 0,
  description: "",
  stock: 0,
  category: "",
  image: "",
  rating: {
    rate: 0,
    count: 0,
  },
};
