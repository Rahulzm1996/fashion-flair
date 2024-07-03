import { Box, Pagination } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

import { IProduct } from "../types";
import Product from "./Product";

const ProductsListing = ({
  loading,
  productsList,
}: {
  loading: boolean;
  productsList: Array<IProduct>;
}) => {
  return (
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
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
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
          <Pagination count={10} />
        </Grid>
      ) : null}
    </Box>
  );
};

export default ProductsListing;
