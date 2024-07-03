import Button from "@mui/material/Button";
import { Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { IProduct } from "../types";
import Product from "./Product";
import { useHistory } from "react-router";
import { NO_SEARCH_RESULTS } from "../constants";

const SearchResults = () => {
  const history = useHistory();
  const state: { searchResults: IProduct[] } = history.location.state || {
    searchResults: [],
  };
  const productsList: IProduct[] = state.searchResults || [];

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexGrow: 1,
        padding: "24px",
        overflowY: "auto",
      }}
    >
      {productsList?.length === 0 ? (
        <Stack
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            rowGap: "24px",
          }}
        >
          <Stack
            sx={{ width: "100%" }}
            justifyContent="center"
            alignItems="center"
          >
            <Stack sx={{ width: "70%", gap: "12px" }}>
              <Typography variant="h6" sx={{ margin: "0 auto" }}>
                No products found!
              </Typography>
              <img
                src={NO_SEARCH_RESULTS}
                alt="no products"
                style={{
                  display: "block",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  objectFit: "cover",
                }}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={() => history.push("/products")}
                sx={{
                  margin: "0 auto",
                  width: "fit-content",
                  background: "#0d0d0d",
                  "&:hover": {
                    background: "#0d0d0d",
                  },
                }}
              >
                Back to products
              </Button>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Stack>
          <Stack gap="24px">
            <Stack direction="row" gap="24px" alignItems="center">
              <Typography variant="h6">
                {productsList.length} products found.
              </Typography>

              <Button
                variant="outlined"
                size="small"
                onClick={() => history.push("/products")}
                sx={{
                  color: "#242525",
                  borderColor: "#242525",
                  "&:hover": {
                    background: "#f2f6f8",
                    borderColor: "#242525",
                  },
                }}
              >
                Back to products
              </Button>
            </Stack>

            <Grid container gap="48px">
              {productsList?.map((product) => (
                <Product {...product} key={product.id} />
              ))}
            </Grid>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default SearchResults;
