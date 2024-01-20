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

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean | null;
  image: string;
  hashedPassword: string | null;
  createdAt: string;
  updatedAt: string;
  role: "ADMIN" | "USER";
}

interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdDate: string;
  user: User;
}
