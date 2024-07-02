import axios from "axios";
import { useEffect, useState } from "react";

import {
  emptyProductDetails,
  getProductDetailsUrl,
  getProductsUrl,
} from "../constants";
import { IProduct, IProductData } from "../types";

const useFetchProductDetails = (productId: string) => {
  const [state, setState] = useState<{
    loading: boolean;
    data: IProduct;
    error: string;
  }>({
    loading: true,
    data: null,
    error: "",
  });

  const fetchProductDetails = async () => {
    try {
      const { data, status } = await axios.get(getProductDetailsUrl(productId));
      console.log({ status, data });
      if (status === 200) {
        setState((prevState) => ({
          ...prevState,
          data: data,
        }));
      }
      //handler other error codes here
    } catch (error) {
      console.error("error occured while fetching products ", error);
    } finally {
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      error: "",
      loading: true,
      data: null,
    }));
    fetchProductDetails();
  }, [productId]);

  return state;
};

export default useFetchProductDetails;
