import Customer from "../src/Customer";

test("O cpf 05187466070 deve ser considerado válido", function () {
    const customer = new Customer("João", "Silva", "05187466070");
    expect(customer.isDocumentValid()).toBeTruthy();
});

test("O cpf 12121212121 deve ser considerado inválido", function () {
    const customer = new Customer("João", "Silva", "12121212121");
    expect(customer.isDocumentValid()).toBeFalsy();
});

test("O cpf undefined deve ser considerado inválido", function () {
    const customer = new Customer("João", "Silva");
    expect(customer.validateDocument(undefined)).toBeFalsy();
});

test("O cpf 9999999999 com 10 caracteres deve ser considerado inválido", function () {
    const customer = new Customer("João", "Silva", "9999999999");
    expect(customer.isDocumentValid()).toBeFalsy();
});

test("O cpf 999999999999 com 11 caracteres deve ser considerado inválido", function () {
    const customer = new Customer("João", "Silva", "999999999999");
    expect(customer.isDocumentValid()).toBeFalsy();
});

test("O cpf 99999999999999 com 12 caracteres deve ser considerado inválido", function () {
    const customer = new Customer("João", "Silva", "99999999999999");
    expect(customer.isDocumentValid()).toBeFalsy();
});

test("O cpf 9999999999999 com 13 caracteres deve ser considerado inválido", function () {
    const customer = new Customer("João", "Silva", "9999999999999");
    expect(customer.isDocumentValid()).toBeFalsy();
});

test("O cpf 99999999999999 com 14 caracteres deve ser considerado inválido", function () {
    const customer = new Customer("João", "Silva", "99999999999999");
    expect(customer.isDocumentValid()).toBeFalsy();
});

test("O cpf 999999999999999 com 15 caracteres deve ser considerado inválido", function () {
    const customer = new Customer("João", "Silva", "999999999999999");
    expect(customer.isDocumentValid()).toBeFalsy();
});