"use client";

interface Props {
  cartCounter?: boolean;
  cartProduct: CartProduct;
  handleIncrease: () => void;
  handleDecrease: () => void;
}

const Quantity = ({
  cartCounter,
  cartProduct,
  handleDecrease,
  handleIncrease,
}: Props) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold">QUANTITY:</div>}
      <div className="flex gap-4 text-base items-center">
        <button
          className="btn"
          onClick={handleDecrease}
          disabled={cartProduct.quantity === 1 ? true : false}
        >
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button
          className="btn"
          onClick={handleIncrease}
          disabled={cartProduct.quantity === 99 ? true : false}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Quantity;
