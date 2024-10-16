export interface IProduct {
    id: string;
    name: string;
    priceInCents: number;
    description: string;
    category: string;
    active: boolean;
    createdAt: Date
}
