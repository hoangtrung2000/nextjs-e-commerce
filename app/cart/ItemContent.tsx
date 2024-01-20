import Quantity from "@/components/Product/Quantity";
import { useCart } from "@/hooks/useCart";
import { formatPrice, truncateText } from "@/utils";
import Image from "next/image";
import Link from "next/link";

type CartContentProps = {
  item: CartProduct;
};
const ItemContent = ({ item }: CartContentProps) => {
  const { handleRemoveProduct, handleIncreaseCart, handleDecreaseCart } =
    useCart();
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={item.selectedImage.image}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>{truncateText(item.name)}</Link>
          <div>{item.selectedImage.color}</div>
          <div>
            <button
              className="text-slate-500 underline hover:text-red-500"
              onClick={() => {
                handleRemoveProduct(item);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">
        <Quantity
          cartCounter={true}
          cartProduct={item}
          handleIncrease={() => {
            handleIncreaseCart(item);
          }}
          handleDecrease={() => {
            handleDecreaseCart(item);
          }}
        />
      </div>
      <div className="justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
