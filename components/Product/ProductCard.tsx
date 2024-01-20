"use client";

import { formatPrice, renderRatingStars, truncateText } from "@/utils";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm"
    >
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            src={product.images[0].image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-4">{truncateText(product.name)}</div>
        <div>
          <Rating value={renderRatingStars(product)} readOnly />
        </div>
        <div>{product.reviews.length} reviews</div>
        <div className="font-semibold">{formatPrice(product.price)}</div>
      </div>
    </Link>
  );
};

export default ProductCard;
