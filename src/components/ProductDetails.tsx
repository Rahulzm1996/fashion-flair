import {
  Alert,
  Box,
  Button,
  Chip,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { getProductDetailsUrl } from "../constants";
import useFetchProductDetails from "../hooks/useFetchProductDetails";
import CircularProgress from "@mui/material/CircularProgress";
import { isEmpty } from "lodash";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import { useAppContext } from "../context";
import Snackbar from "./Snackbar";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  console.log("productId : ", { id });
  const history = useHistory();
  const { loading, data, error } = useFetchProductDetails(id);
  const { cartItemList, setCartItemList } = useAppContext();
  const itProductAlreadyInCart = cartItemList.some(
    (prod) => prod.id === parseInt(id)
  );
  console.log(
    "is item in cart : ",
    cartItemList.some((prod) => prod.id === parseInt(id))
  );
  console.log({ loading, data, error });
  const { title, description, category, price, image, rating, stock } =
    data || {};
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: "",
    variant: "success",
  });

  const [isAddToCartClicked, setIsAddToCartClicked] = useState(false);

  const handleAddToCart = () => {
    setIsAddToCartClicked(true);
    setSnackbarInfo({
      open: true,
      message: `${title} tshirt has been added to the cart`,
      variant: "success",
    });
    setCartItemList((prevList) => [
      ...prevList,
      { ...data, stock: data.stock - 1 },
    ]);
  };

  return (
    <Grid
      container
      sx={{
        padding: "24px",
        minHeight: "calc(100%  - 64px - 160px)",
        flex: 1,
        gap: "16px",
      }}
    >
      {itProductAlreadyInCart && (
        <Alert severity="info" sx={{ width: "100%", alignItems: "center" }}>
          <Stack direction="row" gap="16px" alignItems="center">
            <Typography variant="body2" component="div">
              Product added to a cart. please go to cart.
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => history.push("/cart")}
              fullWidth
              sx={{
                width: "max-content",
                background: "#0d0d0d",
                "&:hover": {
                  background: "#0d0d0d",
                },
              }}
            >
              Go to cart
            </Button>
          </Stack>
        </Alert>
      )}

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
        <Grid item sx={{ width: "100%" }}>
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
                width: { xs: "100%", sm: "50%", justifyContent: "center" },
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
                  // height: "400px",
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

                {isAddToCartClicked || itProductAlreadyInCart ? (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => history.push("/cart")}
                    fullWidth
                    sx={{
                      background: "#0d0d0d",
                      "&:hover": {
                        background: "#0d0d0d",
                      },
                    }}
                  >
                    Go to cart
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleAddToCart}
                    fullWidth
                    disabled={stock === 0}
                    sx={{
                      background: "#0d0d0d",
                      "&:hover": {
                        background: "#0d0d0d",
                      },
                    }}
                  >
                    Add to cart
                  </Button>
                )}
              </Stack>
            </Stack>
          </Stack>
          {snackbarInfo.open && (
            <Snackbar {...snackbarInfo} setSnackbarInfo={setSnackbarInfo} />
          )}
        </Grid>
      ) : null}
    </Grid>
  );
};

export default ProductDetails;
