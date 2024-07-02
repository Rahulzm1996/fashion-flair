import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";

import Filters from "./Filters";
import { IProduct, IProductData, ITshirt } from "../types";
import SearchBar from "./SearchBar";
import ProductsListing from "./ProductsListing";
import { useAppContext } from "../context";
import useFetchProducts from "../hooks/useFetchProducts";

const Layout = () => {
  const { loading, productsData } = useFetchProducts();
  const [productsList, setproductsList] = useState<Array<IProduct>>([]);

  console.log({ loading, productsData });

  useEffect(() => {
    setproductsList(productsData?.resources);
  }, [productsData]);

  return (
    <Stack sx={{ width: "100vw", minHeight: "100vh", flexDirection: "column" }}>
      <SearchBar
        products={productsData?.resources}
        productsList={productsList}
        setproductsList={setproductsList}
      />
      <ProductsListing loading={loading} productsList={productsList} />
    </Stack>
  );
};

export default Layout;
