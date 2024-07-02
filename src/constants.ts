export const fetchTshirtsUrl =
  "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

export const getProductsUrl = "http://localhost:3000/products";
export const getProductDetailsUrl = (id: string) =>
  `http://localhost:3000/products/${id}`;

export const NO_PAGE_FOUND_IMAGE_URL =
  "https://img.freepik.com/free-vector/error-404-concept-landing-page_52683-12188.jpg?w=826&t=st=1683389953~exp=1683390553~hmac=32494fa48d9f20f4be46047feba3176869737515422c0bb058dd6de5d2f5b78d";

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
