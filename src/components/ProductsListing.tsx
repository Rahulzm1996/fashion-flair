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
      ) : (
        <Grid
          container
          rowSpacing={6}
          columnSpacing={6}
          sx={{ height: "100vh", overflowY: "scroll" }}
        >
          {productsList?.map((product) => (
            <Product {...product} key={product.id} />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductsListing;
