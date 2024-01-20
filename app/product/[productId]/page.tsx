import Container from "@/components/Container";
import ProductDetail from "./ProductDetail";
import { products } from "@/utils/product";
import ListRating from "@/components/Product/ListRating";

interface Props {
  params: {
    productId: string;
  };
}

const Product = ({ params }: Props) => {
  const productId = products.find((product) => product.id === params.productId);

  if (!productId) return;

  return (
    <div className="p-8">
      <Container>
        <ProductDetail product={productId} />
        <div className="flex flex-col mt-20 gap-4">
          <div>Add rating</div>
          <ListRating product={productId} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
