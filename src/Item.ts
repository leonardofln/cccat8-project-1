export default class Item {
    private description: string;
    private quantity: number;
    private price: number;
    private width: number;
    private height: number;
    private depth: number;
    private weight: number;

    constructor(description: string, quantity: number, price: number, width: number, height: number, depth: number, weight: number) {
        if (width < 0) throw new Error("Width is not valid");
        if (height < 0) throw new Error("Height is not valid");
        if (depth < 0) throw new Error("Depth is not valid");
        if (weight < 0) throw new Error("Weight is not valid");
        this.description = description;
        this.quantity = quantity;
        this.price = price;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.weight = weight;
    }

    getDescription() {
        return this.description;
    }

    getQuantity() {
        return this.quantity;
    }

    getPrice() {
        return this.price;
    }

    getAmount() {
        return this.quantity * this.price;
    }

    getVolume() {
        return this.width * this.height * this.depth;
    }

    getVolumeInCubicMeters() {
        return this.getVolume() / 1000000;
    }

    getDensity() {
        return this.weight / this.getVolumeInCubicMeters();
    }
}