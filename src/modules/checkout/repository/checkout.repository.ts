import Order from "../domain/order.entity";

export default class CheckoutRepository {
  
  addOrder(order: Order): Promise<void> {
    return null;
  };

  findOrder(id: string): Promise<Order> {
    return null;
  };

}