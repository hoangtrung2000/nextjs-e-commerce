"use client";

import Button from "@/components/Product/Button";
import ProductImage from "@/components/Product/ProductImage";
import Quantity from "@/components/Product/Quantity";
import SetColor from "@/components/Product/SetColor";
import { useCart } from "@/hooks/useCart";
import { renderRatingStars } from "@/utils";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

interface Props {
  product: Product;
}

const Horizontal = () => {
  return <hr className="w-full my-2" />;
};

const ProductDetail = ({ product }: Props) => {
  const { cartProducts, handleAddProduct } = useCart();
  const [isProductInCart, setIsProductInCart] = useState<boolean>(false);
  const [cartProduct, setCartProduct] = useState<CartProduct>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    quantity: 1,
    selectedImage: { ...product.images[0] },
    price: product.price,
  });
  const router = useRouter();

  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts, product.id]);

  const handleSetColor = useCallback(
    (value: ProductImage) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImage: value };
      });
    },
    [cartProduct.selectedImage]
  );

  const handleDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartProduct]);

  const handleIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleSetColor={handleSetColor}
      />
      <div className="flex flex-col text-slate-500 text-sm gap-1">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={renderRatingStars(product)} readOnly />
          <div>{product.reviews?.length} reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY:</span>
          <span>{product.category}</span>
        </div>
        <div>
          <span className="font-semibold">BRAND:</span>
          <span>{product.brand}</span>
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In stock" : "Out of stock"}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle className="text-teal-400" size={20} />
              <span>Product added to cart</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                label="View cart"
                variants="outline"
                onClick={() => router.push("/cart")}
              ></Button>
            </div>
          </>
        ) : (
          <>
            <SetColor
              images={product.images}
              cartProduct={cartProduct}
              handleSetColor={handleSetColor}
            />
            <Horizontal />
            <Quantity
              cartProduct={cartProduct}
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
            />
            <Horizontal />
            <div className="max-w-[300px]">
              <Button
                onClick={() => handleAddProduct(cartProduct)}
                label="Add to cart"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
