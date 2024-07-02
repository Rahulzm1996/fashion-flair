export const convertToNumber = (num: string) => {
  return Number(num.replace(/Rs/, ""));
};

/*
converts price label (0-Rs250|Rs251-Rs450|Rs450) into below format
{
  min:number,
  max:number
}
*/
export const generateMinMaxFromLabelOfPrice = (price: string) => {
  if (price.includes("-")) {
    const [min, max] = price.split("-");
    let priceInRs = {};
    if (Number(min) === 0) {
      priceInRs = { min: 0, max: convertToNumber(max) };
    } else {
      priceInRs = {
        min: convertToNumber(min),
        max: convertToNumber(max),
      };
    }
    return priceInRs;
  } else {
    return { min: 0, max: convertToNumber(price) };
  }
};
