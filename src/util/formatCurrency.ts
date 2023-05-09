export const formatCurrency = (value: number) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value! / 100);
};
