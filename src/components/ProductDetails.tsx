import { Alert, Button, Chip, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import useFetchProductDetails from "../hooks/useFetchProductDetails";
import CircularProgress from "@mui/material/CircularProgress";
import { isEmpty } from "lodash";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import { useAppContext } from "../context";
import Snackbar from "./Snackbar";
import { getAddToCartUrl } from "../constants";
import axios from "axios";
import { IProduct } from "../types";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { loading, data } = useFetchProductDetails(id);
  const { cartItemList, setCartItemList } = useAppContext();
  const isProductAlreadyInCart = cartItemList.some(
    (prod) => prod.id === parseInt(id)
  );

  const { title, description, category, price, image, rating, stock } =
    data || {};
  const [isAddToCartClicked, setIsAddToCartClicked] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: "",
    variant: "success",
  });
  const [state, setState] = useState<{
    loading: boolean;
    cartData: { count: number; resources: Array<IProduct> };
  }>({
    loading: false,
    cartData: {
      count: 0,
      resources: [],
    },
  });
  const { loading: addToCartLoading } = state || {};

  const AddProductToCart = async ({
    id,
    quantity,
  }: {
    id: number;
    quantity: number;
  }) => {
    setState({
      loading: true,
      cartData: {
        count: 0,
        resources: [],
      },
    });
    try {
      const { data, status } = await axios.post(getAddToCartUrl(), {
        id: id,
        quantity: quantity,
      });
      if (status === 201) {
        setCartItemList(data?.resources || []);
        setIsAddToCartClicked(true);
        setState((prevState) => ({
          ...prevState,
          cartData: data,
        }));
        setSnackbarInfo({
          open: true,
          message: `${title} has been added to the cart`,
          variant: "success",
        });
      }
    } catch (error) {
      console.error("error occured while adding product to cart ", error);
      setSnackbarInfo({
        open: true,
        message: `error occured while adding ${title} into cart`,
        variant: "error",
      });
    } finally {
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  const handleAddToCart = () => {
    AddProductToCart({ id: parseInt(id), quantity: 1 });
  };

  return (
    <Grid
      container
      sx={{
        padding: "24px",
        minHeight: "calc(100%  - 64px - 160px)",
        flex: 1,
        gap: "16px",
        overflow: "auto",
      }}
    >
      {isProductAlreadyInCart && (
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
            height="500px"
            // width="100%"
          >
            <Stack
              sx={{
                width: { xs: "100%", sm: "50%", justifyContent: "center" },
              }}
            >
              <img
                src={image}
                alt="product-image"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
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
                    {stock === 0 ? "out of stock" : `only ${stock} left`}
                  </Typography>
                </Stack>

                {isAddToCartClicked || isProductAlreadyInCart ? (
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
                      marginBottom: "24px",
                    }}
                  >
                    Go to cart
                  </Button>
                ) : (
                  <LoadingButton
                    size="small"
                    loading={addToCartLoading}
                    loadingPosition="start"
                    startIcon={<SaveIcon color="inherit" />}
                    variant="outlined"
                    onClick={handleAddToCart}
                    disabled={stock === 0 || isProductAlreadyInCart}
                    sx={{
                      color: "white !important",
                      background: "#0d0d0d",
                      "&:hover": {
                        background: "#0d0d0d",
                      },
                      "& .MuiLoadingButton-loadingIndicator": {
                        color: "white",
                        left: "unset",
                      },
                      "&.Mui-disabled": {
                        cursor: "not-allowed !important",
                      },
                      marginBottom: "24px",
                    }}
                  >
                    Add to cart
                  </LoadingButton>
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
