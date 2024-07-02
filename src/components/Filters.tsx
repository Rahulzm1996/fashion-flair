import { Box, Stack } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";

import { generateMinMaxFromLabelOfPrice } from "../utils";
import { IFiltersProps } from "../types";

const StyledFormControlLabel = styled(FormControlLabel)({
  "&.MuiFormControlLabel-root": {
    marginLeft: "unset",

    "& .MuiCheckbox-root": {
      padding: "4px 2px",

      "& .MuiSvgIcon-root": {
        fontSize: "1rem",
      },
    },
  },
});

const StyledFormLabel = styled(FormLabel)({
  "&.MuiFormLabel-root": {
    fontFamily: "inherit",
    fontWeight: "bold",
  },
});

const Filters = ({
  tshirts,
  setTshirtsList,
  selectedFilters,
  setSelectedFilters,
}: IFiltersProps) => {
  const [color, setColors] = useState({ ...selectedFilters.color });
  const [gender, setGender] = useState({ ...selectedFilters.gender });
  const [price, setPrice] = useState({ ...selectedFilters.price });
  const [type, setType] = useState({ ...selectedFilters.type });

  const handleChange = (event, fieldName: string) => {
    if (fieldName === "color") {
      setColors({
        ...color,
        [event.target.name]: event.target.checked,
      });
    } else if (fieldName === "gender") {
      setGender({
        ...gender,
        [event.target.name]: event.target.checked,
      });
    } else if (fieldName === "price") {
      setPrice({
        ...price,
        [event.target.name]: event.target.checked,
      });
    } else if (fieldName === "type") {
      setType({
        ...type,
        [event.target.name]: event.target.checked,
      });
    }
  };

  useEffect(() => {
    const appliedFilters = {
      color: Object.keys(color).filter((key) => color[key]),
      gender: Object.keys(gender).filter((key) => gender[key]),
      price: Object.keys(price)
        .filter((key) => price[key])
        .map(generateMinMaxFromLabelOfPrice),
      type: Object.keys(type).filter((key) => type[key]),
    };

    const filtersToStoreInContext = { color, gender, price, type };
    setSelectedFilters({ ...filtersToStoreInContext });

    const applicableFilters = {};

    for (const prop in appliedFilters) {
      if (appliedFilters[prop].length > 0) {
        applicableFilters[prop] = appliedFilters[prop];
      }
    }

    //filtering out the tshirts based on different applied filters
    const filteredArray = tshirts.filter((obj) => {
      const keys = Object.keys(applicableFilters);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key === "price") {
          const priceRange = applicableFilters[key][0];
          if (obj.price < priceRange.min || obj.price > priceRange.max) {
            return false;
          }
        } else if (applicableFilters[key].indexOf(obj[key]) === -1) {
          return false;
        }
      }
      return true;
    });

    if (filteredArray.length === 0) {
      setTshirtsList(tshirts);
    } else {
      setTshirtsList(filteredArray);
    }
  }, [color, gender, price, tshirts, type]);

  //synching the local state with context filters state
  useEffect(() => {
    setColors({ ...selectedFilters.color });
    setGender({ ...selectedFilters.gender });
    setPrice({ ...selectedFilters.price });
    setType({ ...selectedFilters.type });
  }, [JSON.stringify(selectedFilters)]);

  return (
    <Box
      sx={{
        width: "270px",
        padding: "30px",
        transition: "all 0.3s linear",
      }}
      className="filters"
    >
      <Box
        sx={{
          width: "100%",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
          padding: "16px",
        }}
      >
        <Stack spacing={2}>
          <FormControl>
            <StyledFormLabel>Colour</StyledFormLabel>
            <FormGroup onChange={(event) => handleChange(event, "color")}>
              {Object.keys(color).map((key) => (
                <StyledFormControlLabel
                  control={<Checkbox checked={color[key]} name={key} />}
                  key={key}
                  label={key}
                />
              ))}
            </FormGroup>
          </FormControl>

          <FormControl>
            <StyledFormLabel>Gender</StyledFormLabel>
            <FormGroup onChange={(event) => handleChange(event, "gender")}>
              {Object.keys(gender).map((key) => (
                <StyledFormControlLabel
                  control={<Checkbox checked={gender[key]} name={key} />}
                  key={key}
                  label={key}
                />
              ))}
            </FormGroup>
          </FormControl>

          <FormControl>
            <StyledFormLabel>Price</StyledFormLabel>
            <FormGroup onChange={(event) => handleChange(event, "price")}>
              {Object.keys(price).map((key) => (
                <StyledFormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => e}
                      checked={price[key]}
                      name={key}
                    />
                  }
                  key={key}
                  label={key}
                />
              ))}
            </FormGroup>
          </FormControl>

          <FormControl>
            <StyledFormLabel>Type</StyledFormLabel>
            <FormGroup onChange={(event) => handleChange(event, "type")}>
              {Object.keys(type).map((key) => (
                <StyledFormControlLabel
                  control={<Checkbox checked={type[key]} name={key} />}
                  key={key}
                  label={key}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Stack>
      </Box>
    </Box>
  );
};

export default Filters;
