import Coupon from "../src/Coupon";
import Customer from "../src/Customer";
import Item from "../src/Item";
import Order from "../src/Order";

test("Não deve criar um pedido com cpf inválido", function () {
    const customerInvalidDocument = new Customer("João", "Silva", "12121212121");
    expect(() => new Order(customerInvalidDocument)).toThrow(new Error("Invalid Document"));
});

test("Deve criar um pedido com 3 itens", function () {
    const customer = new Customer("João", "Silva", "05187466070");
    const order = new Order(customer);
    order.addItem(new Item("Mouse", 1, 15));
    order.addItem(new Item("Webcam", 2, 25));
    order.addItem(new Item("Keyboard", 1, 20));
    expect(order.getAmount()).toBe(85);
});

test("Deve criar um pedido com cupom de desconto", function () {
    const customer = new Customer("João", "Silva", "05187466070");
    const order = new Order(customer);
    order.addItem(new Item("Mouse", 1, 15));
    order.addItem(new Item("Webcam", 2, 25));
    order.addItem(new Item("Keyboard", 1, 20));
    order.addCoupon(new Coupon(50));
    expect(order.getAmount()).toBe(42.5);
});