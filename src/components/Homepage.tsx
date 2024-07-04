import {
  Box,
  CircularProgress,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { IProduct } from "../types";
import SearchBar from "./SearchBar";
import ProductsListing from "./ProductsListing";
import useFetchProducts from "../hooks/useFetchProducts";
import { NO_PRODUCTS_IMAGE_URL } from "../constants";
import Product from "./Product";

const PAGE_SIZE = 10;
const Homepage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, productsData } = useFetchProducts({
    page: currentPage,
    size: PAGE_SIZE,
  });
  const [productsList, setproductsList] = useState<Array<IProduct>>([]);

  useEffect(() => {
    setproductsList(productsData?.resources);
  }, [productsData]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

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
      <Box
        sx={{
          width: "100%",
          flexGrow: 1,
          padding: "16px",
          overflowY: "auto",
        }}
      >
        {loading ? (
          <Box
            sx={{
              minHeight: "400px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ color: "#303132" }} />
          </Box>
        ) : null}
        {!loading && productsList.length > 0 ? (
          <Grid
            container
            rowSpacing={6}
            columnSpacing={6}
            sx={{ height: "100vh", overflowY: "scroll" }}
          >
            {productsList?.map((product) => (
              <Product {...product} key={product.id} product={product} />
            ))}
          </Grid>
        ) : null}
        <Pagination
          count={Math.ceil(productsData.total / PAGE_SIZE)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ display: "flex", justifyContent: "center", paddingTop: "24px" }}
        />
      </Box>
    </Stack>
  );
};

export default Homepage;
