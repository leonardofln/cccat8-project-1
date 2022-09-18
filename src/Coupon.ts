// @ts-nocheck
export default class Coupon {
    private discount: number;

    constructor(discount: number) {
        this.discount = discount;
    }

    getDiscount() {
        return this.discount
    }

    applyDiscount(amount: number) {
        return amount - (amount * this.getDiscount()) / 100;
    }
}