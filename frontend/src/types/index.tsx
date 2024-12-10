export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  discountApplied?: string;
  timestamp: Date;
}

export interface DiscountCode {
  code: string;
  used: boolean;
}
