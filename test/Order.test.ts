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
    order.addItem(new Item("Mouse", 1, 15, 5, 5, 5, 5));
    order.addItem(new Item("Webcam", 2, 25, 5, 5, 5, 5));
    order.addItem(new Item("Keyboard", 1, 20, 5, 5, 5, 5));
    expect(order.getAmount()).toBe(85);
});

test("Deve criar um pedido com cupom de desconto", function () {
    const customer = new Customer("João", "Silva", "05187466070");
    const order = new Order(customer);
    order.addItem(new Item("Mouse", 1, 15, 5, 5, 5, 5));
    order.addItem(new Item("Webcam", 2, 25, 5, 5, 5, 5));
    order.addItem(new Item("Keyboard", 1, 20, 5, 5, 5, 5));
    order.addCoupon(new Coupon("VALE50", 50, new Date("2022-12-31")));
    expect(order.getAmount()).toBe(42.5);
});

test("Não deve aplicar um cupom de desconto expirado", function () {
    const customer = new Customer("João", "Silva", "05187466070");
    const order = new Order(customer);
    order.addItem(new Item("Mouse", 1, 1, 5, 5, 5, 5));
    order.addItem(new Item("Webcam", 2, 25, 5, 5, 5, 5));
    order.addItem(new Item("Keyboard", 1, 20, 5, 5, 5, 5));
    expect(() => order.addCoupon(new Coupon("VALE10", 10, new Date("2020-01-01")))).toThrow(new Error("Coupon validity expired"));
});

test("Não deve aceitar um pedido com quantidade negativa", function () {
    const customer = new Customer("João", "Silva", "05187466070");
    const order = new Order(customer);
    expect(() => order.addItem(new Item("Mouse", -1, 15, 5, 5, 5, 5))).toThrow(new Error("Invalid Quantity"));
});

test("Não deve aceitar produto duplicado no pedido", function () {
    const customer = new Customer("João", "Silva", "05187466070");
    const order = new Order(customer);
    order.addItem(new Item("Mouse", 1, 15, 5, 5, 5, 5));
    expect(() => order.addItem(new Item("Mouse", 1, 15, 5, 5, 5, 5))).toThrow(new Error("Product already exists"));
});

test("Não deve aceitar um pedido com item que tem largura negativa", function () {
    const customer = new Customer("João", "Silva", "05187466070");
    const order = new Order(customer);
    expect(() => order.addItem(new Item("Mouse", -1, 15, -5, 5, 5, 5))).toThrow(new Error("Width is not valid"));
});

test("Não deve aceitar um pedido com item que tem altura negativa", function () {
    const customer = new Customer("João", "Silva", "05187466070");
    const order = new Order(customer);
    expect(() => order.addItem(new Item("Mouse", -1, 15, 5, -5, 5, 5))).toThrow(new Error("Height is not valid"));
});

test("Não deve aceitar um pedido com item que tem profundidade negativa", function () {
    const customer = new Customer("João", "Silva", "05187466070");
    const order = new Order(customer);
    expect(() => order.addItem(new Item("Mouse", -1, 15, 5, 5, -5, 5))).toThrow(new Error("Depth is not valid"));
});

test("Não deve aceitar um pedido com item que tem peso negativo", function () {
    const customer = new Customer("João", "Silva", "05187466070");
    const order = new Order(customer);
    expect(() => order.addItem(new Item("Mouse", -1, 15, 5, 5, 5, -5))).toThrow(new Error("Weight is not valid"));
});

test("Deve calcular o valor do frete com base nas dimensões e peso dos produtos", function () {
    const customer = new Customer("João", "Silva", "05187466070");
    const order = new Order(customer);
    order.addItem(new Item("Câmera", 1, 3500, 20, 15, 10, 1));
    order.addItem(new Item("Guitarra", 1, 2500, 100, 30, 10, 3));
    order.addItem(new Item("Geladeira", 1, 3000, 200, 100, 50, 40));
    expect(order.calcShipping()).toBe(440);
});

test("Deve calcular o valor do frete mínimo corretamente", function () {
    const customer = new Customer("João", "Silva", "05187466070");
    const order = new Order(customer);
    order.addItem(new Item("Câmera", 1, 3500, 1, 1, 1, 0.5));
    expect(order.calcShipping()).toBe(order.getMinimalShipping());
});