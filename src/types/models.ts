export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    userStatus: number;
    username: string;
}

export enum OrderStatus {
    Placed = "PLACED",
    Approved = "APPROVED",
    Delivered = "DELIVERED",
}

export interface Order {
    userId: number;
    quantity: number;
    shipDate: Date;
    status: OrderStatus;
    complete: boolean;
}
