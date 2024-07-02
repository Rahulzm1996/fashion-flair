import axios from "axios";
import { useEffect, useState } from "react";

import { getProductsUrl } from "../constants";
import { IProductData } from "../types";

const useFetchProducts = () => {
  const [data, setData] = useState<IProductData>({
    total: 0,
    count: 0,
    resources: [],
  });
  const [loading, setLoading] = useState(false);

  const fetchproducts = async () => {
    try {
      const { data, status } = await axios.get(getProductsUrl, { params: {} });
      console.log({ status, data });
      if (status === 200) {
        setData(data);
      }
    } catch (error) {
      console.error("error occured while fetching products ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setData({ total: 0, count: 0, resources: [] });
    fetchproducts();
  }, []);

  return { loading, productsData: data };
};

export default useFetchProducts;
