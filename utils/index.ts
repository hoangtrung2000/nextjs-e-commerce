export const truncateText = (text: string): string => {
  if (text.length < 25) return text;

  return text.substring(0, 25) + "...";
};

export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const renderRatingStars = (product: Product): number => {
  const ratingProduct =
    product.reviews.reduce(
      (acc: number, review: Review) => acc + review.rating,
      0
    ) / product.reviews.length;
  return ratingProduct;
};
