import { User } from "@prisma/client";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  inStock: boolean;
  images: ProductImage[];
  reviews: Review[];
}

type CartProduct = Omit<Product, "inStock" | "reviews" | "images"> & {
  selectedImage: ProductImage;
  quantity: number;
};

interface ProductImage {
  color: string;
  colorCode: string;
  image: string;
}

type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdDate: string;
  user: User;
}
