import { Order, CartItem, DiscountCode } from "types";
import { ProductService } from "./ProductService";

export class OrderService {
  private orders: Order[] = [];
  private discountCodes: DiscountCode[] = [];
  private static DISCOUNT_FREQUENCY = 3; // Every 3rd order gets a discount

  createOrder(
    cart: CartItem[],
    productService: ProductService,
    discountCode?: string
  ): Order {
    if (cart.length === 0) {
      throw new Error("Cannot create order with empty cart");
    }

    let totalAmount = cart.reduce((total, item) => {
      const product = productService.getProductById(item.id);
      if (!product) throw new Error(`Product ${item.id} not found`);
      return total + product.price * item.quantity;
    }, 0);

    if (discountCode) {
      const isValid = this.validateDiscountCode(discountCode);
      if (isValid) {
        totalAmount *= 0.9; // 10% discount
        const code = this.discountCodes.find((dc) => dc.code === discountCode);
        if (code) code.used = true;
      } else {
        throw new Error("Invalid discount code");
      }
    }

    const order: Order = {
      id: `order_${this.orders.length + 1}`,
      items: cart,
      totalAmount,
      status: "pending",
      discountApplied: discountCode ? true : false,
      timestamp: new Date(),
    };

    this.orders.push(order);
    return order;
  }

  generateDiscountCode(): string {
    const code = `DISCOUNT_${Math.random()
      .toString(36)
      .substring(2, 9)
      .toUpperCase()}`;
    this.discountCodes.push({ code, used: false });
    return code;
  }

  validateDiscountCode(code: string): boolean {
    const discountCode = this.discountCodes.find((dc) => dc.code === code);
    if (!discountCode) return false;
    if (discountCode.used) return false;
    if ((this.orders.length + 1) % OrderService.DISCOUNT_FREQUENCY !== 0)
      return false;

    return true;
  }

  getOrderStats() {
    return {
      totalOrders: this.orders.length,
      totalPurchaseAmount: this.orders.reduce(
        (sum, order) => sum + order.totalAmount,
        0
      ),
      discountCodesGenerated: this.discountCodes.length,
      totalDiscountAmount: this.orders.reduce((sum, order) => {
        return sum + (order.discountApplied ? order.totalAmount * 0.1 : 0);
      }, 0),
      productPurchaseCount: this.getProductPurchaseCount(),
    };
  }

  private getProductPurchaseCount(): { [productId: string]: number } {
    const productCount: { [productId: string]: number } = {};

    this.orders.forEach((order) => {
      order.items.forEach((item) => {
        productCount[item.id] = (productCount[item.id] || 0) + item.quantity;
      });
    });

    return productCount;
  }
}
