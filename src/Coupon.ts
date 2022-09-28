export default class Coupon {
    private name: string;
    private discount: number;
    private validity: Date;

    constructor(name: string, discount: number, validity: Date) {
        this.name = name;
        this.discount = discount;
        this.validity = validity;
    }

    getName() {
        return this.name
    }

    getDiscount() {
        return this.discount
    }

    getValidity() {
        return this.validity
    }

    applyDiscount(amount: number) {
        return amount - (amount * this.getDiscount()) / 100;
    }

    isExpiredValidity() {
        const currentDate = new Date();
        return currentDate > this.validity;
    }
}