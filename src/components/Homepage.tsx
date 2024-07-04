import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { IProduct } from "../types";
import SearchBar from "./SearchBar";
import ProductsListing from "./ProductsListing";
import useFetchProducts from "../hooks/useFetchProducts";
import { NO_PRODUCTS_IMAGE_URL } from "../constants";

const Homepage = () => {
  const { loading, productsData } = useFetchProducts();
  const [productsList, setproductsList] = useState<Array<IProduct>>([]);

  useEffect(() => {
    setproductsList(productsData?.resources);
  }, [productsData]);

  return (
    <Stack
      sx={{
        width: "100vw",
        minHeight: "calc(100%  - 64px - 160px)",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <SearchBar products={productsList} />
      {!loading && productsData?.resources?.length === 0 ? (
        <Stack
          sx={{ width: "100%", height: "80%" }}
          justifyContent="center"
          alignItems="center"
        >
          <Stack sx={{ width: "70%", height: "50%", gap: "12px" }}>
            <Typography variant="h6" margin="0 auto">
              No products right now. please try after some time.
            </Typography>
            <img
              src={NO_PRODUCTS_IMAGE_URL}
              alt="no products"
              style={{
                display: "block",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                objectFit: "cover",
              }}
            />
          </Stack>
        </Stack>
      ) : null}
      <ProductsListing loading={loading} productsList={productsList} />
    </Stack>
  );
};

export default Homepage;
