import currency from "currency.js";

export const formatCurrency = (value) => {
  try {
    return currency(value, {
      symbol: "R ",
      decimal: ",",
      separator: " ",
      precision: 2,
    }).format();
  } catch (err) {
    console.log("Error formatting currency:", err);
    return value;
  }
};

export const formatPercentage = (value) => {
  const numericValue = typeof value === "bigint" ? Number(value) : value;

  const decimalValue = numericValue / 100;

  return new Intl.NumberFormat("en-ZA", {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(decimalValue);
};

export const formatNumber = (num) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};
