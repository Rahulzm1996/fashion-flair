import Button from "@mui/material/Button";
import { Chip, Stack, Tooltip } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";

import { IProduct } from "../types";
import Snackbar from "./Snackbar";
import { useAppContext } from "../context";
import { StyledCard } from "./styles";
import { getAddToCartUrl } from "../constants";

const Product = ({
  id,
  description,
  category,
  image,
  price,
  rating,
  stock,
  title,
}: IProduct) => {
  const history = useHistory();
  const { cartItemList, setCartItemList } = useAppContext();
  const isProductAlreadyInCart = cartItemList.some(
    (prod) => prod.id === parseInt(id)
  );

  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: "",
    variant: "success",
  });
  const [isAddToCartClicked, setIsAddToCartClicked] = useState(false);

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

  const addProductToCart = async ({
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

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    addProductToCart({ id: parseInt(id), quantity: 1 });
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Link to={`/products/${id}`}>
        <StyledCard key={id}>
          <CardMedia
            component="img"
            alt={name}
            width="100%"
            height="180"
            image={image}
          />
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <Stack width="100%" gap="8px">
              <Typography gutterBottom variant="h6" component="div">
                {title}
              </Typography>
              {description ? (
                <Tooltip title={description}>
                  <Typography
                    gutterBottom
                    variant="caption"
                    component="div"
                    width={"100%"}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {description}
                  </Typography>
                </Tooltip>
              ) : null}

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
                <Typography variant="caption">{rating.count} Rating</Typography>
                <Chip label={category} size="small" variant="outlined" />
              </Stack>

              <Stack direction="row" gap="8px" alignItems={"center"}>
                <Stack direction="row" alignItems={"center"}>
                  &#8377;<Typography variant="h6"> {price}</Typography>
                </Stack>
                <Typography
                  variant="caption"
                  width={"100%"}
                  color={stock === 0 ? "red" : "green"}
                >
                  {stock === 0 ? "out of stock" : `${stock} in stock`}
                </Typography>
              </Stack>
            </Stack>
            {isAddToCartClicked || isProductAlreadyInCart ? (
              <Button
                variant="contained"
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/cart");
                }}
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
              <LoadingButton
                size="small"
                fullWidth
                loading={addToCartLoading}
                loadingPosition="start"
                startIcon={<SaveIcon color="inherit" />}
                variant="outlined"
                onClick={handleAddToCartClick}
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
                }}
              >
                Add to cart
              </LoadingButton>
            )}
          </CardContent>
        </StyledCard>
        {snackbarInfo.open && (
          <Snackbar {...snackbarInfo} setSnackbarInfo={setSnackbarInfo} />
        )}
      </Link>
    </Grid>
  );
};

export default Product;
