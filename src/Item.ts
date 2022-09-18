// @ts-nocheck
export default class Item {
    private description: string;
    private quantity: number;
    private price: number;

    constructor(description: string, quantity: number, price: number) {
        this.description = description;
        this.quantity = quantity;
        this.price = price;
    }

    getAmount() {
        return this.quantity * this.price;
    }
}