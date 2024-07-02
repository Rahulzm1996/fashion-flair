import {
  Box,
  Button,
  Chip,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { getProductDetailsUrl } from "../constants";
import useFetchProductDetails from "../hooks/useFetchProductDetails";
import CircularProgress from "@mui/material/CircularProgress";
import { isEmpty } from "lodash";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  console.log("productId : ", { id });
  const { loading, data, error } = useFetchProductDetails(id);
  console.log({ loading, data, error });
  const { title, description, category, price, image, rating, stock } =
    data || {};

  return (
    <Grid container sx={{ flex: 1, padding: "24px" }}>
      {loading ? (
        <Stack
          width="100%"
          height="auto"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Stack>
      ) : null}

      {!loading && isEmpty(data) ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          <Stack gap="8px" alignItems="center" justifyContent="center">
            <Typography variant="h5">Something went wrong!</Typography>
            <Typography variant="subtitle2">
              Please refresh page or try again later.
            </Typography>
          </Stack>
        </Stack>
      ) : null}

      {!loading && !isEmpty(data) ? (
        <Grid item sx={{ border: "1px solid black", width: "100%" }}>
          <Stack
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: "0", sm: "24px" },
            }}
            height="100%"
            width="100%"
          >
            <Stack
              sx={{
                height: "100%",
                width: { xs: "100%", sm: "50%" },
              }}
            >
              <img
                src={image}
                alt="product-image"
                style={{
                  display: "block",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Stack>
            <Stack
              gap="24px"
              justifyContent="center"
              sx={{
                padding: "24px 24px  0 24px",
                width: { xs: "100%", sm: "50%" },
              }}
            >
              <Typography variant="h6" gutterBottom>
                {title || ""}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {description || ""}
              </Typography>
              <Stack
                gap="12px"
                alignItems="center"
                direction="row"
                flexWrap="wrap"
              >
                <Chip
                  icon={<StarPurple500SharpIcon />}
                  label={rating.rate}
                  size="small"
                />{" "}
                {rating.count} Rating{" "}
                <Chip label={category} variant="outlined" />
              </Stack>
              <Stack gap="12px">
                <Stack gap="12px" alignItems="center" direction="row">
                  <Typography variant="h4" gutterBottom>
                    &#8377; {price}
                  </Typography>
                  <Typography variant="caption" display="block" color="red">
                    only {stock} left
                  </Typography>
                </Stack>

                <Button variant="contained">Add to Cart</Button>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default ProductDetails;
