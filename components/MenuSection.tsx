// MenuSection component for Food Menu page

import ProductCard from "./ProductCard";

export type Product = {
  id: string;
  title: string;
  titleThai: string;
  price: number;
  description: string;
  image: string;
  category: 
    | "Noodle"
    | "Fried Rice"
    | "Main Dish"
    | "Soup"
    | "Salad (Side Dish)"
    | "Side Dish"
    | "Appetizer";
};

type MenuSectionProps = {
  title: string;
  products: Product[];
  onAddToCart?: (product: Product, quantity: number) => void;
};

export default function MenuSection({
  title,
  products,
  onAddToCart,
}: MenuSectionProps) {
  const handleAddToCart = (product: Product, quantity: number) => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-6 sm:gap-8 md:gap-[40px]">
      {/* Section Title - Responsive sizing */}
      <h2
        className="font-['Chillax_Variable',sans-serif] leading-[0.89] text-[24px] sm:text-[28px] md:text-[32px] font-semibold bg-clip-text bg-gradient-to-b from-[#181e24] to-[#293f55]"
        style={{ WebkitTextFillColor: "transparent" }}
      >
        {title}
      </h2>

      {/* Product Grid - Responsive columns and gap */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-[40px] w-full">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            titleThai={product.titleThai}
            price={product.price}
            description={product.description}
            onAddToCart={(quantity) => handleAddToCart(product, quantity)}
          />
        ))}
      </div>
    </div>
  );
}

