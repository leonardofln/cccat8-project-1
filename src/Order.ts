import Coupon from "./Coupon";
import Customer from "./Customer";
import Item from "./Item";

export default class Order {
    private customer: Customer;
    private items: Item[];
    private coupon?: Coupon;
    private amount: number;

    constructor(customer: Customer) {
        if (!customer.isDocumentValid()) throw new Error("Invalid Document");
        this.customer = customer;
        this.items = [];
        this.amount = 0;
    }

    addItem(item: Item) {
        if (item.getQuantity() < 0) throw new Error("Invalid Quantity");
        if (this.isItemExists(item)) throw new Error("Product already exists");
        this.items.push(item);
        this.amount += item.getAmount();
    }

    addCoupon(coupon: Coupon) {
        if (coupon.isExpiredValidity()) throw new Error("Coupon validity expired");
        this.coupon = coupon;
        this.amount = this.coupon.applyDiscount(this.amount);
    }

    getAmount() {
        return this.amount;
    }

    isItemExists(item: Item): boolean {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].getDescription() == item.getDescription()) return true;
        }
        return false;
    }

    calcShipping() {
        let shipping = 0;
        for (let i = 0; i < this.items.length; i++) {
            shipping += this.calcItemShipping(this.items[i]);
        }
        return shipping;
    }

    calcItemShipping(item: Item) {
        let shipping = this.getDistance() * item.getVolumeInCubicMeters() * (item.getDensity() / 100);
        return shipping < this.getMinimalShipping() ? this.getMinimalShipping() : shipping;
    }

    getDistance() {
        return 1000;
    }

    getMinimalShipping() {
        return 10;
    }
}