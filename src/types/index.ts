export type ProductCategory = "men" | "women" | "accessories";

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export interface ColorOption {
  name: string;
  hex: string;
  /** Optional override image shown when this color is selected in the gallery */
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  previousPrice?: number;
  shortDescription: string;
  description: string;
  images: string[];
  colors: ColorOption[];
  sizes: string[];
  stock: StockStatus;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

export type DeliveryOption = "inside-dhaka" | "outside-dhaka";

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  customerName: string;
  phone: string;
  address: string;
  area: string;
  district: string;
  deliveryOption: DeliveryOption;
  deliveryFee: number;
  subtotal: number;
  total: number;
  createdAt: string;
}

export type SortOption =
  | "featured"
  | "newest"
  | "price-low-high"
  | "price-high-low";
