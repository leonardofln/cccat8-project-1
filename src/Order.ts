import Coupon from "./Coupon";
import Customer from "./Customer";
import Item from "./Item";

// @ts-nocheck
export default class Order {
    private customer: Customer;
    private items: Item[];
    private coupon: Coupon;
    private amount: number;

    constructor(customer: Customer) {
        if (!customer.isDocumentValid()) throw new Error("Invalid Document");
        this.customer = customer;
        this.items = [];
        this.coupon = new Coupon(0);
        this.amount = 0;
    }

    addItem(item: Item) {
        this.items.push(item);
        this.amount += item.getAmount();
    }

    addCoupon(coupon: Coupon) {
        this.coupon = coupon;
        this.amount = this.coupon.applyDiscount(this.amount);
    }

    getAmount() {
        return this.amount;
    }
}