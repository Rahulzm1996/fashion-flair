import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { Box, IconButton, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import { IProduct, ITshirt } from "../types";
import Snackbar from "./Snackbar";
import { useAppContext } from "../context";
import Product from "./Product";
import { useHistory } from "react-router";

const SearchResults = () => {
  const history = useHistory();
  const state: { searchResults: IProduct[] } = history.location.state || {
    searchResults: [],
  };

  const productsList: IProduct[] = state.searchResults || [];
  console.log("SearchResults : ", { state });

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
          <Typography variant="h6" display="inline-block">
            No products found!!
          </Typography>
          <Button variant="contained" size="small" href="/products">
            Back to products
          </Button>
        </Stack>
      ) : (
        <Stack>
          <Stack gap="24px">
            <Stack direction="row" gap="24px" alignItems="center">
              <Typography variant="h6">
                {productsList.length} products found.
              </Typography>
              <Button variant="outlined" size="small" href="/products">
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
