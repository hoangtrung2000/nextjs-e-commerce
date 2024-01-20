"use client";

interface Props {
  images: ProductImage[];
  cartProduct: CartProduct;
  handleSetColor: (value: ProductImage) => void;
}

function SetColor({ images, cartProduct, handleSetColor }: Props) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-semibold">COLOR:</span>
      <div className="flex gap-1">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => handleSetColor(image)}
            className={`h-7 w-7 rounded-full text-teal-300 flex items-center justify-center ${
              image.color === cartProduct.selectedImage.color
                ? "border-[1.5px]"
                : "border-none"
            }`}
          >
            <div
              style={{ background: image.colorCode }}
              className="h-5 w-5 border-[1.2px] rounded-full border-slate-300"
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SetColor;
