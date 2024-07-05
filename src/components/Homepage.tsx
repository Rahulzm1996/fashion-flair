import {
  Box,
  CircularProgress,
  Grid,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { IProduct } from "../types";
import SearchBar from "./SearchBar";
import useFetchProducts from "../hooks/useFetchProducts";
import { NO_PRODUCTS_IMAGE_URL } from "../constants";
import Product from "./Product";
import { useAppContext } from "../context";
import _ from "lodash";

const PAGE_SIZE = 10;
const ITEMS_PER_PAGE = [5, 10, 20, 50];
const Homepage = () => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    size: PAGE_SIZE,
  });
  const { currentPage, size } = pagination;
  const { loading, productsData } = useFetchProducts({
    page: currentPage,
    size: size,
  });
  const [productsList, setproductsList] = useState<Array<IProduct>>([]);
  const { setStockDetails } = useAppContext();

  useEffect(() => {
    setproductsList(productsData?.resources);
    const stockList = productsData?.resources?.map((product) => ({
      id: product.id as number,
      stock: product.stock,
    }));

    //keeping stock details in context, to be used in cart for validation stocks available for purchase
    setStockDetails((prevStockDetails) => {
      const mergedArray = _.unionBy(stockList, prevStockDetails, "id");
      return mergedArray;
    });
  }, [productsData]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: page,
    }));
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      size: parseInt(event.target.value),
    }));
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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap="12px"
          paddingTop="24px"
        >
          <Stack direction="row" gap="8px" alignItems="center">
            <Typography variant="caption" fontWeight="600">
              Items per page
            </Typography>
            <Select
              value={"" + size}
              // label="ItemsPerPage"
              size="small"
              onChange={handleItemsPerPageChange}
              sx={{ height: "34px" }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {ITEMS_PER_PAGE.map((size, index) => (
                <MenuItem key={index} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Pagination
            count={Math.ceil(productsData.total / size)}
            page={currentPage}
            onChange={handlePageChange}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          />
        </Stack>
      </Box>
    </Stack>
  );
};

export default Homepage;
